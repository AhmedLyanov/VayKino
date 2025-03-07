<template>
  <main>
    <div class="main-content">
      <div class="movie-info">
        <div class="movie-info__main">
          <div class="movie-info__left">
            <div class="movie-info__image">
              <img v-if="!isLoading" :src="data?.poster?.url || '../src/assets/Media/Components/PosterDefault.jpg'"
                alt="" />
              <div v-else class="loading" style="width: 100%; height: 100%"></div>
            </div>
          </div>
          <div class="movie-info__right">
            <div class="movie-info__path">
              <span @click="this.$router.replace('/')" style="cursor: pointer; user-select: none;">Главная</span>
              <span style="margin-left: 7px; margin-right: 7px; user-select: none;">
                <img width="7" :src="`${linkToImg}/arrow_mini.svg`" alt="arrow" />
              </span>
              <span @click="this.$router.replace(`/${movieTypes[data?.type]?.path}`)"
                style="cursor: pointer; user-select: none;">{{ movieTypes[data?.type]?.nameMnogo }}</span>
              <span style="margin-left: 7px; margin-right: 7px; user-select: none;">
                <img width="7" :src="`${linkToImg}/arrow_mini.svg`" alt="arrow" />
              </span>
              <span v-if="!isLoading">{{ data.name ? data.name : data.alternativeName }}</span>
              <div v-else class="loading" style="width: 200px; height: 75%; margin-left: 3px;"></div>
            </div>
            <div class="movie-info__details">
              <div class="movie-info__name-ru">
                <span v-if="!isLoading">{{ data.name ? data.name : data.alternativeName }}</span>
                <div v-else class="loading" style="width: 700px; height: 60px; margin-left: 3px;">
                </div>
              </div>
              <div class="movie-info__name-en" v-if="data.name">
                <span v-if="!isLoading">{{ data.alternativeName }}</span>
                <div v-else class="loading" style="width: 300px; height: 30px; margin-left: 3px;">
                </div>
              </div>
              <div class="movie-info__ratings">
                <Rating :rating="data?.rating?.kp || 1" :label="'Kinopoisk'" v-if="data?.rating?.kp" />
                <Rating :rating="data?.rating?.imdb || 1" :label="'IMDb'" v-if="data?.rating?.imdb" />
              </div>
              <div class="movie-info__description" v-if="data.description">
                <span v-if="!isLoading">{{ data.description }}</span>
                <div v-else class="loading" style="width: 900px; height: 100px; margin-left: 3px;">
                </div>
              </div>
              <div class="movie-info__actions">
                <div class="movie-info__watch-trailer" @click="scrollToTrailer">
                  <img :src="`${linkToImg}/play.svg`" alt="" />
                  Смотреть трейлер
                </div>

                <div class="movie-info__socials">
                  <a href="https://vk.com/" target="_blank">
                    <img :src="`${linkToImg}/vk_social_media_icon.svg`" alt="VK" />
                  </a>
                  <a href="https://www.instagram.com/" target="_blank">
                    <img :src="`${linkToImg}/instagram_social_media_icon.svg`" alt="" />
                  </a>
                  <a href="https://facebook.com/" target="_blank">
                    <img :src="`${linkToImg}/facebook_social_media_icon.svg`" alt="" />
                  </a>
                  <a href="https://x.com/" target="_blank">
                    <img :src="`${linkToImg}/twitter_social_media_icon.svg`" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="movie-info__interactions">
          <div class="movie-info__reactions">
            <div class="movie-info__like" @click="likeMovie">
              <img :src="likeMovieIcon" alt="like" />
            </div>
            <div class="movie-info__dislike" @click="dislikeMovie">
              <img :src="dislikeMovieIcon" alt="dislike" />
            </div>
          </div>

          <div class="movie-info__favorites">
            <div class="movie-info__favorite-icon" @click="toggleFavorite">
              <img :src="`${linkToImg}/${isFavorite ? 'blue-heart.svg' : 'heart.svg'}`" alt="" />
            </div>
            <div class="movie-info__favorite-count">
              В избранном у {{ 9999 + isFavorite }} человек
            </div>
          </div>
        </div>

        <div class="movie-table">
          <div class="movie-table__row" v-if="data.year">
            <div class="movie-table__cell--header">
              Год:
            </div>
            <div class="movie-table__cell">
              {{ data.year }}
            </div>
          </div>

          <div class="movie-table__row" v-if="data?.persons?.filter(item => item.enProfession === 'designer').length">
            <div class="movie-table__cell--header">
              Художники:
            </div>
            <div class="movie-table__cell">
              {{data?.persons?.filter(item => item.enProfession === 'designer').slice(0, 2).map(item =>
                item.name).join(', ')}}
            </div>
          </div>

          <div class="movie-table__row" v-if="data.countries">
            <div class="movie-table__cell--header">
              Страна:
            </div>
            <div class="movie-table__cell">
              <span v-for="(country, index) in data.countries" :key="index">{{ country.name }}<span
                  v-if="index < data.countries.length - 1">, </span></span>
            </div>
          </div>

          <div class="movie-table__row" v-if="data?.persons?.filter(item => item.enProfession === 'editor').length">
            <div class="movie-table__cell--header">
              Монтаж:
            </div>
            <div class="movie-table__cell">
              {{data?.persons?.filter(item => item.enProfession === 'editor').slice(0, 2).map(item =>
                item.name).join(', ')}}
            </div>
          </div>

          <div class="movie-table__row" v-if="data.slogan">
            <div class="movie-table__cell--header">
              Слоган:
            </div>
            <div class="movie-table__cell">
              {{ data.slogan }}
            </div>
          </div>

          <div class="movie-table__row" v-if="data.genres">
            <div class="movie-table__cell--header">
              Жанр:
            </div>
            <div class="movie-table__cell">
              <span v-for="(country, index) in data.genres" :key="index">{{ country.name }}<span
                  v-if="index < data.genres.length - 1">, </span></span>
            </div>
          </div>

          <div class="movie-table__row" v-if="data?.persons?.filter(item => item.enProfession === 'director').length">
            <div class="movie-table__cell--header">
              Режисер:
            </div>
            <div class="movie-table__cell">
              {{data?.persons?.filter(item => item.enProfession === 'director').slice(0, 2).map(item =>
                item.name).join(', ')}}
            </div>
          </div>

          <div class="movie-table__row" v-if="data?.fees?.world">
            <div class="movie-table__cell--header">
              Сборы в мире:
            </div>
            <div class="movie-table__cell">
              {{ data && data.fees && data.fees.world ?
                `${data.fees.world.currency}${data?.fees?.world?.value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                  " ")}` : '' }}
            </div>
          </div>

          <div class="movie-table__row" v-if="data?.persons?.filter(item => item.enProfession === 'writer').length">
            <div class="movie-table__cell--header">
              Сценарий:
            </div>
            <div class="movie-table__cell">
              {{data?.persons?.filter(item => item.enProfession === 'writer').slice(0, 2).map(item =>
                item.name).join(', ')}}
            </div>
          </div>

          <div class="movie-table__row" v-if="data?.premiere?.world">
            <div class="movie-table__cell--header">
              Премьера (мир):
            </div>
            <div class="movie-table__cell">
              {{ data.premiere ? new Date(`${data.premiere.world}`).toLocaleDateString("ru-RU", {
                day:
                  "numeric", month: "long", year: "numeric"
              }) : '' }}

            </div>
          </div>

          <div class="movie-table__row" v-if="data?.persons?.filter(item => item.enProfession === 'producer').length">
            <div class="movie-table__cell--header">
              Продюсер:
            </div>
            <div class="movie-table__cell">
              {{data?.persons?.filter(item => item.enProfession === 'producer').slice(0, 2).map(item =>
                item.name).join(', ')}}
            </div>
          </div>

          <div class="movie-table__row" v-if="data?.premiere?.russia">
            <div class="movie-table__cell--header">
              Премьера (РФ):
            </div>
            <div class="movie-table__cell">
              {{ data.premiere ? new Date(`${data.premiere.russia}`).toLocaleDateString("ru-RU", {
                day:
                  "numeric", month: "long", year: "numeric"
              }) : '' }}
            </div>
          </div>

          <div class="movie-table__row" v-if="data?.persons?.filter(item => item.enProfession === 'operator').length">
            <div class="movie-table__cell--header">
              Оператор:
            </div>
            <div class="movie-table__cell">
              {{data?.persons?.filter(item => item.enProfession === 'operator').slice(0, 2).map(item =>
                item.name).join(', ')}}
            </div>
          </div>

          <div class="movie-table__row" v-if="data.ageRating">
            <div class="movie-table__cell--header">
              Возраст:
            </div>
            <div class="movie-table__cell">
              {{ (data.ageRating) ? data.ageRating + "+" : '' }}
            </div>
          </div>

          <div class="movie-table__row" v-if="data?.persons?.filter(item => item.enProfession === 'composer').length">
            <div class="movie-table__cell--header">
              Композитор:
            </div>
            <div class="movie-table__cell">
              {{data?.persons?.filter(item => item.enProfession === 'composer').slice(0, 2).map(item =>
                item.name).join(', ')}}
            </div>
          </div>

          <div class="movie-table__row" v-if="data.movieLength">
            <div class="movie-table__cell--header">
              Время:
            </div>
            <div class="movie-table__cell">
              {{ `${data.movieLength} мин. / 0${Math.floor(data.movieLength /
                60)}:${data.movieLength % 60}` }}
            </div>
          </div>
        </div>
      </div>

      <Cast :data="data" />

      <div class="movie-trealer" ref="treailer">
        <BlockHeader :title="'Трейлер фильма'" :text="false" :link="false" />

        <div class="trealers-trealer">
          <iframe width="100%" height="auto" :src="`https://www.youtube.com/embed/${trealer.videoId}`"
            title="YouTube video player" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>

        <div class="trealers-info">
          <div class="trealers-info-cont">
            <div class="trealers-info-name">{{ data.name }}</div>

            <div class="trealers-info-socail_networks">
              <a href="https://vk.com/" target="_blank">
                <img :src="`${linkToImg}/vk_social_media_icon.svg`" alt="VK" />
              </a>
              <a href="https://www.instagram.com/" target="_blank">
                <img :src="`${linkToImg}/instagram_social_media_icon.svg`" alt="Instagram" />
              </a>
              <a href="https://facebook.com/" target="_blank">
                <img :src="`${linkToImg}/facebook_social_media_icon.svg`" alt="Facebook" />
              </a>
              <a href="https://x.com/" target="_blank">
                <img :src="`${linkToImg}/twitter_social_media_icon.svg`" alt="Twitter(X)" />
              </a>
            </div>
          </div>

          <div class="trealers-info-likes">
            <div class="trealers-info-like" @click="likeVideo(trealer)">
              <div class="trealers-info-like-img">
                <img :src="likeIcon(trealer.videoId)" alt="like" />
              </div>
              <div class="trealers-info-like-count">
                <div class="trailers__active-like-count">{{ trealer?.likesCount }}
                </div>
              </div>
            </div>
            <div class="trealers-info-dislike" @click="dislikeVideo(trealer)">
              <div class="trealers-info-dislike-img">
                <img :src="dislikeIcon(trealer.videoId)" alt="dislike" />
              </div>
              <div class="trealers-info-dislike-count">
                <div class="trailers__active-dislike-count">{{
                  trealer?.dislikesCount }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="movie-awards" v-if="awards?.items?.length">
        <BlockHeader :title="'Награды'" :text="awards?.items?.length > 4 ? 'Все награды' : false"
          :link="`/awards/${data.id}`" />

        <div class="awards-main">
          <AwardCard v-for="(award, index) in awards.items.slice(0, 4)" :key="index" :award="award" />
        </div>
      </div>

      <div class="movie-posters" v-if="posters?.items?.length">
        <BlockHeader :title="'Постеры к фильму'" :text="posters?.items?.length > 4 ? 'Все постеры' : false"
          :link="`/posters/${data.id}`" />

        <div class="posters-main">
          <Poster v-if="posters?.items?.length" v-for="(poster, index) in posters?.items?.slice(0, 4)" :key="index"
            :data="{ imageUrl: poster.imageUrl }" :posterScale="0.3" />
          <Poster v-else v-for="index in 4" :key="index + '_'" :data="{}" :posterScale="0.3" />
        </div>
      </div>

      <div class="movie-stills" v-if="stills && stills?.items?.length">
        <BlockHeader :title="'Кадры из фильма'" :text="stills?.items?.length > 4 ? 'Все кадры' : false"
          :link="`/stills/${data.id}`" />

        <div class="stills-main">
          <Still v-for="(still, index) in stills?.items?.slice(0, 4)" :key="index" :still="still" />
        </div>
      </div>

      <div class="movie-watch" v-if="id">
        <BlockHeader :title="'Смотреть онлайн'" :text="false" :link="false" />
        <div class="watch_movie-main" v-if="data.year < 2023 || isPremium">
          <KiniboxWidget :kinopoiskId="id" />
        </div>

        <div class="movie-buy" v-else>
          <div>
            Для просмотра этого фильма, потребуется приобрести подписку.
            <div class="movie-buy-but" @click="buyPremium">Перейти к покупке</div>
          </div>
        </div>
      </div>

      <div class="movie-sequels" v-if="sequels.length">
        <div class="sequels__header">Сиквелы и приквелы</div>
        <div class="sequels__content">
          <Slider2 :data="sequels" />
        </div>
      </div>

      <div class="movie-similars" v-if="similars && similars?.items?.length">
        <div class="similars__header">Похожие фильмы</div>
        <div class="similars__content">
          <Slider2 :data="similars.items" />
        </div>
      </div>

      <div class="reviews-container">
        <BlockHeader :title="'Рецензии к фильму'" :text="false" :link="false" />

        <div class="comment-box" v-if="previews.length > 0">
          <div v-for="(preview, index) in previews" :key="index">


            <div class="container_comment">

              <div class="account_comment">
                <div class="avatar_box">
                  <img src="../assets/Media/profile/default.png" />
                </div>
                <div class="info_account">
                  <p class="name_user_text_comment">{{ preview.author }}</p>
                  <Rating :rating="preview.rating" />
                </div>

              </div>


              <div class="info-preview">
                <div class="timeTitle-Box">
                  <h3>{{ preview.title }}</h3>
                  <p>{{ preview.date }}</p>
                </div>
                <p class="comment_user_description"> {{ preview.description }}</p>
              </div>

            </div>




          </div>
        </div>

        <div v-else>
          <p>Отзывы отсутствуют.</p>
        </div>

      </div>

      <div class="bg-movie_cadr" :style="{ backgroundImage: data ? `url(${data?.backdrop?.url})` : 'none' }">
        <div class="bg-movie_cadr-temnee"></div>
      </div>
    </div>

    <UpArrow />



  </main>
</template>

<script>
import Rating from '@/Components/Rating.vue';
import BlockHeader from '@/Components/BlockHeader.vue';
import Cast from '@/Components/Cast.vue';
import Still from '@/Components/Still.vue';
import KiniboxWidget from '@/Components/KiniboxWidget.vue';
import AwardCard from '@/Components/AwardCard.vue';
import Slider2 from '@/Components/Slider2.vue';
import UpArrow from '@/Components/UpArrow.vue';
import Poster from '@/Components/Poster.vue';
import { fetchData, fetchAwards, fetchPosters, fetchStills, fetchSequels, fetchSimilars, searchTrailer, fetchPreviews } from '@/Services/apiService';
import axios from 'axios';
import { mapActions } from "vuex";


export default {
  data() {
    return {
      data: {},
      isLiked: false,
      isDisliked: false,
      posters: {},
      stills: {},
      awards: {},
      previews: [],
      sequels: {},
      similars: {},
      trealer: {},
      linkToImg: "../src/assets/Media/MoviePage",
      isLoading: false,
      isPremium: false,
      isFavorite: false,
      likedVideos: [],
      dislikedVideos: [],
      movieTypes: {
        "movie": { name: "Фильм", nameMnogo: "Фильмы", path: "movies" },
        "tv-series": { name: "Сериал", nameMnogo: "Сериалы", path: "series" },
        "cartoon": { name: "Мультфильм", nameMnogo: "Мультфильмы", path: "cartoons" },
        "animated-series": { name: "Мультсериал", nameMnogo: "Мультсериалы", path: "cartoon-series" },
        "anime": { name: "Аниме", nameMnogo: "Аниме", path: "anime" },
      }
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  watch: {
    id(newId, oldId) {
      if (newId !== oldId) {
        window.scrollTo(0, 0);
        this.data = {}
        this.fetchMovieDataData();
        this.checkIfFavorite()
      }
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
  computed: {
    likeMovieIcon() {
      return `${this.linkToImg}/${this.isLiked ? 'blue-like.svg' : 'like.svg'}`;
    },
    dislikeMovieIcon() {
      return `${this.linkToImg}/${this.isDisliked ? 'blue-dislike.svg' : 'dislike.svg'}`;
    },
    localStorageKey() {
      const user = JSON.parse(localStorage.getItem("currentUser"))
      const userId = user?._id
      return `${userId}_movie_${this.id}_reaction`;
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchMovieDataData();
    this.checkPremiumStatus();
    this.showEmailMailing()
    this.checkIfFavorite();
    this.loadFromLocalStorage();
  },
  methods: {
    ...mapActions(['toggleEmailMailing']),

    showEmailMailing(){
      this.toggleEmailMailing(true)
    },
    async fetchMovieDataData() {
      this.isLoading = true;
      try {
        this.data = await fetchData(this.id);
        document.title = this.data.name || this.data.alternativeName;
      } catch (error) {
        console.error("Ошибка при получении данных фильма:", error);
      }

      try {
        this.trealer = await searchTrailer(`${this.movieTypes[this.data.type].name} ${this.data.name} ${this.data.year}`);
        this.addLikesAndDislikes();
        this.loadLocalStorage();
      } catch (error) {
        console.error("Ошибка при получении трейлера:", error);
        this.trealer = null;
      }

      try {
        this.awards = await fetchAwards(this.id);
      } catch (error) {
        console.error("Ошибка при получении наград:", error);
        this.awards = [];
      }

      try {
        this.previews = await fetchPreviews(this.id);
        console.log(this.previews);

      } catch (error) {
        console.error("Отзывы тупиты:", error);
        this.previews = [];
      }

      try {
        this.posters = await fetchPosters(this.id);
      } catch (error) {
        console.error("Ошибка при получении постеров:", error);
        this.posters = [];
      }

      try {
        this.stills = await fetchStills(this.id);
      } catch (error) {
        console.error("Ошибка при получении кадров:", error);
        this.stills = [];
      }

      try {
        this.sequels = await fetchSequels(this.id);
      } catch (error) {
        console.error("Ошибка при получении сиквелов/приквелов:", error);
        this.sequels = [];
      }

      try {
        this.similars = await fetchSimilars(this.id);
      } catch (error) {
        console.error("Ошибка при получении похожих фильмов:", error);
        this.similars = [];
      }

      this.isLoading = false;
    },
    async checkPremiumStatus() {
      const userString = localStorage.getItem('currentUser');
      if (userString) {
        const user = JSON.parse(userString);
        this.isPremium = user.premium || false;
      }
    },
    async buyPremium() {
      const userString = localStorage.getItem('currentUser');
      if (userString) {
        const user = JSON.parse(userString);
        try {
          const response = await axios.post('http://91.197.96.204:3000/buy-premium', { login: user.login });
          if (response.data.message) {
            alert(response.data.message);
            this.checkPremiumStatus();
          }
        } catch (error) {
          console.error('Ошибка при покупке премиум-подписки:', error);
          alert(error.response?.data.error || 'Ошибка при покупке премиум-подписки');
        }
      }
    },
    scrollToTrailer() {
      this.$nextTick(() => {
        const trailerElement = this.$refs.treailer;
        if (trailerElement) {
          trailerElement.style.marginTop = '60px';
          trailerElement.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            trailerElement.style.marginTop = '';
          }, 600);
        } else {
          console.error('Элемент trailer не найден!');
        }
      });
    },
    checkIfFavorite() {
      if (JSON.parse(localStorage.getItem("currentUser"))) {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const userId = user._id
        const favoritesString = localStorage.getItem(`${userId}_favoriteMovies`);
        if (favoritesString) {
          try {
            const favorites = JSON.parse(favoritesString);
            this.isFavorite = favorites.some(movie => movie.id === this.id);
          } catch (error) {
            console.error('Ошибка разбора JSON из localStorage:', error);
            localStorage.setItem(`${userId}_favoriteMovies`, JSON.stringify([]));
            this.isFavorite = false;
          }
        } else {
          this.isFavorite = false;
        }
      }
    },
    toggleFavorite() {
      if (JSON.parse(localStorage.getItem("currentUser"))) {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const userId = user._id
        let favoritesString = localStorage.getItem(`${userId}_favoriteMovies`);
        let favorites = [];

        if (favoritesString) {
          try {
            favorites = JSON.parse(favoritesString);
          } catch (error) {
            console.error('Ошибка разбора JSON из localStorage:', error);
            localStorage.setItem(`${userId}_favoriteMovies`, JSON.stringify([]));
            favorites = [];
          }
        }

        const index = favorites.findIndex(movie => movie.id === this.id);

        if (index > -1) {
          favorites.splice(index, 1);
          this.isFavorite = false;
        } else {
          favorites.push({ id: this.id, name: this.data.name, enName: this.data.alternativeName, poster: this.data?.poster?.url || '../src/assets/Media/Components/PosterDefault.jpg', genres: this.data?.genres });
          this.isFavorite = true;
        }

        localStorage.setItem(`${userId}_favoriteMovies`, JSON.stringify(favorites));
      } else {
        this.$toast.error('Нужно войти в аккаунт для выполнения этого действия!', {
          position: 'top-right',
          duration: 2000,
          dismissible: false
        });
      }
    },
    addLikesAndDislikes() {
      this.trealer.likesCount = Math.floor(Math.random() * (9999 - 2000 + 1)) + 2000;
      this.trealer.dislikesCount = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
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
      if (this.likedVideos.includes(this.trealer.videoId)) {
        this.trealer.likesCount = this.trealer.likesCount === 0 ? 1 : this.trealer.likesCount;
      }
      if (this.dislikedVideos.includes(this.trealer.videoId)) {
        this.trealer.dislikesCount = this.trealer.dislikesCount === 0 ? 1 : this.trealer.dislikesCount;
      }
    },
    likeIcon(videoId) {
      return this.likedVideos.includes(videoId)
        ? `${this.linkToImg}/blue-like.svg`
        : `${this.linkToImg}/like.svg`;
    },
    dislikeIcon(videoId) {
      return this.dislikedVideos.includes(videoId)
        ? `${this.linkToImg}/blue-dislike.svg`
        : `${this.linkToImg}/dislike.svg`;
    },
    likeMovie() {
      if (JSON.parse(localStorage.getItem("currentUser"))) {
        if (this.isLiked) {
          this.isLiked = false;
          this.isDisliked = false;
        } else {
          this.isLiked = true;
          this.isDisliked = false;
        }
        this.saveToLocalStorage();
      } else {
        this.$toast.error('Нужно войти в аккаунт для выполнения этого действия!', {
          position: 'top-right',
          duration: 2000,
          dismissible: false
        });
      }
    },
    dislikeMovie() {
      if (JSON.parse(localStorage.getItem("currentUser"))) {
        if (this.isDisliked) {
          this.isLiked = false;
          this.isDisliked = false;
        } else {
          this.isDisliked = true;
          this.isLiked = false;
        }
        this.saveToLocalStorage();
      } else {
        this.$toast.error('Нужно войти в аккаунт для выполнения этого действия!', {
          position: 'top-right',
          duration: 2000,
          dismissible: false
        });
      }
    },
    loadFromLocalStorage() {
      const storedReaction = localStorage.getItem(this.localStorageKey);
      if (storedReaction) {
        const reaction = JSON.parse(storedReaction);
        this.isLiked = reaction.isLiked;
        this.isDisliked = reaction.isDisliked;
      }
    },
    saveToLocalStorage() {
      const reaction = { isLiked: this.isLiked, isDisliked: this.isDisliked };
      localStorage.setItem(this.localStorageKey, JSON.stringify(reaction));
    },
  },
  components: {
    Rating,
    BlockHeader,
    Cast,
    Still,
    KiniboxWidget,
    AwardCard,
    Slider2,
    UpArrow,
    Poster
  }
}
</script>

<style scoped>
/* ////////////////////////////////////////////////////////////////////////////////////////////////// */
/* movie-info */

.movie-info {
  width: 85%;
  margin-top: 40px;
}

.movie-info__main {
  display: flex;
}

.movie-info__image {
  width: 400px;
  height: 600px;
  border-radius: 10px;
  overflow: hidden;
}

.movie-info__image img {
  width: 100%;
  height: auto;
  border-radius: 13px;
}

.movie-info__right {
  margin-left: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 20px;
}

.movie-info__path {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 26.99px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #4f5b7c;
}

.movie-info__path span {
  display: flex;
  align-items: center;
}

.movie-info__path span:last-child {
  color: white;
}

.movie-info__details {
  margin-top: 15px;
}

.movie-info__name-ru {
  font-size: 65px;
  font-weight: 900;
  line-height: 82.81px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: white;
}

.movie-info__name-en {
  font-size: 25px;
  font-weight: 500;
  line-height: 30.18px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: white;
  margin-top: 10px;
}

.movie-info__ratings {
  display: flex;
  margin-top: 15px;
  width: 141px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.movie-info__description {
  font-size: 20px;
  font-weight: 500;
  line-height: 33.3px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: white;
  margin-top: 15px;
}

.movie-info__actions {
  display: flex;
  margin-top: 20px;
}

.movie-info__watch-trailer {
  padding: 20px 40px;
  color: white;
  border: 2px solid white;
  display: flex;
  align-items: center;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  line-height: 29.97px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  cursor: pointer;
  user-select: none;
}

.movie-info__watch-trailer img {
  margin-right: 10px;
}

.movie-info__socials {
  display: flex;
  align-items: center;
  margin-left: 50px;

  a {
    width: 20px;
    height: 20px;
    opacity: 0.6;
    transition: 0.3s;
    user-select: none;
    cursor: pointer;
    filter: invert();

    &:not(:first-child) {
      margin-left: 20px;
    }

    &:hover {
      opacity: 1;
    }
  }
}

.timeTitle-Box {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 50px;
}

.movie-info__social:not(:first-child) {
  margin-left: 20px;
}

.movie-info__interactions {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.movie-info__reactions,
.movie-info__favorites {
  display: flex;
  align-items: center;
  color: white;
}

.movie-info__favorites {
  margin-left: 35px;
}

.container_comment {
  width: 100%;
  margin: auto;
  padding: 30px;
  border: 5px solid wheat;
  height: auto;
  border-radius: 5px;
  gap: 50px;
  display: grid;
}

.account_comment {
  display: flex;
  gap: 25px;
}

.comment-box {
  display: grid;
  gap: 50px;
}

.info_account {
  display: flex;
  align-items: center;
  gap: 25px;
}

.timeTitle-Box h3 {
  font-weight: 700;
  font-size: 30px;
  line-height: 100%;
  color: #FFFFFF;
  letter-spacing: 0%;
}


.info-preview .comment_user_description {
  font-family: Qanelas;
  font-weight: 200;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0%;
  color: #FFFFFF;

}

.timeTitle-Box p {
  font-family: Qanelas;
  font-weight: 500;
  font-size: 15px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #CBCBCB;
}

.info_account .name_user_text_comment {
  font-weight: 700;
  font-size: 30px;
  line-height: 100%;
  color: #FFFFFF;
  letter-spacing: 0%;
}

.avatar_box {
  width: 115px;
  height: 115px;
}

.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.movie-info__like,
.movie-info__dislike,
.movie-info__favorite-icon {
  background-color: #1b2133;
  border-radius: 10px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

.movie-info__like img {
  margin-bottom: 5px;
}

.movie-info__dislike {
  margin-left: 15px;
}

.movie-info__dislike img {
  margin-top: 5px;
}

.movie-info__favorite-count {
  font-size: 14px;
  font-weight: 500;
  line-height: 16.9px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-left: 15px;
}

/* movie-info */
/* ////////////////////////////////////////////////////////////////////////////////////////////////// */


/* ////////////////////////////////////////////////////////////////////////////////////////////////// */
/* movie-table */

.movie-table {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.movie-table__row {
  display: grid;
  grid-template-columns: 160px 1fr;
  padding-right: 30px;
  align-items: center;
}

.movie-table__cell--header {
  font-size: 18px;
  font-weight: 500;
  line-height: 21.73px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-top: 15px;
  color: white;
}

.movie-table__cell {
  font-size: 18px;
  font-weight: 400;
  line-height: 21.42px;
  text-align: left;
  text-decoration-style: solid;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-top: 15px;
  color: #f2f60f;
}

/* movie-table */
/* ////////////////////////////////////////////////////////////////////////////////////////////////// */


/* ////////////////////////////////////////////////////////////////////////////////////////////////// */
/* movie-trealer */

.movie-trealer {
  width: 100%;
}

.trealers-trealer {
  display: flex;
  border-radius: 10px;
  overflow: hidden;

  iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
}

.trealers-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.trealers-info-cont {
  display: flex;
  align-items: center;
}

.trealers-info-name {
  color: white;
  font-size: 45px;
  font-weight: 900;
  line-height: 57.33px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  height: 65px;
}

.trealers-info-socail_networks {
  display: flex;
  margin-left: 30px;
}

.trealers-info-socail_networks a {
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

.trealers-info-likes {
  display: flex;

  img {
    pointer-events: none;
  }
}

.trealers-info-likes div {
  cursor: pointer;
  user-select: none;
}

.trealers-info-dislike {
  margin-left: 15px;
}

.trealers-info-like-img {
  width: 59px;
  height: 59px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1b2133;
  border-radius: 10px;
}

.trealers-info-like-count {
  margin-top: 10px;
  color: white;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 17.85px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.trealers-info-dislike-img {
  width: 59px;
  height: 59px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1b2133;
  border-radius: 10px;
}

.trealers-info-dislike-count {
  margin-top: 10px;
  color: white;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 17.85px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

/* movie-trealer */
/* ////////////////////////////////////////////////////////////////////////////////////////////////// */


/* ////////////////////////////////////////////////////////////////////////////////////////////////// */
/* movie-awards */

.movie-awards {
  width: 100%;
}

.awards-main {
  display: grid;
  grid-template-columns: repeat(4, 370px);
  justify-content: space-between;
}

/* movie-awards */
/* ////////////////////////////////////////////////////////////////////////////////////////////////// */


/* ////////////////////////////////////////////////////////////////////////////////////////////////// */
/* movie-posters */

.movie-posters {
  width: 100%;
}

.posters-main {
  display: grid;
  grid-template-columns: repeat(4, 360px);
  justify-content: space-between;
}

.posters-img {
  width: 360px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 10px;
    min-width: 100%;
    min-height: 100%;
  }
}

/* movie-posters */
/* ////////////////////////////////////////////////////////////////////////////////////////////////// */


/* ////////////////////////////////////////////////////////////////////////////////////////////////// */
/* movie-stills */

.movie-stills {
  width: 100%;
}

.stills-main {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stills-img {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    border-radius: 10px;
    min-height: 100%;
  }
}

/* movie-stills */
/* ////////////////////////////////////////////////////////////////////////////////////////////////// */


/* ////////////////////////////////////////////////////////////////////////////////////////////////// */
/* movie-watch */

.movie-watch {
  width: 100%;
}

.watch_movie-main iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.movie-buy {
  background-color: black;
  width: 100%;
  aspect-ratio: 16 / 9;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 600;
  margin-top: 20px;
}

.movie-buy-but {
  background-color: #3657cb;
  padding: 20px 25px;
  border-radius: 50px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  font-size: 18px;
  user-select: none;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0px 0px 0px 0px #3657cb;

  &:hover {
    box-shadow: 0px 0px 15px 0px #3657cb;
  }
}

/* movie-watch */
/* ////////////////////////////////////////////////////////////////////////////////////////////////// */


/* ////////////////////////////////////////////////////////////////////////////////////////////////// */
/* movie-sequels */

.movie-sequels {
  width: 100%;
}

.sequels__header {
  font-weight: 900;
  font-size: 65px;
  line-height: 82.81px;
  letter-spacing: 0%;
  display: flex;
  justify-content: center;
  color: white;
  margin-top: 50px;
}

/* movie-sequels */
/* ////////////////////////////////////////////////////////////////////////////////////////////////// */


/* ////////////////////////////////////////////////////////////////////////////////////////////////// */
/* movie-similars */

.movie-similars {
  width: 100%;
}

.similars__header {
  font-weight: 900;
  font-size: 65px;
  line-height: 82.81px;
  letter-spacing: 0%;
  display: flex;
  justify-content: center;
  color: white;
  margin-top: 50px;
}

/* movie-similars */
/* ////////////////////////////////////////////////////////////////////////////////////////////////// */







/* ////////////////////////////////////////////////////////////////////////////////////////////////// */
/* Others */

.bg-movie_cadr {
  width: 100%;
  height: 1080px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: 100%;
}

.bg-movie_cadr-temnee {
  width: 100%;
  height: 1080px;
  background: linear-gradient(rgba(70, 44, 148, 0) -100%, #1e2538 83.8%);
}

/* Others */
/* ////////////////////////////////////////////////////////////////////////////////////////////////// */
</style>