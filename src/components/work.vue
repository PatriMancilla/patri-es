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

const { branchColor, current, index } = props

const circleHovered = ref(false)
const visible = ref(false)
const pathRef = ref(null)
const container = ref(null)
const height = ref(120)

const svgWidth = 120
const cornerRadius = 20
const mergeHeight = 40

onMounted(async () => {
  await nextTick()
  if (container.value) height.value = container.value.offsetHeight + 20

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )

  if (pathRef.value) observer.observe(pathRef.value)
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

        <!-- Circulo main (punto de unión de rama) -->
        <circle
          cx="20"
          :cy="height / 3 + mergeHeight"
          r="5"
          fill="var(--color-secondary)"
          class="main-dot"
          :style="{
            animationDelay: index * 0.5 + 's'
          }"
        />

        <!-- Rama que SALE del main (flujo bottom→top) -->
        <path
          ref="pathRef"
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
            animationDelay: index * 0.5 + 's'
          }"
        />

        <!-- MERGE (ahora hacia main, solo si no es current) -->
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

        <!-- Nodo rama -->
        <circle
          :cx="svgWidth - 20"
          :cy="height / 3 + mergeHeight"
          :r="current ? '10' : '6'"
          :fill="branchColor"
          :class="{ active: circleHovered }"
          @mouseenter="circleHovered = true"
          @mouseleave="circleHovered = false"
          @click="circleHovered = !circleHovered"
          :style="{
            animationDelay: (index * 0.5 + 0.6) + 's'
          }"
        />

        <!-- Circulo main (punto de merge) -->
        <circle
          v-if="!current"
          cx="20"
          :cy="height / 3"
          r="5"
          fill="var(--color-secondary)"
          class="main-dot"
          :style="{
            animationDelay: (index * 0.5 + 0.8) + 's'
          }"
        />
      </svg>
    </div>

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

      <ul class="responsibilities">
        <li v-for="(item, i) in responsibilities" :key="i">
          <span>{{ item }}</span>
        </li>
      </ul>
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
  align-items: flex-start;
  justify-content: center;
  min-width: 100px;
  position: relative;
}

.git-svg {
  overflow: visible;
}

.git-svg line {
  stroke-linecap: round;
}

/* ✨ Animaciones */
.branch-path,
.merge-path {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: draw-line 1s ease-out forwards;
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}

/* Círculos de main */
.main-dot {
  opacity: 0;
  animation: show-dot 0.5s ease-out forwards;
}

@keyframes show-dot {
  to {
    opacity: 1;
  }
}

/* Nodo */
.git-svg circle {
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;
}

.git-svg circle.active {
  transform: scale(1.4);
  filter: drop-shadow(0 0 5px var(--color-primary));
}
</style>
