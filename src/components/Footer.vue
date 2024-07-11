<template>
  <footer class="footer">
    <div class="container grid grid--footer">
      <div class="logo-col">
        <a href="#" class="footer-logo">
          <img class="logo" alt="tica's taco" src="../assets/logo.png" />
        </a>

        <ul class="social-links">
          <li>
            <a class="footer-link" href="#">
              <ion-icon class="social-icon" name="logo-instagram"></ion-icon>
            </a>
          </li>
          <li>
            <a class="footer-link" href="#">
              <ion-icon class="social-icon" name="logo-facebook"></ion-icon>
            </a>
          </li>
          <li>
            <a class="footer-link" href="#">
              <ion-icon class="social-icon" name="logo-twitter"></ion-icon>
            </a>
          </li>
        </ul>
        <!--copyright-->
        <p class="copyright">
          Copyright &copy; <span class="year">2022</span> by Tica's taco, Inc.
          All rights reserved. (small reminder all footer links are not working)
        </p>
      </div>
      <!--address    -->
      <div class="address-col">
        <p class="footer-heading">Contact us</p>
        <address class="contacts">
          <p class="address">113 W 225th St The Bronx, NY 10463</p>
          <p>
            <a class="footer-link" href="tel:415-201-6370">415-201-6370</a
            ><br />
            <a class="footer-link" href="https://welcometotica'staco.com"
              >welcometotica'staco@gmail.com</a
            >
          </p>
        </address>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
/**************************/
/* FOOTER */
/**************************/

.footer {
  padding: 12.8rem 0;
  border-top: 1px solid #eee;
  background-image: url("../assets/background.jpg");
}

.grid--footer {
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr;
}

.logo-col {
  display: flex;
  flex-direction: column;
}

.footer-logo {
  display: block;
  margin-bottom: 3.2rem;
}

.social-links {
  list-style: none;
  display: flex;
  gap: 2.4rem;
}

.social-icon {
  height: 2.4rem;
  width: 2.4rem;
}

.copyright {
  font-size: 1.4rem;
  line-height: 1.6;
  color: #767676;
  margin-top: auto;
}

.footer-heading {
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 4rem;
}

.contacts {
  font-style: normal;
  font-size: 1.6rem;
  line-height: 1.6;
}

.address {
  margin-bottom: 2.4rem;
}

.footer-nav {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.footer-link:link,
.footer-link:visited {
  text-decoration: none;
  font-size: 1.6rem;
  color: #767676;
  transition: all 0.3s;
}

.footer-link:hover,
.footer-link:active {
  color: #555;
}
</style>
