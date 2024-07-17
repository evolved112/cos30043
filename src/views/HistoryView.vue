<template>
  <div class="order-history">
    <h1>Order History</h1>
    <div v-if="isAdmin">
      <h2>All Orders (Admin View)</h2>
    </div>
    <div v-else>
      <h2>My Orders</h2>
    </div>
    <div v-for="order in filteredOrders" :key="order.id" class="order-item">
      <p><strong>Order ID:</strong> {{ order.id }}</p>
      <p><strong>Delivery Method:</strong> {{ order.deliveryMethod }}</p>
      <p v-if="order.deliveryMethod === 'Delivery'"><strong>Delivery Address:</strong> {{ order.deliveryAddress }}</p>
      <p><strong>Contact Number:</strong> {{ order.contactNumber }}</p>
      <p><strong>Email:</strong> {{ order.email }}</p>
      <p><strong>Payment Method:</strong> {{ order.paymentMethod }}</p>
      <p v-if="order.paymentMethod === 'Pay online'"><strong>Credit Card Type:</strong> {{ order.creditCardType }}</p>
      <div>
        <strong>Selected Tacos:</strong>
        <ul>
          <li v-for="taco in order.selectedTacos" :key="taco.name">
            {{ taco.name }} - ${{ taco.price }} x {{ taco.quantity }}
          </li>
        </ul>
      </div>
      <p><strong>Total Price:</strong> ${{ order.totalPrice }}</p>
      <div v-if="isAdmin">
        <button @click="editOrder(order)">Edit</button>
        <button @click="deleteOrder(order.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const orders = ref([]);
const userId = store.getters.userId;
const adminId = store.getters.isAdmin;

const fetchOrders = async () => {
  const response = await fetch('https://tica-taco-default-rtdb.asia-southeast1.firebasedatabase.app/orderHistory.json');
  const data = await response.json();
  orders.value = Object.keys(data).map(key => ({ id: key, ...data[key] }));
};

const isAdmin = computed(() => userId === adminId);
const filteredOrders = computed(() => {
  return isAdmin.value ? orders.value : orders.value.filter(order => order.userId === userId);
});

//plan to recreate the orderpage 

const editOrder = (order) => {
  
};

const deleteOrder = async (orderId) => {
  await fetch(`https://tica-taco-default-rtdb.asia-southeast1.firebasedatabase.app/orderHistory/${orderId}.json`, {
    method: 'DELETE',
  });
  orders.value = orders.value.filter(order => order.id !== orderId);
};

fetchOrders();
</script>

<style scoped>
.order-history {
  font-size: 1.2rem;
}
.order-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
.order-item button {
  margin-right: 1rem;
}
</style>
