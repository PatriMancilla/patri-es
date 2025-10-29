<script setup>
import { ref, onMounted, nextTick, computed } from "vue"

const props = defineProps({
  role: String,
  company: String,
  duration: String,
  current: Boolean,
  technologies: Array,
  responsibilities: Array,
  branchColor: { type: String, default: "var(--color-primary)" },
  mainY: Number,
  mainIndex: Number,
  totalItems: Number,
  lineHeight: Number,
})

const ITEM_SVG_W = 120
const nodeX = ITEM_SVG_W - 20
const cornerR = 12

const itemRef = ref(null)
const height = ref(0)
const drawn = ref(false)

const mainDelay = computed(() => {
  const total = Math.max(props.lineHeight || 600, 1)
  const baseDuration = 1.2 + Math.max(props.totalItems - 1, 0) * 0.35
  if (props.mainY && total) {
    const t = Math.min(Math.max(props.mainY / total, 0), 1)
    return t * baseDuration
  }
  return (props.mainIndex || 0) * 0.12
})

onMounted(async () => {
  await nextTick()
  if (itemRef.value) height.value = Math.max(itemRef.value.offsetHeight, 120)
  requestAnimationFrame(() => {
    setTimeout(() => (drawn.value = true), Math.max(50, mainDelay.value * 1000))
  })
})
</script>

<template>
  <div class="work-item" ref="itemRef">
    <svg
      class="branch-svg"
      xmlns="http://www.w3.org/2000/svg"
      :width="ITEM_SVG_W"
      :height="height"
      :viewBox="`0 0 ${ITEM_SVG_W} ${height}`"
    >
      <!-- Rama rectangular invertida (main abajo -> merge arriba) -->
      <path
        :d="`
          M20,${height * 0.8}
          H${nodeX - cornerR}
          a${cornerR},${cornerR} 0 0 0 ${cornerR},-${cornerR}
          V${height * 0.3}
          a${cornerR},${cornerR} 0 0 0 -${cornerR},-${cornerR}
          H20
        `"
        :stroke="branchColor"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
        :style="{
          strokeDasharray: 300,
          strokeDashoffset: drawn ? 0 : 300,
          transition: 'stroke-dashoffset 1.2s ease-out'
        }"
      />

      <!-- Dots -->
      <circle
        class="main-dot"
        cx="20"
        :cy="height * 0.8"
        r="7"
        :fill="branchColor"
      />
      <circle
        class="merge-dot"
        cx="20"
        :cy="height * 0.3"
        r="6"
        :fill="branchColor"
      />
      <circle
        :cx="nodeX"
        :cy="height * 0.3"
        :r="current ? 10 : 7"
        :fill="branchColor"
      />

      <!-- Dots extra para múltiples tareas -->
      <circle
        v-for="(taskBlock, i) in (responsibilities?.[0]?.task || []).slice(1)"
        :key="'extra-' + i"
        cx="20"
        :cy="height * (0.4 + i * 0.12)"
        r="4"
        :fill="branchColor"
        opacity="0.7"
      />
    </svg>

    <div class="content">
      <div class="header">
        <h3>{{ role }}</h3>
        <h4>{{ company }}</h4>
        <span class="duration">{{ duration }}</span>
      </div>

      <div class="technologies">
        <span v-for="(tech, i) in technologies" :key="i">
          {{ tech }}
          <span v-if="i < technologies.length - 1" class="dot">•</span>
        </span>
      </div>

      <div class="responsibilities">
        <template
          v-for="(taskBlock, i) in (responsibilities && responsibilities[0]?.task ? responsibilities[0].task : [])"
          :key="i"
        >
          <ul v-if="taskBlock.type === 'list'">
            <li v-for="(desc, j) in taskBlock.description" :key="j" v-html="desc" />
          </ul>
          <p v-else-if="taskBlock.type === 'paragraph'" v-html="taskBlock.description"></p>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.work-item {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 2rem;
  align-items: start;
  position: relative;
  overflow: visible;
  margin-bottom: .2rem; /* menos espacio vertical */
}

.branch-svg {
  overflow: visible;
}

.content {
  padding: 0.6rem 0 1.2rem 0; /* menos separación, subimos el bloque */
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

h3 {
  margin: 0;
  font-weight: 600;
  color: var(--color-primary-text);
}

h4 {
  margin: 0;
  color: var(--color-secondary);
  font-weight: 500;
}

.duration {
  opacity: 0.8;
  font-size: 0.9rem;
}

.technologies {
  margin-top: 0.4rem;
  font-size: 0.9rem;
}

.dot {
  margin: 0 0.4rem;
  opacity: 0.6;
}

.responsibilities {
  margin-top: 0.6rem;
  line-height: 1.4;
}

svg circle {
  transition: transform 0.18s ease;
}
</style>
