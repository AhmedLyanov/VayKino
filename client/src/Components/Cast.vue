<template>
  <div class="movie-cast">
    <BlockHeader :title="'В главных ролях:'" :text="'Весь персонал'" :link="`/cast/${data.id}`" />

    <div class="movie-cast__list">
      <template v-if="data?.persons">
        <div v-for="(actor, index) in data?.persons.slice(0, 10)" :key="index" class="movie-cast__actor"
          @click="goToPerson(actor.id)">
          <div class="movie-cast__actor-details">
            <div class="movie-cast__actor-image">
              <img v-if="actor" :src="actor.photo" alt="" />
              <div v-else class="loading" style="width: 100%; height: 100%"></div>
            </div>
            <div class="movie-cast__actor-name-ru">{{ actor?.name }}</div>
            <div class="movie-cast__actor-name-en">{{ actor?.enName }}</div>
            <div class="movie-cast__actor-role">{{ actor?.description }}</div>
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
</template>

<script>
import { ref, onMounted, watch, defineComponent } from 'vue';
import BlockHeader from './BlockHeader.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    BlockHeader
  },
  setup(props) {
    const tenActors = ref([]);
    const router = useRouter();

    const goToPerson = (personId) => {
      router.push({ name: 'PersonPage', params: { id: personId } });
    };


    const fetchActors = () => {
        if (props.data?.persons) {
            const actors = props.data.persons.filter(person => person.enProfession === 'actor').slice(0, 10);
            tenActors.value = actors;
        } else {
            tenActors.value = [];
        }
    };


    onMounted(fetchActors);
    watch(
      () => props.data,
      fetchActors,
      { immediate: true }
    );

    return {
      tenActors,
      goToPerson
    };
  }
});
</script>


<style scoped>
.movie-cast {
  width: 100%;
}

.movie-cast__list {
  display: flex;
  flex-wrap: wrap;
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