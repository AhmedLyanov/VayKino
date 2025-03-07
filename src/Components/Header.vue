<template>
  <header>
    <div class="header-cont">
      <div class="header-left">
        <div class="header-logo" @click="this.$router.replace('/')">
          <div class="header-logo-img">
            <img :src="`${linkToImg}/logo.svg`" alt="" />
          </div>
          <div class="header-logo-title">Vay<mark>Kino</mark></div>
        </div>
        <div class="header-social_networks">
          <a href="https://vk.com/" target="_blank"><img :src="`${linkToImg}/vk_social_media_icon.svg`" alt="VK" /></a>
          <a href="https://www.instagram.com/" target="_blank"><img :src="`${linkToImg}/instagram_social_media_icon.svg`" alt="Facebook" /></a>
          <a href="http://facebook.com/" target="_blank"><img :src="`${linkToImg}/facebook_social_media_icon.svg`" alt="Instagram" /></a>
          <a href="https://x.com/" target="_blank"><img :src="`${linkToImg}/twitter_social_media_icon.svg`" alt="Twitter(X)" /></a>
        </div>
      </div>

      <div class="header-center">
        <nav>
          <router-link to="/premiere" active-class="active">Афиша</router-link>
          <router-link to="/media" active-class="active">Медиа</router-link>
          <router-link to="/movies" active-class="active">Фильмы</router-link>
          <router-link to="/posts" active-class="active">Новости</router-link>
          <router-link to="/lists" active-class="active">Подборки</router-link>
          <router-link to="/favourites" active-class="active">Избранное</router-link>
          <router-link to="/chat" active-class="active">Премиум-Чат</router-link>
        </nav>
      </div>

      <div class="header-right">
        <div class="header-search_btn" @click="showModal">
          <img :src="`${linkToImg}/search.svg`" alt="" />
        </div>
        <div v-if="!isLoggedIn" class="header-login" @click="this.$router.replace('/login')">Войти</div>
        <div v-else class="user-info">
          <div class="balance_container">
            <span class="balance">Баланс: </span>
            <span class="balance_number">{{ userBalance }}</span>
          </div>
          <div v-if="!isPremium" class="premium-button" @click="showPremiumModal">
            <img :src="`${linkToImg}/GoldCrown.svg`" alt="Premium" />
          </div>
          <div class="avatar-container" @click="toggleDropdown" :class="{ 'premium-glow': isPremium }">
            <img :src="userAvatar || defaultAvatar" alt="Аватар" class="avatar" />
          </div>
          <div v-if="showDropdown" class="dropdown">
            <button @click="goToProfile">Профиль</button>
            <button @click="logout">Выйти</button>
          </div>
        </div>
      </div>
    </div>

    <SearchModal ref="modal"></SearchModal>
    <PremiumModal v-if="showPremiumModalFlag" @close="closePremiumModal" @buy-premium="buyPremium" />
  </header>
</template>

<script>
import SearchModal from './SearchModal.vue';
import PremiumModal from './PremiumModal.vue';
import { ref, onMounted, onUpdated } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';
import defaultAvatar from '@/assets/Media/profile/default.png'; 

export default {
  components: {
    SearchModal,
    PremiumModal
  },
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);
    const userBalance = ref(0);
    const userAvatar = ref('');
    const showDropdown = ref(false);
    const showPremiumModalFlag = ref(false);
    const isPremium = ref(false);
    const route = useRoute();
    const pathSegment = ref('');

    const linkToImg = "../src/assets/Media/Components";

    const checkAuth = async () => {
      const userString = localStorage.getItem('currentUser');
      if (userString) {
        try {
          const user = JSON.parse(userString);
          if (user) {
            isLoggedIn.value = true;
            isPremium.value = user.premium || false;
            userAvatar.value = user.avatarUrl || defaultAvatar; 
            await updateUserBalance(user.login);
          }
        } catch (error) {
          console.error('Ошибка при парсинге данных пользователя:', error);
          localStorage.removeItem('currentUser');
        }
      }
    };

    const updateUserBalance = async (login) => {
      try {
        const response = await axios.get(`http://91.197.96.204:3000/user/${login}`);
        if (response.data) {
          userBalance.value = response.data.balance;
          isPremium.value = response.data.premium || false;
          userAvatar.value = response.data.avatarUrl || defaultAvatar; 
          localStorage.setItem('currentUser', JSON.stringify(response.data));
        }
      } catch (error) {
        console.error('Ошибка при обновлении баланса:', error);
      }
    };

    const showPremiumModal = () => {
      showPremiumModalFlag.value = true;
    };

    const closePremiumModal = () => {
      showPremiumModalFlag.value = false;
    };

    const buyPremium = async () => {
      const userString = localStorage.getItem('currentUser');
      if (userString) {
        const user = JSON.parse(userString);
        try {
          const response = await axios.post('http://91.197.96.204:3000/buy-premium', { login: user.login });
          if (response.data.message) {
            alert(response.data.message);
            await updateUserBalance(user.login);
            closePremiumModal();
          }
        } catch (error) {
          console.error('Ошибка при покупке премиум-подписки:', error);
          alert(error.response?.data.error || 'Ошибка при покупке премиум-подписки');
        }
      }
    };

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const goToProfile = () => {
      router.push('/profile');
      showDropdown.value = false;
    };

    const logout = () => {
      localStorage.removeItem('currentUser');
      isLoggedIn.value = false;
      router.push('/login');
    };

    onMounted(() => {
      checkAuth();
      setInterval(() => {
        const userString = localStorage.getItem('currentUser');
        if (userString) {
          const user = JSON.parse(userString);
          if (user) {
            updateUserBalance(user.login);
          }
        }
      }, 300000);

      pathSegment.value = route.path.split('/').pop();
    });

    onUpdated(() => {
      checkAuth();
    });

    return {
      linkToImg,
      isLoggedIn,
      userBalance,
      userAvatar,
      showDropdown,
      showPremiumModalFlag,
      isPremium,
      defaultAvatar,
      toggleDropdown,
      goToProfile,
      logout,
      pathSegment,
      showPremiumModal,
      closePremiumModal,
      buyPremium
    };
  },
  methods: {
    showModal: function () {
      this.$refs.modal.show = true;
    }
  },
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

.header-center nav :nth-child(7){
  color: #f2f60f;
}

.premium-button:hover{
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

.dropdown {
  position: absolute;
  top: 60px;
  right: 20px;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.dropdown button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  text-align: left;
}

.dropdown button:hover {
  background: #f0f0f0;
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
  flex-direction: column;
  align-items: center;
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


.balance_container .balance_number{
  font-size: 15px;
  font-weight: 300;
  line-height: 17.85px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #f2f60f;
}

.balance_container .balance{
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

    &.active{
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
</style>
