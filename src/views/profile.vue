<script setup>
    import datos from '../data/profesional-profile.json'
    
    console.log(datos);
</script>
<template>
    <div class="profile-page">
        <header>
            <h1>{{ datos.name }}</h1>
            <h2>{{ datos.profession }}</h2>
            <p>{{ datos.description }}</p>
        </header>
    </div>
</template>

<style scoped>
    .profile-page{
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