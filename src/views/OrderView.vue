<template>
  <div class="container order">
    <form @submit.prevent="submitOrder" id="order">
      <div>
        <h1>Order <br /><br /></h1>
        <p>Please fill in this form to order.</p>
        <hr />

        <!-- Delivery or Pick-up selection -->
        <div>
          <label for="type-delivery"
            ><strong>Delivery or Pick-up</strong></label
          >
          <select
            id="type-delivery"
            v-model="deliveryMethod"
            @change="checkDelivery"
            required
          >
            <option value="">Choose a method</option>
            <option value="Delivery">Delivery</option>
            <option value="Pick-up">Pick-up</option>
          </select>
        </div>
        <div v-if="deliveryMethod === 'Delivery'" id="type-delivery-check">
          <label for="delivery-address"
            ><strong>Please enter delivery address</strong></label
          >
          <input
            type="text"
            id="delivery-address"
            placeholder="Delivery address"
            v-model="deliveryAddress"
            required
          />
        </div>
        <div>
          <label for="contact-number"
            ><strong>Please enter contact number</strong></label
          >
          <input
            type="text"
            id="contact-number"
            placeholder="Contact number"
            v-model="contactNumber"
            required
          />
        </div>
        <div>
          <label for="email"
            ><strong>Please enter email for bill</strong></label
          >
          <input
            type="email"
            id="email"
            placeholder="Email"
            v-model="email"
            required
          />
        </div>
        <div>
          <label for="type-payment"
            ><strong>Please choose type of payment</strong></label
          >
          <select
            id="type-payment"
            v-model="paymentMethod"
            @change="checkPaymentMethod"
            required
          >
            <option value="Pay on pick-up">Pay on pick-up</option>
            <option value="Pay online">Pay online</option>
          </select>
        </div>
        <div v-if="paymentMethod === 'Pay online'" id="credit-card-check">
          <label for="credit-card"
            ><strong>Please enter credit card information</strong></label
          >
          <select id="type-of-credit-card" v-model="creditCardType">
            <option value="">Select a type of card</option>
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="AmericanExpress">American Express</option>
          </select>
          <input
            type="text"
            id="credit-card"
            placeholder="Credit card information"
            v-model="creditCardInfo"
          />
        </div>

        <!-- Filters and Sort Section -->

        <div class="filters">
          <h2>Filter and Sort Tacos</h2>
          <div class="fil">
            <div class="search filbox">
              <label for="filter-name" class="fil-label">Search:</label>
              <input
                class="search-input"
                type="text"
                id="filter-name"
                v-model="filters.name"
                placeholder="Search Menu"
                autocomplete="off"
              />
            </div>
            <div class="filbox">
              <label for="sort-likes" class="fil-label">Sort by Likes:</label>
              <select id="sort-likes" v-model="sort.likes">
                <option value="">None</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div class="filbox">
              <label for="sort-price" class="fil-label">Sort by Price:</label>
              <select id="sort-price" v-model="sort.price">
                <option value="">None</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Taco selection -->
        <div>
          <label><strong>Please choose your taco from the menu</strong></label>
          <br /><br />
          <div
            v-for="(taco, index) in sortedAndFilteredTacos"
            :key="taco.name"
            class="taco-menu-item"
          >
            <input
              type="checkbox"
              :id="`taco-${index}`"
              :value="taco"
              v-model="selectedTacos"
            />
            <label :for="`taco-${index}`">
              <img :src="taco.imgurl" class="order-image" :alt="taco.name" />
            </label>
            <p>{{ taco.name }} - ${{ taco.price }} ({{ taco.likes }} likes)</p>
            <div v-if="selectedTacos.includes(taco)" class="phone-quantity">
              <label for="quantity" class="label-quantity">Quantity:</label>
              <input
                id="quantity"
                type="number"
                v-model.number="taco.quantity"
                min="1"
                placeholder="Quantity"
                @change="updateTotalPrice"
              />
            </div>
          </div>
        </div>

        <!-- Total Price and Buttons -->
        <div>
          <label
            ><strong>Total Price: ${{ totalPrice }}</strong></label
          >
        </div>
        <div class="button">
          <button type="submit" class="registerbtn submit btn btn--full">
            Submit
          </button>
          <button type="reset" class="registerbtn reset btn btn--outline">
            Reset
          </button>
        </div>
      </div>
    </form>
  </div>
  <!-- Show login Modal -->
  <div v-if="showLoginModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p>You are not logged in yet. Would you like to log in?</p>
      <button @click="redirectToLogin" class="modal-button">Login</button>
    </div>
  </div>
<!-- Success Modal -->
<div v-if="showSuccessModal" class="modal">
  <div class="modal-content">
    <span class="close" @click="closeSuccessModal">&times;</span>
    <h2>Order Submitted Successfully!</h2>
    <button @click="redirectToHome" class="modal-button">Back to home</button>
  </div>
</div>

<!-- Failed Modal -->
<div v-if="showFailedModal" class="modal">
  <div class="modal-content">
    <span class="close" @click="closeFailedModal">&times;</span>
    <h2>Order Failed</h2>
    <p>Please order again later.</p>
  </div>
</div>

</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import router from "../router";

const store = useStore();
const isAuth = computed(() => store.getters.isAuth);

const showLoginModal = ref(false);
const showSuccessModal = ref(false);
const showFailedModal = ref(false);

const deliveryMethod = ref("");
const deliveryAddress = ref("");
const contactNumber = ref("");
const email = ref("");
const paymentMethod = ref("");
const creditCardType = ref("");
const creditCardInfo = ref("");
const selectedTacos = ref([]);
const totalPrice = ref(0);
const orderStatus = ref("Pending");

const tacos = ref([]);
const filters = ref({
  name: "",
});
const sort = ref({
  likes: "",
  price: "",
});

const fetchTacos = async () => {
  const response = await fetch(
    "https://tica-taco-default-rtdb.asia-southeast1.firebasedatabase.app/tacos.json"
  );
  const data = await response.json();
  tacos.value = data.map((taco) => ({
    ...taco,
    quantity: 1,
  }));
};

// automatically and dynamically update pricing

const updateTotalPrice = () => {
  totalPrice.value = selectedTacos.value.reduce(
    (total, taco) => total + taco.price * taco.quantity,
    0
  );
};

// if payment method is card, if not then no need to set value

const checkPaymentMethod = () => {
  if (paymentMethod.value === "Pay on pick-up") {
    creditCardType.value = "";
    creditCardInfo.value = "";
  }
};


const submitOrder = async () => {
  // if the player is login, proceed to payment else reroute back to register/login

  if (isAuth.value) {
    const orderData = {
    userId: store.getters.userId,
    deliveryMethod: deliveryMethod.value,
    deliveryAddress:
      deliveryMethod.value === "Delivery" ? deliveryAddress.value : null,
    contactNumber: contactNumber.value,
    email: email.value,
    paymentMethod: paymentMethod.value,
    creditCardType:
      paymentMethod.value === "Pay online" ? creditCardType.value : null,
    creditCardInfo:
      paymentMethod.value === "Pay online" ? creditCardInfo.value : null,
    selectedTacos: selectedTacos.value.map(({ name, price, quantity }) => ({
      name,
      price,
      quantity,
    })),
    totalPrice: totalPrice.value,
    orderStatus: orderStatus.value,
  };
    // upload the order to firebase 
    const response = await fetch(
      "https://tica-taco-default-rtdb.asia-southeast1.firebasedatabase.app/orderHistory.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      showFailedModal.value = true;
    } else {
      showSuccessModal.value = true;
      resetForm();
    }
  } else {
    showLoginModal.value = true;
  }

};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
};

const closeFailedModal = () => {
  showFailedModal.value = false;
};

const closeModal = () => {
  showLoginModal.value = false;
};

const redirectToLogin = () => {
  showLoginModal.value = false;
  router.push({ name: "login" });
};

const redirectToHome = () => {
  showSuccessModal.value = false;
  router.push({ name: "home" })
}

const resetForm = () => {
  deliveryMethod.value = "";
  deliveryAddress.value = "";
  contactNumber.value = "";
  email.value = "";
  paymentMethod.value = "";
  creditCardType.value = "";
  creditCardInfo.value = "";
  selectedTacos.value = [];
  totalPrice.value = 0;
  filters.value = {
    name: "",
  };
  sort.value = {
    likes: "",
    price: "",
  };
};

//filter tacos by names

const filteredTacos = computed(() => {
  return tacos.value.filter((taco) => {
    return taco.name.toLowerCase().includes(filters.value.name.toLowerCase());
  });
});

//after filter by name if there's any, sort by like or by price if any

const sortedAndFilteredTacos = computed(() => {
  let sortedTacos = [...filteredTacos.value];

  if (sort.value.likes) {
    sortedTacos.sort((a, b) =>
      sort.value.likes === "asc" ? a.likes - b.likes : b.likes - a.likes
    );
  }

  if (sort.value.price) {
    sortedTacos.sort((a, b) =>
      sort.value.price === "asc" ? a.price - b.price : b.price - a.price
    );
  }

  return sortedTacos;
});

watch(selectedTacos, updateTotalPrice);

fetchTacos();
</script>

<style scoped>
h1 {
  padding-top: 25px;
}
.hidden {
  display: none;
}
.order {
  font-size: 200%;
}
input[type="text"],
input[type="password"],
input[type="email"],
select {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus,
select:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.registerbtn {
  background-color: #e67e22;
  color: white;
  padding: 16px 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  border: 2px solid white;
  cursor: pointer;
  width: 50%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
  background-color: #cf711f;
}

a {
  color: dodgerblue;
}

.signin {
  background-color: #f1f1f1;
  text-align: center;
}
.radio {
  padding-left: 15px;
}

* {
  box-sizing: border-box;
  box-shadow: none;
}
.order-image {
  width: 20%;
}
.taco-menu-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.taco-menu-item img {
  margin: 1rem;
  width: 150px;
  height: 100px;
  object-fit: cover;
}

.taco-menu-item input[type="number"] {
  width: 100px;
  padding: 9px 10px;
  margin-left: 1rem;
}
.taco-menu-item .label-quantity {
  margin-left: 2rem;
  text-decoration: underline;
}

.filters h2 {
  margin-bottom: 20px;
}

.fil {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
}

.filbox {
  margin-bottom: 15px;
}

.search {
  grid-column: 1/3;
}

/* Modal styles */
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 40%; /* Could be more or less, depending on screen size */
  font-size: 125%;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Set a style for the login button */
.modal-button {
  background-color: #e67e22;
  color: white;
  padding: 8px 16px;
  margin-top: 1em;
  border: 2px solid white;
  cursor: pointer;
  border-radius: 10%;
}

.modal-button:hover {
  opacity: 1;
  background-color: #cf711f;
}
</style>
