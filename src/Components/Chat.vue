<template>
  <div class="chat-container">
    <div class="chat-header">
      <div class="premuim_logo">
        <img src="../assets/Media/Components/GoldCrown.svg" alt="PremUI" />
      </div>
      <div class="named_page">
        <article>
          <h1>Премиум-Чат</h1>
        </article>
      </div>
      <div class="header_chat_welcome">
        <span>Общайтесь, советуйтесь, деградируйтесь</span>
      </div>
    </div>
    <div class="chat-messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div
          class="message-avatar"
          :class="{ 'admin-avatar': message.role === 'admin' }"
          v-if="shouldShowAvatar(index)"
        >
          <img :src="message.avatarUrl || defaultAvatar" alt="Аватар" />
        </div>
        <div class="message-content" :class="{ 'no-avatar': !shouldShowAvatar(index) }">
          <div class="message-sender">
            {{ message.sender }}
          </div>
          <div class="message-text">
            <span v-if="message.text">{{ message.text }}</span>
            <audio v-if="message.audioUrl" :src="message.audioUrl" controls></audio>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Введите сообщение..."
      />
      <button @click="sendMessage">Отправить</button>
      <div class="record-button" @click="toggleRecording">
        <div class="microphone-icon" :class="{ 'recording': isRecording }">
          <img src="../assets/Media/Components/audio.svg" alt="Запись" />
          <div class="aura" v-if="isRecording"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import defaultAvatar from "@/assets/Media/profile/default.png";
import io from "socket.io-client";
import RecordRTC from "recordrtc";

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
    };
  },
  async created() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!this.currentUser || !this.currentUser.premium) {
      alert("Только пользователи с премиум-подпиской могут использовать чат.");
      this.$router.push("/");
      return;
    }
    await this.fetchMessages();
    this.socket = io("http://91.197.96.204:3000");
    this.socket.on("newMessage", (message) => {
      this.messages.push(message);
    });
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await axios.get("http://91.197.96.204:3000/chat-messages");
        this.messages = response.data;
      } catch (error) {
        console.error("Ошибка при получении сообщений:", error);
      }
    },
    async sendMessage() {
      if (!this.newMessage.trim()) return;
      try {
        const message = {
          sender: this.currentUser.login,
          text: this.newMessage,
          avatarUrl: this.currentUser.avatarUrl,
          role: this.currentUser.role,
        };
        await axios.post("http://91.197.96.204:3000/chat-messages", message);
        this.newMessage = "";
      } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
      }
    },
    toggleRecording() {
      if (this.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
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
    const response = await axios.post("http://91.197.96.204:3000/upload-voice-message", formData, {
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
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
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

.chat-header {
  text-align: center;
  margin-bottom: 20px;
}

.chat-header span {
  color: white;
  font-size: 25px;
  font-weight: 900;
  line-height: 57.33px;
}

.premuim_logo img {
  width: 150px;
}

.named_page {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #f2f60f;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #2a324b;
  background-image: url(../assets/Media/Components/background_chat.jpg);
  background-size: cover;
  background-position: center;
  border-radius: 10px;
}

.message {
  display: flex;
  margin-bottom: 15px;
}

.message-avatar {
  width: 40px;
  height: 40px;
  margin-right: 10px;
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
  max-width: 70%;
  background-color: #3657cb;
  padding: 10px;
  border-radius: 10px;
  overflow-wrap: anywhere;
}

.message-content.no-avatar {
  margin-left: 50px;
}

.message-sender {
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
}

.message-text {
  color: white;
}

.chat-input {
  display: flex;
  gap: 10px;
  align-items: center;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #3657cb;
  border-radius: 10px;
  background-color: #2a324b;
  color: white;
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
  background-color: #3657cb;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.microphone-icon.recording {
  background-color: #ff4d4d;
}

.microphone-icon img {
  width: 20px;
  height: 20px;
}

.aura {
  position: absolute;
  width: 60px;
  height: 60px;
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