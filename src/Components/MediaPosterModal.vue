<template>
    <div
      class="modal-overlay"
      v-if="isOpen"
      @click.self="closeModal"
    >
      <div
        class="modal"
        :style="modalStyle"
        @mousedown="startDrag"
      >
        <img
          :src="posterUrl"
          alt="poster"
          draggable="false"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      posterUrl: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        scale: 1.4,
        translateX: 0,
        translateY: 0,
        isDragging: false,
        startX: 0,
        startY: 0,
        initialTranslateX: 0,
        initialTranslateY: 0,
      };
    },
    computed: {
      modalStyle() {
        return {
          transform: `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`,
        };
      },
    },
    mounted() {
      document.addEventListener("keydown", this.handleEsc);
      document.addEventListener("wheel", this.handleScroll, { passive: false });
      document.addEventListener("mousemove", this.drag);
      document.addEventListener("mouseup", this.stopDrag);
      document.addEventListener("mouseleave", this.stopDrag);
    },
    beforeUnmount() {
      document.removeEventListener("keydown", this.handleEsc);
      document.removeEventListener("wheel", this.handleScroll, { passive: false });
      document.removeEventListener("mousemove", this.drag);
      document.removeEventListener("mouseup", this.stopDrag);
      document.removeEventListener("mouseleave", this.stopDrag);
    },
    methods: {
      closeModal() {
        this.$emit("close");
        this.resetModalState();
      },
      handleEsc(event) {
        if (event.key === "Escape" || event.keyCode === 27) {
          this.closeModal();
        }
      },
      handleScroll(event) {
        if (event.ctrlKey) {
          event.preventDefault();
  
          const zoomSpeed = 0.1;
          if (event.deltaY > 0) {
            this.scale = Math.max(0.2, this.scale - zoomSpeed);
          } else {
            this.scale = Math.min(5, this.scale + zoomSpeed);
          }
        }
      },
      startDrag(event) {
        this.isDragging = true;
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.initialTranslateX = this.translateX;
        this.initialTranslateY = this.translateY;
        document.body.style.cursor = 'grab';
      },
      drag(event) {
        if (!this.isDragging) return;
        const deltaX = event.clientX - this.startX;
        const deltaY = event.clientY - this.startY;
        this.translateX = this.initialTranslateX + deltaX;
        this.translateY = this.initialTranslateY + deltaY;
      },
      stopDrag() {
        this.isDragging = false;
        document.body.style.cursor = 'default';
      },
      resetModalState() {
        this.scale = 1.4;
        this.translateX = 0;
        this.translateY = 0;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.initialTranslateX = 0;
        this.initialTranslateY = 0;
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.89);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    display: flex;
    align-items: center;
    transition: transform 0.1s ease-out;
    cursor: grab;
    max-width: 90%;
    max-height: 90%;
  }
  
  .modal img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    user-select: none;
    pointer-events: none;
  }
  </style>
  