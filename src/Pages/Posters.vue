<template>
    <main>
        <div class="main-content">
            <div class="posters">
                <div class="poesters-header">
                    <BlockHeader :title="`Постеры к фильму ${title}`" :texe="false" :link="false" />
                </div>
                <div class="poesters-cont">
                    <div class="poster" v-for="(poster, index) in posters" :key="index" @click="openPosterModal(poster.imageUrl)">
                                <div class="poster-img">
                                    <img :src="poster.imageUrl" :alt="index">
                                </div>
                            </div>
                </div>
            </div>
        </div>
        
        <MediaPosterModal :is-open="isModalPosterOpen" :posterUrl="poster" @close="closePosterModal" :posterScale="0.3" />
        <UpArrow />
    </main>
</template>

<script>
import BlockHeader from '@/Components/BlockHeader.vue';
import MediaPosterModal from "@/Components/MediaPosterModal.vue";
import UpArrow from "@/Components/UpArrow.vue";
import { fetchPosters } from '@/Services/apiService';
import { fetchMovieToId } from '@/Services/apiService';

export default{
    data(){
        return {
            title: "",
            posters: [],
            isModalPosterOpen: false,
            poster: ""
        }
    },
    props: {
        movieId: {
            type: String,
            required: true
        }
    },
    components: {
        BlockHeader,
        UpArrow,
        MediaPosterModal,
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
    async mounted() {
        window.scrollTo(0, 0);
        document.title = `Постеры к фильму ${this.title}`
        try {
            this.posters = await fetchPosters(this.movieId);
            this.posters = this.posters.items
            console.log(this.posters);
            
            this.title = await fetchMovieToId(this.movieId)
            console.log(this.title);
            
            this.title = this.title[0].name
        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<style scoped>
.posters{
    width: 100%;
}

.poesters-cont{
    display: grid;
    grid-template-columns: repeat(4, 360px);
    justify-content: space-between;
}

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

  img {
    border-radius: 10px;
    min-width: 100%;
    height: 100%;
  }
}
</style>