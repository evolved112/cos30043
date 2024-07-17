<template>
  <header class="header">
    <a href="#">
      <img class="logo" alt="Taco's logo" src="../assets/logo.png" />
    </a>

    <nav class="main-nav">
      <ul class="main-nav-list">
        <li>
          <router-link to="/" class="main-nav-link nav-cta">Main Menu</router-link>
        </li>
        <li v-if="!isAuth">
          <router-link class="main-nav-link" to="/register">Register</router-link>
        </li>
        <li>
          <router-link to="/order" class="main-nav-link">Order</router-link>
        </li>
        <li>
          <router-link to="/features" class="main-nav-link">Features</router-link>
        </li>
        <!-- Conditionally render order-history link -->
        <li v-if="isAuth">
          <router-link to="/order-history" class="main-nav-link">Order History</router-link>
        </li>
      </ul>
    </nav>

    <div class="user-info">
      <img v-if="userId" :src="userAvatar" class="avatar" alt="User Avatar" />
      <span v-else class="user-id">ID: null</span>
      <button v-if="isAuth" @click="logout" class="logout-button">Logout</button>
    </div>

    <button class="btn-mobile-nav">
      <ion-icon class="icon-mobile-nav" name="menu-outline"></ion-icon>
      <ion-icon class="icon-mobile-nav" name="close-outline"></ion-icon>
    </button>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const userId = computed(() => store.getters.userId);
const isAuth = computed(() => store.getters.isAuth);

const userAvatar = computed(() => {
  return userId.value
    ? `https://api.adorable.io/avatars/40/${userId.value}.png`
    : '';
});

const logout = () => {
  store.dispatch('logout');
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fdf2e9;
  height: 9.6rem;
  padding: 0 4.8rem;
  position: relative;
}

.main-nav-list {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 4.8rem;
}

.main-nav-link:link,
.main-nav-link:visited {
  display: inline-block;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 1.8rem;
  transition: all 0.3s;
}

.main-nav-link:hover,
.main-nav-link:active {
  color: #cf711f;
}

.main-nav-link.router-link-active:link,
.main-nav-link.router-link-active:visited {
  padding: 1.2rem 2.4rem;
  border-radius: 9px;
  color: #fff;
  background-color: #e67e22;
}

.main-nav-link.router-link-active:hover,
.main-nav-link.router-link-active:active {
  background-color: #cf711f;
}

.btn-mobile-nav {
  border: none;
  background: none;
  cursor: pointer;
  display: none;
}

.icon-mobile-nav {
  height: 4.8rem;
  width: 4.8rem;
  color: #333;
}

.icon-mobile-nav[name="close-outline"] {
  display: none;
}

.sticky .header {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 8rem;
  padding-top: 0;
  padding-bottom: 0;
  background-color: rgba(255, 255, 255, 0.97);
  z-index: 999;
  box-shadow: 0 1.2rem 3.2rem rgba(0, 0, 0, 0.03);
}

.sticky .section-hero {
  margin-top: 9.6rem;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.user-id {
  font-size: 1.8rem;
  color: #333;
}

.logout-button {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background-color: #e67e22;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #cf711f;
}
</style>
