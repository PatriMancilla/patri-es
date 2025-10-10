<script setup>
import { ref, onMounted, nextTick } from "vue"

const props = defineProps({
  degree: String,
  institution: String,
  year: String,
  current: Boolean,
  branchColor: {
    type: String,
    default: "var(--color-primary)",
  },
  index: Number,
  isFirst: Boolean,
  isLast: Boolean,
})

const container = ref(null)
const visible = ref(false)
const height = ref(100)

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
  if (container.value) observer.observe(container.value)
})
</script>

<template>
  <div class="item" ref="container">
    <div class="git-area">
      <!-- :class="[
      'education-item', 
      { 'mt-2': isFirst, 'mb-1': isLast } -->
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

        <!-- Rama hacia el título (bottom→top) -->
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

        <!-- Merge a main (si no es current) -->
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

        <!-- Nodo rama -->
        <circle
          :cx="svgWidth - 20"
          :cy="height / 3 + mergeHeight"
          :r="current ? '10' : '6'"
          :fill="branchColor"
          class="edu-node"
        />
      </svg>
    </div>

    <!-- Contenido -->
    <div :class="[
      'education-item', 
      { 'mt-2': isFirst, 'mb-1': isLast }
    ]"
     >
      <div class="item-title">
        <h3>{{ degree }}</h3>
        <h5>{{ year }}</h5>
      </div>
      <p class="institution">{{ institution }}</p>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: grid;
  grid-template-columns: minmax(100px, 20%) 1fr;
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

/* Animaciones coherentes con work.vue */
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

.edu-node {
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;
}

.edu-node:hover {
  transform: scale(1.3);
  filter: drop-shadow(0 0 4px var(--color-primary));
}

.education-item {
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

.institution {
  margin: 0.5em 0 0 0;
  opacity: 0.9;
  font-style: italic;
}
</style>
