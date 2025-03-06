<template>
    <div class="still-img">
        <img :src="still.previewUrl" :alt="index" @click="openPosterModal(still.imageUrl)" />
    </div>

    <MediaPosterModal :is-open="isModalPosterOpen" :posterUrl="still.imageUrl" @close="closePosterModal" :posterScale="0.4" />
</template>

<script>
import MediaPosterModal from "@/Components/MediaPosterModal.vue";

export default {
    data(){
        return {
            isModalPosterOpen: false,
            still: ""
        }
    },
    components: {
        MediaPosterModal,
    },
    props: {
        still: {
            type: Object,
        }
    },
    methods: {
        openPosterModal(still) {
            this.still = still;
            this.isModalPosterOpen = true;
            document.body.classList.add('no-scroll');

        },
        closePosterModal() {
            this.isModalPosterOpen = false;
            this.still = '';
            document.body.classList.remove('no-scroll');
        },
    }
}
</script>

<style scoped>
.still-img {
    user-select: none;
    cursor: pointer;
    width: 365px;
    height: 245px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    img {
        width: 100%;
        min-height: 100%;
    }
}
</style>