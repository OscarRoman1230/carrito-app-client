<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-2" />
      <div class="col-8">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead class="bg-primary text-white">
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Valor($)</th>
              <th v-if="!loggedIn">agregar al carrito</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in products" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ Intl.NumberFormat('en-US').format(item.value) }}</td>
              <td v-if="!loggedIn">
                <button class="btn btn-outline-primary" @click="addCart(item)"><i class="fas fa-cart-plus"></i></button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-4">
        <div class="row">
          <div class="col-12" v-if="loggedIn">
            <div class="card">
              <div class="container">
                <h4 class="card-title">
                  Si deseas comprar
                </h4>
                <div class="d-grid gap-1">
                  <router-link :to="{ name: 'Auth'}" class="btn btn-success m-2">Inicia sesión</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12" v-else>
            <div class="card">
              <div class="container">
                <h4 class="card-title">Total a pagar: ${{ Intl.NumberFormat('en-US').format(cart.totalValue) }}</h4>
                <button v-if="cart.products.length > 0" type="button" class="btn btn-success my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  pagar <i class="fas fa-comment-dollar"></i>
                </button>
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead class="bg-primary text-white">
                    <tr>
                      <th>producto</th>
                      <th>Valor($)</th>
                      <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in cart.preProducts" :key="index">
                      <td>{{ item.name }}</td>
                      <td>{{ Intl.NumberFormat('en-US').format(item.value) }}</td>
                      <td>
                        <button class="btn btn-danger" @click="dropProductCart(index, item.value)"><i class="fas fa-trash-alt"></i></button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Pagar</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul class="list-group mb-2">
              <li v-for="(item, index) in cart.preProducts" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                {{ item.name }}
                <span class="badge bg-primary rounded-pill">${{ Intl.NumberFormat('en-US').format(item.value) }}</span>
              </li>
            </ul>
            <div class="form-group">
              <label>Validar cupon de descuento</label>
              <div class="input-group mb-3">
                <input type="text" v-model="codeCoupon" class="form-control" placeholder="Codigo de descuento" aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-primary" type="button" id="button-addon2" @click="couponValidate">Validar</button>
              </div>
              <h3>Total del descuento: {{ valueDiscount }}</h3>
              <h3>Total a pagar: {{ cart.totalValue }}</h3>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-success" @click="toPay">Pagar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsList",
  data: () => ({
    products: [],
    cart: {
      totalValue: 0,
      user_id: localStorage.getItem('userId'),
      products: [],
      preProducts: []
    },
    codeCoupon: '',
    valueDiscount: 0,
    urlApi: 'http://127.0.0.1:8000/api'
  }),
  mounted() {
    this.getProducts()
  },
  methods: {
    loggedIn () {
      return !!localStorage.getItem('token')
    },
    async getProducts () {
      await this.axios.get(`${this.urlApi}/products`)
          .then(res => {
            this.products = res.data
          })
          .catch(err => {
            console.log(err.message)
          })
    },
    addCart (item) {
      this.cart.totalValue += parseInt(item.value)
      this.cart.products.push({product_id: item.id})
      this.cart.preProducts.push(item)
    },
    dropProductCart (i, value) {
      this.cart.preProducts.splice(i, 1)
      this.cart.products.splice(i, 1)
      this.cart.totalValue -= value
    },
    async couponValidate () {
      if (this.codeCoupon !== '') {
        await this.axios.get(`${this.urlApi}/user-coupon/validate/${this.codeCoupon}`)
            .then(res => {
              console.log(res.data)
              this.valueDiscount = (this.cart.totalValue * parseFloat(res.data[0].discount))
              this.cart.totalValue -= this.valueDiscount
            })
            .catch(err => {
              console.log(err)
            })
      }
    },
    async toPay () {
      await this.axios.post(`${this.urlApi}/sale-products`, this.cart)
          .then(res => {
            console.log(res.data)
            this.cart.totalValue = 0
            this.cart.preProducts = []
            this.cart.products = []
            const myModal = document.getElementById('exampleModal');
            myModal.hide()
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
</script>

<style scoped>

</style>
