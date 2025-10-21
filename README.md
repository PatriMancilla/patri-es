# Patri-es, created with Vue 3 + Vite
This repository wil be used to create my public website as a CV and to practice with vue.js

The projet was created into this folder using ``npm create vite@latest .`` adding a clear vue-vite project inside this folder. 

-To use this project:
1. Clone the repository
2. run the comand ```npm run build```
To view the project in a Localhost: 
1. Change the data of the JSON
2. run the comand ```npm run dev``` and click over the URL generated

## Publishing the sample version:
For now, I'm starting to make it public with Azure options for creating a free static website using my personal domain. So, I need to run ``npm run build`` that create the **dist folder**. Azure will proccess then my publishing project as configured in the .yaml file.

## Git Style for tech resume
This branch version contains the layout to display my resume as if it were a GitHub history.

It displays a main branch originating from the personal data and detailing each job title and training as if they were child branches originating from and merging into main.

## Add API to get the current JSON information:
I'm going to to create an API that will be brind the datas of the website. The API will be hosted in an "Azure Functions"environment that will use CosmosDB (NoSQL) to manage the data. Therefore, I'll take some architecture decisions for this environment. Following convention, I add this structure to my API:
1. Add the "api" folder to the project root
2. Add a folder by function "get-data" and "post-data"
3. Each folder will be need a "index.js" file

If the changes are published, Azure will automatically detect the API and I can then connect to CosmosDB where the sensitive data will be securely stored.
