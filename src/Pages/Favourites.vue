<template>
    <main>
        <div class="main-content">
            <div class="favourites">
                <div class="favourites-header">
                    <BlockHeader :title="'Избранное'" :text="false" :link="false" />
                </div>
                <div v-if="favourites.length" class="favourites-cont">
                    <Card v-if="!isLoading" v-for="(favourite, index) in favourites" :key="index" :data="favourite" :contextMenu="false" style="margin-top: 20px;" />
                    <Card v-else v-for="key in 8" :key="key" :data="{}" style="margin-top: 20px;" />
                </div>

                <div v-else class="favourites-none">Вы не добавили ни одного фильма в избранное</div>
            </div>
        </div>
    </main>
</template>

<script>
import BlockHeader from '@/Components/BlockHeader.vue';
import Card from '@/Components/Card.vue';
import { mapActions } from 'vuex';

export default{
    data(){
        return {
            favourites: [],
            isLoading: false
        }
    },
    components: {
        BlockHeader,
        Card
    },
    mounted(){
        document.title = "Избранное"
        this.showEmailMailing()
        if(JSON.parse(localStorage.getItem("currentUser"))){
            this.isLoading = true
            const user = JSON.parse(localStorage.getItem("currentUser"))
            const userId = user._id
            this.favourites = JSON.parse(localStorage.getItem(`${userId}_favoriteMovies`)) || []
            this.isLoading = false
        } else{
            this.$router.push({ path: "/login" })
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
.favourites{
    width: 100%;
}

.favourites-cont{
    justify-content: space-between;
    display: grid;
    grid-template-columns: repeat(4, 340px);
}

.favourites-none{
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 27px;
}
</style>