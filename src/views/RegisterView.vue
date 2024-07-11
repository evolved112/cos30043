<template>
  <div class="register container">
    <form @submit.prevent="submit" >
      <div class="containereg">
        <h1>Register <br /><br /></h1>
        <p>Please fill in this form to create an account.</p>
        <hr />
        <!-- <label for="uname" ><b>Username</b></label>
        <input
          type="text"
          placeholder="Username"
          name="uname"
          id="uname"
          v-model="uName"
          :onchange="uNameValidator"
          required
        /> -->

        <label for="email"><b>Email</b></label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          v-model="email"
          required
        />

        <label for="psw"><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          v-model="psw"
          required
        />

        <label for="psw_repeat"><b>Repeat Password</b></label>
        <input
          type="password"
          placeholder="Repeat Password"
          name="psw-repeat"
          id="psw_repeat"
          v-model="pswr"
          required
        />
        <hr />
      </div>
      <hr />
      <div class="button">
        <button type="submit" class="registerbtn submit btn btn--full">
          Submit
        </button>
        <button type="reset" class="registerbtn reset btn btn--outline">
          Reset
        </button>
      </div>

      <div class="container signin">
        <p>Already have an account? <a href="#">Sign in</a>.</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();


const email = ref("");
const psw = ref("");
const pswr = ref("");

const submit = () => {
  if (email.value === '' || psw.value !== pswr.value) {
    console.log("invalid input");
    return;
  }

  // fetch('https://tica-taco-default-rtdb.asia-southeast1.firebasedatabase.app/acc.json', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     name: uName.value,
  //     email: email.value,
  //     psw: psw.value
  //   }),
  // });

  //send https request 
  store.dispatch('signup', {
    email: email.value,
    password: psw.value
  })
};

</script>



<style scoped>
.register {
  font-size: 200%;
}
/* Add padding to containers */
.containereg {
  padding: 16px;
  background-color: white;
}

/* Full-width input fields */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit button */
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

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}
* {
  box-sizing: border-box;
  box-shadow: none;
}
</style>