<template>
    <main>
        <div class="main-content">
            <div class="stills">
                <div class="stills-header">
                    <BlockHeader :title="`Кадры из фильма ${title}`" :text="false" :link="false" />
                </div>

                <div class="stills-cont">
                    <div v-for="(still, index) in stills" :key="index" class="stills-img">
                        <img :src="still.previewUrl" :alt="index" @click="openPosterModal(still.imageUrl)" />
                    </div>
                </div>
            </div>
        </div>

        <MediaPosterModal :is-open="isModalPosterOpen" :posterUrl="still" @close="closePosterModal" :posterScale="0.4" />
        <UpArrow />
    </main>
</template>

<script>
import BlockHeader from '@/Components/BlockHeader.vue';
import MediaPosterModal from "@/Components/MediaPosterModal.vue";
import UpArrow from "@/Components/UpArrow.vue";
import { fetchStills } from '@/Services/apiService';
import { fetchMovieToId } from '@/Services/apiService';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            title: "",
            stills: [],
            isModalPosterOpen: false,
            still: ""
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
    ...mapActions(['toggleEmailMailing']),

    showEmailMailing(){
      this.toggleEmailMailing(true)
    },
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
    },
    async mounted() {
        window.scrollTo(0, 0);
        document.title = `Кадры из фильма ${this.title}`
        this.showEmailMailing()
        try {
            this.stills = await fetchStills(this.movieId);
            this.stills = this.stills.items
            console.log(this.stills);

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
.stills {
    width: 100%;
}

.stills-cont {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-top: 40px;
}

.stills-img {
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