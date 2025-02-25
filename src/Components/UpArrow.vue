<template>
  <div class="cont" :style="{ opacity: isPastThreshold ? '1' : '0', pointerEvents: isPastThreshold ? 'auto' : 'none' }" @click="goToUp">
  <img src="../assets/Media/Components/UpArrow.svg" alt="">
</div>
</template>

<script>
export default{
  data() {
    return {
      isPastThreshold: false,
      scrollThreshold: 200
    };
  },
  methods: {
      goToUp(){
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
      },
      handleScroll() {
            this.isPastThreshold = window.scrollY > this.scrollThreshold;
      }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>

<style scoped>
.cont{
    width: 60px;
    height: 60px;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 30px;
    right: 30px;
    background-color: #100F14;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
    transition: 0.5s ease;

    img{
        pointer-events: none;
    }
}
</style>