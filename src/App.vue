<template>
  <div class="wrapper">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import store from "./store/index.js";

onMounted(() => {
  store.dispatch("tryLogin");
});
</script>

<style scoped></style>
