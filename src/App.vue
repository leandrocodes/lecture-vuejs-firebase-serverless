<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <ul>
      <li v-for="product in products" :key="product.id">
        <div class="product__data">
          {{ product.data.name }}
        </div>
        <div class="product__actions">
          <span>Ver mais</span>
          <span>Alterar</span>
          <span>Excluir</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    products: []
  }),
  async created() {
    const { data } = await this.$axios.get('products')
    this.products = data
  }
}
</script>

<style>
#app {
  font-family: sans-serif;
}

ul {
  list-style: none;
}

ul li {
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  padding: 2rem 1rem;
  margin: 2rem 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product__actions span {
  margin: 0 0.25rem;
}

.product__actions span:nth-child(1) {
  color: blue;
}
.product__actions span:nth-child(2) {
  color: orange;
}
.product__actions span:nth-child(3) {
  color: red;
}
</style>
