<template>
    <main>
        <div class="main-content">
            <div class="awards">
                <div class="awards-header">
                    <BlockHeader :title="`Награды фильма ${title}`" :text="false" :link="false" />
                </div>

                <div class="awards-cont">
                    <AwardCard v-for="(award, index) in awards" :key="index" :award="award" style="margin-top: 20px;" />
                </div>
            </div>
        </div>

        <UpArrow />
    </main>
</template>

<script>
import BlockHeader from '@/Components/BlockHeader.vue';
import UpArrow from "@/Components/UpArrow.vue";
import AwardCard from '@/Components/AwardCard.vue';
import { fetchAwards } from '@/Services/apiService';
import { fetchMovieToId } from '@/Services/apiService';
import { mapActions } from 'vuex';

export default{
    data(){
        return {
            title: "",
            awards: []
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
        AwardCard,
        UpArrow
    },
    async mounted(){
        window.scrollTo(0, 0);
        document.title = `Награды фильма ${this.title}`
        this.showEmailMailing()
        try {
            this.awards = await fetchAwards(this.movieId);
            this.awards = this.awards.items
            console.log(this.awards);
            
            this.title = await fetchMovieToId(this.movieId)
            console.log(this.title);
            
            this.title = this.title[0].name
        } catch (error) {
            console.error(error);
        }
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
.awards{
    width: 100%;
}

.awards-cont {
  display: grid;
  grid-template-columns: repeat(4, 370px);
  justify-content: space-between;
}
</style>