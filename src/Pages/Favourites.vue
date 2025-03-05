<template>
    <main>
        <div class="main-content">
            <div class="favourites">
                <div class="favourites-header">
                    <BlockHeader :title="'Избранное'" :text="false" :link="false" />
                </div>
                <div class="favourites-cont">
                    <Card v-for="(favourite, index) in favourites" :key="index" :data="favourite" style="margin-top: 20px;" />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import BlockHeader from '@/Components/BlockHeader.vue';
import Card from '@/Components/Card.vue';

export default{
    data(){
        return {
            favourites: []
        }
    },
    components: {
        BlockHeader,
        Card
    },
    mounted(){
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const userId = user._id
        this.favourites = JSON.parse(localStorage.getItem(`${userId}_favoriteMovies`))
        console.log(this.favourites);
        
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
</style>