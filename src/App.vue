<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <button class="new__product" @click="openModal = true">Adicionar produto</button>
    <ul>
      <li v-for="product in products" :key="product.id">
        <div class="product__data">{{ product.data.name }} - R$ {{ product.data.price }}</div>
        <div class="product__actions">
          <button @click="showMore(product.id)">Ver mais</button>
          <button @click="openModalForChange(product)">Alterar</button>
          <button @click="excluir(product.id)">Excluir</button>
        </div>
      </li>
    </ul>

    <modal v-if="openModal">
      <template v-slot:header>
        <h3>{{ isNotShowProduct ? 'Formulário de Produto' : 'Detalhes do Produto' }}</h3>
      </template>

      <template v-slot:body>
        <form>
          <label for="name">Nome do produto: </label>
          <input type="text" id="name" placeholder="Calça Jeans" v-model="product.name" />
          <label for="brand">Marca do produto:</label>
          <input type="text" id="brand" placeholder="Levi's" v-model="product.brand" />
          <label for="quantity">Quantidade do produto:</label>
          <input
            type="number"
            id="quantity"
            placeholder="135"
            v-model.number="product.quantity"
          />
          <label for="price">Preço do produto:</label>
          <input type="number" id="price" placeholder="45" v-model.number="product.price" />
        </form>
      </template>

      <template v-slot:footer>
        <button class="close__button" @click.prevent="closeModal">Fechar</button>
        <button
          v-if="isNotShowProduct && isNotUpdateProduct"
          class="save__product"
          @click.prevent="createProduct"
        >
          Enviar
        </button>
        <button
          v-else-if="isNotShowProduct && !isNotUpdateProduct"
          class="save__product"
          @click.prevent="changeProduct"
        >
          Salvar
        </button>
      </template>
    </modal>
  </div>
</template>

<script>
import modal from './components/modal'

export default {
  name: 'App',
  components: { modal },
  data: () => ({
    openModal: false,
    isNotShowProduct: true,
    isNotUpdateProduct: true,
    products: [],
    product: {
      name: '',
      brand: '',
      quantity: '',
      price: ''
    }
  }),
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data } = await this.$axios.get('products')
      this.products = data
    },
    async createProduct() {
      const { data } = await this.axios.post('products', this.product)
      if (data.UID) {
        await this.getList()
        this.openModal = false
      }
    },
    async excluir(id) {
      await this.$axios.delete(`products/${id}`)
      this.getList()
    },
    async showMore(id) {
      const {
        data: { data }
      } = await this.$axios.get(`products/${id}`)
      this.product = data
      this.openModal = true
      this.isNotShowProduct = false
    },
    async openModalForChange({ data, id }) {
      this.product = data
      this.product.id = id
      this.openModal = true
      this.isNotUpdateProduct = false
    },
    async changeProduct(id) {
      await this.$axios.patch(`products/${this.product.id}`, this.product)
      this.closeModal()
      this.getList()
    },
    closeModal() {
      this.openModal = false
      this.isNotShowProduct = true
      this.product = {
        name: '',
        brand: '',
        quantity: '',
        price: ''
      }
    }
  }
}
</script>

<style>
#app {
  font-family: sans-serif;
  max-width: 720px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  outline: none;
  position: relative;
  transition: all 0.3s;
}

.new__product {
  font-weight: 700;
  border-radius: 0 0 5px 5px;
  text-transform: uppercase;
  padding: 25px 80px;
  font-size: 1rem;
  background: #4e8fcb;
  color: #fff;
  box-shadow: 0 6px #386b9b;
  transition: none;
  margin: 0 auto;
  text-align: center;
}

.save__product {
  font-weight: 700;
  border-radius: 0 0 5px 5px;
  text-transform: uppercase;
  padding: 10px 20px;
  font-size: 1rem;
  background: #4ecb78;
  color: #fff;
  box-shadow: 0 6px #45b169;
  transition: none;
  text-align: center;
}

.close__button {
  font-weight: 700;
  border-radius: 0 0 5px 5px;
  text-transform: uppercase;
  padding: 10px 20px;
  font-size: 1rem;
  background: #cb4e4e;
  color: #fff;
  box-shadow: 0 6px #9b3c3c;
  transition: none;
  text-align: center;
}

ul {
  list-style: none;
}

ul li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  padding: 2rem 1rem;
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product__actions {
  display: flex;
  justify-content: center;
}

.product__actions button {
  margin: 0 0.25rem;
  padding: 5px 8px;
  border-radius: 0 0 5px 5px;
  color: #fff;
  transition: none;
  text-align: center;
}

.product__actions button:nth-child(1) {
  background-color: #4e5acb;
  box-shadow: 0 6px #3c459c;
}
.product__actions button:nth-child(2) {
  background-color: orange;
  box-shadow: 0 6px rgb(209, 136, 0);
}
.product__actions button:nth-child(3) {
  background-color: red;
  box-shadow: 0 6px rgb(199, 0, 0);
}

form {
  display: flex;
  flex-direction: column;
}

form label {
  margin-top: 15px;
  font-size: 1.15rem;
}

form input {
  padding: 5px;
  font-size: 1.15rem;
}
</style>
