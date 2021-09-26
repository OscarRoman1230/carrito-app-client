<template>
  <main>
    <div id="nav">
      <navbar />
    </div>
    <div class="container">
      <router-view/>
    </div>
  </main>
</template>
<script>
import navbar from "./components/navbar";
export default {
  name: 'App',
  components: {
    navbar
  }
}
</script>

<style></style>
