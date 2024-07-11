<template>
  <div class="container">
    <h1 class="big"><strong>List of features:</strong></h1>
    <div class="bigtext">
      <p>
        Highlight the menu item in the navigator corresponding to the current
        web page <router-link to="/">Click here</router-link>
      </p>
      <br />
      <p>
        Allow users to choose from three types of credit card: Visa, Mastercard
        and American Express. Based on the type of credit card, limit the length
        of the credit card number: 16 digits for Visa and Mastercard, 15 digits
        for American Express.<router-link to="/order">Click here</router-link>
      </p>
      <br />
      <p>
        In page order.html, create a checkbox with the label 'same as delivery
        address' somewhere appropriate near the fields for billing address. When
        this checkbox is checked, the fields for billing address will be filled
        with the delivery address automatically. If the delivery address is not
        completed when this checkbox is checked, display an alert or inline
        message: 'Please enter your delivery address first'.<router-link
          to="/order"
          >Click here</router-link
        >
      </p>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "FeaturesView",
};
</script>

<style scoped>
.big {
  font-size: 300%;
}
p {
  font-size: 3rem;
}
</style>
