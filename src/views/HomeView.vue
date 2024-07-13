<template>
  <main>
    <section class="section-hero">
      <div class="hero">
        <div class="hero-text-box">
          <h1 class="heading-primary">
            The best way to live is to have a Taco a day.
          </h1>
          <p class="hero-description">
            With the desire to bring fresh products from the farm and dishes
            full of Mexican flavors to the hands of people to enjoy, Tica's Taco
            was opened. Tica's Taco originated in ..., United States of America.
            It was founded by Timber Guteres and Carlos Evans, and they opened
            the first Tica's Taco restaurant back in 1980. Presented in more
            than 110 countries, with 8000 stores around the world, Tica's Taco
            serves more than 20 million customers every day. We always strive to
            bring the perfect taco experience through the bites of Tica's Taco.
          </p>
          <a href="#cta" class="btn btn--full margin-right-sm"
            >Start eating well</a
          >
          <a href="#how" class="btn btn--outline">Learn more &darr;</a>
        </div>
        <div class="hero-img-box" id="background">
          <picture>
            <img
              src="../assets/tacobackground.jpg"
              class="hero-img"
              alt="Tica's taco"
            />
          </picture>
        </div>
      </div>
    </section>

    <section class="section-how" id="how">
      <div class="container">
        <span class="subheading">The big menu</span>
        <h2 class="heading-secondary">This is the best tacos in the WORLD.</h2>
      </div>

      <article class="container grid">
        <div v-for="(taco, index) in displayedTacos" :key="index" :class="`taco-item ${index % 2 === 0 ? 'left' : 'right'}`">
          <div class="step-text-box">
            <p class="step-number">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</p>
            <h3 class="heading-tertiary">{{ taco.name }}</h3>
            <p class="step-description">{{ taco.description }}</p>
          </div>
          <div class="step-img-box">
            <img :src="taco.imgurl" class="step-img" :alt="taco.name" />
          </div>
        </div>
      </article>

      <paginate
        :page-count="totalPages"
        :click-handler="changePage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
      />
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Paginate from 'vuejs-paginate-next';
import store from "../store/index.js"

const tacos = ref([]);
const currentPage = ref(1);
const itemsPerPage = 3;

const totalPages = computed(() => Math.ceil(tacos.value.length / itemsPerPage));

const displayedTacos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return tacos.value.slice(start, end);
});

const loadTacos = async () => {
  try {
    const response = await fetch("https://tica-taco-default-rtdb.asia-southeast1.firebasedatabase.app/tacos.json");
    if (response.ok) {
      const data = await response.json();
      tacos.value = data;
    }
  } catch (error) {
    console.error('Failed to load tacos:', error);
  }
};

const changePage = (page) => {
  currentPage.value = page;
};

onMounted(() => {
  loadTacos();
  store.getters.isAuth;
});
</script>

<style scoped>
/**************************/
/* HERO - BANNER SECTION */
/**************************/

.section-hero {
  background-color: #fdf2e9;
  padding: 4.8rem 0 9.6rem 0;
}

.hero {
  max-width: 130rem;
  margin: 0 auto;
  padding: 0 3.2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9.6rem;
  align-items: center;
}

.hero-description {
  font-size: 2rem;
  line-height: 1.6;
  margin-bottom: 4.8rem;
}

.hero-img {
  width: 100%;
}

.delivered-meals {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-top: 8rem;
}

.delivered-imgs {
  display: flex;
}

.delivered-imgs img {
  height: 4.8rem;
  width: 4.8rem;
  border-radius: 50%;
  margin-right: -1.6rem;
  border: 3px solid #fdf2e9;
}

.delivered-imgs img:last-child {
  margin: 0;
}

.delivered-text {
  font-size: 1.8rem;
  font-weight: 600;
}

.delivered-text span {
  color: #cf711f;
  font-weight: 700;
}

/**************************/
/* HOW IT WORKS SECTION */
/**************************/

.section-how {
  padding: 9.6rem 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.taco-item.left {
  grid-column: 1 / 2;
}

.taco-item.right {
  grid-column: 2 / 3;
}

.step-number {
  font-size: 8.6rem;
  font-weight: 600;
  color: #ddd;
  margin-bottom: 1.2rem;
}

.step-description {
  font-size: 1.8rem;
  line-height: 1.8;
}

.step-img-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-img-box::before,
.step-img-box::after {
  content: "";
  display: block;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.step-img-box::before {
  width: 60%;
  padding-bottom: 60%;
  background-color: #fdf2e9;
  z-index: -2;
}

.step-img-box::after {
  width: 45%;
  padding-bottom: 45%;
  background-color: #fae5d3;
  z-index: -1;
}

.step-img {
  width: 40%;
  border-radius: 10%;
}

.step-img:hover {
  transform: scale(1.1);
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
