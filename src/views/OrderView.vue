<template>
  <div class="container order">
    <form method="post" action="" id="order">
      <div>
        <h1>Order <br /><br /></h1>
        <p>Please fill in this form to order.</p>
        <hr />
        <div>
          <label for="type-delivery"><strong>Delivery or Pick-up</strong></label>
          <select id="type-delivery" v-model="deliveryMethod" @change="checkDelivery" required>
            <option value="">Choose a method</option>
            <option value="Delivery">Delivery</option>
            <option value="Pick-up">Pick-up</option>
          </select>
        </div>
        <div v-if="deliveryMethod === 'Delivery'" id="type-delivery-check">
          <label for="delivery-address"><strong>Please enter delivery address</strong></label>
          <input type="text" id="delivery-address" placeholder="Delivery address" v-model="deliveryAddress" required />
        </div>
        <div v-if="deliveryMethod === 'Delivery'" id="same-as-delivery-address-check">
          <label for="same-as-delivery"><strong>Same as delivery address</strong></label>
          <input type="checkbox" id="same-as-delivery" v-model="sameAsDeliveryAddress" @change="autoFillBillingAddress" />
        </div>
        <div>
          <label for="contact-number"><strong>Please enter contact number</strong></label>
          <input type="text" id="contact-number" placeholder="Contact number" v-model="contactNumber" required />
        </div>
        <div>
          <label for="email"><strong>Please enter email for bill</strong></label>
          <input type="email" id="email" placeholder="Email" v-model="email" required />
        </div>
        <div>
          <label for="type-payment"><strong>Please choose type of payment</strong></label>
          <select id="type-payment" v-model="paymentMethod" @change="checkPaymentMethod" required>
            <option value="Pay on pick-up">Pay on pick-up</option>
            <option value="Pay online">Pay online</option>
          </select>
        </div>
        <div v-if="paymentMethod === 'Pay online'" id="credit-card-check">
          <label for="credit-card"><strong>Please enter credit card information</strong></label>
          <select id="type-of-credit-card" v-model="creditCardType">
            <option value="">Select a type of card</option>
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="AmericanExpress">American Express</option>
          </select>
          <input type="text" id="credit-card" placeholder="Credit card information" v-model="creditCardInfo" />
        </div>
        <div>
          <label><strong>Please choose your taco from the menu</strong></label>
          <div v-for="(taco, index) in tacos" :key="taco.name" class="taco-menu-item">
            <input
              type="checkbox"
              :id="`taco-${index}`"
              :value="taco"
              v-model="selectedTacos"
            />
            <label :for="`taco-${index}`">
              <img :src="taco.imgurl" class="order-image" :alt="taco.name" />
              <strong>{{ taco.name }} - ${{ taco.price }}</strong>
            </label>
            <input
              type="number"
              v-if="selectedTacos.includes(taco)"
              v-model.number="taco.quantity"
              min="1"
              placeholder="Quantity"
              @change="updateTotalPrice"
            />
          </div>
        </div>
        <div>
          <label><strong>Total Price: ${{ totalPrice }}</strong></label>
        </div>
        <div class="button">
          <button type="submit" class="registerbtn submit btn btn--full">Submit</button>
          <button type="reset" class="registerbtn reset btn btn--outline">Reset</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const deliveryMethod = ref('');
const deliveryAddress = ref('');
const sameAsDeliveryAddress = ref(false);
const billingAddress = ref('');
const contactNumber = ref('');
const email = ref('');
const paymentMethod = ref('');
const creditCardType = ref('');
const creditCardInfo = ref('');
const selectedTacos = ref([]);
const totalPrice = ref(0);

const tacos = ref([]);

const fetchTacos = async () => {
  const response = await fetch('https://tica-taco-default-rtdb.asia-southeast1.firebasedatabase.app/tacos.json');
  const data = await response.json();
  tacos.value = data.map(taco => ({ ...taco, quantity: 1 }));
};

const updateTotalPrice = () => {
  totalPrice.value = selectedTacos.value.reduce((total, taco) => total + (taco.price * taco.quantity), 0);
};

const checkDelivery = () => {
  if (deliveryMethod.value === 'Delivery') {
    sameAsDeliveryAddress.value = false;
    billingAddress.value = '';
  }
};

const autoFillBillingAddress = () => {
  if (sameAsDeliveryAddress.value) {
    billingAddress.value = deliveryAddress.value;
  } else {
    billingAddress.value = '';
  }
};

const checkPaymentMethod = () => {
  if (paymentMethod.value === 'Pay on pick-up') {
    creditCardType.value = '';
    creditCardInfo.value = '';
  }
};

watch(selectedTacos, updateTotalPrice);

fetchTacos();
</script>

<style scoped>
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
  margin: 8px 0;
  border: 2px solid #db3816;
  cursor: pointer;
  width: 50%;
  opacity: 0.9;
  font-size: 150%;
  float: left;
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
  margin-right: 1rem;
}
.taco-menu-item input[type="number"] {
  width: 60px;
  margin-left: 1rem;
}
</style>
