<template>
  <div class="container">
    <h1>Shop</h1>
    <div class="select">
      <select @change="changeSort">
        <option>Aucun filtre</option>
        <option value="price">Prix</option>
        <option value="light">Luminosité</option>
        <option value="water">Arrosage</option>
        <option value="alpha">Alphabétique</option>
      </select>
    </div>
    <div class="items-container">
      <ShopItem v-for="item in items"
                :key="item.id"
                :cover="item.cover"
                :name="item.name"
                :light="item.light"
                :water="item.water"
                :price="item.price"
                :id="item.id"
                @addToCart="(id, quantity) => $emit('addToCart', id, quantity)"
                @showImg="(cover) => showImg(cover)"/>
    </div>
  </div>

  <div v-show="overlay" class="mask" @click="overlay=false">
    <div style="position:static;">
      <img class="full-size-img" :src="cover" ref="fullSizeImg">
    </div>
  </div>
</template>

<script>
import {shopList} from "../data/items"
import ShopItem from "./ShopItem.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Shop",
  emits: ["addToCart", "saveCart"],
  components: {
    shopItem: ShopItem,
  },
  data() {
    return {
      items: [],
      overlay: false,
    }
  },
  computed: {

  },
  watch: {
    overlay() {
      document.querySelector("body").style.overflow = this.overlay ? 'hidden' : 'visible';
    }
  },
  mounted() {
    this.items = [...shopList];
  },
  beforeUnmount() {
    this.$emit('saveCart');
  },
  methods: {
    changeSort($event) {
      switch($event.target.value){
        case "price":
          this.items.sort((a,b) => a.price < b.price)
          break;
        case "water":
          this.items.sort((a,b) => a.water < b.water)
          break;
        case "light":
          this.items.sort((a,b) => a.light < b.light)
          break;
        case "alpha":
          this.items.sort((a,b) => a.name > b.name)
          break;
        default:
          this.items = [...shopList];
          break;
      }
    },
    showImg(cover) {
      this.overlay = !this.overlay;
      this.$refs.fullSizeImg.src = cover;
    },
  },

}
</script>

<style scoped>

.items-container{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.container {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

select {
  /* Reset Select */
  appearance: none;
  outline: 0;
  border: 0;
  box-shadow: none;
  /* Personalize */
  flex: 1;
  padding: 0 1em;
  color: #fff;
  background-color: #008060;
  background-image: none;
  cursor: pointer;
}
/* Remove IE arrow */
select::-ms-expand {
  display: none;
}
/* Custom Select wrapper */
.select {
  position: relative;
  display: flex;
  width: 20em;
  height: 3em;
  border-radius: .25em;
  overflow: hidden;
}
/* Arrow */
.select::after {
  content: '\25BC';
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em;
  background-color: #04AA6D;
  transition: .25s all ease;
  pointer-events: none;
}
/* Transition */
.select:hover::after {
  color: #f5cc53;
}

.mask {
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.75);
  z-index: 100;
  inset: 0;
  overflow-y: scroll;
  justify-content: center;
}

.full-size-img {
  margin-top: 30px;
  margin-bottom: 30px;
  max-width: 95vw;
  height: auto;
}
</style>

<style>
* {
  font-family: "DejaVu Sans Mono";
}
</style>