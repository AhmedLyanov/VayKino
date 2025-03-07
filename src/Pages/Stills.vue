<template>
    <main>
        <div class="main-content">
            <div class="stills">
                <div class="stills-header">
                    <BlockHeader :title="`Кадры из фильма ${title}`" :text="false" :link="false" />
                </div>

                <div class="stills-cont">
                    <Still v-for="(still, index) in stills" :key="index" :still="still" />
                </div>
            </div>
        </div>

        <UpArrow />
    </main>
</template>

<script>
import BlockHeader from '@/Components/BlockHeader.vue';
import UpArrow from "@/Components/UpArrow.vue";
import Still from '@/Components/Still.vue';
import { fetchStills } from '@/Services/apiService';
import { fetchMovieToId } from '@/Services/apiService';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            title: "",
            stills: [],
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
        Still
    },
    methods: {
    ...mapActions(['toggleEmailMailing']),

    showEmailMailing(){
      this.toggleEmailMailing(true)
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
</style>