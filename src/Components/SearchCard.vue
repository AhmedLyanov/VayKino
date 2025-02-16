<template>
    <div className='search_movie_card' @click="goToMovie(result.kinopoisk_id)">
        <div className="search_movie_card-img"><img :src="result?.poster" :alt="result?.name" /></div>
        <div className="search_movie_card-info">
            <span className='search_movie_card-title'>{{result?.name}} ({{movieTypes[result?.type]}} {{result.year}})</span>
            <span className='search_movie_card-en_title'>{{result?.origin_name}}</span>
            <span className='search_movie_card-genres' v-if="result?.genre">
                <span v-for="(genre, index) in Object.values(result?.genre)" :key="index">{{ genre }}<span v-if="index < Object.values(result?.genre).length - 1">, </span></span>
            </span>
        </div>
        <div className="search_movie_card-rating" v-if="result?.imdb || result?.kinopoisk">{{ result?.imdb || result?.kinopoisk }}</div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    data() {
        return {
            movieTypes: {
                film: "Фильм",
                "series": "Сериал",
                cartoon: "Мультфильм",
                "cartoon-series": "Мультсериал",
                "anime-series": "Аниме",
                "anime-film": "Аниме",
            }
        }
    },
    props: {
        result: {
            type: Object,
            required: true,
        }
    },
    setup() {
    const router = useRouter();

    const goToMovie = (movieId) => {
      router.push({ name: 'MoviePage', params: { id: movieId } });
    };

    return { goToMovie };
  }
}
</script>

<style scoped>
.search_movie_card {
  width: calc(100% - 7px);
  background-color: #1e2538;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 13px;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;

  &:not(:first-child){
    margin-top: 10px;
  }
}

.search_movie_card-img {
  width: 100px;
  display: flex;

  img {
    width: 100%;
    border-radius: 5px;
  }
}

.search_movie_card-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
}

.search_movie_card-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 24.78px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: white;
  max-width: 600px;
}

.search_movie_card-en_title {
  font-size: 14px;
  font-weight: 500;
  line-height: 16.9px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #ffffffb2;
  margin-top: 10px;
  margin-bottom: 10px;
}

.search_movie_card-genres {
  font-family: Qanelas;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.28px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #f2f60f;
}

.search_movie_card-rating {
  margin-left: auto;
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #4bcb36;
  color: white;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 700;
  line-height: 22.3px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

</style>