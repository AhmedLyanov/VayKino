<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-body">
        <div class="modal-header">
          <button class="close-button" @click="close">×</button>
        </div>
        <div class="container_avatarUrl">
          <div class="user_avatar">
            <img 
              :src="effectiveAvatar" 
              @error="handleImageError"
              alt="Аватар" 
              class="avatar" 
            />
          </div>
        </div>
        <div class="buy_container">
          <div class="button_buy">
            <button class="buy-button" @click="buyPremium">Купить за 8000 баллов</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import defaultAvatar from '@/assets/Media/profile/default.png';

export default {
  props: {
    userAvatar: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      defaultAvatar,
      avatarLoadError: false
    }
  },
  computed: {
    effectiveAvatar() {
      if (this.avatarLoadError || !this.userAvatar) {
        return this.defaultAvatar;
      }
      return this.userAvatar;
    }
  },
  methods: {
    handleImageError() {
      console.error('Ошибка загрузки аватара:', this.userAvatar);
      this.avatarLoadError = true;
    },
    close() {
      this.$emit('close');
    },
    async buyPremium() {
  const token = localStorage.getItem('token');
  if (!token) {
    this.$toast.error('Требуется авторизация', {
      position: 'top-right',
      duration: 2000
    });
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/buy-premium`, 
      {},
      { headers: { 'Authorization': token } }
    );
    
    // Получаем обновленные данные пользователя
    const userResponse = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/user/me`,
      { headers: { 'Authorization': token } }
    );
    
    // Обновляем данные в localStorage
    localStorage.setItem('currentUser', JSON.stringify(userResponse.data));
    
    this.$toast.success(response.data.message, {
      position: 'top-right',
      duration: 2000
    });
    
    // Отправляем обновленные данные в родительский компонент
    this.$emit('update-user', userResponse.data);
    this.close();
  } catch (error) {
    const message = error.response?.data?.error || 'Ошибка сервера';
    this.$toast.error(message, {
      position: 'top-right',
      duration: 2000
    });
  }
}
  },
  created() {
    this.$toast = useToast();
    console.log('PremiumModal получил аватар:', this.userAvatar);
  }
}
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #1e1e1e;
  border-radius: 10px;
  width: 70%;
  height: 90%;
  position: relative;
  background-image: url(../assets/Media/Main/PremiumModalNew.png);
  background-position: center;
  background-size: cover;
  max-height: 585px;
  text-align: center;
}

.modal-body{
  position: absolute;
  height: 100%;
  align-content: space-between;
  display: grid;
  padding: 10px;
  width: 100%;
}

.container_avatarUrl{
  height: 100%;
  display: grid;
  justify-items: flex-end;
  padding-right: 150px ;
}

.user_avatar{
  width: 300px;
  height: 300px;
  border-radius: 100%;
  background-color: #ccc;
}

.user_avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
}

.buy_container{
  display: flex;
  width: 100%;
  color: #ffd700;
  justify-content: space-between;
}

.button_buy{
  display: grid;
  align-items: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
}

.buy-button {
  background: #ffd700;
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.buy-button:hover {
  background: #ffc107;
}
</style>