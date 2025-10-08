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
})

const circleHovered = ref(false)
const visible = ref(false)
const pathRef = ref(null)
const container = ref(null)
const height = ref(120)

onMounted(async () => {
  await nextTick()
  if (container.value) {
    height.value = container.value.offsetHeight + 20
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.4 }
  )
  if (pathRef.value) observer.observe(pathRef.value)
})
</script>

<template>
  <div class="item" ref="container">
    <div class="git-area">
      <svg
        class="git-svg"
        :width="120"
        :height="height"
        :viewBox="`0 0 120 ${height}`"
        xmlns="http://www.w3.org/2000/svg"
      >
       
         
        <!-- Merge (solo si no es current) -->

        <path
          ref="pathRef"
          :d="`M 20,${height / 6} 
          C50,${height / 6}, 
          100,${height / 6}, 
          100,${height / 3}`"
          
          :stroke="current ? 'var(--color-primary)' : 'var(--color-secondary)'"
          stroke-width="4"
          fill="none"
          stroke-linecap="round"
          
        
        :style="{
            strokeDasharray: visible ? 'none' : '140',
            strokeDashoffset: visible ? '0' : '140',
            transition: 'stroke-dashoffset 1s ease-out 0.3s'
          }"
        />


        <path
     id="rect1"
     style="display:inline;
     fill:none;stroke:#0000aa;
     stroke-width:4;stroke-linecap:round;
     stroke-linejoin:round"
     d="m 99.613383,
     82.750929 0.519637,
     133.026431 c 0,
     0 -0.826094,
     12.82157 -7.389524,
     19.36019 -6.563426,
     6.53862 -21.237306,
     7.27341 -21.237306,
     7.27341 l -52.457863,
     -0.40353" />

        <!-- Nodo ook! este circulo es más grande si es current! hay que arreglar la animación solo-->
        <circle
          cx="100"
          :cy="height / 3"
          :r="current ? '10' : '6'" 
          fill="var(--color-secondary)"
          :class="{ active: circleHovered }"
          @mouseenter="circleHovered = true"
          @mouseleave="circleHovered = false"
          @click="circleHovered = !circleHovered"
        />

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

.git-svg line,
.git-svg path {
  stroke-linecap: round;
  transition: stroke-dashoffset 1s ease-out;
}

/* Nodo */
.git-svg circle {
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;
}

.git-svg circle.active {
  transform: scale(1.4);
  filter: drop-shadow(0 0 5px var(--primary));
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
  line-height: 3;
  margin-left: 5px;
}
</style>