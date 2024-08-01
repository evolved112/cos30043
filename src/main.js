import "./assets/general.css";
import "./assets/queries.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

// Create Vue app
const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});
