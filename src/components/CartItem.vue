<template>
  <td>
    <img class="cart-item-icon" :src="data.cover">
  </td>
  <td class="quantity-cell">
    <div class="quantity-button">
      <button type="button" @click="changeQuantity(1)">+</button>
      <button type="button" @click="changeQuantity(-1)">-</button>
    </div>
  </td>
  <td>
    <span style="min-width: 61px">{{ quantity+"x" }}</span>
  </td>
  <td>{{ capitalize(data.name) }}</td>
  <td class="item-total">{{ quantity * data.price + " €"}}</td>
  <td>
    <button class="delete-button" type="button" @click="changeQuantity(-Infinity)">
      <img src="../assets/delete-icon.svg">
    </button>
  </td>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Cart",
  props: ["data","quantity"],
  emits: ["addToCart"],
  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    changeQuantity(value) {
      this.$emit('addToCart', this.data.id, value);
    },
  }
}
</script>

<style scoped>
  .cart-item-icon{
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 10%;
  }

  .quantity-button {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    margin-left: auto;
  }

  .quantity-button button{
    height: 20px;
    font-weight: bolder;
  }

  .quantity-cell {
    display: flex;
    align-items: center;
    height: 50px;
    text-align: right;
  }

  .item-total {
    text-align: right;
    min-width: 56px;
  }

  td {
    padding-top: 5px;
  }

  *{
    font-family: "Roboto Light";
  }
</style>