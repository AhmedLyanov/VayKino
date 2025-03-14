<template>
    <main>
        <div class="main-content">
            <div class="bg-joker">
                <div class="bg-joker-temnee"></div>
            </div>

            <div class="now-playing">
                <div class="now-playing__header">
                    <div class="now-playing__title">Сейчас в кино</div>

                    <div class="now-playing__header-line">
                        <div class="now-playing__header-line-inner"></div>
                    </div>

                    <div class="now-playing__genres">
                        <div v-for="genre in genres" :key="genre" :class="{ active: activeGenre === genre }"
                            @click="setActiveGenre(genre)">
                            {{ genre.slice(0, genre.length - 1) }}
                        </div>
                    </div>
                </div>

                <div class="now-playing__content">
                    <div class="now-playing__films">
                        <Card v-if="nowPlayingMovies.length" v-for="(film, index) in nowPlayingMovies.slice(0, 8)"
                            :data="film" :contextMenu="false" :key="index" />
                        <Card v-else v-for="key in 8" :key="key" :data="{}" />
                    </div>
                </div>

                <div class="now-playing__footer">
                    <div class="now-playing__all-movies-button" @click="this.$router.replace('/movies')">Все новинки
                    </div>
                </div>
            </div>

            <div class="trailers" v-if="trailers.length">
                <BlockHeader :title="'Новые трейлеры'" :text="'Все трейлеры'" :link="'/media'" />

                <div class="trailers__main">
                    <div class="trailers__active">
                        <div class="trailers__active-media">
                            <iframe width="100%" height="auto"
                                :src="`https://www.youtube.com/embed/${trailers[currentTrailer]?.videoId}`"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>

                        <div class="trailers__active-info">
                            <div class="trailers__active-info-container">
                                <div class="trailers__active-name">{{ trailers[currentTrailer]?.title.slice(0,
                                    trailers[currentTrailer].title.indexOf('—') - 1) }}</div>

                                <div class="trailers__active-socials">
                                    <a href="https://vk.com/" target="_blank">
                                        <img src="../assets/Media/Main/vk_social_media_icon.svg" alt="VK" />
                                    </a>
                                    <a href="https://www.instagram.com/" target="_blank">
                                        <img src="../assets/Media/Main/instagram_social_media_icon.svg"
                                            alt="Instagram" />
                                    </a>
                                    <a href="http://facebook.com/" target="_blank">
                                        <img src="../assets/Media/Main/facebook_social_media_icon.svg" alt="Facebook" />
                                    </a>
                                    <a href="https://x.com/" target="_blank">
                                        <img src="../assets/Media/Main/twitter_social_media_icon.svg"
                                            alt="Twitter(X)" />
                                    </a>
                                </div>
                            </div>

                            <div class="trailers__active-likes">
                                <div class="trailers__active-like" @click="likeVideo(trailers[currentTrailer])">
                                    <div class="trailers__active-like-img">
                                        <img :src="likeIcon(trailers[currentTrailer]?.videoId)" alt="like" />
                                    </div>
                                    <div class="trailers__active-like-count">{{ trailers[currentTrailer]?.likesCount }}
                                    </div>
                                </div>
                                <div class="trailers__active-dislike" @click="dislikeVideo(trailers[currentTrailer])">
                                    <div class="trailers__active-dislike-img">
                                        <img :src="dislikeIcon(trailers[currentTrailer]?.videoId)" alt="dislike" />
                                    </div>
                                    <div class="trailers__active-dislike-count">{{
                                        trailers[currentTrailer]?.dislikesCount }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="trailers__list">
                        <div v-for="(trailer, index) in trailers" class="trailers__item" @click="currentTrailer = index"
                            :key="index">
                            <div class="trailers__item-media">
                                <img :src="`${trailer?.thumbnail[trailer?.thumbnail?.length - 1]?.url}`"
                                    :alt="trailer.title.slice(0, trailer.title.indexOf('—') - 1)" />
                                <div :class="{ active: currentTrailer === index }">
                                    <img :src="`${linkToImg}/play.svg`" alt="">
                                </div>
                            </div>
                            <div class="trailers__item-name">{{ trailer.title.slice(0, trailer.title.indexOf('—') - 1)
                                }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="popular-movies">
                <div class="popular-movies__header">
                    <div class="popular-movies__title">Популярные фильмы</div>

                    <div class="popular-movies__divider">
                        <div class="popular-movies__divider-line"></div>
                    </div>

                    <div class="popular-movies__years">
                        <div v-for="year in years" :key="year" :class="{ active: activeYear === year }"
                            @click="setActiveYear(year)">
                            {{ year }}
                        </div>
                    </div>
                </div>

                <div class="popular-movies__content">
                    <Slider2 v-if="popularMovies.length != 0" :data="popularMovies" />
                    <Slider2 v-else :data="[]" />
                </div>
            </div>

            <div class="last-news">
                <BlockHeader :title="'Последние новости'" :text="'Все новости'" :link="'/posts'" />

                <div class="last-news__main">
                    <div class="last-news__main-left">
                        <div class="last-news__item-large" @click="goToLocation(posts[activePost].url)">
                            <div class="last-news__item-large-img">
                                <img :src="posts[activePost].imageUrl" alt="" />
                            </div>

                            <div class="last-news__item-large-content">
                                <div class="last-news__item-large-date">{{ new
                                    Date(posts[activePost].publishedAt).toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'short', year: 'numeric'
                                    }).replace(/\.$/, '') }}</div>

                                <div>
                                    <div class="last-news__item-large-title">
                                        {{ posts[activePost].title }}
                                    </div>

                                    <div class="last-news__item-large-description">
                                        {{ posts[activePost].description }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="last-news__main-right">
                        <div class="last-news__list">
                            <div v-for="(post, index) in posts" :key="index" class="last-news__item-small"
                                @click="setActivePost(index)">
                                <div class="last-news__item-small-img">
                                    <img :src="post.imageUrl" alt="" />
                                    <div class="last-news__item-small-blue"
                                        :style="{ opacity: activePost != index ? '0' : '1' }">
                                        <div>Читать новость</div>
                                    </div>
                                </div>

                                <div class="last-news__item-small-content"
                                    :style="{ opacity: activePost == index ? '0' : '1' }">
                                    <div class="last-news__item-small-date">{{ new
                                        Date(post.publishedAt).toLocaleDateString('ru-RU', {
                                            day: 'numeric', month:
                                                'short', year: 'numeric'
                                        }).replace(/\.$/, '') }}</div>
                                    <div class="last-news__item-small-title">
                                        {{ post.title.slice(0, 40) }}...
                                    </div>
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
import { fetchFreeAPI } from "@/Services/apiService";
import data from "../assets/data/data.json";
import Card from '@/Components/Card.vue';
import BlockHeader from "@/Components/BlockHeader.vue";
import Slider2 from "@/Components/Slider2.vue";
import { getLatestVideosFromChannel } from "@/Services/apiService";
import { fetchFilmsByGenre } from "@/Services/apiService";
import UpArrow from '@/Components/UpArrow.vue';
import posts from "../assets/data/posts.json";
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            years: ['Все время', '2025', '2024', '2023', '2022', '2021', '2020'],
            activeYear: 'Все время',
            genres: ['Всеㅤ', 'Боевики', 'Приключенияㅤ', 'Комедияㅤ', 'Фантастикаㅤ', 'Триллеры', 'Драмаㅤ'],
            activeGenre: 'Всеㅤ',
            posts: posts.items.slice(0, 4),
            activePost: 0,
            data: data,
            nowPlayingMovies: [],
            trailers: [],
            currentTrailer: 0,
            popularMovies: [],
            likedVideos: [],
            dislikedVideos: [],
            linkToImg: "../assets/Media/Main",
        }
    },
    components: {
        Card,
        BlockHeader,
        Slider2,
        UpArrow
    },
    computed: {
        ...mapGetters(['blackList']),
    },
    methods: {
        ...mapActions(['toggleEmailMailing']),

        showEmailMailing() {
            this.toggleEmailMailing(true)
        },
        async setActiveYear(year) {
            this.activeYear = year;
            this.popularMovies = []

            let popularMovies = await fetchFreeAPI(
                isNaN(Number(this.activeYear))
                    ? '&limit=30&type=film'
                    : `&limit=30&type=film&year=${this.activeYear}`
            );
            this.popularMovies = popularMovies
                .filter(obj => !this.blackList.includes(obj.name))
                .slice(0, 20);
        },
        async setActiveGenre(genre) {
            this.activeGenre = genre;
            this.nowPlayingMovies = []

            this.nowPlayingMovies = await fetchFilmsByGenre(genre.slice(0, genre.length - 1))
        },
        setActivePost(index) {
            this.activePost = index;
        },
        goToLocation(url) {
            window.open(url, '_blank');
        },
        addLikesAndDislikes() {
            if (this.trailers && Array.isArray(this.trailers)) {
                this.trailers = this.trailers.map(trailer => {
                    const likes = Math.floor(Math.random() * (9999 - 2000 + 1)) + 2000;
                    const dislikes = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
                    return {
                        ...trailer,
                        likesCount: likes,
                        dislikesCount: dislikes
                    };
                });
            } else {
                console.warn('this.trailers не является массивом или не существует.');
            }
        },
        likeVideo(trailer) {
            if (JSON.parse(localStorage.getItem("currentUser"))) {
                if (!this.likedVideos.includes(trailer.videoId)) {
                    this.likedVideos.push(trailer.videoId);
                    trailer.likesCount++;

                    if (this.dislikedVideos.includes(trailer.videoId)) {
                        this.dislikedVideos = this.dislikedVideos.filter(id => id !== trailer.videoId);
                        trailer.dislikesCount--;
                    }

                } else {
                    this.likedVideos = this.likedVideos.filter(id => id !== trailer.videoId);
                    trailer.likesCount--;
                }
            } else {
                this.$toast.error('Нужно войти в аккаунт для выполнения этого действия!', {
                    position: 'top-right',
                    duration: 2000,
                    dismissible: false
                });
            }
        },
        dislikeVideo(trailer) {
            if (JSON.parse(localStorage.getItem("currentUser"))) {
                if (!this.dislikedVideos.includes(trailer.videoId)) {
                    this.dislikedVideos.push(trailer.videoId);
                    trailer.dislikesCount++;

                    if (this.likedVideos.includes(trailer.videoId)) {
                        this.likedVideos = this.likedVideos.filter(id => id !== trailer.videoId);
                        trailer.likesCount--;
                    }
                } else {
                    this.dislikedVideos = this.dislikedVideos.filter(id => id !== trailer.videoId);
                    trailer.dislikesCount--;
                }
            } else {
                this.$toast.error('Нужно войти в аккаунт для выполнения этого действия!', {
                    position: 'top-right',
                    duration: 2000,
                    dismissible: false
                });
            }
        },
        saveLocalStorage() {
            if (JSON.parse(localStorage.getItem("currentUser"))) {
                const user = JSON.parse(localStorage.getItem("currentUser"))
                const userId = user._id
                localStorage.setItem(`${userId}_likedVideos`, JSON.stringify(this.likedVideos));
                localStorage.setItem(`${userId}_dislikedVideos`, JSON.stringify(this.dislikedVideos));
            }
        },
        loadLocalStorage() {
            if (JSON.parse(localStorage.getItem("currentUser"))) {
                const user = JSON.parse(localStorage.getItem("currentUser"))
                const userId = user._id
                try {
                    this.likedVideos = JSON.parse(localStorage.getItem(`${userId}_likedVideos`)) || [];
                    this.dislikedVideos = JSON.parse(localStorage.getItem(`${userId}_dislikedVideos`)) || [];
                    this.updateCounts();
                } catch (e) {
                    console.error('Ошибка при загрузке из localStorage:', e);
                    localStorage.removeItem(`${userId}_likedVideos`);
                    localStorage.removeItem(`${userId}_dislikedVideos`);
                    this.likedVideos = [];
                    this.dislikedVideos = [];
                }
            }
        },
        updateCounts() {
            this.trailers.forEach(trailer => {
                if (this.likedVideos.includes(trailer.videoId)) {
                    trailer.likesCount = trailer.likesCount === 0 ? 1 : trailer.likesCount;
                }
                if (this.dislikedVideos.includes(trailer.videoId)) {
                    trailer.dislikesCount = trailer.dislikesCount === 0 ? 1 : trailer.dislikesCount;
                }
            });
        },
        likeIcon(videoId) {
            return this.likedVideos.includes(videoId)
                ? `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNyAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzFfMTc3NSkiPgo8cGF0aCBkPSJNNi4yMzgwMyAxMi4yNjJIMy4xODUxMkMyLjc2MzYzIDEyLjI2MiAyLjQyMTg4IDEyLjYwMzcgMi40MjE4OCAxMy4wMjUyVjI1LjIzNjZDMi40MjE4OCAyNS42NTgxIDIuNzYzNTggMjUuOTk5OSAzLjE4NTEyIDI1Ljk5OTlINi4yMzc5OEM2LjY1OTQ2IDI1Ljk5OTkgNy4wMDEyMiAyNS42NTgyIDcuMDAxMjIgMjUuMjM2NlYxMy4wMjUyQzcuMDAxMjIgMTIuNjAzNyA2LjY1OTU2IDEyLjI2MiA2LjIzODAzIDEyLjI2MloiIGZpbGw9IiMzNjU3Y2IiLz4KPHBhdGggZD0iTTI1LjMwNDkgMTQuMjg1MkMyNS4xNzAzIDEzLjEwMTIgMjQuMDY0MyAxMi4yNjIxIDIyLjg3MjcgMTIuMjYyMUgxNi45MjI1QzE3LjQyODEgMTEuMzU2NiAxNy42OTk2IDguNzk1NTYgMTcuNjg3NSA3Ljc0OTM3QzE3LjY2NzYgNi4wMTc2MyAxNi4yMzM1IDQuNjI5ODggMTQuNTAxNyA0LjYyOTg4SDEzLjg3MTlDMTMuNDUgNC42Mjk4OCAxMy4xMDg2IDQuOTcxMjMgMTMuMTA4NiA1LjM5MzEyQzEzLjEwODYgNy4xNTgwMiAxMi40MjE0IDEwLjM0MzYgMTEuMTI1MyAxMS42Mzk4QzEwLjI1MyAxMi41MTIxIDkuNTA3MTkgMTIuODI4MiA4LjUyOTMgMTMuMzE3VjI0Ljc2OUMxMC4wMjY1IDI1LjI2ODEgMTEuOTI3NCAyNi4wMDAxIDE0LjgyNDggMjYuMDAwMUgxOS44MTc0QzIxLjQ2MjUgMjYuMDAwMSAyMi43NDM3IDI0LjQ3NjUgMjIuMTA2MiAyMi44NjY3QzIzLjA3NzQgMjIuNjAyMSAyMy43OTM3IDIxLjcxMTQgMjMuNzkzNyAyMC42NTc1QzIzLjc5MzcgMjAuMzYwMSAyMy43MzYzIDIwLjA3NTQgMjMuNjMyNyAxOS44MTM4QzI1LjI2OTMgMTkuMzY3OSAyNS44NzE3IDE3LjM0NzEgMjQuNzM1OCAxNi4wNzgyQzI1LjE1MzEgMTUuNjEyIDI1LjM4MzMgMTQuOTc0MyAyNS4zMDQ5IDE0LjI4NTJaIiBmaWxsPSIjMzY1N2NiIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMV8xNzc1Ij4KPHJlY3Qgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWxsPSIjMzY1N2NiIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjg3MTA5NCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K`
                : `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNyAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzFfMTc3NSkiPgo8cGF0aCBkPSJNNi4yMzgwMyAxMi4yNjJIMy4xODUxMkMyLjc2MzYzIDEyLjI2MiAyLjQyMTg4IDEyLjYwMzcgMi40MjE4OCAxMy4wMjUyVjI1LjIzNjZDMi40MjE4OCAyNS42NTgxIDIuNzYzNTggMjUuOTk5OSAzLjE4NTEyIDI1Ljk5OTlINi4yMzc5OEM2LjY1OTQ2IDI1Ljk5OTkgNy4wMDEyMiAyNS42NTgyIDcuMDAxMjIgMjUuMjM2NlYxMy4wMjUyQzcuMDAxMjIgMTIuNjAzNyA2LjY1OTU2IDEyLjI2MiA2LjIzODAzIDEyLjI2MloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yNS4zMDQ5IDE0LjI4NTJDMjUuMTcwMyAxMy4xMDEyIDI0LjA2NDMgMTIuMjYyMSAyMi44NzI3IDEyLjI2MjFIMTYuOTIyNUMxNy40MjgxIDExLjM1NjYgMTcuNjk5NiA4Ljc5NTU2IDE3LjY4NzUgNy43NDkzN0MxNy42Njc2IDYuMDE3NjMgMTYuMjMzNSA0LjYyOTg4IDE0LjUwMTcgNC42Mjk4OEgxMy44NzE5QzEzLjQ1IDQuNjI5ODggMTMuMTA4NiA0Ljk3MTIzIDEzLjEwODYgNS4zOTMxMkMxMy4xMDg2IDcuMTU4MDIgMTIuNDIxNCAxMC4zNDM2IDExLjEyNTMgMTEuNjM5OEMxMC4yNTMgMTIuNTEyMSA5LjUwNzE5IDEyLjgyODIgOC41MjkzIDEzLjMxN1YyNC43NjlDMTAuMDI2NSAyNS4yNjgxIDExLjkyNzQgMjYuMDAwMSAxNC44MjQ4IDI2LjAwMDFIMTkuODE3NEMyMS40NjI1IDI2LjAwMDEgMjIuNzQzNyAyNC40NzY1IDIyLjEwNjIgMjIuODY2N0MyMy4wNzc0IDIyLjYwMjEgMjMuNzkzNyAyMS43MTE0IDIzLjc5MzcgMjAuNjU3NUMyMy43OTM3IDIwLjM2MDEgMjMuNzM2MyAyMC4wNzU0IDIzLjYzMjcgMTkuODEzOEMyNS4yNjkzIDE5LjM2NzkgMjUuODcxNyAxNy4zNDcxIDI0LjczNTggMTYuMDc4MkMyNS4xNTMxIDE1LjYxMiAyNS4zODMzIDE0Ljk3NDMgMjUuMzA0OSAxNC4yODUyWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xXzE3NzUiPgo8cmVjdCB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjg3MTA5NCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K`;
        },
        dislikeIcon(videoId) {
            return this.dislikedVideos.includes(videoId)
                ? `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyNiAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzFfMTc2NikiPgo8cGF0aCBkPSJNMjAuNjMzMSAxNC42MDkxTDIzLjY4NiAxNC42MDkxQzI0LjEwNzUgMTQuNjA5MSAyNC40NDkyIDE0LjI2NzQgMjQuNDQ5MiAxMy44NDU5TDI0LjQ0OTIgMS42MzQ0NUMyNC40NDkyIDEuMjEyOTYgMjQuMTA3NSAwLjg3MTIwNCAyMy42ODYgMC44NzEyMDRMMjAuNjMzMSAwLjg3MTIwNEMyMC4yMTE2IDAuODcxMjA0IDE5Ljg2OTkgMS4yMTI5MSAxOS44Njk5IDEuNjM0NDRMMTkuODY5OSAxMy44NDU5QzE5Ljg2OTkgMTQuMjY3NCAyMC4yMTE1IDE0LjYwOTEgMjAuNjMzMSAxNC42MDkxWiIgZmlsbD0iIzM2NTdjYiIvPgo8cGF0aCBkPSJNMS41NjYxOSAxMi41ODU5QzEuNzAwODEgMTMuNzY5OCAyLjgwNjc4IDE0LjYwOSAzLjk5ODM2IDE0LjYwOUw5Ljk0ODY0IDE0LjYwOUM5LjQ0Mjk2IDE1LjUxNDUgOS4xNzE1MyAxOC4wNzU1IDkuMTgzNTcgMTkuMTIxN0M5LjIwMzUzIDIwLjg1MzUgMTAuNjM3NiAyMi4yNDEyIDEyLjM2OTQgMjIuMjQxMkwxMi45OTkyIDIyLjI0MTJDMTMuNDIxMSAyMi4yNDEyIDEzLjc2MjUgMjEuODk5OSAxMy43NjI1IDIxLjQ3OEMxMy43NjI1IDE5LjcxMzEgMTQuNDQ5NyAxNi41Mjc1IDE1Ljc0NTggMTUuMjMxM0MxNi42MTgxIDE0LjM1OSAxNy4zNjM5IDE0LjA0MjggMTguMzQxOCAxMy41NTQxTDE4LjM0MTggMi4xMDIwNkMxNi44NDQ2IDEuNjAzMDQgMTQuOTQzNyAwLjg3MTAyOSAxMi4wNDYzIDAuODcxMDI4TDcuMDUzNjUgMC44NzEwMjhDNS40MDg2IDAuODcxMDI4IDQuMTI3MzkgMi4zOTQ2MSA0Ljc2NDg1IDQuMDA0MzhDMy43OTM2NiA0LjI2ODk1IDMuMDc3NDQgNS4xNTk2NSAzLjA3NzQ0IDYuMjEzNTZDMy4wNzc0NCA2LjUxMDk4IDMuMTM0ODIgNi43OTU2NiAzLjIzODQyIDcuMDU3MjlDMS42MDE3OSA3LjUwMzIgMC45OTkzNzQgOS41MjQwMyAyLjEzNTMgMTAuNzkyOUMxLjcxNzk4IDExLjI1OTEgMS40ODc4NCAxMS44OTY4IDEuNTY2MTkgMTIuNTg1OVoiIGZpbGw9IiMzNjU3Y2IiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xXzE3NjYiPgo8cmVjdCB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIGZpbGw9IiMzNjU3Y2IiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2IDI2Ljg3MTEpIHJvdGF0ZSgtMTgwKSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=`
                : `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyNiAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzFfMTc2NikiPgo8cGF0aCBkPSJNMjAuNjMzMSAxNC42MDkxTDIzLjY4NiAxNC42MDkxQzI0LjEwNzUgMTQuNjA5MSAyNC40NDkyIDE0LjI2NzQgMjQuNDQ5MiAxMy44NDU5TDI0LjQ0OTIgMS42MzQ0NUMyNC40NDkyIDEuMjEyOTYgMjQuMTA3NSAwLjg3MTIwNCAyMy42ODYgMC44NzEyMDRMMjAuNjMzMSAwLjg3MTIwNEMyMC4yMTE2IDAuODcxMjA0IDE5Ljg2OTkgMS4yMTI5MSAxOS44Njk5IDEuNjM0NDRMMTkuODY5OSAxMy44NDU5QzE5Ljg2OTkgMTQuMjY3NCAyMC4yMTE1IDE0LjYwOTEgMjAuNjMzMSAxNC42MDkxWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEuNTY2MTkgMTIuNTg1OUMxLjcwMDgxIDEzLjc2OTggMi44MDY3OCAxNC42MDkgMy45OTgzNiAxNC42MDlMOS45NDg2NCAxNC42MDlDOS40NDI5NiAxNS41MTQ1IDkuMTcxNTMgMTguMDc1NSA5LjE4MzU3IDE5LjEyMTdDOS4yMDM1MyAyMC44NTM1IDEwLjYzNzYgMjIuMjQxMiAxMi4zNjk0IDIyLjI0MTJMMTIuOTk5MiAyMi4yNDEyQzEzLjQyMTEgMjIuMjQxMiAxMy43NjI1IDIxLjg5OTkgMTMuNzYyNSAyMS40NzhDMTMuNzYyNSAxOS43MTMxIDE0LjQ0OTcgMTYuNTI3NSAxNS43NDU4IDE1LjIzMTNDMTYuNjE4MSAxNC4zNTkgMTcuMzYzOSAxNC4wNDI4IDE4LjM0MTggMTMuNTU0MUwxOC4zNDE4IDIuMTAyMDZDMTYuODQ0NiAxLjYwMzA0IDE0Ljk0MzcgMC44NzEwMjkgMTIuMDQ2MyAwLjg3MTAyOEw3LjA1MzY1IDAuODcxMDI4QzUuNDA4NiAwLjg3MTAyOCA0LjEyNzM5IDIuMzk0NjEgNC43NjQ4NSA0LjAwNDM4QzMuNzkzNjYgNC4yNjg5NSAzLjA3NzQ0IDUuMTU5NjUgMy4wNzc0NCA2LjIxMzU2QzMuMDc3NDQgNi41MTA5OCAzLjEzNDgyIDYuNzk1NjYgMy4yMzg0MiA3LjA1NzI5QzEuNjAxNzkgNy41MDMyIDAuOTk5Mzc0IDkuNTI0MDMgMi4xMzUzIDEwLjc5MjlDMS43MTc5OCAxMS4yNTkxIDEuNDg3ODQgMTEuODk2OCAxLjU2NjE5IDEyLjU4NTlaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzFfMTc2NiI+CjxyZWN0IHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2IDI2Ljg3MTEpIHJvdGF0ZSgtMTgwKSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=`;
        }
    },
    watch: {
        blackList() {
            this.nowPlayingMovies = this.nowPlayingMovies.filter(obj => !this.blackList.includes(obj.name))
        },
        likedVideos: {
            handler() {
                this.saveLocalStorage();
                this.updateCounts();
            },
            deep: true,
        },
        dislikedVideos: {
            handler() {
                this.saveLocalStorage();
                this.updateCounts();
            },
            deep: true,
        },
    },
    async mounted() {
        window.scrollTo(0, 0);
        document.title = 'VayKino'
        this.showEmailMailing()
        try {
            let nowPlayingMovies2025 = await fetchFreeAPI('&year=2025&limit=15&type=film');
            let nowPlayingMovies2024 = await fetchFreeAPI('&year=2024&limit=20&type=film');
            this.nowPlayingMovies = nowPlayingMovies2025.filter(obj => !this.blackList.includes(obj.name)).slice(0, 2).concat(nowPlayingMovies2024);
            this.nowPlayingMovies = this.nowPlayingMovies.filter(obj => !this.blackList.includes(obj.name))

            this.trailers = await getLatestVideosFromChannel();

            this.addLikesAndDislikes();

            this.loadLocalStorage()

            let popularMovies = await fetchFreeAPI(
                isNaN(Number(this.activeYear))
                    ? '&limit=40&type=film'
                    : `&limit=40&type=film&year=${this.activeYear}`
            );
            this.popularMovies = popularMovies
                .filter(obj => !this.blackList.includes(obj.name))
                .slice(0, 20);
        } catch (error) {
            this.error = error;
            console.error("Component error", error)
        }
    },
}
</script>

<style scoped>
/*****************************************************************************************************************************/
/* now-playing */

.bg-joker {
    background-image: url("../assets/Media/Main/bg-img.jpg");
    width: 100%;
    height: 1080px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-repeat: no-repeat;
    background-size: 100%;
}

.bg-joker-temnee {
    width: 100%;
    height: 1080px;
    background: linear-gradient(rgba(70, 44, 148, 0) -320%, #1e2538 83.8%);
}

.now-playing {
    margin-top: 60px;
    width: 100%;
}

.now-playing__header {
    display: flex;
    justify-content: space-between;
    align-items: end;
}

.now-playing__title {
    font-size: 65px;
    font-weight: 900;
    line-height: 82.81px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: white;
    height: 60px;
}

.now-playing__header-line {
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.now-playing__header-line-inner {
    background-color: #fff;
    height: 1px;
    width: 80px;
}

.now-playing__genres {
    display: flex;

    div {
        font-size: 18px;
        font-weight: 700;
        line-height: 22.3px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: rgb(177, 177, 177);
        user-select: none;
        cursor: pointer;

        &.active {
            color: white;
        }

        &:not(:first-child) {
            margin-left: 25px;
        }
    }
}

.now-playing__films {
    display: grid;
    grid-template-columns: repeat(4, 340px);
    justify-content: space-between;
    gap: 20px;
    margin-top: 60px;
}

.now-playing__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
}

.now-playing__all-movies-button {
    border: 1px solid white;
    padding: 20px 30px;
    color: white;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
}

/* now-playing */
/*****************************************************************************************************************************/



/*****************************************************************************************************************************/
/* trailers */

.trailers {
    margin-top: 50px;
    width: 100%;
}

.trailers__main {
    margin-top: 10px;
}

.trailers__active-media {
    width: 100%;

    iframe {
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: 10px;
    }
}

.trailers__active-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
}

.trailers__active-info-container {
    display: flex;
    align-items: center;
}

.trailers__active-name {
    color: white;
    font-size: 45px;
    font-weight: 900;
    line-height: 57.33px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    height: 65px;
}

.trailers__active-socials {
    display: flex;
    margin-left: 30px;

    a {
        width: 20px;
        opacity: 0.6;
        transition: 0.3s;
        user-select: none;
        cursor: pointer;
        filter: invert();

        &:not(:first-child) {
            margin-left: 25px;
        }

        &:hover {
            opacity: 1;
        }
    }
}

.trailers__active-likes {
    display: flex;
}

.trailers__active-like,
.trailers__active-dislike {
    cursor: pointer;
    user-select: none;

    img {
        pointer-events: none;
    }
}

.trailers__active-dislike {
    margin-left: 15px;
}

.trailers__active-like-img {
    width: 59px;
    height: 59px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1b2133;
    border-radius: 10px;
}

.trailers__active-like-count {
    margin-top: 10px;
    color: white;
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    line-height: 17.85px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
}

.trailers__active-dislike-img {
    width: 59px;
    height: 59px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1b2133;
    border-radius: 10px;
}

.trailers__active-dislike-count {
    margin-top: 10px;
    color: white;
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    line-height: 17.85px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
}

.trailers__list {
    display: flex;
    overflow-x: scroll;
    margin-top: 50px;
    padding-bottom: 25px;
    transform: scale(-1, 1);
    rotate: 180deg;

    &::-webkit-scrollbar {
        height: 5px;
    }

    &::-webkit-scrollbar-track {
        background: #1B2133;
        border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background: #3657cb;
        border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #1f4ae6;
    }
}

.trailers__item {
    user-select: none;
    cursor: pointer;
    transform: scale(1, -1);

    &:not(:first-child) {
        margin-left: 20px;
    }
}

.trailers__item-media {
    position: relative;
    height: 198.63px;

    div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 10;
        top: 0;
        border-radius: 10px;
        background: transparent;
        transition: 0.2s;

        &.active {
            background: #3657CBA6;
        }

        img {
            width: 30px;
            border-radius: 0px;
        }
    }

    img {
        width: 355px;
        border-radius: 10px;
    }
}

.trailers__item-name {
    margin-top: 5px;
    font-size: 20px;
    font-weight: 900;
    line-height: 25.48px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: white;
}

/* trailers */
/*****************************************************************************************************************************/



/*****************************************************************************************************************************/
/* popular-movies */

.popular-movies {
    margin-top: 60px;
    width: 100%;
}

.popular-movies__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.popular-movies__title {
    font-size: 65px;
    font-weight: 900;
    line-height: 82.81px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: white;
    height: 100px;
}

.popular-movies__divider {
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.popular-movies__divider-line {
    background-color: #fff;
    height: 1px;
    width: 80px;
}

.popular-movies__years {
    display: flex;

    div {
        font-size: 18px;
        font-weight: 700;
        line-height: 22.3px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: rgb(177, 177, 177);
        user-select: none;
        cursor: pointer;

        &.active {
            color: white;
        }

        &:not(:first-child) {
            margin-left: 25px;
        }
    }
}

/* popular-movies */
/*****************************************************************************************************************************/



/*****************************************************************************************************************************/
/* last-news */

.last-news {
    margin-top: 50px;
    width: 100%;
}

.last-news__main {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.last-news__item-large {
    position: relative;
    cursor: pointer;
    user-select: none;
}

.last-news__item-large-img {
    height: -webkit-fill-available;
}

.last-news__item-large-img img {
    width: 1220px;
    border-radius: 10px;
    display: block;
}

.last-news__item-large-content {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.last-news__item-large-date {
    font-size: 15px;
    font-weight: 700;
    line-height: 28.68px;
    text-align: left;
    color: white;
}

.last-news__item-large-title {
    font-size: 36px;
    font-weight: 800;
    line-height: 57.33px;
    text-align: left;
    color: white;
}

.last-news__item-large-description {
    font-size: 20px;
    font-weight: 500;
    line-height: 34.04px;
    text-align: left;
    color: white;
    width: 900px;
    margin-top: 15px;
}

.last-news__list {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.last-news__item-small {
    position: relative;
    cursor: pointer;
}

.last-news__item-small-img {
    z-index: -1;
    position: relative;
}

.last-news__item-small-img img {
    width: 290px;
    border-radius: 10px;
    display: block;
}

.last-news__item-small-blue {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    background-color: #3657CB94;
    border-radius: 10px;
    z-index: 4;
    height: -webkit-fill-available;
    transition: 0.2s;

    div {
        color: white;
        padding: 10px 20px;
        border: 2px solid white;
        border-radius: 10px;
        font-weight: 700;
        font-size: 16px;
    }
}

.last-news__item-small-content {
    position: absolute;
    top: 0;
    padding: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    user-select: none;
    transition: 0.2s;
}

.last-news__item-small-date {
    font-size: 15px;
    font-weight: 700;
    line-height: 28.68px;
    text-align: left;
    color: white;
}

.last-news__item-small-title {
    font-size: 18px;
    font-weight: 900;
    line-height: 22.93px;
    text-align: left;
    color: white;
    width: 250px;
}


/* news-section */
/*****************************************************************************************************************************/



/*****************************************************************************************************************************/
/* upcoming-movies */

.upcoming-movies {
    width: 100%;
}

/* .upcoming-movies__content {
    display: grid;
    grid-template-columns: repeat(4, 340px);
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-top: 30px;
} */

/* upcoming-movies */
/*****************************************************************************************************************************/






@media (max-width: 1915px) {
    .last-news__list {
        height: 100%;
        flex-direction: row;
        display: flex;
        overflow: auto;
    }

    .last-news__main {
        display: block;
        justify-content: space-between;
        margin-top: 10px;
    }

    .last-news__item-large-img img {
        width: 100%;
    }
}





@media (max-width: 1805px) {
    .now-playing__films {
        display: grid;
        grid-template-columns: repeat(3, 465px);
        justify-content: center;
        gap: 20px;
        margin-top: 60px;
        justify-items: center;
    }




}

@media (max-width: 1650px) {
    .now-playing__films {
        display: grid;
        grid-template-columns: repeat(3, 350px);
        justify-content: center;
        gap: 20px;
        margin-top: 60px;
        justify-items: center;

    }

    .now-playing__title {
        font-size: 35px;
        font-weight: 900;
        line-height: 55.81px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: white;
        height: 60px;
    }

    .popular-movies__title[data-v-2acfb07d] {
        font-size: 35px;
        font-weight: 900;
        line-height: 55.81px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: white;
        height: 100px;
    }

    .block_header-title[data-v-eceb0313] {
        color: white;
        font-size: 35px;
        font-weight: 900;
        line-height: 55.81px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
    }
}






@media (max-width: 1350px) {




    .movie-card-img {
        position: relative;
        width: 300px;
        height: 420px;
        border-radius: 10px;
        overflow: hidden;
    }

    .now-playing__films[data-v-2acfb07d] {
        display: grid;
        grid-template-columns: repeat(2, 350px);
        justify-content: center;
        gap: 20px;
        margin-top: 60px;
        justify-items: center;
    }

    .now-playing__title {
        font-size: 25px;
    }

    .now-playing__header-line {
        display: none;
    }

    .block_header-title {
        font-size: 25px;
    }
}


@media (max-width: 1100px) {
    .last-news__item-large-description[data-v-2acfb07d] {
        font-size: 20px;
        font-weight: 500;
        line-height: 34.04px;
        text-align: left;
        color: white;
        width: auto;
        margin-top: 15px;
    }

    .now-playing__header[data-v-2acfb07d] {
        display: grid;
        justify-content: center;
        align-items: end;
        justify-items: center;
    }

    .popular-movies__header[data-v-2acfb07d] {
        display: grid;
        justify-content: center;
        align-items: center;
        justify-items: center;
    }
}


@media (max-width: 900px) {

    .now-playing__films[data-v-2acfb07d][data-v-2acfb07d] {
        display: grid;
        grid-template-columns: repeat(1, 350px);
        justify-content: center;
        gap: 20px;
        margin-top: 60px;
        justify-items: center;
    }

    .last-news__item-large-description[data-v-2acfb07d][data-v-2acfb07d] {
        font-size: 13px;
        font-weight: 500;
        line-height: 34.04px;
        text-align: left;
        color: white;
        width: auto;
        margin-top: 15px;
    }

    .last-news__item-large-title[data-v-2acfb07d] {
        font-size: 20px;
        font-weight: 800;
        line-height: 57.33px;
        text-align: left;
        color: white;
    }

   

    .trailers__active-like-img[data-v-2acfb07d] {
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1b2133;
        border-radius: 10px;
    }



    .trailers__active-dislike-img {
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1b2133;
        border-radius: 10px;
    }

    .now-playing__genres {
    & div {
        &:not(:first-child) {
           font-size: 15px;
        }
    }
}

    .trailers__active-name{
        font-size: 25px;
    }
}



@media (max-width: 600px){
    .now-playing__genres {
    & div {
        &:not(:first-child) {
           font-size: 10px;
        }
    }

    .last-news__item-large-content{
        display: none;
    }
}
}
</style>