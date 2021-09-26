<template>
  <div>
    <div class="mx-auto">
      <div class="card mx-auto" style="width: 300px;">
        <div class="container">
          <h5 class="card-title my-2">{{ formTitle }}</h5>
          <form @submit.prevent="signIn">
            <div class="row">
              <div class="col-md-12 mb-2" v-if="!login">
                <div class="form-group">
                  <label>Nombre</label>
                  <input type="text" class="form-control" v-model="form.name" required>
                </div>
              </div>
              <div class="col-md-12 mb-2">
                <div class="form-group">
                  <label>Correo Electronico</label>
                  <input type="email" class="form-control" v-model="form.email" required>
                </div>
              </div>
              <div class="col-md-12 mb-2">
                <div class="form-group">
                  <label>Contraseña</label>
                  <input type="password" class="form-control" v-model="form.password" required>
                </div>
              </div>
              <div class="col-md-12 mb-2 d-grid gap-2">
                <button type="submit" class="btn btn-primary" v-if="login">Ingresar</button>
                <button class="btn btn-secondary" @click="registerForm" v-if="login">Crear Usuario</button>
                <button class="btn btn-primary" @click="register" v-if="!login">Registrarse</button>
                <button class="btn btn-secondary" @click="loginForm" v-if="!login">Iniciar Sesión</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-if="alertSuccess" class="alert alert-success mx-auto my-2" role="alert" style="width: 500px">
        {{ alertSuccess }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthForm",
  data: () => ({
    form: {
      name: '',
      email: '',
      password: ''
    },
    login: true,
    formTitle: 'Iniciar Sesión',
    urlApi: process.env.URL_API + '/auth',
    alertSuccess: ''
  }),
  methods: {
    registerForm () {
      this.login = false
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
      this.formTitle = 'Crear Usuario'
    },
    loginForm () {
      this.login = true
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
      this.formTitle = 'Iniciar Sesión'
    },
    async signIn () {
      await this.axios.post(`${this.urlApi}/login`, this.form)
          .then(res => {
            localStorage.setItem('token', res.data.access_token)
            this.$router.push({ name: 'Products' })
          })
          .catch(err => {
            alert(err.message)
          })
    },
    async register () {
      await this.axios.post(`${this.urlApi}/register`, this.form)
          .then(res => {
            this.loginForm()
            this.alertSuccess = res.data.message
          })
          .catch(err => {
            alert(err.message)
          })
    }
  }
}
</script>

<style scoped>

</style>
