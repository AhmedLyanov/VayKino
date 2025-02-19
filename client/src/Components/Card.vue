<template>
    <div v-if="data" class="movie-card" @click="goToMovie(cardInfo.filmId || cardInfo.kinopoisk_id ||  cardInfo.id)">
        <div class="movie-card-content">
            <div class="movie-card-img">
                <div v-if="cardInfo?.rating || cardInfo.imdb || cardInfo.kinopoisk" class="movie-card-rating"
                    :style="{ backgroundColor: colorScale[Math.ceil(Number(cardInfo?.rating?.kp || cardInfo.imdb || cardInfo.kinopoisk))]?.color }">
                    {{ cardInfo?.rating?.kp ? cardInfo.rating.kp.toFixed(2) : cardInfo?.imdb ?
                        Number(cardInfo.imdb).toFixed(2) : cardInfo?.kinopoisk ? Number(cardInfo.kinopoisk).toFixed(2) :
                    ''}}

                </div>

                <div v-if="cardInfo.relationType" class="movie-card-relationType">
                    {{ cardInfo?.relationType === "PREQUEL" ? "Приквел" : cardInfo?.relationType === "SEQUEL" ? "Сиквел"
                    : cardInfo?.relationType === "REMAKE" ? "Ремэйк" : "Похожий"}}
                </div>
                <img :src="cardInfo?.poster?.url || cardInfo.posterUrl || cardInfo.poster" :alt="data?.name" />
            </div>
            <div class="movie-card-title">{{ cardInfo.name || cardInfo.nameRu }}</div>
            <div v-if="cardInfo.genres" class="movie-card-genres">
                <span v-for="(genre, index) in cardInfo.genres" :key="index">{{ genre.name }} <span
                        v-if="index < cardInfo.genres.length - 1">, </span></span>
            </div>
            <div className='movie-card-genres' v-if="cardInfo.genre">
                <span v-for="(genre, index) in Object.values(cardInfo.genre)" :key="index">{{ genre }}<span
                        v-if="index < Object.values(cardInfo.genre).length - 1">, </span></span>
            </div>
            <div v-if="cardInfo.nameEn" class="movie-card-genres">{{ cardInfo.nameEn }}</div>
        </div>
    </div>
    <div v-else class="movie-card">
        <div class="movie-card-content">
            <div class="movie-card-img">
                <div style="width: 100%; height: 100%; border-radius: 10px" class="loading"></div>
            </div>
            <div class="movie-card-title">
                <div style="width: 200px; height: 20px;" class="loading"></div>
            </div>
            <div class="movie-card-genres">
                <div style="width: 150px; height: 20px;" class="loading"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    data() {
        return {
            colorScale: {
                1: { color: "#CC0000" },
                2: { color: "#CC3300" },
                3: { color: "#CC6600" },
                4: { color: "#CC9900" },
                5: { color: "#CCCC00" },
                6: { color: "#CCCC00" },
                7: { color: "#99CC00" },
                8: { color: "#66CC00" },
                9: { color: "#33CC00" },
                10: { color: "#00CC00" },
            }
        }
    },
    props: ['data'],
    computed: {
        cardInfo() {
            return this.data;
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
.movie-card {
    position: relative;
    display: flex;
    justify-content: center;
    cursor: pointer;
    padding-bottom: 10px;
    user-select: none;
    width: 340px;
    height: fit-content;
}

.movie-card-img {
    position: relative;
    width: 340px;
    height: 460px;
}

.movie-card-img img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
}

.movie-card-title {
    font-size: 18px;
    font-weight: 700;
    line-height: 22.3px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: white;
    margin-top: 3px;
}

.movie-card-genres {
    font-size: 15px;
    font-weight: 300;
    line-height: 17.85px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #f2f60f;
    margin-top: 3px;
}

.movie-card-rating {
    padding: 5px 13px;
    border-radius: 5px;
    position: absolute;
    color: white;
    top: 15px;
    right: 15px;

    font-size: 17px;
    font-weight: 600;
    line-height: 22.3px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
}

.movie-card-relationType {
    padding: 5px 13px;
    border-radius: 5px;
    position: absolute;
    color: white;
    top: 15px;
    left: 15px;
    background-color: #3657cb;

    font-size: 15px;
    font-weight: 700;
    line-height: 18.58px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
}
</style>