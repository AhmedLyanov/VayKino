<template>
    <main>
        <div class="main-content">
            <div class="lists">
                <BlockHeader :title="'Подборки'" :text="false" :link="false" />

                <div class="lists-cont">
                    <div class="lists-card" v-for="(listsCard, index) in listsCards" :key="index">
                        <div class="card-icon">
                            <span v-html="listsCard.ico"></span>
                        </div>

                        <div class="card-info">
                            <div class="card-title">{{ listsCard.title }}</div>
                            <div class="card-movie_count">{{ listsCard.moviesCount }}</div>
                        </div>

                        <div class="card-but" @click="goToTarget(listsCard.url)">Посмотреть</div>
                    </div>
                </div>
            </div>
        </div>

        <UpArrow />
    </main>
</template>

<script>
import { useRouter } from 'vue-router';
import { mapGetters } from 'vuex';
import BlockHeader from '@/Components/BlockHeader.vue';
import UpArrow from '@/Components/UpArrow.vue';

export default {
    data() {
        return {
            listsCards: []
        }
    },
    components: {
        BlockHeader,
        UpArrow
    },
    setup() {
        const router = useRouter();

        const goToTarget = (category) => {
            router.push({ name: 'List', params: { list: category } });
        };

        return { goToTarget };
    },
    computed: {
        ...mapGetters(['getLists']),
        lists() {
          return this.getLists;
        },
      },
      mounted(){
        window.scrollTo(0, 0);
        this.listsCards = this.lists;
        document.title = 'Подборки'
      }
}
</script>

<style scoped>
.lists {
    width: 100%;
}

.lists-cont {
    display: flex;
    flex-direction: column;
}

.lists-card {
    width: 100%;
    padding-bottom: 20px;
    margin-top: 30px;
    border-bottom: 1px solid #3B486B;
    display: flex;
    align-items: center;
}

.card-icon {
    width: 240px;
    height: 240px;
    background-color: #191E2E;
    border-radius: 10px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-weight: 800;
    font-size: 33px;
    color: white;
    user-select: none;
}

.card-icon :deep(mark) {
    color: #3657cb;
    background-color: transparent;
}

.card-info {
    margin-left: 50px;
}

.card-title {
    font-weight: 600;
    font-size: 25px;
    color: white;
}

.card-movie_count {
    font-weight: 400;
    font-size: 15px;
    color: #F2F60F;
    margin-top: 10px;
}

.card-but {
    margin-left: auto;
    padding: 20px 50px;
    background-color: #3657CB;
    color: white;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
    box-shadow: 0px 0px 0px 0px #3657cb;
    transition: 0.3s;

    &:hover {
        box-shadow: 0px 0px 15px 0px #3657cb;
    }
}
</style>