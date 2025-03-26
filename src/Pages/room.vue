<template>
  <div class="room-page">
    <div class="room-header">
      <div class="room-title">
        <h1>{{ room.name }}</h1>
      </div>
      <div class="room-controls">
        <button class="leave-btn" @click="leaveRoom">
          <i class="fas fa-sign-out-alt"></i> Покинуть комнату
        </button>
        <button v-if="isLeader" class="delete-btn" @click="deleteRoom">
          <i class="fas fa-trash-alt"></i> Удалить комнату
        </button>
      </div>
    </div>

    <div class="room-content">
      <div class="sidebar">
        <div class="users-section">
          <h2 class="section-title">
            <i class="fas fa-users"></i> Участники 
            <span class="users-count">({{ room.users.length }}/{{ room.maxUsers }})</span>
          </h2>
          <div class="users-list">
            <div v-for="user in room.users" :key="user.userId" class="user-card">
              <img :src="user.avatarUrl || defaultAvatar" class="user-avatar">
              <div class="user-info">
                <span class="user-name">{{ user.login }}</span>
                <span v-if="user.userId === room.leader._id" class="leader-badge">
                  <i class="fas fa-crown"></i> Создатель
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-section">
          <h2 class="section-title">
            <i class="fas fa-comments"></i> Чат комнаты
          </h2>
          <div class="messages" ref="messagesContainer">
            <div v-for="(message, index) in messages" :key="index" class="message">
              <img :src="message.avatarUrl || defaultAvatar" class="message-avatar">
              <div class="message-content">
                <div class="message-header">
                  <span class="message-sender">{{ message.sender }}</span>
                  <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                </div>
                <p class="message-text">{{ message.text }}</p>
              </div>
            </div>
          </div>
          <div class="message-input">
            <input 
              v-model="newMessage" 
              @keyup.enter="sendMessage" 
              placeholder="Напишите сообщение..."
              class="chat-input"
            >
            <button @click="sendMessage" class="send-btn">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import defaultAvatar from '../assets/Media/profile/default.png';

export default {
  data() {
      return {
          room: {
              name: '',
              users: [],
              leader: { _id: null },
              maxUsers: 10,
          },
          messages: [],
          newMessage: '',
          socket: null,
          isLeader: false,
          defaultAvatar,
          user: null
      };
  },
  async created() {
      try {
          const userData = localStorage.getItem('user');
          if (!userData) {
              throw new Error('Пользователь не авторизован');
          }
          this.user = JSON.parse(userData);
          
          await this.fetchRoomData();
          await this.setupSocketConnection();
      } catch (error) {
          console.error('Ошибка инициализации:', error);
          this.$toast.error('Не удалось загрузить комнату', { position: 'top-right', duration: 2000 });
          this.$router.push('/kinoroom');
      }
  },
  beforeUnmount() {
      if (this.socket) {
          this.socket.disconnect();
      }
  },
  methods: {
      formatTime(timestamp) {
          const date = new Date(timestamp);
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      },
      async fetchRoomData() {
          const roomId = this.$route.params.id;
          try {
              const token = localStorage.getItem('token');
              const response = await fetch(`https://dreamfood.space:3000/rooms/${roomId}`, {
                  headers: {
                      'Authorization': token
                  }
              });
              
              if (!response.ok) {
                  throw new Error('Ошибка загрузки данных комнаты');
              }
              
              this.room = await response.json();
              this.isLeader = this.room.leader._id === this.user._id;
              
              const chatResponse = await fetch(`https://dreamfood.space:3000/chat-messages?roomId=${roomId}`, {
                  headers: {
                      'Authorization': token
                  }
              });
              if (chatResponse.ok) {
                  this.messages = await chatResponse.json();
              }
              
          } catch (error) {
              console.error('Ошибка:', error);
              throw error;
          }
      },
      async setupSocketConnection() {
          try {
              const roomId = this.$route.params.id;
              const token = localStorage.getItem('token');
              
              if (!this.user || !this.user._id) {
                  throw new Error('Данные пользователя не загружены');
              }

              this.socket = io('https://dreamfood.space:3000', {
                  query: { 
                      roomId, 
                      userId: this.user._id 
                  },
                  extraHeaders: {
                      Authorization: token
                  }
              });

              this.socket.on('connect', () => {
                  console.log('Connected to socket');
              });

              this.socket.on('usersInRoom', (users) => {
                  this.room.users = users;
              });

              this.socket.on('newMessage', (message) => {
                  this.messages.push(message);
                  this.scrollChatToBottom();
              });

              this.socket.on('userJoined', (user) => {
                  this.$toast.info(`${user.login} вошел в комнату`, { position: 'top-right', duration: 2000 });
              });

              this.socket.on('userLeft', (userId) => {
                  const user = this.room.users.find(u => u.userId === userId);
                  if (user) {
                      this.$toast.info(`${user.login} вышел из комнаты`, { position: 'top-right', duration: 2000 });
                  }
              });

              this.socket.on('error', (error) => {
                  this.$toast.error(error, { position: 'top-right', duration: 2000 });
              });

          } catch (error) {
              console.error('Ошибка подключения к сокету:', error);
              throw error;
          }
      },
      async leaveRoom() {
          try {
              const token = localStorage.getItem('token');
              const response = await fetch(`https://dreamfood.space:3000/rooms/${this.$route.params.id}/leave`, {
                  method: 'POST',
                  headers: {
                      'Authorization': token
                  }
              });

              if (!response.ok) {
                  throw new Error('Ошибка при выходе из комнаты');
              }

              const user = JSON.parse(localStorage.getItem('user'));
              user.currentRoom = null;
              localStorage.setItem('user', JSON.stringify(user));

              this.$router.push('/kinoroom');
          } catch (error) {
              console.error('Ошибка:', error);
              this.$toast.error('Не удалось покинуть комнату', { position: 'top-right', duration: 2000 });
          }
      },
      async deleteRoom() {
          if (!this.isLeader) return;
          
          try {
              const token = localStorage.getItem('token');
              const response = await fetch(`https://dreamfood.space:3000/rooms/${this.$route.params.id}`, {
                  method: 'DELETE',
                  headers: {
                      'Authorization': token
                  }
              });

              if (!response.ok) {
                  throw new Error('Ошибка при удалении комнаты');
              }

              const user = JSON.parse(localStorage.getItem('user'));
              user.currentRoom = null;
              localStorage.setItem('user', JSON.stringify(user));

              this.$router.push('/kinoroom');
          } catch (error) {
              console.error('Ошибка:', error);
              this.$toast.error('Не удалось удалить комнату', { position: 'top-right', duration: 2000 });
          }
      },
      sendMessage() {
          if (!this.newMessage.trim()) return;
          
          const message = {
              sender: this.user.login,
              text: this.newMessage,
              avatarUrl: this.user.avatarUrl,
              roomId: this.$route.params.id
          };

          if (this.socket) {
              this.socket.emit('sendMessage', message);
          }
          
          this.newMessage = '';
      },
      scrollChatToBottom() {
          this.$nextTick(() => {
              const container = this.$refs.messagesContainer;
              if (container) {
                  container.scrollTop = container.scrollHeight;
              }
          });
      }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.room-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(rgba(70, 44, 148, 0) -320%, #1e2538 83.8%);
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.room-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background-color: #1b2133;
  border-bottom: 1px solid #2a3657;
}

.room-title h1 {
  margin: 0;
  font-size: 45px;
  font-weight: 900;
  color: #ffffff;
}

.room-controls {
  display: flex;
  gap: 15px;
}

.leave-btn,
.delete-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  font-size: 16px;
}

.leave-btn {
  background-color: #3657CB;
  color: white;
}

.leave-btn:hover {
  background-color: #2a4ab7;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
}

.delete-btn:hover {
  background-color: #e63939;
}

.room-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  background-color: #1e2538;
}

.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #1b2133;
  border-left: 1px solid #2a3657;
  min-width: 350px;
}

.users-section,
.chat-section {
  padding: 20px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 20px;
  color: #ffffff;
  padding-bottom: 15px;
  border-bottom: 1px solid #2a3657;
}

.users-count {
  font-size: 16px;
  color: #aaaaaa;
  margin-left: auto;
}

.users-list {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 10px;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 10px;
  background-color: #252f4a;
  border-radius: 8px;
  transition: all 0.3s;
}

.user-card:hover {
  background-color: #2a3657;
}

.user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  border: 2px solid #3657CB;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  font-size: 16px;
}

.leader-badge {
  font-size: 13px;
  color: #FFD700;
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #2a3657;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 15px 10px 15px 0;
  margin-bottom: 20px;
}

.message {
  display: flex;
  margin-bottom: 20px;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  border: 2px solid #3657CB;
}

.message-content {
  flex: 1;
  background-color: #252f4a;
  padding: 12px 15px;
  border-radius: 8px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.message-sender {
  font-weight: 600;
  font-size: 15px;
  color: #4CAF50;
}

.message-time {
  font-size: 13px;
  color: #7a8db8;
}

.message-text {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  word-break: break-word;
  color: #e0e0e0;
}

.message-input {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.chat-input {
  flex: 1;
  padding: 12px 18px;
  border: 1px solid #2a3657;
  border-radius: 10px;
  background-color: #252f4a;
  color: white;
  outline: none;
  font-size: 15px;
  transition: all 0.3s;
}

.chat-input:focus {
  border-color: #3657CB;
  background-color: #2a3657;
}

.send-btn {
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 10px;
  background-color: #3657CB;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 18px;
}

.send-btn:hover {
  background-color: #2a4ab7;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1b2133;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: #3657cb;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2a4ab7;
}

@media (max-width: 768px) {
  .room-content {
    flex-direction: column;
  }

  .sidebar {
    min-width: 100%;
    border-left: none;
    border-top: 1px solid #2a3657;
  }

  .room-title h1 {
    font-size: 32px;
  }

  .leave-btn,
  .delete-btn {
    padding: 8px 15px;
    font-size: 14px;
  }
}
</style>