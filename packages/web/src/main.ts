import "./style.css";
// Vuetify
import "vuetify/styles";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import App from "./App.vue";
import AboutPage from "./pages/AboutPage.vue";
import BackpackPage from "./pages/BackpackPage.vue";
import BattlePage from "./pages/BattlePage.vue";
import CharactersPage from "./pages/CharactersPage.vue";

const routes = [
  { path: "/characters", component: CharactersPage },
  { path: "/about", component: AboutPage },
  { path: "/battle", component: BattlePage },
  { path: "/backpack", component: BackpackPage },
];

const vuetify = createVuetify({
  components,
  directives,
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).use(vuetify).mount("#app");
