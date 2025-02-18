<template>
    <div class="cont" :style="{ opacity: isAtTop ? '0' : '1', pointerEvents: isAtTop ? 'none' : 'auto' }" @click="goToUp">
    <img src="../assets/Media/Components/UpArrow.svg" alt="">
  </div>
</template>

<script>
export default{
    data() {
      return {
        isAtTop: true
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
              this.isAtTop = window.scrollY === 0; 
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
    transition: 0.3s;

    img{
        pointer-events: none;
    }
}
</style>