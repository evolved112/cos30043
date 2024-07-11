<template>
  <div class="container order">
    <form
      method="post"
      action="http://mercury.swin.edu.au/it000000/cos10005/regtest.php"
      id="order"
    >
      <div class="">
        <h1>Order <br /><br /></h1>
        <p>Please fill in this form to order.</p>
        <hr />
        <div>
          <label for="type delivery"
            ><strong>Delivery or Pick-up</strong></label
          >
          <select id="type delivery" required>
            <option>Choose a method</option>
            <option>Delivery</option>
            <option>Pick-up</option>
          </select>
        </div>
        <!--        hidden unless use delivery and not required unless use delivery -->
        <div class="hidden" id="type delivery check">
          <label for="Delivery address"
            ><strong>Please enter delivery address</strong></label
          >
          <input
            type="text"
            id="Delivery address"
            placeholder="Delivery address"
            name="Delivery address"
          />
        </div>
        <!--        hidden and not required unless use delivery-->
        <div class="hidden" id="same as delivery address check">
          <label for="remember1"
            ><strong>Same as delivery address</strong></label
          >
          <input type="checkbox" id="remember1" onclick="checkbox()" />
        </div>
        <!--        if same as delivery address auto fill in -->
        <div>
          <label for="billing address"
            ><strong>Please enter billing address</strong></label
          >
          <input
            type="text"
            id="billing address"
            placeholder="Billing address"
            required
            name="Billing address"
          />
        </div>
        <div>
          <label for="contact number"
            ><strong>Please enter contact number</strong></label
          >
          <input
            type="text"
            id="contact number"
            placeholder="Contact number"
            required
            name="Contact number"
          />
        </div>
        <div>
          <label for="email"><strong>Please enter mail for bill</strong></label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            name="Email"
          />
        </div>
        <div>
          <label for="type payment"
            ><strong>Please choose type of payment</strong></label
          >
          <select id="type payment" required>
            <option name="Pay on pick-up">Pay on pick-up</option>
            <option name="Pay online">Pay online</option>
          </select>
        </div>
        <!--        hidden unless use online payment-->
        <div class="hidden" id="credit card check">
          <label for="credit card"
            ><strong>Please enter credit card information</strong></label
          >
          <select id="type of credit card">
            <option>Select a type of card</option>
            <option value="Visa" name="credit card">Visa</option>
            <option value="Mastercard" name="credit card">Mastercard</option>
            <option value="AmericanExpress" name="credit card">
              American Express
            </option>
          </select>
          <input
            type="text"
            id="credit card"
            placeholder="Credit card information"
            name="credit card information"
          />
        </div>
        <div>
          <label><strong>Please choose your taco from the menu</strong></label>
          <br />
          <input
            id="Tacos de Birria"
            type="checkbox"
            value="Tacos de Birria"
            name="Taco"
          />
          <label for="Tacos de Birria"
            ><img src="../assets/taco1.jpeg" class="order-image" /><strong
              >Tacos de Birria</strong
            ></label
          >
          <br />
          <input type="checkbox" value="Tacos de Pescado" name="Taco" />
          <label for="Tacos de Birria"
            ><img src="../assets/taco2.jpeg" class="order-image" /><strong
              >Tacos de Pescado</strong
            ></label
          >
          <br />
          <input type="checkbox" value="Carnitas" name="Taco" />
          <label for="Tacos de Birria"
            ><img src="../assets/taco3.jpeg" class="order-image" /><strong
              >Carnitas</strong
            ></label
          >
          <br />
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
</template>

<script setup>
  
</script>

<style scoped>
.hidden {
  display: none;
}
.order {
  font-size: 200%;
}
/* Full-width input fields */
input[type="text"],
input[type="password"],
input[type="email"] {
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
</style>
