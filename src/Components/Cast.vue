<template>
    <div class="movie-cast">
      <BlockHeader :title="'В главных ролях:'" :text="'Все актёры'" :link="'/'" />
  
      <div class="movie-cast__list">
        <!-- 1. Используем v-if для проверки data.persons -->
        <template v-if="data?.persons">
          <div
            v-for="(actor, index) in data?.persons.slice(0, 10)"
            :key="index"
            class="movie-cast__actor"
          >
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
          <!-- Отображаем скелетон, пока загружаются данные -->
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
  
      const sha256 = async (buffer) => {
        const uint8Array = new Uint8Array(buffer);
        const hashBuffer = await crypto.subtle.digest('SHA-256', uint8Array);
        return Array.from(new Uint8Array(hashBuffer))
          .map(byte => byte.toString(16).padStart(2, '0'))
          .join('');
      };
      const fetchImage = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Ошибка при загрузке изображения ${url}: ${response.status} ${response.statusText}`
          );
        }
        const blob = await response.blob();
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsArrayBuffer(blob);
        });
      } catch (error) {
        console.error('Ошибка в fetchImage:', error);
        throw error;
      }
    };

    const compareImages = async (leftImageUrl, rightImageUrl) => {
      try {
        const leftImage = await fetchImage(leftImageUrl);
        const rightImage = await fetchImage(rightImageUrl);

        const leftHash = await sha256(leftImage);
        const rightHash = await sha256(rightImage);

        return !(leftHash === rightHash);
      } catch (error) {
        console.error('Ошибка при сравнении изображений:', error);
        return false;
      }
    };

    const fetchActors = async () => {
      if (props.data?.persons) {
        try {
          const promises = props.data.persons
            .filter(person => person.enProfession === 'actor')
            .map(async person => {
              try {
                const imagesMatch = await compareImages(
                  'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_253180.jpg',
                  person.photo
                );
                return imagesMatch ? person : null;
              } catch (error) {
                console.error(
                  'Ошибка сравнения изображений для актера:',
                  person.name,
                  error
                );
                return null;
              }
            });

          const results = await Promise.all(promises);
          const filteredActors = results.filter(person => person !== null).slice(0, 10);

          tenActors.value = filteredActors;
        } catch (error) {
          console.error('Ошибка при получении данных об актерах:', error);
          tenActors.value = [];
        }
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
      tenActors
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