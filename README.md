# Curriculum Flow - Vue 3 + Vite

<div align="center">

![Curriculum Flow](/public/screenshotFlow.png) 
</div><!-- optional, if you have a screenshot -->

## Description

**Curriculum Flow** is an interactive web application built with **Vue 3** and **Vite**, designed to showcase a professional resume dynamically, simulating **Git branch flows**. Each work entry is represented as a branch off the main branch, allowing users to explore professional history visually and gamified.

The backend consists of a simple **API built with Azure Functions**, serving educational and work experience data.

---

## Technologies Used

- **Frontend:**
  - [Vue 3](https://v3.vuejs.org/)
  - [Vite](https://vitejs.dev/)
- **Backend:**
  - [Azure Functions](https://learn.microsoft.com/azure/azure-functions/)
- **Styling & Components:**
  - CSS / Tailwind (as applicable)
- **Data Management:**
  - JSON served via Azure Functions

---

## Project Structure

```
src/
│
├─ views/
│   └─ profile.vue       # Main profile view
│
├─ components/
│   ├─ education.vue     # Education component
│   └─ work.vue          # Work experience component
│
├─ assets/               # Images and styles
└─ api/                  # Azure Functions backend
```
---

## Features

- Display work experience and education as Git-style branches.
- Each "branch" shows details of an item (work or education).
- Intuitive navigation between resume branches.
- Data dynamically served via **Azure Functions API**.

---

## Installation & Running

### Requirements

- Node.js v18+
- npm or yarn
- Azure Functions Core Tools (optional, for backend development)

### Clone the repository

```bash
git clone https://github.com/patriMancilla/curriculum-flow.git
cd curriculum-flow
```

### Install dependencies

```bash
npm install
# or
yarn install
```

### Run the project in development

```bash
npm run dev
# or
yarn dev
```

The project will be available at [http://localhost:5173](http://localhost:5173) by default.

### Run the API locally (optional)

```bash
cd api
func start
```

---

## Usage

1. Navigate to the profile view.
2. Explore main and secondary branches to view education and work experience.
3. Each component (`Education` or `Work`) displays detailed information for each entry.

---

## Contributing

Contributions are welcome! You can:

- Open an issue for suggestions or bugs.
- Create a pull request with improvements or new features.

---


## Contact

- Author: Patricia Mancilla
- Email: patri.mancilla@gmail.com
- Website: [patri.es](https://www.patri.es)
- GitHub: [patriMancilla](https://github.com/patriMancilla)
