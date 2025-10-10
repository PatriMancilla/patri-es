<script setup>
//import { ref } from "vue"
import { ref, onMounted } from "vue"
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
<div class="controls">
    <button class="lang-toggle" @click="toggleLanguage">
        <span v-if="lang === 'es'">🇪🇸 ES</span>
        <span v-else>🇬🇧 EN</span>
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
        fill="currentColor"
        viewBox="0 0 24 24"
        >
        <path
            d="M12 2a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm6.364 3.636a1 1 0 0 1 1.414 1.414l-1.414 1.414a1 1 0 0 1-1.414-1.414l1.414-1.414zM21 11a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2h2zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm8.364 4.364a1 1 0 0 1-1.414-1.414l1.414-1.414a1 1 0 1 1 1.414 1.414l-1.414 1.414zM12 19a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z"
        />
        </svg>
    </button>
    </div>
</template>
<style scoped>
/* botones */
.controls {
  display: flex;
  gap: 0.8rem;
  justify-content: end;
  margin-top: 1em;
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
</style>