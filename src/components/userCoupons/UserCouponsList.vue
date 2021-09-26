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
              <th>Nombre</th>
              <th>Codigo</th>
              <th>Descuento(%)</th>
              <th>Fecha de adquisición</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in userCoupon" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.code }}</td>
              <td>{{ parseFloat(item.discount) * 100 }}%</td>
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
  name: "UserCouponsList",
  data: () => ({
    userCoupon: [],
    urlApi: 'http://127.0.0.1:8000/api'
  }),
  mounted() {
    this.getCoupons()
  },
  methods: {
    async getCoupons () {
      const id = localStorage.getItem('userId')
      await this.axios.get(`${this.urlApi}/user-coupon/${id}`)
          .then(res => {
            this.userCoupon = res.data
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
