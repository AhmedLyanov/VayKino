<template>
    <div class="room-page">
      <div class="room-header">
        <div class="room-title">
          <h1>{{ room.name }}</h1>
          <p class="movie-title">Сейчас смотрят: <span>{{ room.movie }}</span></p>
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
        <div class="video-section">
          <div class="video-container">
            <video 
              ref="videoPlayer" 
              :src="room.videoUrl" 
              controls
              @play="onVideoPlay"
              @pause="onVideoPause"
              @timeupdate="onVideoTimeUpdate"
              class="video-player"
            ></video>
          </div>
        </div>
  
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
          movie: '',
          videoUrl: '',
          users: [],
          leader: { _id: null },
          maxUsers: 10,
          currentVideoTime: 0,
          isPlaying: false
        },
        messages: [],
        newMessage: '',
        socket: null,
        isLeader: false,
        defaultAvatar,
        videoSynced: false,
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
  
          this.socket.on('syncVideo', ({ currentTime, isPlaying }) => {
            if (this.$refs.videoPlayer && !this.videoSynced) {
              this.$refs.videoPlayer.currentTime = currentTime;
              if (isPlaying) {
                this.$refs.videoPlayer.play();
              } else {
                this.$refs.videoPlayer.pause();
              }
              this.videoSynced = true;
            }
          });
  
          this.socket.on('videoPlay', () => {
            if (this.$refs.videoPlayer) {
              this.$refs.videoPlayer.play();
            }
          });
  
          this.socket.on('videoPause', () => {
            if (this.$refs.videoPlayer) {
              this.$refs.videoPlayer.pause();
            }
          });
  
          this.socket.on('videoSeek', (time) => {
            if (this.$refs.videoPlayer && Math.abs(this.$refs.videoPlayer.currentTime - time) > 1) {
              this.$refs.videoPlayer.currentTime = time;
            }
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
      onVideoPlay() {
        if (this.socket) {
          this.socket.emit('videoPlay');
        }
      },
      onVideoPause() {
        if (this.socket) {
          this.socket.emit('videoPause');
        }
      },
      onVideoTimeUpdate() {
        if (this.socket && this.$refs.videoPlayer) {
          this.socket.emit('videoTimeUpdate', this.$refs.videoPlayer.currentTime);
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
  
          // Обновляем данные пользователя
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
  
          // Обновляем данные пользователя
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
    background-color: #1a1a1a;
    color: #ffffff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .room-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 25px;
    background-color: #2a2a2a;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }
  
  .room-title h1 {
    margin: 0;
    font-size: 24px;
    color: #ffffff;
  }
  
  .movie-title {
    margin: 5px 0 0;
    font-size: 14px;
    color: #aaaaaa;
  }
  
  .movie-title span {
    color: #4CAF50;
    font-weight: bold;
  }
  
  .room-controls {
    display: flex;
    gap: 10px;
  }
  
  .leave-btn, .delete-btn {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
  }
  
  .leave-btn {
    background-color: #f44336;
    color: white;
  }
  
  .leave-btn:hover {
    background-color: #d32f2f;
  }
  
  .delete-btn {
    background-color: #ff9800;
    color: #000000;
  }
  
  .delete-btn:hover {
    background-color: #f57c00;
  }
  
  .room-content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }
  
  .video-section {
    flex: 3;
    padding: 20px;
    background-color: #000000;
  }
  
  .video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  }
  
  .video-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
  }
  
  .sidebar {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #2a2a2a;
    border-left: 1px solid #444;
    min-width: 300px;
  }
  
  .users-section, .chat-section {
    padding: 15px;
  }
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    margin: 0 0 15px;
    color: #ffffff;
    padding-bottom: 10px;
    border-bottom: 1px solid #444;
  }
  
  .users-count {
    font-size: 14px;
    color: #aaaaaa;
    margin-left: auto;
  }
  
  .users-list {
    max-height: 250px;
    overflow-y: auto;
    padding-right: 5px;
  }
  
  .user-card {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 8px;
    background-color: #333;
    border-radius: 6px;
    transition: all 0.2s;
  }
  
  .user-card:hover {
    background-color: #3a3a3a;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 12px;
  }
  
  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .user-name {
    font-weight: 500;
  }
  
  .leader-badge {
    font-size: 12px;
    color: #FFD700;
    margin-top: 3px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .chat-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #444;
  }
  
  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 10px 5px 10px 0;
    margin-bottom: 15px;
  }
  
  .message {
    display: flex;
    margin-bottom: 15px;
  }
  
  .message-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  
  .message-content {
    flex: 1;
    background-color: #333;
    padding: 10px 12px;
    border-radius: 6px;
  }
  
  .message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }
  
  .message-sender {
    font-weight: bold;
    font-size: 14px;
    color: #4CAF50;
  }
  
  .message-time {
    font-size: 12px;
    color: #888;
  }
  
  .message-text {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
    word-break: break-word;
  }
  
  .message-input {
    display: flex;
    gap: 8px;
    margin-top: auto;
  }
  
  .chat-input {
    flex: 1;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    background-color: #333;
    color: white;
    outline: none;
  }
  
  .chat-input:focus {
    background-color: #3a3a3a;
  }
  
  .send-btn {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .send-btn:hover {
    background-color: #45a049;
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #2a2a2a;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #666;
  }
  
  @media (max-width: 768px) {
    .room-content {
      flex-direction: column;
    }
    
    .sidebar {
      min-width: 100%;
      border-left: none;
      border-top: 1px solid #444;
    }
    
    .video-container {
      padding-bottom: 56.25%;
    }
  }
  </style>