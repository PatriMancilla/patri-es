<script setup>
defineProps({
    degree: String,
    institution: String,
    year: String,
    current: Boolean
})

</script>
<template>
    <div class="">

    </div>
    <div class="education-item">
        <div class="item-title">
            <div class="item-subtitle">
                <!-- <h4>{{ year }}  -  {{ institution }}</h4>  -->
                <h4> {{ institution }}</h4> 
                <h5>{{ year }}</h5>
            </div>
            <h3>{{ degree }} </h3>
        </div>
    </div>

</template>
<style scoped>
    .education-item{
        margin-top: 1em;
        justify-content: baseline;
        align-items: start;
        text-align: left;
        padding: .5em;
        background-color: var(--color-secondary-bg);
        border-radius: var(--border-radius);
        /* 
        box-sizing: content-box;
        text-align: left;
             */
    }
    h3{
        color: var(--color-text);
        /* background-color: var(--color-secondary-bg);
        color: var(--color-ternary);
        padding: .5em;
        border-radius: var(--border-radius); */

    }
    .item-subtitle{
        display: flex;
        justify-content: space-between;
    }
    h4{
        color: var(--color-secondary);
    }
    h5{
        margin: auto 0;
    }
</style>