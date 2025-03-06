<template>
    <div v-if="data.imageUrl" class="poster" @click="openPosterModal(data.imageUrl)">
        <div class="poster-img">
            <img :src="data.imageUrl" :alt="data.imageUrl">
        </div>
        <div v-if="data.name" class="poster-title">{{ data.name }}</div>
    </div>

    <div v-else class="poster">
        <div class="poster-img">
            <div class="loading" style="width: 100%; height: 100%;"></div>
        </div>
    </div>

    <MediaPosterModal :is-open="isModalPosterOpen" :posterUrl="poster" @close="closePosterModal" :posterScale="posterScale" />
</template>

<script>
import MediaPosterModal from "@/Components/MediaPosterModal.vue";

export default {
    data(){
        return {
            isModalPosterOpen: false,
            poster: ""
        }
    },
    components: {
        MediaPosterModal,
    },
    props: {
        data: {
            type: Object,
            required: true
        },
        posterScale: {
            type: Number,
            required: true
        }
    },
    methods: {
        openPosterModal(poster) {
            this.poster = poster;
            this.isModalPosterOpen = true;
            document.body.classList.add('no-scroll');

        },
        closePosterModal() {
            this.isModalPosterOpen = false;
            this.poster = '';
            document.body.classList.remove('no-scroll');
        },
    },
    mounted(){
        console.log(this.data);
        
    }
}
</script>

<style scoped>
.poster {
    height: 100%;
    margin-top: 20px;
    user-select: none;
    cursor: pointer;
}

.poster-img {
    width: 360px;
    height: 540px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    overflow: hidden;

    img {
        border-radius: 10px;
        min-width: 100%;
        height: 100%;
    }
}

.poster-title {
    font-weight: 700;
    font-size: 18px;
    color: white;
}
</style>