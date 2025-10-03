<script setup>
import { ref } from 'vue'

defineProps({
  title: String,
  msg: String
})

const count = ref(0)
</script>

<template>
  <div class="full-page">
    <h1>{{ title }}</h1>
    <h2>{{ msg }}</h2>
  </div>
</template>

<style scoped>
    .full-page{
        background: url('@img/background-cats.jpg') no-repeat center;
        background-size: cover;
        color: white;
    }
</style>
