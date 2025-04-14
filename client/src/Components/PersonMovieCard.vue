<template>
    <div class="person_movie-card" v-if="currentMovie?.length">
        <div class="person_movie-poster">
            <img :src="currentMovie[0].poster" :alt="name || enName">
        </div>

        <div class="person_movie-info">
            <div class="person_movie-name">{{ name }} ({{ currentMovie[0].year }})</div>
            <div class="person_movie-enName">{{ enName }}</div>
            <div class="person_movie-genres" v-if="currentMovie[0].genre">
                <span v-for="(genre, index) in Object.values(currentMovie[0]?.genre)" :key="index">{{ genre }}<span
                        v-if="index < Object.values(currentMovie[0]?.genre)?.length - 1">, </span></span>
            </div>
            <div class="person_movie-role">{{ role }}</div>
        </div>

        <div class="person_movie-ratings" :style="currentMovie[0].imdb ? 'justify-content: space-between;' : 'justify-content: center;'">
            <div v-if="rating">
                <div class="person_movie-rating"
                :style="{ backgroundColor: colorScale[Math.ceil(Number(rating))]?.color }">{{ rating.toFixed(2) }}</div>
                <span>Кинопоиск</span>
            </div>

            <div v-if="currentMovie[0].imdb">
                <div class="person_movie-rating"
                    :style="{ backgroundColor: colorScale[Math.ceil(Number(currentMovie[0].imdb))]?.color }">
                    {{ Number(currentMovie[0].imdb).toFixed(2) }}
                </div>
                <span>IMBd</span>
            </div>
        </div>

        <div class="person_movie-button" @click="goToMovie(id)">Карточка фильма</div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { fetchMovieToId } from '@/Services/apiService';

export default {
    data() {
        return {
            currentMovie: [],
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
    props: {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        enName: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        role: {
            type: String,
            required: true
        },
    },
    setup() {
        const router = useRouter();

        const goToMovie = (movieId) => {
            router.push({ name: 'MoviePage', params: { id: movieId } });
        };

        return { goToMovie };
    },
    async mounted() {
        try {
            this.currentMovie = await fetchMovieToId(this.id)
        } catch (error) {
            console.error(error);

        }
    }
}
</script>

<style scoped>
.person_movie-card {
    display: flex;
    align-items: center;
    margin-top: 50px;
    padding-bottom: 50px;
    border-bottom: 1px solid #3B486B;
}

.person_movie-poster {
    width: 200px;
    min-height: 295px;

    img {
        width: 100%;
        border-radius: 10px;
    }
}

.person_movie-info {
    margin-left: 60px;
}

.person_movie-name {
    font-weight: 700;
    font-size: 25px;
}

.person_movie-enName {
    font-weight: 500;
    font-size: 17px;
    color: #54689E;
    margin-top: 5px;
}

.person_movie-genres {
    font-weight: 400;
    font-size: 15px;
    color: #F2F60F;
    margin-top: 5px;
}

.person_movie-role {
    font-weight: 400;
    font-size: 15px;
    color: #54689E;
    margin-top: 5px;
}

.person_movie-ratings {
    margin-left: auto;
    width: 180px;
    display: flex;
    align-items: center;

    div{
        display: flex;
        flex-direction: column;
        align-items: center;

        span{
            margin-top: 8px;
        }
    }
}

.person_movie-rating {
    width: 65px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
    border-radius: 10px;
}

.person_movie-button {
    padding: 25px 35px;
    background-color: #3657CB;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    margin-left: 70px;
    box-shadow: 0px 0px 0px 0px #3657cb;
    transition: 0.3s;

    &:hover {
        box-shadow: 0px 0px 15px 0px #3657cb;
    }
}
</style>