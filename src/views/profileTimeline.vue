<script setup>
import { ref, onMounted } from "vue"
//import esData from "../data/profile-es.json"
//import enData from "../data/profile-en.json"
import GitTimeline from "../components/gitTimeline.vue"

const lang = ref("es")
const isDark = ref(false)
//const datos = ref(esData)
const datos = ref(null); 
const loading = ref(true); 

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



// ─── Idioma ───────────────────────────────
// const loadData = (language) => {
//   datos.value = language === "es" ? esData : enData
//   lang.value = language
//   localStorage.setItem("lang", language)
// }

const toggleLanguage = () => {
  const newLanguage = language.value === "es" ? "en" : "es"
  loadData(newLanguage)
}

// ─── Tema ─────────────────────────────────
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle("dark", isDark.value)
  localStorage.setItem("theme", isDark.value ? "dark" : "light")
}

// ─── Preferencias guardadas / navegador ───
const detectPreferences = () => {
  const savedLang = localStorage.getItem("lang")
  const savedTheme = localStorage.getItem("theme")

  const browserLang = navigator.language || navigator.userLanguage
  const detectedLang = savedLang || (browserLang.startsWith("es") ? "es" : "en")
  loadData(detectedLang)

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  isDark.value = savedTheme
    ? savedTheme === "dark"
    : prefersDark
  document.documentElement.classList.toggle("dark", isDark.value)
}

// Cargar los datos al montar el componente
onMounted(() => {
  //const detected = detectBrowserLanguage();
  const detected = detectPreferences();

  lang.value = detected;
  loadData(detected);
});

// onMounted(() => {
//   detectPreferences()
// })

</script>

<template>
  <div class="profile-page"  v-if="!loading">
    <!-- Header superior con botones -->
    <header class="top-header">
      <div class="controls">
        <button class="lang-toggle" @click="toggleLanguage">
          <span v-if="lang === 'es'">ES</span>
          <span v-else>EN</span>
        </button>
        <button class="theme-toggle" @click="toggleTheme">
          <svg
            v-if="isDark"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 4.354a8 8 0 0 0 0 15.292V4.354zM13 2a10 10 0 1 1-7.071 17.071A9.993 9.993 0 0 1 13 2z"
            />
          </svg>
           <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 48 48"
    fill="currentColor"
    aria-label="Light mode"
  >
  <path d="M24,10a2,2,0,0,0,2-2V4a2,2,0,0,0-4,0V8A2,2,0,0,0,24,10Z"></path>
  <path d="M24,38a2,2,0,0,0-2,2v4a2,2,0,0,0,4,0V40A2,2,0,0,0,24,38Z"></path>
  <path d="M36.7,14.1l2.9-2.8a2.3,2.3,0,0,0,0-2.9,2.3,2.3,0,0,0-2.9,0l-2.8,2.9a2,2,0,1,0,2.8,2.8Z"></path>
  <path d="M11.3,33.9,8.4,36.7a2.3,2.3,0,0,0,0,2.9,2.3,2.3,0,0,0,2.9,0l2.8-2.9a2,2,0,1,0-2.8-2.8Z"></path>
  <path d="M44,22H40a2,2,0,0,0,0,4h4a2,2,0,0,0,0-4Z"></path>
  <path d="M10,24a2,2,0,0,0-2-2H4a2,2,0,0,0,0,4H8A2,2,0,0,0,10,24Z"></path>
  <path d="M36.7,33.9a2,2,0,1,0-2.8,2.8l2.8,2.9a2.1,2.1,0,1,0,2.9-2.9Z"></path>
  <path d="M11.3,14.1a2,2,0,0,0,2.8-2.8L11.3,8.4a2.3,2.3,0,0,0-2.9,0,2.3,2.3,0,0,0,0,2.9Z"></path>
  <path d="M24,14A10,10,0,1,0,34,24,10,10,0,0,0,24,14Z"></path>
</svg>
        </button>
      </div>
    </header>

    <!-- Bloque principal: avatar + títulos + timeline -->
    <div class="profile-head">
      <div class="avatar-block">
        <img src="@img/icon.svg" alt="avatar" />
        
        <!-- círculo principal de la línea 
        <div class="main-node"></div>
        -->
      </div>

      <div class="title-block">
        <h1>{{ datos.name }} {{ datos.surname }}</h1>
        <h2>{{ datos.profession }}</h2>
      </div>
    </div>

    <!-- Timeline -->
    <main class="timeline-area">
      <GitTimeline
        :experience="datos.experience.items"
        :educationItems="datos.education.items"
      />
    </main>
  </div>
  <div class="profile-page"  v-else>
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

</template>

<style scoped>
/* header superior */
.top-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--color-bg);
}

/* botones */
.controls {
  display: flex;
  gap: 0.8rem;
}

.lang-toggle,
.theme-toggle {
  background: var(--color-secondary-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 50px;
  padding: 0.4rem 0.9rem;
  cursor: pointer;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.lang-toggle:hover,
.theme-toggle:hover {
  background: var(--color-primary-bg);
  color: var(--color-primary-text);
}

/* bloque principal */
.profile-head {
  display: grid;
  grid-template-columns: 133px 1fr;
  align-items: start;
  margin: 2rem 0 0;
  position: relative;
  column-gap: 6rem;
}


.avatar-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.avatar-block img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 0.3rem;
}

/* círculo principal debajo del avatar */
.main-node {
  width: 18px;
  height: 18px;
  background-color: var(--color-secondary);
  border-radius: 50%;
}

/* títulos */
.title-block {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 0.8rem;
}

.title-block h1 {
  font-size: 1.8rem;
  margin: 0;
  color: var(--color-primary);
}

.title-block h2 {
  font-size: 1.2rem;
  margin: 0.3rem 0 0 0;
  color: var(--color-secondary);
}

.snippet{
  display: block;
  width: 80px;
  height: 80px;

}

/* timeline */
/* .timeline-area {
  padding: 0 3rem 4rem;
} */
</style>
