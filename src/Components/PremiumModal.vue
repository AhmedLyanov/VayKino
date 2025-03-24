<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-body">
        <div class="modal-header">
          <button class="close-button" @click="close">×</button>
        </div>
        <div class="container_avatarUrl">
          <div class="user_avatar">
            <img :src="userAvatar" alt="Аватар" class="avatar" />
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
      default: defaultAvatar,
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async buyPremium() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$toast.error('Токен авторизации отсутствует', {
          position: 'top-right',
          duration: 2000,
          dismissible: false,
        });
        return;
      }
      try {
        const response = await axios.post('https://dreamfood.space:3000/buy-premium', {}, {
          headers: {
            'Authorization': token, 
          },
        });
        if (response.data.message) {
          this.$toast.success(response.data.message, {
            position: 'top-right',
            duration: 2000,
            dismissible: false,
          });
          this.close();
          this.$emit('update-user');
        }
      } catch (error) {
        if (error.response?.status === 400) {
          this.$toast.error(error.response.data.error, {
            position: 'top-right',
            duration: 2000,
            dismissible: false,
          });
        } else {
          this.$toast.error('Ошибка при покупке премиум-подписки', {
            position: 'top-right',
            duration: 2000,
            dismissible: false,
          });
        }
        console.error('Ошибка при покупке премиум-подписки:', error);
        console.log(response.data.avatarUrl);
      }
    },
  },
  created() {
    this.$toast = useToast();
  },
};
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
    background-color: red;
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
  .attributes_premium_subscribe{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 20px;
    text-align: left;
    color: #ffdf;
    font-size: 16px;
    font-weight: bold;
  }
  .modal-header h2 {
    margin: 0;
    color: #ffd700;
  }
  
  .close-button {
    background: none;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }
  
  .premium-image {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 20px;
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
  
  .user_avatar img{
    width: 100%;
    border-radius: 100%;
  }
  
  .buy-button:hover {
    background: #ffc107;
  }
  </style>