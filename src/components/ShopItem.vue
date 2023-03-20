<template>
  <div class="shop-item">
    <img class="item-img"
         :src="cover"
          @click="$emit('showImg', cover)">
    <div class="item-body">
      <h2>{{ capitalize(name) }}</h2>
      <h2 class="item-price">{{ price +" €" }}</h2>
      <div class="item-stats">
        <div class="stat">
          <span style="margin-right: 5px">Luminosité</span>
          <img v-for="index in light" :key="index" class="stats-logo" src="../assets/sun.svg" />
        </div>
        <div class="stat">
          <img v-for="index in water" :key="index" class="stats-logo" src="../assets/water.svg"  style="margin-right: 5px"/>
          <span>Arrosage</span>
        </div>
      </div>

      <div class="item-footer">
        <div class="cartActions">
          <button class="plusMinusButton" type="button" @click="incrQuantity(false)">-</button>
          <input class="buyInput" type="number" v-model="quantity">
          <button class="plusMinusButton" type="button" @click="incrQuantity(true)">+</button>
        </div>
        <button class="plusMinusButton" type="button"
                @click="addingToCart(id, quantity)">
          <span class="add-cart-placeholder"></span>
          <Transition name="add-to-cart">
              <span v-show="!isAdding" class="add-cart-text">
                Ajouter au panier
              </span>
          </Transition>
          <Transition name="added-to-cart">
            <span v-show="isAdding" class="added-cart-text">
              <img class="cart-img" src="../assets/cart-yellow.svg">Ajouté !
            </span>
          </Transition>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopItem",
  props: ['cover','name','light','water','id','price'],
  emits: ["addToCart","showImg"],
  data() {
    return {
      quantity: 1,
      overlay: true,
      isAdding: false,
      hiddenText: false,
      hiddenStyle: {
        visibility: 'hidden',
      }
    }
  },
  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    incrQuantity(incr) {
      this.quantity = (incr) ? this.quantity + 1 : Math.max(1, this.quantity - 1);
    },
    addingToCart(id, quantity){
      //bloque les inputs multiples
      if(this.isAdding)
        return;

      //emit au parent
      this.$emit('addToCart', id, quantity);

      //effet visuel d'ajout
      this.isAdding = true;
      this.hiddenText = true;
      setTimeout(() => {
        this.isAdding = false;
        setTimeout(() => {
          this.hiddenText = false;
        }, 500)
      }, 1500)
    },
  },
}
</script>

<style scoped>

.shop-item {
  flex: 1 1 0;
  min-width: 20%;
  border-radius: 15px;
  text-align: center;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
  margin-top: 10px;
}

.item-stats{
  display: flex;
  justify-content: space-between;
}

.stats-logo {
  width: 20px;
  height: auto;
}

.item-img{
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
}

.item-body{
  padding: 10px;
}

.stat{
  display: flex;
  align-items: center;
}

.plusMinusButton {
  display: inline-block;
  outline: 0;
  cursor: pointer;
  text-align: center;
  border: 0;
  padding: 7px 16px;
  min-height: 36px;
  min-width: 36px;
  color: #ffffff;
  background: #008060;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px 0px, rgba(0, 0, 0, 0.2) 0px -1px 0px 0px inset;
  height: 100%;
  font-weight: bolder;
  position: relative;
}
.plusMinusButton:hover {
  background: #006e52;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.buyInput{
  text-align: center;
  border-radius: 4px;
  border-color: #008060;
  border-width: 1px;
  font-size: 20px;
  width: 20%;
  margin-left: 5px;
  margin-right: 5px;
  height:  32px;
  box-sizing: content-box;
}

.cartActions{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.item-footer{
  border-top: 1px solid darkgrey;
  margin-top: 10px;
  padding-top: 10px;
}

.item-price {
  color: white;
  font-weight: bolder;
  background-color: #008060;
  width: fit-content;
  padding: 10px;
  border-radius: 10%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
}

.cart-img {
  margin-right: 10px;
  width: 16px;
  height: 16px;
  margin-bottom: 3px;
}

.add-cart-placeholder{
  display: block;
  width: 150px;
}

.add-to-cart-enter-from, .add-to-cart-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.added-to-cart-enter-from, .added-to-cart-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.add-to-cart-enter-active, .added-to-cart-enter-active{
  transition: all 0.5s ease;
}

.add-to-cart-leave-active, .added-to-cart-leave-active  {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.add-cart-text {
  position: absolute;
  inset: 0;
  padding: 9px 16px 7px 16px;
}

.added-cart-text {
  position: absolute;
  inset: 0;
  padding: 9px 16px 7px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5cc53;
}
</style>