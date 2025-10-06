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
        <div class="item-title">
            <h3>{{ role }} - {{ company }}</h3>
            <h5>{{ duration }}</h5>
            <!-- <h4>{{ descripcion }}</h4> -->
        </div>
        <!-- <div class="item-subtitle">
                
        </div> -->
                <div class="technologies">
                    <span v-for="(item, i) in technologies" :key="i">
                        {{ item }}<span class="dark" v-if="i < technologies.length - 1">&nbsp; &bull; &nbsp;</span>
                    </span>
                </div>
            <ul class="responsibilities">
                <li v-for="(item, i) in responsibilities" :key="i">
                    <span>{{ item }}</span>
                </li>
            </ul>
            
        </div>

</template>
<style scoped>
    .work-item{
        /* justify-content: baseline;
        align-items: start;
        text-align: left; */
        padding-top: .5em;
        padding-bottom: .5em;
        /* 
        box-sizing: content-box;
        text-align: left;
             */
    }
    .item-title{
        display: flex;
        justify-content: space-between;
    }
    h5{
        margin: 0;
        line-height: 3;
        margin-left: 5px;
    }
</style>