<template>
    <main>
        <div class="main-content">
            <div class="actors">
                <div class="actors-header">
                    <BlockHeader :title="`${title}. Персонал`" :text="false" :link="false" />
                </div>

                <div class="actors-cont">
                    <template v-if="persons.length">
                        <div v-for="(actor, index) in persons" :key="index" class="movie-cast__actor"
                            @click="goToPerson(actor.id)">
                            <div class="movie-cast__actor-details">
                                <div class="movie-cast__actor-image">
                                    <img v-if="actor" :src="actor.photo" alt="" />
                                    <div v-else class="loading" style="width: 100%; height: 100%"></div>
                                </div>
                                <div class="movie-cast__actor-name-ru">{{ actor?.name }}</div>
                                <div class="movie-cast__actor-name-en">{{ actor?.enName }}</div>
                                <div class="movie-cast__actor-role">{{ actor?.description }}</div>
                                <div class="movie-cast__actor-name-en">{{ actor?.profession }}</div>
                            </div>
                        </div>
                    </template>

                    <template v-else>
                        <div v-for="index in 10" :key="index" class="movie-cast__actor">
                            <div class="movie-cast__actor-details">
                                <div class="movie-cast__actor-image">
                                    <div class="loading" style="width: 100%; height: 100%"></div>
                                </div>
                                <div class="movie-cast__actor-name-ru">
                                    <div class="loading" style="width: 200px; height: 20px"></div>
                                </div>
                                <div class="movie-cast__actor-name-en">
                                    <div class="loading" style="width: 175px; height: 20px"></div>
                                </div>
                                <div class="movie-cast__actor-role">
                                    <div class="loading" style="width: 150px; height: 20px"></div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import BlockHeader from '@/Components/BlockHeader.vue';
import { fetchActors } from '@/Services/apiService';

export default {
    data() {
        return{
            persons: [],
            title: ""
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
    },
    async mounted(){
        try {
        this.persons = await fetchActors(this.movieId);
        this.title = this.persons.docs[0].name
        this.persons = this.persons.docs[0].persons
        
      } catch (error) {
        console.error("Ошибка при получении постеров:", error);
        this.persons = [];
      }
    }
}
</script>

<style scoped>
.actors {
    width: 100%;
}

.actors-cont {
    display: grid;
    grid-template-columns: repeat(5, 280px);
  justify-content: space-between;
}

.movie-cast__actor {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  width: 280px;
  user-select: none;
  cursor: pointer;
  padding-bottom: 5px;
}

.movie-cast__actor-image {
  width: 280px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
  }
}

.movie-cast__actor-name-ru {
  font-size: 18px;
  font-weight: 700;
  line-height: 22.3px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: white;
  margin-top: 5px;
}

.movie-cast__actor-name-en {
  font-size: 14px;
  font-weight: 400;
  line-height: 16.66px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #ffffffb2;
  margin-top: 5px;
}

.movie-cast__actor-role {
  font-size: 16px;
  font-weight: 400;
  line-height: 19.04px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #f2f60f;
  margin-top: 5px;
}
</style>