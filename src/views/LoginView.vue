<template>
    <div class="login container">
      <form @submit.prevent="submit">
        <div class="containerlogin">
          <h1>Login <br /><br /></h1>
          <p>Please enter your login details.</p>
          <hr />
          
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
          
          <hr />
          <div class="button">
            <button type="submit" class="loginbtn submit btn btn--full">
              Login
            </button>
            <button type="reset" class="loginbtn reset btn btn--outline">
              Reset
            </button>
          </div>
  
          <div class="container signin">
            <p>Don't have an account?<router-link class="main-nav-link" to="/register"
            >Register</router-link
          >.</p>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref("");
  const psw = ref("");
  
  const submit = () => {
    if (email.value === '' || psw.value === '') {
      console.log("Invalid input");
      return;
    }
  
    fetch('https://tica-taco-default-rtdb.asia-southeast1.firebasedatabase.app/acc.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        psw: psw.value
      }),
    });
  };
  </script>
  
  <style scoped>
  .login {
    font-size: 200%;
  }
  
  /* Add padding to containers */
  .containerlogin {
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
  
  /* Set a style for the login button */
  .loginbtn {
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
  
  .loginbtn:hover {
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
  