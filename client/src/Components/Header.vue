<template>
  <header>
    <div class="header-cont">
      <div class="header-left">

        <div class="logo_info">
          <div class="header-logo" @click="$router.replace('/')">
            <div class="header-logo-img">
              <img src="../assets/Media/Components/logo.svg" alt="Logo">
            </div>
            <div class="header-logo-title">Vay<mark>Kino</mark></div>
          </div>
          <div class="header-social_networks">
            <a href="https://vk.com/" target="_blank"> <img src="../assets/Media/Components/vk_social_media_icon.svg"
                alt="" /></a>
            <a href="https://www.instagram.com/" target="_blank">
              <img src="../assets/Media/Components/instagram_social_media_icon.svg" alt="" /></a>
            <a href="http://facebook.com/" target="_blank"> <img
                src="../assets/Media/Components/facebook_social_media_icon.svg" alt="" /></a>
            <a href="https://x.com/" target="_blank"> <img
                src="../assets/Media/Components/twitter_social_media_icon.svg" alt="" /></a>
          </div>
        </div>


        <div class="genre_movies_list">
          <input type="text" list="options" placeholder="Выберите жанр" v-model="selectedGenre"
            @change="redirectToGenre">
          <datalist id="options">
            <option value="Фильмы"></option>
            <option value="Мультфильмы"></option>
            <option value="Мультсериалы"></option>
            <option value="Сериалы"></option>
            <option value="Аниме"></option>
          </datalist>
        </div>
      </div>

      <div class="header-center">
        <nav>
          <router-link to="/premiere" active-class="active">Афиша</router-link>
          <router-link to="/posts" active-class="active">Новости</router-link>
          <router-link to="/lists" active-class="active">Подборки</router-link>
          <router-link to="/favourites" active-class="active">Избранное</router-link>
          <router-link to="/chat" active-class="active">Премиум-Чат</router-link>
          <router-link to="/kinoroom" active-class="active" class="cosmic-link" @mouseenter="activateStars" @mouseleave="resetStars">
            <span class="cosmic-text">Кинотеатр</span>
            <span v-for="(star, index) in stars" :key="index" class="cosmic-star" :style="star.style"></span>
          </router-link>
        </nav>
      </div>


      <div class="header-right">
        <div class="header-search_btn" @click="showModal">
          <img src="../assets/Media/Components/search.svg" alt="Search">
        </div>

        <div v-if="!isLoggedIn" class="header-login" @click="$router.replace('/login')">
          Войти
        </div>

        <div v-else class="user-info">
          <div class="balance_container">
            <span class="balance">Баланс: </span>
            <span class="balance_number">{{ userBalance }}</span>
          </div>

          <div v-if="!isPremium" class="premium-button" @click="showPremiumModal">
            <img src="../assets/Media/Components/GoldCrown.svg" alt="Premium">
          </div>

          <div class="avatar-container" @click="toggleDropdown" :class="{ 'premium-glow': isPremium }">
            <img :src="userAvatar || defaultAvatar" alt="Аватар" class="avatar">
          </div>
          <!-- <div class="notifications">
              <h1>{{ currentUser.notifications.title }}</h1>
          </div> -->
          <div v-if="showDropdown" class="dropdown">
            <button @click="goToProfile">Профиль</button>
            <button @click="goToNotifacations">Уведомления</button>
            <button @click="logout">Выйти</button>
          </div>
        </div>
      </div>


      <div class="burger-menu" @click="toggleBurgerMenu">
        <div class="burger-line"></div>
        <div class="burger-line"></div>
        <div class="burger-line"></div>
      </div>
    </div>


    <SearchModal ref="modal"></SearchModal>
    <PremiumModal v-if="showPremiumModalFlag" :userAvatar="userAvatar" @close="closePremiumModal"
      @update-user="handleUserUpdate" />
  </header>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import defaultAvatar from '@/assets/Media/profile/default.png';
import SearchModal from './SearchModal.vue';
import PremiumModal from './PremiumModal.vue';

export default {
  components: {
    SearchModal,
    PremiumModal
  },
  setup() {
    const router = useRouter();
    const stars = ref([]);
    const toast = useToast();
    const isLoggedIn = ref(false);
    const userBalance = ref(0);
    const userAvatar = ref(defaultAvatar);
    const showDropdown = ref(false);
    const showPremiumModalFlag = ref(false);
    const isPremium = ref(false);
    const isBurgerMenuOpen = ref(false);
    const selectedGenre = ref('');

    const genreRoutes = {
      'Фильмы': '/movies',
      'Мультфильмы': '/cartoons',
      'Мультсериалы': '/cartoon-series',
      'Сериалы': '/series',
      'Аниме': '/animes'
    };


    const createStars = () => {
      const newStars = [];
      for (let i = 0; i < 12; i++) {
        newStars.push({
          style: {
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: '0'
          }
        });
      }
      stars.value = newStars;
    };


    const handleUserUpdate = (updatedUser) => {
      isPremium.value = updatedUser.premium || false;
      userBalance.value = updatedUser.balance;
      userAvatar.value = updatedUser.avatarUrl || defaultAvatar;
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    };
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!token) {
          isLoggedIn.value = false;
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data) {
          isLoggedIn.value = true;
          isPremium.value = response.data.premium || false;
          userAvatar.value = response.data.avatarUrl || defaultAvatar;
          userBalance.value = response.data.balance;
          localStorage.setItem('currentUser', JSON.stringify(response.data));
        }
      } catch (error) {
        if (error.response?.status === 401) {
          await refreshToken();
        } else {
          console.error('Ошибка проверки авторизации:', error);
          logout();
        }
      }
    };

    const refreshToken = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        logout();
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/refresh-token`,
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          return true;
        }
      } catch (error) {
        console.error('Ошибка обновления токена:', error);
        if (error.response?.status === 401) {
          logout();
        }
      }
      return false;
    };


    const activateStars = () => {
      stars.value.forEach(star => {
        star.style.opacity = '0.8';
      });
    };

    const resetStars = () => {
      stars.value.forEach(star => {
        star.style.opacity = '0';
      });
    };


    const logout = () => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      isLoggedIn.value = false;
      router.push('/login');
    };

    const redirectToGenre = () => {
      const route = genreRoutes[selectedGenre.value];
      if (route) {
        router.push(route);
      }
    };

    const toggleBurgerMenu = () => {
      isBurgerMenuOpen.value = !isBurgerMenuOpen.value;
    };

    onMounted(() => {
      checkAuth();
      createStars();
      setInterval(checkAuth, 5000);
    });

    return {
      isLoggedIn,
      userBalance,
      userAvatar,
      showDropdown,
      showPremiumModalFlag,
      isPremium,
      defaultAvatar,
      selectedGenre,
      isBurgerMenuOpen,
      checkAuth,
      logout,
      stars,
      activateStars,
      resetStars,
      redirectToGenre,
      toggleBurgerMenu,
    };
  },
  methods: {
    showPremiumModal() {
      this.showPremiumModalFlag = true;
    },
    closePremiumModal() {
      this.showPremiumModalFlag = false;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    goToProfile() {
      this.$router.push('/profile');
      this.showDropdown = false;
    },
    goToNotifacations() {
      this.$router.push('/notifications');
      this.showDropdown = false;
    },
    showModal() {
      this.$refs.modal.show = true;
    },
    async buyPremium() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/buy-premium`,
          {},
          { headers: { 'Authorization': token } }
        );
        this.$toast.success(response.data.message, {
          position: 'top-right',
          duration: 2000
        });
        await this.checkAuth();
        this.closePremiumModal();
      } catch (error) {
        this.$toast.error(
          error.response?.data?.error || 'Ошибка покупки премиума',
          { position: 'top-right', duration: 2000 }
        );
      }
    }
  },
  created() {
    this.$toast = useToast();
  }
}
</script>
<style scoped>
.premium-button {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  background: #20356e;
  padding: 10px;
  border-radius: 10px;
  display: grid;
  align-items: center;

  justify-items: center;
  transition: all 0.5s;
}

.header-center nav :nth-child(5) {
  color: #f2f60f;
}

.premium-button:hover {
  background: #19255c;
  box-shadow: 1px 1px 20px #f2f60f;
}

.premium-button img {
  width: 20px;
  height: 20px;
}

.avatar-container {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.premium-glow {
  animation: glow 2s infinite;
}

@keyframes glow {
  0% {
    box-shadow: 0 0 5px #ffd700;
  }

  50% {
    box-shadow: 0 0 20px #ffd700;
  }

  100% {
    box-shadow: 0 0 5px #ffd700;
  }
}


.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.avatar-container {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cosmic-link {
  position: relative;
  display: inline-block;
  text-decoration: none;
  overflow: hidden;
  padding: 0.2rem 0.5rem;
  z-index: 1;
}

.cosmic-text {
  position: relative;
  color: #8a2be2;
  font-weight: 600;
  z-index: 2;
  text-shadow:
    0 0 5px rgba(138, 43, 226, 0.7),
    0 0 10px rgba(138, 43, 226, 0.5);
  transition: text-shadow 0.3s ease;
}

.cosmic-link:hover .cosmic-text {
  text-shadow:
    0 0 10px rgba(138, 43, 226, 0.9),
    0 0 20px rgba(138, 43, 226, 0.7),
    0 0 30px rgba(138, 43, 226, 0.5);
}

.cosmic-star {
  position: absolute;
  background: white;
  border-radius: 50%;
  box-shadow:
    0 0 3px 1px white,
    0 0 5px 2px rgba(138, 43, 226, 0.5);
  animation: floatStar linear infinite;
  transform: translateY(0) translateX(0) scale(0.5);
  opacity: 0;
  will-change: transform, opacity;
}

@keyframes floatStar {
  0% {
    transform: translateY(0) translateX(0) scale(0.5);
    opacity: 0;
  }

  20% {
    opacity: 0.8;
  }

  100% {
    transform: translateY(-60px) translateX(20px) scale(1.2);
    opacity: 0;
  }
}

.dropdown {
  position: absolute;
  top: 60px;
  right: 20px;
  background: #191e2e;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.genre_movies_list {
  position: relative;
  display: flex;
  align-items: center;
}

.genre_movies_list input {
  width: 200px;
  height: 40px;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  background-color: #191e2e;
  border: 2px solid #3657cb;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.genre_movies_list input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.genre_movies_list input:focus {
  border-color: #f2f60f;
  box-shadow: 0 0 10px rgba(242, 246, 15, 0.5);
}

.genre_movies_list datalist {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #191e2e;
  border: 2px solid #3657cb;
  border-radius: 10px;
  margin-top: 5px;
  z-index: 1000;
  overflow: hidden;
}

.genre_movies_list option {
  padding: 8px 12px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.genre_movies_list option:hover {
  background-color: #28304d;
}

.dropdown button {
  background: none;
  border: none;
  cursor: pointer;
  color: #f2f60f;
  padding: 5px;
  text-align: left;
}

.dropdown button:hover {
  background: #28304d;
}

header {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

.header-cont {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 30px;
}

.header-logo {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

.header-logo-img {
  height: 24px;
}

.header-logo-title {
  margin-left: 7px;
}

.header-logo-title,
.header-logo-title mark {
  font-size: 25px;
  font-weight: 800;
  line-height: 31.37px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #3657cb;

  mark {
    background-color: transparent;
    color: white;
  }
}

.header-social_networks {
  margin-top: 10px;
  display: flex;
  width: 100%;
  margin-left: 3px;
  align-items: center;
  justify-content: space-between;

  a {
    width: 20px;
    opacity: 0.6;
    transition: 0.3s;
    user-select: none;
    cursor: pointer;
    filter: invert();

    &:hover {
      opacity: 1;
    }
  }
}


.balance_container .balance_number {
  font-size: 15px;
  font-weight: 300;
  line-height: 17.85px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #f2f60f;
}

.balance_container .balance {
  font-size: 17px;
  font-weight: 700;
  line-height: 21.06px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: white;
  transition: 0.3s;
  user-select: none;
}

.header-center nav {
  display: flex;
  align-items: center;

  a {
    font-size: 17px;
    font-weight: 700;
    line-height: 21.06px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: white;
    transition: 0.3s;
    user-select: none;
    cursor: pointer;
    text-decoration: none;

    &.active {
      color: #3657cb;
      text-shadow: 0 0 15px rgba(54, 87, 203, .7);
    }

    &:not(:first-child) {
      margin-left: 40px;
    }

    &:hover {
      color: #3657cb;
    }
  }
}

.header-right {
  display: flex;
  gap: 30px;
  align-items: center;
}

.header-search_btn {
  width: 55px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0px 0px 0px 0px white;

  &:hover {
    box-shadow: 0px 0px 15px 0px white;
  }
}

.header-login {
  width: 140px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 10px;
  background-color: #3657cb;
  transition: 0.3s;
  user-select: none;
  cursor: pointer;
  margin-left: 15px;
  box-shadow: 0px 0px 0px 0px #3657cb;

  &:hover {
    box-shadow: 0px 0px 15px 0px #3657cb;
  }
}








.burger-menu {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
  padding: 10px;
}

.burger-line {
  width: 25px;
  height: 3px;
  background-color: white;
}

.dropdown-menu {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 85px;
  right: 20px;
  background: #191e2e;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  gap: 10px;
  z-index: 1000;
}

.dropdown-menu.active {
  display: flex;
  width: 100%;
}


.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #3657cb;
}

.user-info-mobile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-container-mobile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.avatar-mobile {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.balance-container-mobile {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.balance-mobile {
  font-size: 14px;
  font-weight: 500;
  color: white;
}

.balance-number-mobile {
  font-size: 16px;
  font-weight: 700;
  color: #f2f60f;
}

.header-search_btn-mobile {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.header-search_btn-mobile:hover {
  box-shadow: 0px 0px 15px 0px white;
}


.dropdown-menu nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

.dropdown-menu nav a {
  font-size: 16px;
  font-weight: 500;
  color: white;
  text-decoration: none;
  transition: 0.3s;
}

.dropdown-menu nav a:hover {
  color: #3657cb;
}


@media (max-width: 1100px) {
  .burger-menu {
    display: flex;
  }

  .header-right {
    display: none;
  }

  .header-center nav {
    display: none;
  }

  .dropdown-menu {
    display: none;
  }

  .dropdown-menu.active {
    display: flex;
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




@media (max-width: 1550px) {
  .header-center nav {
    & a {
      &[data-v-0e75f877]:not(:first-child) {
        margin-left: 15px;
      }
    }
  }

  .genre_movies_list input[data-v-0e75f877] {
    width: 150px;
    height: 30px;
    padding: 8px 12px;
    font-size: 15px;
    font-weight: 500;
    color: white;
    background-color: #191e2e;
    border: 2px solid #3657cb;
    border-radius: 10px;
    outline: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .header-center nav a {
    font-size: 16px;
  }

  .balance_container {
    display: none;
  }


  .header-search_btn {
    &[data-v-0e75f877] {
      width: 45px;
      height: 47px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: 10px;
      user-select: none;
      cursor: pointer;
      transition: 0.3s;
      box-shadow: 0px 0px 0px 0px white;
    }
  }
}
</style>
