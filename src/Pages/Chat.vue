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
      <div v-for="(message, index) in messages" :key="message._id" class="message" :class="{ 'my-message': message.sender === currentUser.login, 'other-message': message.sender !== currentUser.login }">
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
            <div v-if="message.imageUrl" class="image-container">
              <img :src="message.imageUrl" alt="Изображение" class="message-image" @click="openPosterModal(message.imageUrl)" />
            </div>
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
            accept="image/*,audio/*"
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
      poster: "",
      pendingFiles: new Map()
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
    this.setupSocketConnection();
  },
  methods: {
    ...mapActions(['toggleEmailMailing']),

    setupSocketConnection() {
      this.socket = io(`${import.meta.env.VITE_API_BASE_URL}/`, {
        auth: {
          token: localStorage.getItem('token')
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      this.socket.on("connect", () => {
        console.log("WebSocket connected");
      });

      this.socket.on("newMessage", (message) => {
        if (!this.pendingFiles.has(message._id)) {
          this.addMessage(message);
        } else {
          this.messages = this.messages.map(m => 
            m._id === message._id ? message : m
          );
          this.pendingFiles.delete(message._id);
        }
        this.scrollToBottom();
      });

      this.socket.on("connect_error", (error) => {
        console.error("WebSocket connection error:", error);
      });
    },

    addMessage(message) {
      this.messages.push(message);
      this.scrollToBottom();
    },

    async fetchMessages() {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat-messages`, {
          headers: {
            'Authorization': token,
          },
        });
        if (response.ok) {
          this.messages = await response.json();
          this.scrollToBottom();
        } else if (response.status === 401) {
          await this.refreshToken();
          await this.fetchMessages();
        }
      } catch (error) {
        console.error('Ошибка при получении сообщений:', error);
      }
    },

    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      if (!file.type.startsWith("image/") && !file.type.startsWith("audio/")) {
        const toast = useToast();
        toast.error("Пожалуйста, выберите изображение или аудио файл.", {
          position: 'top-right',
          duration: 2000,
          dismissible: false,
        });
        return;
      }

      const tempId = Date.now().toString();
      const tempMessage = {
        _id: tempId,
        sender: this.currentUser.login,
        avatarUrl: this.currentUser.avatarUrl,
        timestamp: new Date()
      };

      if (file.type.startsWith("image/")) {
        tempMessage.imageUrl = URL.createObjectURL(file);
      } else if (file.type.startsWith("audio/")) {
        tempMessage.audioUrl = URL.createObjectURL(file);
      }

      this.pendingFiles.set(tempId, tempMessage);
      this.addMessage(tempMessage);
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sender", this.currentUser.login);
      formData.append("avatarUrl", this.currentUser.avatarUrl);
      formData.append("roomId", "global");

      try {
        const endpoint = file.type.startsWith("image/") 
          ? "upload-image-message" 
          : "upload-voice-message";
        
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/${endpoint}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
        );

        const savedMessage = response.data;
        this.socket.emit("confirmUpload", { tempId, savedMessage });
        
        event.target.value = "";
      } catch (error) {
        console.error("Ошибка при отправке файла:", error);
        
        this.messages = this.messages.filter(m => m._id !== tempId);
        this.pendingFiles.delete(tempId);
        
        const toast = useToast();
        toast.error("Ошибка при загрузке файла. Попробуйте еще раз.", {
          position: 'top-right',
          duration: 2000,
          dismissible: false,
        });
      }
    },

    async sendMessage() {
  if (!this.newMessage.trim()) return;
  
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat-messages`, {
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
        roomId: "global" // Добавляем roomId для совместимости с сервером
      }),
    });

    if (response.ok) {
      this.newMessage = "";
    } else if (response.status === 401) {
      await this.refreshToken();
      await this.sendMessage();
    } else {
      console.error('Ошибка при отправке сообщения:', await response.text());
    }
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    const toast = useToast();
    toast.error("Ошибка при отправке сообщения", {
      position: 'top-right',
      duration: 2000,
      dismissible: false,
    });
  }
},

    scrollToBottom() {
      this.$nextTick(() => {
        const chatMessages = this.$el.querySelector(".chat-messages");
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      });
    },

    formatTime(timestamp) {
      const date = new Date(timestamp);
      const options = {
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleString("ru", options);
    },

    toggleRecording() {
      if (this.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    },

    async startRecording() {
      try {
        this.isRecording = true;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.recorder = new RecordRTC(stream, { 
          type: "audio",
          mimeType: "audio/webm",
          recorderType: RecordRTC.StereoAudioRecorder
        });
        this.recorder.startRecording();
      } catch (error) {
        console.error("Ошибка при записи:", error);
        this.isRecording = false;
      }
    },

    async stopRecording() {
      this.isRecording = false;
      return new Promise(resolve => {
        this.recorder.stopRecording(async () => {
          const blob = this.recorder.getBlob();
          await this.sendVoiceMessage(blob);
          this.recorder.getDataURL().then(dataURL => {
            URL.revokeObjectURL(dataURL);
          });
          resolve();
        });
      });
    },

    async sendVoiceMessage(blob) {
      const tempId = Date.now().toString();
      const tempMessage = {
        _id: tempId,
        sender: this.currentUser.login,
        avatarUrl: this.currentUser.avatarUrl,
        audioUrl: URL.createObjectURL(blob),
        timestamp: new Date()
      };

      this.pendingFiles.set(tempId, tempMessage);
      this.addMessage(tempMessage);

      const formData = new FormData();
      formData.append("file", blob, "voice-message.webm");
      formData.append("sender", this.currentUser.login);
      formData.append("avatarUrl", this.currentUser.avatarUrl);
      formData.append("roomId", "global");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/upload-voice-message`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
        );

        const savedMessage = response.data;
        this.socket.emit("confirmUpload", { tempId, savedMessage });
      } catch (error) {
        console.error("Ошибка при отправке голосового сообщения:", error);
        this.messages = this.messages.filter(m => m._id !== tempId);
        this.pendingFiles.delete(tempId);
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

    async refreshToken() {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        this.logout();
        return false;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Ошибка при обновлении токена:', error);
        this.logout();
        return false;
      }
    },

    logout() {
      if (this.socket) {
        this.socket.disconnect();
      }
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser');
      this.$router.push('/login');
    }
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
    
    this.pendingFiles.forEach(message => {
      if (message.imageUrl && message.imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(message.imageUrl);
      }
      if (message.audioUrl && message.audioUrl.startsWith('blob:')) {
        URL.revokeObjectURL(message.audioUrl);
      }
    });
    
    if (this.recorder) {
      this.recorder.destroy();
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
.upload-progress {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.image-container {
  position: relative;
}

.message-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.message-image:hover {
  transform: scale(1.02);
}

.audio_message {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
}

.message-avatar_audio img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
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