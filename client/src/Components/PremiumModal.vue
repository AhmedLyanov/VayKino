<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-body">
        <div class="modal-header">
          <button class="close-button" @click="close">×</button>
        </div>
        <div class="container_avatarUrl">
          <div class="pc_with_avatar">
            <div class="container_pc">
              <img src="../assets/Media/Components/PC.png" alt="Компьютер" class="pc-image">
            </div>
            <div class="user_avatar">
              <img 
                :src="effectiveAvatar" 
                @error="handleImageError"
                alt="Аватар" 
                class="avatar" 
              />
            </div>
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
        
        const userResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/me`,
          { headers: { 'Authorization': token } }
        );
        
        localStorage.setItem('currentUser', JSON.stringify(userResponse.data));
        
        this.$toast.success(response.data.message, {
          position: 'top-right',
          duration: 2000
        });
      
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

.modal-body {
  position: absolute;
  height: 100%;
  align-content: space-between;
  display: grid;
  padding: 10px;
  width: 100%;
}

.container_avatarUrl {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.pc_with_avatar {
  position: relative;
  width: fit-content;
  height: fit-content;
}

.container_pc {
  position: relative;
  z-index: 1;
}

.pc-image {
  max-width: 75%;
  height: auto;
}

.user_avatar {
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 23%;
  height: 45%;
  border-radius: 100%; 
  overflow: hidden;
  z-index: 2;
  border: 2px solid rgba(255, 215, 0, 0.3); 
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.5); 
}

.user_avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.buy_container {
  display: flex;
  width: 100%;
  color: #ffd700;
  justify-content: center;
  margin-top: 20px;
}

.button_buy {
  display: grid;
  align-items: center;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
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
  padding: 12px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
}

.buy-button:hover {
  background: #ffc107;
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.9);
}
</style>