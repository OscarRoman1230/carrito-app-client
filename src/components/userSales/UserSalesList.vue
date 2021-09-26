<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-2" />
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead class="bg-primary text-white">
            <tr>
              <th>Id</th>
              <th>codigo de compra</th>
              <th>Valor($)</th>
              <th>Fecha de compra</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in userSales" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.codeSale }}</td>
              <td>{{ Intl.NumberFormat('en-US').format(parseInt(item.totalValue)) }}</td>
              <td>{{ new Date(item.created_at).toLocaleDateString() }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSalesList",
  data: () => ({
    userSales: [],
    urlApi: 'http://127.0.0.1:8000/api'
  }),
  mounted() {
    this.getUserSales()
  },
  methods: {
    async getUserSales () {
      const id = localStorage.getItem('userId')
      await this.axios.get(`${this.urlApi}/sale-products/my-sales/${id}`)
          .then(res => {
            this.userSales = res.data.saleProducts
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
