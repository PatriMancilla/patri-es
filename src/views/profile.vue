<script setup>
    import { ref, onMounted } from "vue";
    import esData from '../data/profesional-profile-es.json'
    import enData from '../data/profesional-profile-en.json'
    import work from '../components/work.vue'
    import education from '../components/education.vue'

   
const lang = ref("es");   // idioma por defecto
const datos = ref(enData); // carga por defecto español

// función para cargar JSON según idioma
const loadData = async (language) => {
  datos.value = language === "es" ? esData : enData;
console.log(datos.value)
}

// detectar idioma navegador
const detectBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  console.log(browserLang);
  return browserLang.startsWith("es") ? "es" : "en";
};

onMounted(() => {
  const detected = detectBrowserLanguage();
  lang.value = detected;
  loadData(detected);
});

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
                    <!-- <p v-if="datos.description>{{ datos.description }}</p> -->
                    
                </div>
            </header>
            <div class="experience">
                <h4 class="section-title">{{ datos.experience.title }}</h4>
                <work v-for="(item, index) in datos.experience.items" 
                :key="index"
                :role="item.role"
                :company="item.company"
                :duration="item.duration"
                :current="item.current"
                :technologies="item.technologies"
                :responsibilities="item.responsibilities"
                />
               </div>
            <div class="education">
                <h4 class="section-title">{{ datos.education.title }}</h4>

                <education v-for="(item, index) in datos.education.items" 
                :key="index"
                :degree="item.degree"
                :institution="item.institution"
                :year="item.year"
                :current="item.current"
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