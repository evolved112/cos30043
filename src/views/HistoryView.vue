<template>
  <div class="order-history container">
    <h1>Order History</h1>
    <div v-if="isAdmin">
      <h3>All Orders (Admin View)</h3>
    </div>
    <div v-else>
      <h2>My Orders</h2>
    </div>
    <div v-for="order in filteredOrders" :key="order.id" class="order-item">
      <p class="item"><strong>Order ID:</strong> {{ order.id }}</p>
      <p class="item">
        <strong>Delivery Method:</strong> {{ order.deliveryMethod }}
      </p>
      <p v-if="order.deliveryMethod === 'Delivery'" class="item">
        <strong>Delivery Address:</strong> {{ order.deliveryAddress }}
      </p>
      <p class="item">
        <strong>Contact Number:</strong> {{ order.contactNumber }}
      </p>
      <p class="item"><strong>Email:</strong> {{ order.email }}</p>
      <p class="item">
        <strong>Payment Method:</strong> {{ order.paymentMethod }}
      </p>
      <p class="item" v-if="order.paymentMethod === 'Pay online'">
        <strong>Credit Card Type:</strong> {{ order.creditCardType }}
      </p>
      <div class="item tacolist">
        <strong>Selected Tacos:</strong>
        <ul>
          <li v-for="taco in order.selectedTacos" :key="taco.name">
            {{ taco.name }} - ${{ taco.price }} x {{ taco.quantity }}
          </li>
        </ul>
      </div>
      <p class="item" v-color="order.orderStatus">
        <strong>Order Status:</strong> {{ order.orderStatus }}
      </p>
      <p class="item"><strong>Total Price:</strong> ${{ order.totalPrice }}</p>
      <div v-if="isAdmin">
        <button @click="editOrder(order)">Edit Status</button>
        <button @click="deleteOrder(order.id)">Delete</button>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Edit Order Status</h2>
        <p><strong>Order ID:</strong> {{ selectedOrder.id }}</p>
        <label for="orderStatus">Order Status:</label>
        <select v-model="selectedOrder.orderStatus" id="orderStatus">
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button @click="updateOrderStatus">Update Status</button>
      </div>
    </div>
  </div>
</template>

<script setup>
//setup data
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const orders = ref([]);
const userId = store.getters.userId;
const adminId = store.getters.isAdmin;
const showModal = ref(false);
const selectedOrder = ref({});

// custom directive to change color depends on the what is the status of order
const vColor = {
  beforeMount(el, binding) {
    if (binding.value === "Delivered") {
      el.style.color = "green";
    } else if (binding.value === "Pending") {
      el.style.color = "red";
    }
  },
  updated(el, binding) {
    if (binding.value === "Delivered") {
      el.style.color = "green";
    } else if (binding.value === "Pending") {
      el.style.color = "red";
    }
  },
};

// fetch data
const fetchOrders = async () => {
  const response = await fetch(
    "https://tica-taco-default-rtdb.asia-southeast1.firebasedatabase.app/orderHistory.json"
  );
  const data = await response.json();
  orders.value = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
};
// check if the user is the admin then change view if not change view
const isAdmin = computed(() => userId === adminId);
const filteredOrders = computed(() => {
  return isAdmin.value
    ? orders.value
    : orders.value.filter((order) => order.userId === userId);
});

const editOrder = (order) => {
  selectedOrder.value = { ...order };
  showModal.value = true;
};
// update status
const updateOrderStatus = async () => {
  try {
    await fetch(
      `https://tica-taco-default-rtdb.asia-southeast1.firebasedatabase.app/orderHistory/${selectedOrder.value.id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: selectedOrder.value.orderStatus }),
      }
    );
    orders.value = orders.value.map((order) =>
      order.id === selectedOrder.value.id ? selectedOrder.value : order
    );
    showModal.value = false;
  } catch (error) {
    console.error("Failed to update order status:", error);
  }
};
// delete order
const deleteOrder = async (orderId) => {
  await fetch(
    `https://tica-taco-default-rtdb.asia-southeast1.firebasedatabase.app/orderHistory/${orderId}.json`,
    {
      method: "DELETE",
    }
  );
  orders.value = orders.value.filter((order) => order.id !== orderId);
};

const closeModal = () => {
  showModal.value = false;
};

fetchOrders();
</script>

<style scoped>
.order-history {
  font-size: 200%;
}

h1 {
  padding-top: 25px;
  margin-bottom: 1rem;
}

h3 {
  margin-bottom: 1rem;
}

.order-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}

.item {
  margin: 10px;
}

.item ul li {
  list-style-type: decimal;
  margin: 10px;
  margin-left: 50px;
}

.tacolist {
  margin-bottom: 2rem;
}

.order-item button {
  background-color: #e67e22;
  color: white;
  padding: 16px 20px;
  margin: 10px 0px;
  border: 2px solid white;
  margin-right: 1rem;
  cursor: pointer;
  opacity: 0.9;
  border-radius: 12px;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
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
</style>
