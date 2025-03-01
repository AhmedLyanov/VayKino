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
        <div class="message-avatar" :class="{ 'admin-avatar': message.role === 'admin' }">
          <img :src="message.avatarUrl || defaultAvatar" alt="Аватар" />
        </div>
        <div class="message-content">
          <div class="message-sender">
            {{ message.sender }}
            <span v-if="message.role == 'admin'" class="admin-prefix">[Админ]</span>
          </div>
          <div class="message-text">{{ message.text }}</div>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import defaultAvatar from "@/assets/Media/profile/default.png";

if (typeof global === 'undefined') {
  window.global = window;
}
import io from "socket.io-client";

export default {
  data() {
    return {
      messages: [],
      newMessage: "",
      currentUser: null,
      defaultAvatar: defaultAvatar,
      socket: null,
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
    };
    await axios.post("http://91.197.96.204:3000/chat-messages", message);
    this.newMessage = "";
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
  }
}
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
  max-width: 1100px;
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
  border-radius: 10px;
}

.message {
  display: flex;
  margin-bottom: 15px;
}

.message-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.message-content {
  flex: 1;
  background-color: #3657cb;
  padding: 10px;
  border-radius: 10px;
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
</style>