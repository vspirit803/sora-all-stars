import "./style.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import AboutPage from "./pages/AboutPage.vue";
import CharactersPage from "./pages/CharactersPage.vue";

const routes = [
  { path: "/characters", component: CharactersPage },
  { path: "/about", component: AboutPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
