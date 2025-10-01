<script setup>
import { ref } from 'vue'

defineProps({
  title: String,
  msg: String
})

const count = ref(0)
</script>

<template>
  <h1>{{ title }}</h1>
  <h2>{{ msg }}</h2>

  <!-- <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/Hello.vue</code> to test HMR
    </p>
  </div> -->

  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
