<template>
    <main>
        <div class="main-content">
            <div class="posters">
                <div class="poesters-header">
                    <BlockHeader :title="`Постеры к фильму ${title}`" :text="false" :link="false" />
                </div>
                <div class="poesters-cont">
                    <Poster v-if="posters.length" v-for="(poster, index) in posters" :key="index" :data="{imageUrl: poster.imageUrl}" :posterScale="0.3" />
                    <Poster v-else v-for="index in 8" :key="index + '_'" :data="{}" :posterScale="0.3" />
                </div>
            </div>
        </div>

        <UpArrow />
    </main>
</template>

<script>
import BlockHeader from '@/Components/BlockHeader.vue';
import Poster from '@/Components/Poster.vue';
import UpArrow from "@/Components/UpArrow.vue";
import { fetchPosters } from '@/Services/apiService';
import { fetchMovieToId } from '@/Services/apiService';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            title: "",
            posters: [],
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
        Poster
    },
    methods: {
        ...mapActions(['toggleEmailMailing']),

        showEmailMailing() {
            this.toggleEmailMailing(true)
        },
    },
    async mounted() {
        window.scrollTo(0, 0);
        this.showEmailMailing()
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
        document.title = `Постеры к фильму ${this.title}`
    }
}
</script>

<style scoped>
.posters {
    width: 100%;
}

.poesters-cont {
    display: grid;
    grid-template-columns: repeat(4, 360px);
    justify-content: space-between;
}
</style>