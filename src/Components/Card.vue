<template>
    <div v-if="filmId" @contextmenu.prevent="contextMenu ? showContextMenu($event) : null" class="movie-card"
        @click="goToMovie(filmId)">
        <div class="movie-card-content">
            <div class="movie-card-img">
                <div v-if="hasRating" class="movie-card-rating" :style="{ backgroundColor: ratingBackgroundColor }">{{ formattedRating }}</div>
                <div v-if="cardInfo?.relationType" class="movie-card-relationType">{{ relationTypeText }}</div>
                <img :src="posterUrl" :alt="filmTitle" />
            </div>
            <div class="movie-card-title">{{ filmTitle }}</div>
            <div v-if="cardInfo.genres" class="movie-card-genres">
                <span v-for="(genre, index) in cardInfo.genres" :key="index">{{ genre.name }}<span v-if="index < cardInfo.genres.length - 1">, </span></span>
            </div>
            <div className='movie-card-genres' v-if="cardInfo.genre">
                <span v-for="(genre, index) in Object.values(cardInfo.genre)" :key="index">{{ genre }}<span v-if="index < Object.values(cardInfo.genre).length - 1">, </span></span>
            </div>
            <div v-if="cardInfo.nameEn" class="movie-card-genres">{{ cardInfo.nameEn }}</div>
        </div>

        <div v-if="showMenu" class="movie-card-menu" @click.stop @contextmenu.stop.prevent :style="{ top: menuY + 'px', left: menuX + 'px' }">
            <span>{{ filmTitle }}</span>
            <button @click="deleteItem">Добавить в черный список</button>
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
import { mapActions } from 'vuex';

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
            },
            showMenu: false,
            menuX: 0,
            menuY: 0,
        }
    },
    props: {
        data: {
            type: Object,
            required: true
        },
        contextMenu: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        cardInfo() {
            return this.data;
        },
        filmId() {
            return this.cardInfo?.filmId || this.cardInfo?.kinopoisk_id || this.cardInfo?.id;
        },
        posterUrl() {
            if (this.cardInfo?.poster?.url) {
                return this.cardInfo.poster.url;
            } else if (this.cardInfo?.posterUrl) {
                return this.cardInfo.posterUrl;
            } else if (typeof this.cardInfo?.poster !== 'object' && this.cardInfo?.poster !== null && this.cardInfo?.poster !== undefined) {
                return this.cardInfo.poster;
            } else {
                return '../src/assets/Media/Components/PosterDefault.jpg';
            }
        },
        filmTitle() {
            return this.cardInfo.name || this.cardInfo.nameRu || this.cardInfo.alternativeName;
        },
        ratingKp() {
            return this.cardInfo?.rating?.kp;
        },
        ratingImdb() {
            return this.cardInfo?.imdb;
        },
        ratingKinopoisk() {
            return this.cardInfo?.kinopoisk;
        },
        hasRating() {
            return this.ratingKp || this.ratingImdb || this.ratingKinopoisk;
        },
        ratingValue() {
            return this.ratingKp || this.ratingImdb || this.ratingKinopoisk;
        },
        ratingBackgroundColor() {
            const rating = Math.ceil(Number(this.ratingValue));
            return this.colorScale[rating]?.color || 'transparent'; // Fallback to transparent if no color found
        },
        formattedRating() {
            if (this.ratingKp) {
                return this.ratingKp.toFixed(2);
            } else if (this.ratingImdb) {
                return Number(this.ratingImdb).toFixed(2);
            } else if (this.ratingKinopoisk) {
                return Number(this.ratingKinopoisk).toFixed(2);
            } else {
                return '';
            }
        },
        relationTypeText() {
            switch (this.cardInfo?.relationType) {
                case "PREQUEL":
                    return "Приквел";
                case "SEQUEL":
                    return "Сиквел";
                case "REMAKE":
                    return "Ремэйк";
                default:
                    return "Похожий";
            }
        },
    },
    setup() {
        const router = useRouter();

        const goToMovie = (movieId) => {
            router.push({ name: 'MoviePage', params: { id: movieId } });
        };

        return { goToMovie };
    },
    methods: {
        ...mapActions(['toggleOverlay']),
        ...mapActions(['addToBlackList']),
        deleteItem() {
            this.closeContextMenu();
            this.addToBlackList(this.cardInfo.name || this.cardInfo.nameRu);
        },
        showContextMenu(event) {
            event.preventDefault();

            const cardRect = event.currentTarget.getBoundingClientRect();
            this.menuX = event.clientX - cardRect.left;
            this.menuY = event.clientY - cardRect.top;

            this.showMenu = true;
            this.toggleOverlay(true);
            document.body.classList.add('no-scroll');

            document.addEventListener('click', this.closeContextMenu);
        },
        closeContextMenu() {
            this.showMenu = false;
            this.toggleOverlay(false);
            document.body.classList.remove('no-scroll');
            document.removeEventListener('click', this.closeContextMenu);
        },
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeContextMenu);
    },
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

    &:hover {
        img {
            scale: 1.02;
        }
    }
}

.movie-card-img {
    position: relative;
    width: 340px;
    height: 460px;
    border-radius: 10px;
    overflow: hidden;
}

.movie-card-img img {
    width: 100%;
    height: 100%;
    transition: 0.3s;
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
    z-index: 9;

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
    z-index: 9;

    font-size: 15px;
    font-weight: 700;
    line-height: 18.58px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
}

.movie-card-menu {
    position: absolute;
    background: rgb(21, 26, 38);
    padding: 20px 15px;
    z-index: 9999999999999999999;
    cursor: auto;
    border-radius: 10px;

    button {
        width: 230px;
        height: 35px;
        background-color: red;
        border-radius: 50px;
        color: white;
        border: none;
        cursor: pointer;
        user-select: none;

        &:not(:first-child) {
            margin-top: 10px;
        }
    }

    span {
        color: white;
        font-weight: 600;
    }
}
</style>