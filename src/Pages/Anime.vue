<template>
    <main>
        <div class="main-content">
            <div class="movies">
                <BlockHeader :title="'Аниме'" :text="false" :link="false" />

                <div class="movies-cont">
                    <Card v-if="clearAnimes.length" v-for="(film, index) in clearAnimes" :data="film" :key="index" />
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
            allAnimes: [],
            allAnimeSeries: [],
            clearAnimes: [],
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
            let allAnimeSeries = await fetchFreeAPI2(`&type=anime-series&limit=30&page=${this.moviesPage}`);
            let allAnimes = await fetchFreeAPI2(`&type=anime&limit=10&page=${this.moviesPage}`);

            let combinedAnimes = [];
            let seriesIndex = 0;
            let moviesIndex = 0;

            while (seriesIndex < allAnimeSeries.length || moviesIndex < allAnimes.length) {
                for (let i = 0; i < 5 && seriesIndex < allAnimeSeries.length; i++) {
                    combinedAnimes.push(allAnimeSeries[seriesIndex]);
                    seriesIndex++;
                }
                if (moviesIndex < allAnimes.length) {
                    combinedAnimes.push(allAnimes[moviesIndex]);
                    moviesIndex++;
                }
            }
            this.clearAnimes = combinedAnimes.filter(movie => {
                if (!movie.genre) {
                    return true;
                }
                const hasErotica = Object.values(movie.genre).includes("Эротика");
                return !hasErotica && !this.blackList.includes(movie.name);
            });
            this.allAnimes = this.clearAnimes;
        },
        blackList() {
            this.clearAnimes = this.allAnimes.filter(obj => !this.blackList.includes(obj.name))
        }
    },
    async mounted() {
        window.scrollTo(0, 0);
        document.title = 'Аниме'
        this.showEmailMailing()
        let allAnimeSeries = await fetchFreeAPI2(`&type=anime-series&limit=22&page=${this.moviesPage}`);
            let allAnimes = await fetchFreeAPI2(`&type=anime&limit=10&page=${this.moviesPage}`);

            let combinedAnimes = [];
            let seriesIndex = 0;
            let moviesIndex = 0;

            while (seriesIndex < allAnimeSeries.length || moviesIndex < allAnimes.length) {
                for (let i = 0; i < 5 && seriesIndex < allAnimeSeries.length; i++) {
                    combinedAnimes.push(allAnimeSeries[seriesIndex]);
                    seriesIndex++;
                }
                if (moviesIndex < allAnimes.length) {
                    combinedAnimes.push(allAnimes[moviesIndex]);
                    moviesIndex++;
                }
            }
            this.clearAnimes = combinedAnimes.filter(movie => {
                if (!movie.genre) {
                    return true;
                }
                const hasErotica = Object.values(movie.genre).includes("Эротика");
                return !hasErotica && !this.blackList.includes(movie.name);
            });
            this.allAnimes = this.clearAnimes;
    },
    methods: {
        ...mapActions(['toggleEmailMailing']),

        showEmailMailing() {
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
    grid-template-columns: repeat(5, 280px);
    justify-content: space-between;
    gap: 30px;
    margin-top: 40px;
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