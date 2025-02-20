<template>
  <Header />

  <router-view />

  <Footer />
</template>

<script>
import Header from './Components/Header.vue';
import Footer from './Components/Footer.vue';
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped></style>
