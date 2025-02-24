<template>
  <Header />

  <router-view />

  <div v-if="showOverlay" class="overlay" @contextmenu.prevent></div>

  <Footer />
</template>

<script>
import Header from './Components/Header.vue';
import Footer from './Components/Footer.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapGetters(['showOverlay']),
  },
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.89);
  /* backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px); */
  z-index: 9998;
}
</style>
