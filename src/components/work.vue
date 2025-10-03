<script setup>
defineProps({
    role: String,
    company: String,
    duration: String,
    current: Boolean,
    technologies: Array,
    responsibilities: Array
})

</script>
<template>
    <div class="">

    </div>
    <div class="work-item">
        <div class="work-title">
            <h3>{{ role }} - {{ company }}</h3>
            <div class="work-sutbitle">
                <h5>{{ duration }}</h5>
                <h4>{{ descripcion }}</h4>
            </div>
            <p class="technologies">
                <span v-for="(item, i) in technologies" :key="i">
                {{ item }}<span class="dark" v-if="i < technologies.length - 1">&nbsp; &bull; &nbsp;</span>
                </span>
            </p>
            <ul class="responsibilities">
                <li v-for="(item, i) in responsibilities" :key="i">
                    <span>{{ item }}</span>
                </li>
            </ul>
        </div>
        
    </div>

</template>
<style scoped>
    .work-item{
        justify-content: baseline;
        align-items: start;
        text-align: left;
        padding-top: 1.5em;
        /* 
        box-sizing: content-box;
        text-align: left;
             */
    }
</style>