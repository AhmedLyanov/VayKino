<template>
    <main>
        <div class="main-content">
            <div class="list">
                <BlockHeader :title="categoryTitle" :text="false" :link="false" />

                <div class="list-cont">
                    <Card v-if="movies.length" v-for="(film, index) in movies" :data="film" :contextMenu="false" :key="index" />
                    <Card v-else v-for="key in 16" :key="key" :data="false" />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { useRoute } from 'vue-router';
import { mapGetters } from 'vuex';
import { fetchMoviesToList } from '@/Services/apiService';
import BlockHeader from '@/Components/BlockHeader.vue';
import Card from '@/Components/Card.vue';

export default {
    data(){
        return{
            movies: []
        }
    },
    components: {
        BlockHeader,
        Card
    },
    setup() {
        const route = useRoute();
        const list = route.params.list;

        return { list };
    },
    async mounted(){
        window.scrollTo(0, 0);
        document.title = this.categoryTitle
        this.movies = await fetchMoviesToList(this.list)
    },
    computed: {
    ...mapGetters(['getCategoryTitleByUrl']),
    categoryTitle() {
      return this.getCategoryTitleByUrl(this.list);
    },
  },
}
</script>

<style scoped>
.list{
    width: 100%;
}

.list-cont{
    display: grid;
    grid-template-columns: repeat(4, 340px);
    justify-content: space-between;
    gap: 20px;
    margin-top: 50px;
}
</style>