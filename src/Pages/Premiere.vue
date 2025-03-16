<template>
  <main>
    <div class="main-content">
      <div class="premiere">
        <BlockHeader :title="'График премьер фильмов'" :text="false" :link="false" />

        <div v-for="group in groupedMovies.slice(0, moviesCount)" :key="group.date">
          <div class="premiere-date_title">{{ formatDate(group.date) }}</div>
          
          <div class="premiere-cont">
              <Card v-for="(movie, index) in group.movies" :key="index" :data="movie" :contextMenu="false" style="margin-top: 15px;" />
          </div>
        </div>

        <div v-if="groupedMovies.length > moviesCount" class="loadBut" @click="moviesCountIncrement">Загрузить больше</div>
      </div>
    </div>

    <UpArrow />
  </main>
</template>

<script>
import upcoming from '../assets/data/upcoming.json';
import BlockHeader from '@/Components/BlockHeader.vue';
import Card from '@/Components/Card.vue';
import UpArrow from '@/Components/UpArrow.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      upcoming: upcoming.docs,
      groupedMovies: [],
      moviesCount: 8,
    };
  },
  computed: {
        ...mapGetters(['blackList']),
    },
  components: {
    BlockHeader,
    Card,
    UpArrow
  },
  mounted() {
    window.scrollTo(0, 0);
    this.groupMoviesByDate();
    this.showEmailMailing();
    document.title = 'Афиша'
  },
  methods: {
    ...mapActions(['toggleEmailMailing']),

    showEmailMailing(){
      this.toggleEmailMailing(true)
    },
    groupMoviesByDate() {
      this.upcoming = this.upcoming.filter(obj => !this.blackList.includes(obj.name))
      console.log(this.blackList);
      
      
      const grouped = {};

      if (!this.upcoming || this.upcoming.length === 0) {
        this.groupedMovies = [];
        return;
      }

      for (const movie of this.upcoming) {
        if (movie && movie.premiere && movie.premiere.russia) {
          try {
            const premiereDateStr = movie.premiere.russia;
            const premiereDate = new Date(premiereDateStr);
            const year = premiereDate.getFullYear();
            const month = String(premiereDate.getMonth() + 1).padStart(2, '0');
            const day = String(premiereDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            if (!grouped[formattedDate]) {
              grouped[formattedDate] = [];
            }

            grouped[formattedDate].push(movie);

          } catch (error) {
            console.error(`Ошибка при обработке даты премьеры для фильма: ${movie.name || 'unknown'}. Ошибка: ${error}`);
            continue;
          }
        } else {
          console.warn(`Фильм пропущен, так как отсутствует или неверно задана дата мировой премьеры: ${movie.name || 'unknown'}`);
          continue;
        }
      }

      const result = [];
      for (const date in grouped) {
        if (grouped.hasOwnProperty(date)) {
          result.push({ date: date, movies: grouped[date] });
        }
      }

      this.groupedMovies = result;
      
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const monthNames = [
        "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
      ];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();

      return `${day} ${month} ${year}`;
    },
    moviesCountIncrement(){
      if(this.moviesCount < this.groupedMovies.length){
        this.moviesCount += 8;
      }
    }
  },
};
</script>

<style scoped>
.premiere {
  width: 100%;
}

.premiere-date_title {
  font-weight: 600;
  font-size: 25px;
  color: white;
  margin-top: 40px;
}

.premiere-cont{
  display: grid;
  grid-template-columns: repeat(4, 340px);
  justify-content: space-between;
  margin-top: 20px;
}

.loadBut{
    padding: 20px 25px;
    width: fit-content;
    border: 1px solid white;
    color: white;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    cursor: pointer;
    user-select: none;
}
</style>