<script>
import {shopList} from "./data/items"
import CartItem from "./components/CartItem.vue";
import Modal from "./components/Modal.vue"

export default {
  components: {
    Modal: Modal,
    CartItem: CartItem,
  },
  data() {
    return {
      showCart: false,
      cartContent: {},
      noBorder: {
        borderTop: 'none',
      },
      modalText: "",
    }
  },
  methods: {
    addToCart(id, quantity) {
      const itemQuantity = this.cartContent[id] ? this.cartContent[id] : 0;
      let newQuantity = Math.max(0, itemQuantity + quantity);
      if(newQuantity === 0)
      {
        delete this.cartContent[id];
      }
      else
      {
        this.cartContent[id] = newQuantity;
      }
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartContent));
    },
    getData(id){
      return shopList.find(elem => elem.id === id)
    },
    resetCartModal() {
      this.modalText = "Voulez-vous réinitialiser votre panier et retirer chaque article ?"
    },
    resetCart(confirm) {
      if(confirm) {
        Object.keys(this.cartContent).forEach(k => delete this.cartContent[k])
        this.saveCart();
      }
      this.modalText = '';
    },
    test() {
      //FONCTION DE TEST
    }
  },
  computed: {
    calcTotal() {
      let total = 0;
      for(const item in this.cartContent)
      {
        total += shopList.find(elem => elem.id === `${item}`).price * this.cartContent[item];
      }
      return total;
    },
    cartSize() {
      let total = 0;
      for(const item in this.cartContent)
      {
        total += this.cartContent[item];
      }
      return total;
    },
  },
  mounted() {
    this.cartContent = Object.assign(JSON.parse(localStorage.getItem("cart")));
  },
  watch: {
    //----------------- ça marche pas ! ----------
    // cardContent: {
    //   handler: function() {
    //     console.log('Saving...');
    //     this.saveCart();
    //   },
    //   deep: true,
    // },
  },
}
</script>

<template>
<!--  TEST BUTTON-->
<!--  <button type="button" @click="test" style="font-size: 30px">TEST</button>-->

  <div id="app">
    <div style="height: 100%; background-color: white; z-index: 10; position: relative">
      <h1 style="margin: 0; padding: 20px">La Maison Jungle</h1>
    </div>
    <div class="topnav" style="z-index: 10">
      <router-link to="/">Home</router-link>
<!--      <router-link to="/about">About</router-link>-->
      <router-link to="/shop">Shop</router-link>
      <router-link to="/cart">Cart</router-link>
      <div class="navCart" @click="showCart = !showCart">
        <button type="button" class="round-icon">
          <img class="cart-img" src="./assets/cart.svg">
          <span class="cart-count">
            <span>{{ cartSize }}</span>
          </span>
        </button>
      </div>
    </div>

    <Transition name="cart-dropdown">
      <div v-if="showCart" class="cart-dropdown">
        <h3 style="margin-left: 10px">Panier</h3>
        <div v-if="Object.keys(cartContent).length !== 0 || cartContent.constructor !== Object">
          <table>
            <tr v-for="(value,key) in this.cartContent"
                :key="key"
                style="border-bottom: 1px solid white">
              <CartItem :data="getData(key)"
                        :quantity="value"
                        @addToCart="addToCart" />
            </tr>

            <tr class="cart-total">
              <td></td>
              <td></td>
              <td></td>
              <td class="cart-total-cell">Total : </td>
              <td class="cart-total-cell">{{ calcTotal +" €" }}</td>
              <td>
              <button class="delete-button" type="button" @click="resetCartModal">
                <img src="./assets/delete-icon.svg">
              </button>
            </td>
            </tr>
          </table>
        </div>
        <div v-else style="text-align: center">
          Votre panier est vide !
        </div>
      </div>
    </Transition>

    <router-view  @addToCart="addToCart"
                  @saveCart="saveCart"/>

    <Modal v-if="modalText !== ''"
           @resolve="(yes) => resetCart(yes)">
      {{ modalText }}
    </Modal>
  </div>
</template>

<style scoped>
/* Add a black background color to the top navigation */
.topnav {
  position: relative;
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  position: relative;
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 30px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.router-link-active {
  background-color: #04AA6D;
  color: white;
}

.navCart{
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  height: 100%;
}

.round-icon{
  height: 55px;
  width: 55px;
  text-decoration: none;
  color: #FFF;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  background-image: -webkit-linear-gradient(45deg, #777 0%, #04AA6D 40%, #24FA8D 100%);
  background-image: linear-gradient(45deg, #777 0%, #04AA6D 40%, #24FA8D 100%);
  transition: .4s;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.round-icon:hover {
  /*-webkit-transform: rotate(15deg);*/
  /*-ms-transform: rotate(15deg);*/
  /*transform: rotate(15deg);*/
}

.cart-img {
  height: 60%;
  width: 60%;
  align-self: center;
}
.round-icon:hover .cart-img {
  -webkit-transform: rotate(15deg) scale(1.25,1.25);
  -ms-transform: rotate(15deg) scale(1.25,1.25);
  transform: rotate(15deg) scale(1.25,1.25);
  transition: .4s;
}

.cart-dropdown {
  position: absolute;
  background-color: #333333;
  height: auto;
  width: 450px;
  right: 0px;
  border-radius: 0 0 0 20px;
  color: white;
  padding: 10px;
  z-index: 1;
}

.cart-dropdown table{
  width: 100%;
}

.cart-dropdown *{
  font-family: "Roboto Light";
}

.cart-total td{
  /*border-top: 1px solid white;*/
  padding-top: 20px;
  padding-bottom: 10px;
}

.cart-total-cell {
  text-align: right;
  font-weight: bolder;
}

.cart-dropdown-enter-active {
  transition: all .3s ease;
}
.cart-dropdown-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.cart-dropdown-enter-from, .cart-dropdown-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.cart-count {
  position: absolute;
  left: -5px;
  bottom: 5px;
  border-radius: 50%;
  background-color: #de2810;
  z-index: 10;
  height: 25px;
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-count span {
  font-weight: bolder;
}

table{
  border-collapse: collapse;
}
</style>

<style>

body{
  margin: 0;
  padding: 0;
}

.delete-button{
  border: none;
  background-color: rgba(256,256,256,0);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.7s;
  margin-left: 10px;
}

.delete-button:hover {
  background-color: rgba(256,256,256,0.2);
  transition: background-color 0.7s;
}

.delete-button img{
  width: 80%;
  height: 80%;
}

</style>
