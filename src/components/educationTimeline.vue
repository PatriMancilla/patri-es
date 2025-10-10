<script setup>
import { ref, onMounted, nextTick, computed  } from "vue"

const props = defineProps({
  degree: String,
  institution: String,
  year: String,
  current: Boolean,
  branchColor: { type: String, default: "var(--color-primary)" },
  index: Number,
  mainY: Number,          // Y in px relative to timeline top where title is
  mainBottomY: Number,    // bottom Y near child bottom
  mainIndex: Number,
  totalItems: Number,
  lineHeight: Number
})
const ITEM_SVG_W = 120
const nodeX = ITEM_SVG_W - 20
const cornerR = 12

const itemRef = ref(null)
const height = ref(140)
const drawn = ref(false)

// compute the delay so branch draws when main reaches its Y position
const mainDelay = computed(() => {
  // guard rails
  const total = Math.max(props.lineHeight || 600, 1)
  const baseDuration = 1.2 + (Math.max(props.totalItems - 1, 0) * 0.35) // same base in parent
  // if mainY is available: relative position (0..1)
  if (props.mainY && total) {
    const t = Math.min(Math.max(props.mainY / total, 0), 1)
    return t * baseDuration
  }
  // fallback: spread by index
  return (props.mainIndex || 0) * 0.12
})

onMounted(async () => {
  await nextTick()
  if (itemRef.value) {
    height.value = Math.max(itemRef.value.offsetHeight, 120)
  }
  // start drawing after small timeout aligned with mainDelay
  requestAnimationFrame(() => {
    // give Vue a tick to allow parent animation to start
    setTimeout(() => (drawn.value = true), Math.max(50, mainDelay.value * 1000))
  })
})
</script>

<template>
  <div class="item"  ref="itemRef">
    <svg
      class="branch-svg"
      xmlns="http://www.w3.org/2000/svg"
      :width="ITEM_SVG_W"
      :height="height"
      :viewBox="`0 0 ${ITEM_SVG_W} ${height}`"
    >
      <!-- Main-origin top/bottom positions (in local svg coords we use props.mainY relative to timeline;
           but the child svg's origin is local – we already rely on positioning via CSS grid alignment,
           so we draw paths relative to the child's height. We'll use two reference Ys inside SVG:
             yTop = height * 0.25   (approx where title is)
             yBottom = height * 0.85 (approx bottom)
           However, mainY from parent was passed so we aligned delays. -->
      <!-- Branch: rectangular U-shape: starts at main (left), goes right, up to node (title), and optionally returns down to main -->
      <!-- Path for branch: start at left main (20, yTop) -> horizontal to nodeX-cornerR -> arc up to nodeY -> vertical small -> circle node -->
      <!-- We'll implement simpler: horizontal from main at yTop to nodeX, small arc for roundness -->
      <path
        :d="`
          M20,${height * 0.25}
          H${nodeX - cornerR}
          a${cornerR},${cornerR} 0 0 1 ${cornerR},${cornerR}
          V${height * 0.5}
        `"
        :stroke="branchColor"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
        :style="{
          strokeDasharray: 300,
          strokeDashoffset: drawn ? 0 : 300,
          transition: 'stroke-dashoffset 0.9s ease-out'
        }"
      />

      <!-- Merge path (back to main) - only if not current (closed) -->
      <path
        v-if="!current"
        :d="`
          M${nodeX},${height * 0.5}
          V${height * 0.8}
          a${cornerR},${cornerR} 0 0 1 -${cornerR},${cornerR}
          H20
        `"
        :stroke="branchColor"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
        :style="{
          strokeDasharray: 300,
          strokeDashoffset: drawn ? 0 : 300,
          transition: 'stroke-dashoffset 0.9s ease-out 0.15s'
        }"
      />

      <!-- main dot (start) -->
      <circle cx="20" :cy="height * 0.25" r="7" :fill="branchColor" />

      <!-- merge dot -->
      <circle v-if="!current" cx="20" :cy="height * 0.8" r="6" :fill="branchColor" />

      <!-- node circle on branch -->
      <circle :cx="nodeX" :cy="height * 0.5" :r="current ? 10 : 6" :fill="branchColor" />
    </svg>

    <!-- Contenido -->
    <div class="content">
      <div class="header">
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
