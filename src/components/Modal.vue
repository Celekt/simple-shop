<template>
  <div class="mask" @click="overlay=modalResult(false)">
    <div class="modal-container">
      <div class="modal-body">
        <p class="modal-text">
          <slot></slot>
        </p>
        <div class="buttons">
          <button class="yes-button" type="button" @click.stop="modalResult(true)">Oui</button>
          <button class="no-button"  type="button" @click.stop="modalResult(false)">Non</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Modal",
  props: ["activate","resolve"],
  data() {
    return {
      overlay: false,
    }
  },
  mounted() {
    document.querySelector("body").style.overflow = 'hidden';
  },
  beforeUnmount() {
    document.querySelector("body").style.overflow = 'visible';
  },
  methods: {
    modalResult(confirm){
      this.$emit('resolve',confirm)
    }
  },
}
</script>

<style scoped>
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

.modal-container {
  margin-top: 100px;
  position: static;
  background-color: lightgrey;
  border-radius: 15px;
  max-width: 50%;
  height: fit-content;
}

.modal-body {
  padding: 10px;
}

.buttons {
  display: flex;
  justify-content: center;
}

.no-button {
  background-color: transparent;
  border-color: #de2810;
  border-width: 3px;
  border-radius: 7px;
  color: #de2810;
}

.no-button:hover {
  background-color: darkgrey;
}

.yes-button {
  background-color: #04AA6D;
  border-color: #04AA6D;
  border-radius: 7px;
  color: white;
}

.yes-button:hover {
  background-color: #04724a;
  border-color: #04724a;
}

button {
  font-size: 20px;
  width: 100px;
  margin: 5px
}

.modal-text {
  text-align: center;
  font-size: 25px;
}
</style>