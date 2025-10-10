<script setup>
import work from "../components/workTimeline.vue"
import education from "../components/educationTimeline.vue"

const props = defineProps({
  experience: Array,
  educationItems: Array,
})

const branchColors = ["#00BFA6", "#FF7B00", "#004CFF", "#FF0059"]
</script>

<template>
  <div class="timeline">
    <!-- línea principal continua -->
    <!-- <svg class="main-line" xmlns="http://www.w3.org/2000/svg">
      <line
        x1="20"
        y1="0"
        x2="20"
        y2="4000"
        stroke="var(--color-secondary)"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg> -->

    <!-- experiencia -->
    <div class="timeline-section">
      <h4 class="timeline-title">Experiencia</h4>
      <work
        v-for="(item, index) in experience"
        :key="index"
        :role="item.role"
        :company="item.company"
        :duration="item.duration"
        :current="item.current"
        :technologies="item.technologies"
        :responsibilities="item.responsibilities"
        :branchColor="branchColors[index % branchColors.length]"
        :index="index"
        :is-first="index === 0"
        :is-last="index === experience.length - 1"
      />
    </div>

    <!-- educación -->
    <div class="timeline-section">
      <h4 class="timeline-title">Formación</h4>
      <education
        v-for="(item, index) in educationItems"
        :key="'edu-' + index"
        :degree="item.degree"
        :institution="item.institution"
        :year="item.year"
        :current="item.current"
        :branchColor="branchColors[(index + 2) % branchColors.length]"
        :index="experience.length + index"
        :is-first="index === 0"
        :is-last="index === educationItems.length - 1"
      />
    </div>
  </div>
</template>

<style scoped>
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  /* gap: 3rem; */
  overflow: visible;
}

/* línea principal */
.main-line {
  position: absolute;
  /* left: 40px; */
  top: 0;
  width: 40px;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.timeline-section {
  position: relative;
  /* padding-left: 80px; */
  z-index: 1;
}

.timeline-title {
  font-weight: bold;
  color: var(--color-primary);
  /* margin-bottom: 1rem;
  position: relative; */
  padding-left: 7rem;
  margin-bottom: -1rem;
}

/* .timeline-title::before {
  content: "";
  position: absolute;
  left: -60px;
  top: 0.5em;
  width: 10px;
  height: 10px;
  background: var(--color-primary);
  border-radius: 50%;
} */
</style>
