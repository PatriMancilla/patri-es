<script setup>
defineProps({
  role: String,
  descripcion: String,
  duration: String,
  current: Boolean,
  responsabilities: Array,
    technologies: Array
})
</script>
<template>
    <div class="work-item">
        <div class="work-title">
            <h3>{{ role }}</h3>
            <div class="work-sutbitle">
                <h5>{{ duration }}</h5>
                <h4>{{ descripcion }}</h4>
            </div>
            <ul class="tecnologies">
                {{ technologies }}
            </ul>
            <p>{{ responsabilities }}</p>
        </div>
        
    </div>
</template>
<style scoped>
    .work-item{
        justify-content:first baseline;
        align-items: start;
        text-align: left;
        padding-left: 1em;
        /* 
        box-sizing: content-box;
        text-align: left;
             */
    }
</style>