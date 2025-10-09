<script setup>
import { ref, onMounted, nextTick } from "vue"

const props = defineProps({
  role: String,
  company: String,
  duration: String,
  current: Boolean,
  technologies: Array,
  responsibilities: Array,
  index: Number,
  branchColor: {
    type: String,
    default: "var(--color-primary)",
  },
})

// refs y estados
const container = ref(null)
const visible = ref(false)
const circleHovered = ref(false)
const height = ref(120)

// geometría base
const svgWidth = 120
const cornerRadius = 20
const mergeHeight = 40

// 👉 función que convierte **texto** a <strong>
const formatText = (text) => {
  if (!text) return ""
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
}

onMounted(async () => {
  await nextTick()
  if (container.value) height.value = container.value.offsetHeight + 20

  // IntersectionObserver para animar solo al entrar
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  if (container.value) observer.observe(container.value)
})
</script>

<template>
  <div class="item" ref="container">
    <div class="git-area">
      <svg
        class="git-svg"
        :width="svgWidth"
        :height="height"
        :viewBox="`0 0 ${svgWidth} ${height}`"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Línea principal -->
        <line
          x1="20"
          y1="0"
          x2="20"
          :y2="height"
          stroke="var(--color-secondary)"
          stroke-width="4"
          stroke-linecap="round"
        />

        <!-- Rama principal (bottom → top) -->
        <path
          :d="`
            M20,${height - 10}
            H${svgWidth - 40}
            A${cornerRadius},${cornerRadius} 0 0 0 ${svgWidth - 20},${height - 30}
            V${height / 3 + mergeHeight}
          `"
          :stroke="branchColor"
          stroke-width="4"
          fill="none"
          stroke-linecap="round"
          class="branch-path"
          :style="{
            animationDelay: (index * 0.5) + 's'
          }"
        />

        <!-- Merge (solo si no es current) -->
        <path
          v-if="!current"
          :d="`
            M${svgWidth - 20},${height / 3 + mergeHeight}
            V${height / 3}
            A${cornerRadius},${cornerRadius} 0 0 0 ${svgWidth - 40},${height / 3 - cornerRadius}
            H20
          `"
          :stroke="branchColor"
          stroke-width="4"
          fill="none"
          stroke-linecap="round"
          class="merge-path"
          :style="{
            animationDelay: (index * 0.5 + 0.4) + 's'
          }"
        />

        <!-- Círculo main (inicio de rama) -->
        <circle
          cx="20"
          :cy="height - cornerRadius * 1.5"
          r="5"
          fill="var(--color-secondary)"
          class="main-dot"
        />

        <!-- Círculo main (merge final) -->
        <circle
          v-if="!current"
          cx="20"
          :cy="height / 3 + cornerRadius * 0.5"
          r="5"
          fill="var(--color-secondary)"
          class="main-dot"
        />

        <!-- Nodo principal -->
        <circle
          :cx="svgWidth - 20"
          :cy="height / 3 + mergeHeight"
          :r="current ? '10' : '6'"
          :fill="branchColor"
          :class="{ active: circleHovered }"
          @mouseenter="circleHovered = true"
          @mouseleave="circleHovered = false"
          @click="circleHovered = !circleHovered"
        />

        <!-- Commits internos (por cada task) -->
        <circle
          v-for="(task, i) in (responsibilities?.[0]?.task || [])"
          :key="'task-dot-' + i"
          :cx="svgWidth - 20"
          :cy="(height / ((responsibilities?.[0]?.task?.length || 1) + 1)) * (i + 1)"
          r="4"
          :fill="branchColor"
          class="task-dot"
          :style="{
            animationDelay: (index * 0.5 + 0.6 + i * 0.2) + 's'
          }"
        />
      </svg>
    </div>

    <!-- Contenido textual -->
    <div class="work-item">
      <div class="item-title">
        <h3>{{ role }} - {{ company }}</h3>
        <h5>{{ duration }}</h5>
      </div>

      <div class="technologies">
        <span v-for="(item, i) in technologies" :key="i">
          {{ item }}
          <span class="dark" v-if="i < technologies.length - 1">&nbsp; • &nbsp;</span>
        </span>
      </div>

      <!-- Renderizado de tasks -->
      <div class="tasks">
        <div
          v-for="(task, i) in responsibilities?.[0]?.task"
          :key="'task-' + i"
          class="task-block"
        >
          <template v-if="task.type === 'list'">
            <ul>
              <li
                v-for="(desc, j) in task.description"
                :key="'desc-' + j"
                v-html="formatText(desc)"
              ></li>
            </ul>
          </template>

          <template v-else-if="task.type === 'paragraph'">
            <p v-html="formatText(task.description)"></p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: grid;
  grid-template-columns: minmax(120px, 25%) 1fr;
  column-gap: 1rem;
  align-items: start;
  position: relative;
}

.git-area {
  display: flex;
  justify-content: center;
  position: relative;
  min-width: 100px;
}

.git-svg {
  overflow: visible;
}

.branch-path,
.merge-path {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: draw-line 1s ease-out forwards;
}

.task-dot {
  opacity: 0;
  animation: show-dot 0.4s ease-out forwards;
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes show-dot {
  to {
    opacity: 1;
  }
}

/* Nodo principal animado */
.git-svg circle {
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;
}

.git-svg circle.active {
  transform: scale(1.4);
  filter: drop-shadow(0 0 5px var(--color-primary));
}

.work-item {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

.item-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h5 {
  margin: 0;
  font-weight: normal;
  opacity: 0.7;
}

.tasks ul {
  margin: 0.5em 0;
  padding-left: 1.2em;
}

.tasks p {
  margin: 0.5em 0;
}

.tasks strong {
  color: var(--color-primary);
}
</style>
