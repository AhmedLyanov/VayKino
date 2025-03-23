<template>
  <div class="chat-container" v-if="currentUser">
    <div class="chat-messages">
      <div class="hello_chat_table">
        <div class="hello-chat-header">
          <div class="hello-chat-title">Привествуем и поздравляем вас, {{ currentUser.name }}!</div>
          <div class="hello-chat-subtitle">Вы в премиум-чате</div>
          <div class="hello-chat-text">
            Здесь, вы можете общаться с другими обладателями премиум-подписки, 
            посоветовать фильм, общаться с администратором, дурачиться с другими пользователями и в целом весело проводить время.
            Приятной беседы! :)
          </div>
        </div>
      </div>
      <div v-for="(message, index) in messages" :key="index" class="message" :class="{ 'my-message': message.sender === currentUser.login, 'other-message': message.sender !== currentUser.login }">
        <div
          class="message-avatar"
          :class="{ 'admin-avatar': message.role === 'admin' }"
          v-if="shouldShowAvatar(index)"
        >
          <img :src="message.avatarUrl || defaultAvatar" alt="Аватар" />
        </div>

        <div class="message-content" :class="{ 'no-avatar': !shouldShowAvatar(index) }">
          <div class="message-sender" v-if="shouldShowSender(index)">
            {{ message.sender }}
          </div>
          <div class="message-text">
            <span v-if="message.text">{{ message.text }}</span>
            <div class="audio_message" v-if="message.audioUrl">
              <div class="message-avatar_audio">
                <img :src="message.avatarUrl || defaultAvatar" alt="Аватар" />
              </div>
              <audio controls :src="message.audioUrl" />
            </div>
            <img v-if="message.imageUrl" :src="message.imageUrl" alt="Изображение" class="message-image"  @click="openPosterModal(message.imageUrl)" />
          </div>
          <div class="user-info">
            <div class="message_time">
              {{ formatTime(message.timestamp) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <div class="setBinaryFiles">
        <div class="button_paperclip">
          <label class="setImageOrVideo" for="fileInput">
            <img src="../assets/Media/Components/paperclip.svg" alt="Прикрепить файл" />
          </label>
          <input
            id="fileInput"
            type="file"
            style="display: none;"
            @change="handleFileUpload"
          />
        </div>
      </div>
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Введите сообщение..." />
      <div class="record-button" @click="toggleRecording">
        <div class="microphone-icon" :class="{ 'recording': isRecording }">
          <img src="../assets/Media/Components/audio.svg" alt="Запись" />
          <div class="aura" v-if="isRecording"></div>
        </div>
      </div>
    </div>
  </div>

  <MediaPosterModal :is-open="isModalPosterOpen" :posterUrl="poster" @close="closePosterModal" :posterScale="0.7" />
</template>

<script>
import axios from "axios";
import defaultAvatar from "@/assets/Media/profile/default.png";
import io from "socket.io-client";
import { mapActions } from 'vuex';
import RecordRTC from "recordrtc";
import { useToast } from 'vue-toast-notification';
import MediaPosterModal from "@/Components/MediaPosterModal.vue";

export default {
  data() {
    return {
      messages: [],
      newMessage: "",
      currentUser: null,
      defaultAvatar: defaultAvatar,
      socket: null,
      isRecording: false,
      recorder: null,
      isModalPosterOpen: false,
      poster: ""
    };
  },
  components: {
    MediaPosterModal
  },
  async created() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!this.currentUser || !this.currentUser.premium) {
      const toast = useToast();
      toast.error("Только пользователи с премиум-подпиской могут использовать чат.", {
        position: 'top-right',
        duration: 2000,
        dismissible: false,
      });
      this.$router.push("/");
      return;
    }
    await this.fetchMessages();
    this.socket = io("https://dreamfood.space:3000/");
    this.socket.on("newMessage", (message) => {
      this.messages.push(message);
      setTimeout(() => {
        this.newMessageScroll();
      }, 50);
    });
  },
  methods: {
    ...mapActions(['toggleEmailMailing']),

    
    async fetchMessages() {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('https://dreamfood.space:3000/chat-messages', {
          headers: {
            'Authorization': token,
          },
        });
        if (response.ok) {
          this.messages = await response.json(); 
        } else if (response.status === 401) {
          await this.refreshToken();
          await this.fetchMessages();
        }
      } catch (error) {
        console.error('Ошибка при получении сообщений:', error);
      }
    },

    
    async refreshToken() {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        this.logout();
        return;
      }
      try {
        const response = await fetch('https://dreamfood.space:3000/refresh-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token); 
        } else {
          this.logout();
        }
      } catch (error) {
        console.error('Ошибка при обновлении токена:', error);
        this.logout();
      }
    },

    
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser');
      this.$router.push('/login');
    },

  
    async sendMessage() {
      if (!this.newMessage.trim()) return;
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('https://dreamfood.space:3000/chat-messages', {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: this.currentUser.login,
            text: this.newMessage,
            avatarUrl: this.currentUser.avatarUrl,
            role: this.currentUser.role,
          }),
        });
        if (response.ok) {
          this.newMessage = ""; 
          await this.fetchMessages(); 
        } else if (response.status === 401) {
        
          await this.refreshToken();
          await this.sendMessage();
        }
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      }
    },

    formatTime(timestamp) {
      const date = new Date(timestamp);
      const options = {
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleString("ru", options);
    },

    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        const toast = useToast(); 
        toast.error("Пожалуйста, выберите изображение.", {
          position: 'top-right',
          duration: 2000,
          dismissible: false,
        });
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sender", this.currentUser.login);
      formData.append("avatarUrl", this.currentUser.avatarUrl);
      try {
        const response = await axios.post("https://dreamfood.space:3000/upload-image-message", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Ответ от сервера:", response.data);
        event.target.value = "";
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      } catch (error) {
        console.error("Ошибка при отправке изображения:", error);
      }
    },

    toggleRecording() {
      if (this.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    },

    newMessageScroll() {
      const chatMessages = this.$el.querySelector(".chat-messages");
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    },

    async startRecording() {
      this.isRecording = true;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.recorder = new RecordRTC(stream, { type: "audio" });
      this.recorder.startRecording();
    },

    async stopRecording() {
      this.isRecording = false;
      this.recorder.stopRecording(async () => {
        const blob = this.recorder.getBlob();
        await this.sendVoiceMessage(blob);
      });
    },

    async sendVoiceMessage(blob) {
      const formData = new FormData();
      formData.append("file", blob, "voice-message.webm");
      formData.append("sender", this.currentUser.login);
      formData.append("avatarUrl", this.currentUser.avatarUrl);

      try {
        const response = await axios.post("https://dreamfood.space:3000/upload-voice-message", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Ошибка при отправке голосового сообщения:", error);
      }
    },

    shouldShowAvatar(index) {
      if (index === 0) return true;
      const currentMessage = this.messages[index];
      const previousMessage = this.messages[index - 1];
      return currentMessage.sender !== previousMessage.sender;
    },

    shouldShowSender(index) {
      if (index === 0) return true;
      const currentMessage = this.messages[index];
      const previousMessage = this.messages[index - 1];
      return currentMessage.sender !== previousMessage.sender;
    },

    hideEmailMailing() {
      this.toggleEmailMailing(false);
    },

    openPosterModal(poster) {
        this.poster = poster;
        this.isModalPosterOpen = true;
        document.body.classList.add('no-scroll');
    },
    
    closePosterModal() {
        this.isModalPosterOpen = false;
        this.poster = '';
        document.body.classList.remove('no-scroll');
    },
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
  mounted() {
    this.toggleEmailMailing(false);
  }
}
</script>
<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1470px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1b2133;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #2a324b;
  background-image: url(../assets/Media/Components/background_chat.png);
  background-size: 50%;
  border-radius: 10px;
}

.message {
  display: flex;
  margin-bottom: 15px;
}

.message.my-message {
  justify-content: flex-end; 
}

.message.other-message {
  justify-content: flex-start; 
}

.message-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;
}

.audio_message{
  display: flex;
  align-items: center;
}

.message-avatar {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.message-avatar_audio  {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}

.message-avatar_audio img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}



.message-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.admin-avatar img {
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
}

.message-content {
  max-width: 45%;
  padding: 10px;
  border-radius: 10px;
  overflow-wrap: anywhere;
}

.message.my-message .message-content {
  background-color: #3657cb; 
  color: white;
}

.setImageOrVideo img{
  display: grid;
}

.hello_chat_table{
  padding: 30px;
    width: 70%;
    margin: auto;
    text-align: center;
    color: wheat;
    border-radius: 15px;
    background: #74747499;
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 15px;
}


.message.other-message .message-content {
  background-color: #4a5568;
  color: white;
}

.message-content.no-avatar {
  margin-left: 50px;
}

.message-sender {
  font-weight: bold;
  margin-bottom: 5px;
}

.message-text {
  color: inherit;
  font-size: 20px;
  padding-inline: 10px;
  font-weight: 500;
}

.chat-input {
  display: flex;
  gap: 10px;
  user-select: none;
  align-items: center;
  position: relative;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  outline: none;
  color: white;
  font-size: 20px;
}

.user-info{
  display: flex;
  justify-content: flex-end;
}

.chat-input button {
  padding: 10px 20px;
  background-color: #3657cb;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.chat-messages {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #3657cb #2a324b; 
  scroll-behavior: smooth;
}

.chat-messages::-webkit-scrollbar {
  width: 8px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #2a324b;
  border-radius: 4px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #3657cb;
  border-radius: 4px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #1f4ae6;
}
.chat-input button:hover {
  background-color: #1f4ae6;
}

.record-button {
  cursor: pointer;
  position: relative;
}

.microphone-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
  bottom: -20px;
  border-radius: 50%;
  transition: all 0.3s;
}

.microphone-icon.recording {
    background-color: #ff4d4d;
    width: 85px;
    position: absolute;
    right: 0px;
    bottom: -35px;
    height: 85px;
}

.microphone-icon img {
  width: 30px;
  height: 30px;
}

.aura {
  position: absolute;
  width: 165px;
  height: 165px;
  border-radius: 50%;
  background-color: rgba(255, 77, 77, 0.3);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.7;
  }
  50% {
    transform: scale(1);
    opacity: 0.3;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.7;
  }
}
</style>