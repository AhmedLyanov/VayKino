<template>
    <main>
        <div class="main-content">
            <div class="movies">
                <BlockHeader :title="'Фильмы'" :text="false" :link="false" />

                <div class="movies-cont">
                    <Card v-if="clearMovies.length" v-for="(film, index) in clearMovies" :data="film" :key="index" />
                    <Card v-else v-for="key in 16" :key="key" :data="{}" />
                </div>
                <div class="movies-loadmore" @click="moviesPage++">Загрузить еще</div>
            </div>
        </div>

        <UpArrow />
    </main>
</template>

<script>
import BlockHeader from '@/Components/BlockHeader.vue';
import { fetchFreeAPI2 } from '@/Services/apiService';
import Card from '@/Components/Card.vue';
import { mapActions, mapGetters } from 'vuex';
import UpArrow from '@/Components/UpArrow.vue';

export default {
    data() {
        return {
            moviesPage: 1,
            allMovies: [],
            clearMovies: [],
        }
    },
    computed: {
        ...mapGetters(['blackList']),
    },
    components: {
        BlockHeader,
        Card,
        UpArrow
    },
    watch: {
        async moviesPage() {
            let allMovies = await fetchFreeAPI2(`&type=film&limit=40&page=${this.moviesPage}`)
            this.allMovies = this.allMovies.concat(allMovies);
            this.clearMovies = this.allMovies.filter(movie => {
                if (!movie.genre) {
                    return true;
                }
                const hasErotica = Object.values(movie.genre).includes("Эротика");
                return !hasErotica && !this.blackList.includes(movie.name);
            });
        },
        blackList() {
            this.clearMovies = this.allMovies.filter(obj => !this.blackList.includes(obj.name))
        }
    },
    async mounted() {
        window.scrollTo(0, 0);
        document.title = 'Фильмы'
        this.showEmailMailing()
        this.allMovies = await fetchFreeAPI2(`&type=film&limit=40&page=${this.moviesPage}`)
        this.clearMovies = this.allMovies.filter(movie => {
            if (!movie.genre) {
                return true;
            }
            const hasErotica = Object.values(movie.genre).includes("Эротика");
            return !hasErotica && !this.blackList.includes(movie.name);
        });
    },
    methods: {
    ...mapActions(['toggleEmailMailing']),

    showEmailMailing(){
      this.toggleEmailMailing(true)
    },
    }
}
</script>

<style scoped>
.movies {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.movies-cont {
    display: grid;
    grid-template-columns: repeat(4, 340px);
    justify-content: space-between;
    gap: 30px;
}

.movies-loadmore {
    padding: 20px 25px;
    border: 1px solid white;
    color: white;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    cursor: pointer;
    user-select: none;
}
</style>