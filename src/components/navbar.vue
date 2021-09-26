<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-2">
    <div class="container-fluid">
      <router-link :to="{ name: 'Auth' }" class="navbar-brand">
        <img src="https://vuejs.org/images/logo.svg" alt="" width="30" height="24">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link exact-active-class="active" to="/products" class="nav-link">Productos</router-link>
          </li>
          <li class="nav-item" v-if="loggedIn()">
            <router-link exact-active-class="active" to="/user-sales" class="nav-link">Mis compras</router-link>
          </li>
          <li class="nav-item" v-if="loggedIn()">
            <router-link exact-active-class="active" to="/user-coupon" class="nav-link">Mis cupones</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <ul class="navbar-nav">
            <li class="nav-item dropdown" v-if="loggedIn()">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{user.name}}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><button class="dropdown-item" @click="logout">cerrar sesión</button></li>
              </ul>
            </li>
            <li class="nav-item" v-else>
              <router-link exact-active-class="active" to="/" class="nav-link">Iniciar sesion</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  data: () => ({
    user: {},
    urlApi: 'http://127.0.0.1:8000/api',
    token: localStorage.getItem('token'),
    options: {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  }),
  mounted() {
    if (this.loggedIn()) {
      this.getUser()
    }
  },
  methods: {
    loggedIn () {
      return !!localStorage.getItem('token')
    },
    async getUser () {
      await this.axios.post(`${this.urlApi}/auth/me`, {}, this.options)
          .then(res => {
            this.user = res.data
            localStorage.setItem('userId', this.user.id)
          })
          .catch(err => {
            console.log(err)
          })
    },
    async logout () {
      await this.axios.post(`${this.urlApi}/auth/logout`, {}, this.options)
          .then(res => {
            console.log(res.data.message)
            localStorage.clear()
            this.user = {}
            window.location.href = '/'
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
