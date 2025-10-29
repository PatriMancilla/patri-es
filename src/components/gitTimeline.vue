<script setup>
import { ref, onMounted, nextTick } from "vue"
//import work from "../components/itemTimeline.vue"
import work from "../components/workTimeline.vue"
import education from "../components/educationTimeline.vue"

const props = defineProps({
  experience: Array,
  educationItems: Array,
  // opcional: offset horizontal para alineado, deja 3rem por defecto
  mainLeftRem: { type: Number, default: 3 }
})

const timelineRef = ref(null)
const lineHeight = ref(0)
const itemPositions = ref([])   // { index, type, mainY, el }
const branchColors = ["#00BFA6", "#FF7B00", "#004CFF", "#FF0059"]

// Duración base del dibujo de la main (segundos)
const minMainDuration = 0.8
const perItemExtra = 0.35

onMounted(async () => {
  await nextTick()
  const el = timelineRef.value
  if (!el) return

  // recalcular después de render (pequeño timeout para que se estabilice)
  requestAnimationFrame(() => {
    lineHeight.value = el.scrollHeight || el.clientHeight || 2000

    // seleccionar en orden los elementos visibles (work-item y education-item)
    const workEls = Array.from(el.querySelectorAll(".work-item"))
    const eduEls = Array.from(el.querySelectorAll(".education-item"))

    // construimos la lista en el orden DOM (work section first then education)
    const items = [...workEls, ...eduEls]

    // calcular posición Y de la "unión" (toma el h3 dentro del bloque si existe)
    itemPositions.value = items.map((childEl, i) => {
      const title = childEl.querySelector(".header h3") || childEl.querySelector("h3") || childEl.querySelector("h4")
      const titleRect = title ? (title.offsetTop + title.offsetHeight / 2) : (childEl.offsetTop + childEl.offsetHeight * 0.25)
      // mainY relative to timeline top: childEl.offsetTop + titleRect (titleRect is relative to childEl)
      const mainY = childEl.offsetTop + (title ? (title.offsetTop + title.offsetHeight / 2) : (childEl.offsetHeight * 0.25))
      return {
        index: i,
        el: childEl,
        mainY,
        // bottom point (where branch starts below): near bottom of child
        mainBottomY: childEl.offsetTop + childEl.offsetHeight - 10
      }
    })
  })
})
</script>

<template>
  <div class="timeline-wrapper" ref="timelineRef">
    <!-- SVG main-line (absolute) -->
    <svg
      class="main-line"
      xmlns="http://www.w3.org/2000/svg"
      :style="{ left: (mainLeftRem * 16) + 'px' }" 
      :height="lineHeight"
      width="40"
      preserveAspectRatio="none"
    >
     <!-- convert rem (mainLeftRem) to px (approx 16px) -->
      <!-- main path (we'll animate via stroke-dashoffset in CSS) -->
      <line
        class="main-path"
        x1="20"
        y1="0"
        x2="20"
        :y2="lineHeight"
        stroke="var(--color-secondary)"
        stroke-width="4"
        stroke-linecap="round"
      />
      <!-- HEAD -->
      <circle cx="20" cy="10" r="9" fill="var(--color-secondary)" />
    </svg>

    <!-- EXPERIENCE -->
    <section class="timeline-section">
      <h4 class="timeline-title">{{ /* titles can come from parent JSON if needed */ "Experiencia" }}</h4>

      <work
        v-for="(item, i) in experience"
        :key="i"
        class="work-item"
        :role="item.role"
        :company="item.company"
        :duration="item.duration"
        :current="item.current"
        :technologies="item.technologies"
        :responsibilities="item.responsibilities"
        :branchColor="branchColors[i % branchColors.length]"
        :index="i"
        :mainY="itemPositions[i] ? itemPositions[i].mainY : null"
        :mainBottomY="itemPositions[i] ? itemPositions[i].mainBottomY : null"
        :mainIndex="i"
        :totalItems="(experience.length + educationItems.length)"
        :lineHeight="lineHeight"
      />
    </section>

    <!-- EDUCATION -->
    <section class="timeline-section">
      <h4 class="timeline-title">{{ "Formación" }}</h4>

      <education
        v-for="(item, i) in educationItems"
        :key="i"
        class="education-item"
        :degree="item.degree"
        :institution="item.institution"
        :year="item.year"
        :current="item.current"
        :branchColor="branchColors[(i + experience.length) % branchColors.length]"
        :index="i + experience.length"
        :mainY="itemPositions[experience.length + i] ? itemPositions[experience.length + i].mainY : null"
        :mainBottomY="itemPositions[experience.length + i] ? itemPositions[experience.length + i].mainBottomY : null"
        :mainIndex="i + experience.length"
        :totalItems="(experience.length + educationItems.length)"
        :lineHeight="lineHeight"
      />
    </section>
  </div>
</template>

<style scoped>
.timeline-wrapper {
  position: relative;
  padding-left: 3rem; /* espacio para la main-line */
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  overflow: visible;
}

/* main-line absolute (left adjusted via inline style computed from rem) */
.main-line {
  position: absolute;
  top: 0;
  z-index: 0;
  pointer-events: none;
}

/* animate the main path on mount.
   We'll set stroke-dasharray at runtime using CSS (large value) and animate from offset = length to 0.
   The timing will be controlled per-child by computing delays in the child using mainIndex / lineHeight.
*/
.main-path {
  stroke-dasharray: 4000;      /* large so it covers most heights; will be visually fine */
  stroke-dashoffset: 4000;
  animation: drawMain 1.2s ease-out forwards;
}

/* animate time will be overridden in JS if needed via inline styles on .main-path (if you want) */
@keyframes drawMain {
  to { stroke-dashoffset: 0; }
}

/* sections */
.timeline-section {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0rem;
}

.timeline-title {
    margin: 1rem 0 0 2rem;
  /* margin: 1rem 2rem 0 0; */
  color: var(--color-primary);
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
}
</style>
