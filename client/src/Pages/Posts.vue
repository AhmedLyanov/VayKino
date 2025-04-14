<template>
    <main>
        <div class="main-content">
            <div class="posts">
                <BlockHeader :title="'Новости'" :text="false" :link="false" />

                <div class="posts-cont">
                    <div v-for="(rowConfig, rowIndex) in rowConfigurations" :key="rowIndex" class="posts-row">
                        <div v-for="(widthClass, blockIndex) in rowConfig" :key="blockIndex"
                            @click="goToLocation(posts[getBlockNumber(rowIndex, blockIndex) - 1]?.url)"
                            :class="['post', widthClass]">
                            <img :src="posts[getBlockNumber(rowIndex, blockIndex) - 1]?.imageUrl" class="post-img" alt="">

                            <div class="post-cont">
                                <div class="post-date">{{ new Date(posts[getBlockNumber(rowIndex, blockIndex) -
                                    1]?.publishedAt).toLocaleDateString('ru-RU', {
                                        day: 'numeric', month: 'short', year:
                                    'numeric' }).replace(/\.$/, '') }}</div>
                                <div class="post-title">{{ posts[getBlockNumber(rowIndex, blockIndex) - 1]?.title }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <UpArrow />
    </main>
</template>

<script>
import posts from "../assets/data/posts.json";
import BlockHeader from "@/Components/BlockHeader.vue";
import UpArrow from "@/Components/UpArrow.vue";
import { mapActions } from "vuex";

export default {
    data() {
        return {
            rowConfigurations: [
                ['w-33', 'w-33', 'w-33'],
                ['w-66', 'w-33'],
                ['w-33', 'w-33', 'w-33'],
                ['w-33', 'w-66'],
                ['w-33', 'w-33', 'w-33'],
                ['w-66', 'w-33'],
                ['w-33', 'w-33', 'w-33'],
                ['w-33', 'w-66'],
                ['w-33', 'w-33', 'w-33'],
                ['w-66', 'w-33'],
                ['w-33', 'w-33', 'w-33'],
                ['w-33', 'w-66'],
                ['w-33', 'w-33', 'w-33'],
            ],
            posts: posts.items
        };
    },
    methods: {
    ...mapActions(['toggleEmailMailing']),

    showEmailMailing(){
      this.toggleEmailMailing(true)
    },
        getBlockNumber(rowIndex, blockIndex) {
            let count = 0;
            for (let i = 0; i < rowIndex; i++) {
                count += this.rowConfigurations[i].length;
            }
            return count + blockIndex + 1;
        },
        goToLocation(url){
            window.open(url,'_blank');
        }
    },
    mounted() {
        window.scrollTo(0, 0);
        document.title = 'Новости'
        this.showEmailMailing()
    },
    components: {
        BlockHeader,
        UpArrow
    }
};
</script>

<style scoped>
.posts {
    width: 100%;
    max-width: 1920px;
}

.posts-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
}

.post {
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    user-select: none;
    cursor: pointer;

    &:hover{
        img{
            scale: 1.02;
        }
    }
}

.post-img{
    transition: 0.4s;
}

.post-cont {
    width: 100%;
    height: 100%;
    position: absolute;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.83));
    top: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: end;
}

.post-date {
    font-weight: 700;
    font-size: 15px;
    color: white;
}

.post-title {
    font-weight: 900;
    font-size: 25px;
    color: white;
    margin-top: 10px;
}

.w-33 {
    width: 32.5%;

    img {
        height: 100%;
    }
}

.w-66 {
    width: 66.28%;

    img {
        width: 100%;
    }
}
</style>