<script setup>
    import datos from '../data/profesional-profile.json'
    import work from '../components/work.vue'
    console.log(datos);
</script>

<template>
    <div class="profile-page">
        <div class="container">

            <header>
                <div class="avatar">
                    <img src="@img/icon.svg"></img>
                </div>
                <div class="title">
                    <h1>{{ datos.name }}  {{ datos.surname }}</h1>
                    <h2>{{ datos.profession }}</h2>
                    <p>{{ datos.description }}</p>
                    
                </div>
            </header>
            <div class="experience">
                <work v-for="(item, index) in datos.experience" 
                :key="index"
                :role="item.role"
                :company="item.company"
                :duration="item.duration"
                :current="item.current"
                :technologies="item.technologies"
                :responsibilities="item.responsibilities"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .profile-page{
      width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  align-items: center;
    }
</style>