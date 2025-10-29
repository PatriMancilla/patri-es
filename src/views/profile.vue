<script setup>
import { ref, onMounted } from "vue";
// import esData from '../data/profesional-profile-es.json'
// import enData from '../data/profesional-profile-en.json'
import work from '../components/work.vue'
import education from '../components/education.vue'



const lang = ref('es'); // Idioma por defecto
const datos = ref(null); // Datos iniciales vacíos
const loading = ref(true); // Estado de carga
console.log(loading);
// Función para cargar datos según el idioma
const loadData = async (language) => {
  try {
    const startUrl = import.meta.env.MODE === 'development'
    ? 'http://localhost:7071'
    : `${window.location.origin}`;
    const apiUrl = `${startUrl}/api/httpData?id=${language === 'es' ? 1 : 2}`;

    const response = await fetch(apiUrl);
      //console.log(apiUrl);
    if (response.ok) {
      const data = await response.json();
      datos.value = data;
      //console.log(loading);
    } else {
      console.error('Error al cargar los datos:', response.statusText);
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  } finally {
    loading.value = false; // Finaliza el estado de carga
    //console.log(loading);
  }
};

// Detectar el idioma del navegador
const detectBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('es') ? 'es' : 'en';
};

// Cargar los datos al montar el componente
onMounted(() => {
  const detected = detectBrowserLanguage();
  lang.value = detected;
  loadData(detected);
});

// const lang = ref("es");   // idioma por defecto
// const datos = ref(enData); // carga por defecto español

// // función para cargar JSON según idioma
// const loadData = async (language) => {
//   datos.value = language === "es" ? esData : enData;
//   console.log(datos.value)
// }

// // detectar idioma navegador
// const detectBrowserLanguage = () => {
//   const browserLang = navigator.language || navigator.userLanguage;
//   console.log(browserLang);
//   return browserLang.startsWith("es") ? "es" : "en";
// };

// onMounted(() => {
//   const detected = detectBrowserLanguage();
//   lang.value = detected;
//   loadData(detected);
// });

</script>

<template>
  <div class="profile-page">
    <div class="snippet">
      <div class="small">

<!-- 
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
    <stop offset="0" stop-color="#00ABAB"></stop>
    <stop offset=".3" stop-color="#00ABAB" stop-opacity=".9"></stop>
    <stop offset=".6" stop-color="#00ABAB" stop-opacity=".6"></stop>
    <stop offset=".8" stop-color="#00ABAB" stop-opacity=".3"></stop>
    <stop offset="1" stop-color="#00ABAB" stop-opacity="0"></stop>
  </radialGradient>
  <circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite">
  </animateTransform>
</circle>
  <circle transform-origin="center" fill="none" opacity=".2" stroke="#00ABAB" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70">
    </circle>
  </svg> -->
</div>



  </div>
    <div class="container" v-if="!loading">

      <header>
        <div class="avatar">
          <img src="@img/icon.svg"></img>
        </div>
        <div class="title">
          <h1>{{ datos.name }} {{ datos.surname }}</h1>
          <h2>{{ datos.profession }}</h2>
        </div>
      </header>

      <div class="experience">
        <h4 class="section-title">{{ datos.experience.title }}</h4>
        <work
          v-for="(item, index) in datos.experience.items"
          :key="index"
          :role="item.role"
          :company="item.company"
          :duration="item.duration"
          :current="item.current"
          :technologies="item.technologies"
          :responsibilities="item.responsibilities"
          :branchColor="['#00BFA6', '#FF7B00', '#004CFF', '#FF0059'][index % 4]"
          :index="index"
        />
      </div>

      <div class="education">
        <h4 class="section-title">{{ datos.education.title }}</h4>

        <education v-for="(item, index) in datos.education.items" :key="index" :degree="item.degree"
          :institution="item.institution" :year="item.year" :current="item.current" />

      </div>

    </div>
    <div class="container" v-else>
      <div class="snippet">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient id="a12" cx=".6" fx=".6" cy=".325" fy=".325" gradientTransform="scale(1.5)">
            <stop offset="0" stop-color="#00ABAB"></stop>
            <stop offset=".3" stop-color="#00ABAB" stop-opacity=".8"></stop>
            <!-- <stop offset=".5" stop-color="#00ABAB" stop-opacity=".5"></stop> -->
            <stop offset=".8" stop-color="#00ABAB" stop-opacity=".3"></stop>
            <stop offset="1" stop-color="#00ABAB" stop-opacity="0"></stop>
            <stop offset="0" stop-color="#00ABAB" stop-opacity="0"></stop>
          </radialGradient>
          <circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" 
          stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70">
            <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="4" values="360;0" 
            keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite">
          </animateTransform>
        </circle>
        <circle transform-origin="center" fill="none" opacity=".1" stroke="#00ABAB" 
          stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70">
          </circle>
        </svg>
  
      </div>      
    </div>

  </div>

</template>
<!-- <div class="contact-info">
      <div class="mail">
        <span>&#9993;</span>
        
        <span><a :href="'mailto:' + datos.contactInformation[0].email" >{{ datos.contactInformation[0].email }}</a></span>
      </div>
      <div class="phone">
        <span>&#9742;</span>
        
        <span><a :href="'tel:' +  datos.contactInformation[0].phone"  >{{ datos.contactInformation[0].phone }}</a></span>
        </div>
      <div class="website">
        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 0C5.243 0 3 2.243 3 5c0 4 5 11 5 11s5-7 5-11c0-2.757-2.243-5-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
  </svg></span>
        
        <span><a href="https://www.patri.es">patri.es</a></span>
      </div>
              
    </div> -->

<style scoped>
.profile-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.snippet{
  display: block;
  width: 80px;
  height: 80px;

}


</style>