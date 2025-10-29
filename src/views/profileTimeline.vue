<script setup>
import { ref, onMounted } from "vue"
import esData from "../data/profile-es.json"
import enData from "../data/profile-en.json"
import GitTimeline from "../components/gitTimeline.vue"

const datos = ref(esData)
const lang = ref("es")
const isDark = ref(false)

// ─── Idioma ───────────────────────────────
const loadData = (language) => {
  datos.value = language === "es" ? esData : enData
  lang.value = language
  localStorage.setItem("lang", language)
}

const toggleLanguage = () => {
  const newLang = lang.value === "es" ? "en" : "es"
  loadData(newLang)
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

onMounted(() => {
  detectPreferences()
})
</script>

<template>
  <div class="profile-page">
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

/* timeline */
/* .timeline-area {
  padding: 0 3rem 4rem;
} */
</style>
