<template>
    <main>
        <div class="main-content">
            <div class="media">
                <div class="media-header">
                    <BlockHeader :title="'Медиа'" :text="false" :link="false" />
                    <div class="media-selects">
                        <div v-for="media in medias" :key="media" :class="{ active: activeMedia === media }"
                            @click="setActiveMedia(media)">
                            {{ media }}
                        </div>
                    </div>
                </div>

                <div class="media-content">
                    <div class="media-trailers" v-if="activeMedia === 'Трейлеры'">
                        <div class="media-mini_header">Трейлеры</div>

                        <div class="media-trailers-cont">
                            <div class="media-trailer" v-for="trailer in trailers.slice(0, trailersCount)"
                                :key="trailer.videoId" @click="openTrailerModal(trailer.videoId)">
                                <div class="trailer-img">
                                    <img :src="trailer.thumbnail[trailer.thumbnail.length - 1].url" alt="">

                                    <svg width="60" height="58" viewBox="0 0 60 58" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M57.1298 25.3305C60.1253 26.7913 60.1253 31.0601 57.1297 32.521L6.4174 57.2522C3.7603 58.548 0.66409 56.6132 0.66409 53.6569L0.664089 4.19447C0.664089 1.23823 3.76031 -0.696589 6.41741 0.59922L57.1298 25.3305Z"
                                            fill="#FFFFFFA1" />
                                    </svg>

                                </div>

                                <div class="trailer-info">
                                    <div class="trailer-title">{{ trailer.title.slice(0, trailer.title.indexOf('—') - 1)
                                        }}</div>
                                    <div class="trailer-date">{{ new
                                        Date(trailer.publishedAt).toLocaleDateString('ru-RU', {
                                            day: 'numeric', month:
                                        'short', year: 'numeric' }).replace(/\.$/, '') }}</div>
                                    <div class="trailer-views"><img src="../assets/Media/Media/views.svg" alt="views">
                                        {{ trailer.viewCount }}</div>
                                    <div class="trailer-length"><img src="../assets/Media/Media/time.svg" alt="time"> {{
                                        trailer.lengthText }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="loadMore" v-if="trailers.length > trailersCount" @click="loadMoreTrailers">
                            Показать ещё
                        </div>
                    </div>

                    <div class="media-posters" v-if="activeMedia === 'Постеры'">
                        <div class="media-mini_header">Постеры</div>

                        <div class="media-posters-cont">
                            <div class="poster" v-for="poster in posters.slice(0, postersCount)" :key="poster.id" @click="openPosterModal(poster.poster.url)">
                                <div class="poster-img">
                                    <img :src="poster.poster.url" :alt="poster.name">
                                </div>
                                <div class="poster-title">{{ poster.name }}</div>
                            </div>
                        </div>

                        <div class="loadMore" v-if="posters.length > postersCount" @click="loadMorePosters">
                            Показать ещё
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <MediaTrailerModal :is-open="isModalTrailerOpen" :videoId="videoId" @close="closeTrailerModal" />
        <MediaPosterModal :is-open="isModalPosterOpen" :posterUrl="videoId" @close="closePosterModal" />
        <UpArrow />
    </main>
</template>

<script>
import BlockHeader from "@/Components/BlockHeader.vue";
import MediaTrailerModal from "@/Components/MediaTrailerModal.vue";
import MediaPosterModal from "@/Components/MediaPosterModal.vue";
import UpArrow from "@/Components/UpArrow.vue";
import { getLatestVideosFromChannel } from "@/Services/apiService";
import { fetchLatestPosters } from "@/Services/apiService";

export default {
    data() {
        return {
            medias: ['Трейлеры', 'Постеры'],
            activeMedia: 'Трейлеры',
            trailersCount: 6,
            postersCount: 16,
            isModalTrailerOpen: false,
            isModalPosterOpen: false,
            videoId: '',
            posters: [],
            trailers: [],
        }
    },
    components: {
        BlockHeader,
        MediaTrailerModal,
        UpArrow,
        MediaPosterModal,
    },
    methods: {
        setActiveMedia(media) {
            this.activeMedia = media;
            this.trailersCount = 6;
            this.postersCount = 16;
        },
        loadMoreTrailers() {
            if (this.trailers.length >= this.trailersCount) {
                this.trailersCount += 6
            }
        },
        loadMorePosters() {
            if (this.posters.length >= this.postersCount) {
                this.postersCount += 16
            }
        },
        openTrailerModal(videoId) {
            this.videoId = videoId;
            this.isModalTrailerOpen = true;
            document.body.classList.add('no-scroll');

        },
        closeTrailerModal() {
            this.isModalTrailerOpen = false;
            this.videoId = '';
            document.body.classList.remove('no-scroll');
        },
        openPosterModal(videoId) {
            this.videoId = videoId;
            this.isModalPosterOpen = true;
            document.body.classList.add('no-scroll');

        },
        closePosterModal() {
            this.isModalPosterOpen = false;
            this.videoId = '';
            document.body.classList.remove('no-scroll');
        },
    },
    async mounted() {
        window.scrollTo(0, 0);
        document.title = "Медиа"
        try {
            this.trailers = await getLatestVideosFromChannel();
            this.posters = await fetchLatestPosters();
        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<style scoped>
.media {
    width: 100%;
}

.media-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.media-selects {
    display: flex;
    margin-top: 40px;

    div {
        color: #FFFFFF59;
        font-weight: 700;
        font-size: 18px;
        user-select: none;
        cursor: pointer;

        &.active {
            color: #FFFFFF;
        }

        &:not(:first-child) {
            margin-left: 30px;
        }
    }
}

.media-content {
    margin-top: 30px;
}

.media-mini_header {
    font-weight: 900;
    font-size: 30px;
    color: white;
}

.media-trailers-cont {
    display: grid;
    grid-template-columns: repeat(2, 49.5%);
    justify-content: space-between;
}

.media-trailer {
    width: 100%;
    margin-top: 20px;
    user-select: none;
    cursor: pointer;

    &:hover {
        .trailer-img img {
            scale: 1.02;
        }

        .trailer-img path {
            fill: #3657CB;
        }
    }
}

.trailer-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
    min-width: 753px;
    min-height: 421px;
    width: 753px;
    height: 421px;

    img {
        width: 100%;
        display: block;
        transition: 0.3s;
        pointer-events: none;
    }

    svg {
        position: absolute;
    }

    path {
        transition: 0.3s;
    }
}

.trailer-info {
    display: flex;
    margin-top: 5px;
    align-items: center;
    font-weight: 700;
    font-size: 15px;
    color: white;

    div {
        display: flex;
        align-items: center;

        img {
            margin-right: 8px;
        }

        &:not(:first-child) {
            margin-left: 20px;
        }
    }
}

.trailer-title {
    font-weight: 900;
    font-size: 20px;
    color: white;
}

.loadMore {
    padding: 20px 25px;
    border: 1px solid white;
    color: white;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    cursor: pointer;
    user-select: none;
    width: fit-content;
}

.media-posters-cont {
    display: grid;
    grid-template-columns: repeat(4, 360px);
    justify-content: space-between;
}

.poster {
    height: 100%;
    margin-top: 20px;
    user-select: none;
    cursor: pointer;
}

.poster-img {
  width: 360px;
  height: 540px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 10px;
    min-width: 100%;
    height: 100%;
  }
}

.poster-title {
    font-weight: 700;
    font-size: 18px;
    color: white;
}
</style>