import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FeaturesView from "../views/FeaturesView.vue";
import OrderView from "../views/OrderView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/features",
      name: "features",
      component: FeaturesView,
    },
    {
      path: "/order",
      name: "order",
      component: OrderView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

export default router;
