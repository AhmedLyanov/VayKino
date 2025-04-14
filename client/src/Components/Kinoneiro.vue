<template>
    <div>
        <button @click="openChat" class="chat_open_button">
            <img src="../assets/Media/Components/Group 1.png" alt="">
        </button>
        <div v-if="chatActive" @click.self="chatDeactive" class="modal">
            <div class="main__container__chat_neiro">
                <div class="main_chat__box">
                    <div class="container_neiro_chat_info">
                        <div class="title_neiro_box">
                            KinoNeiro 4.0
                        </div>
                        <div class="activeTrue">
                            <div class="ball_active"></div>
                        </div>
                    </div>
                    <div class="chat_box">
                        <div class="messages__box">

                            <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
                                <span v-html="message.text"></span>
                            </div>
                           <div class="load__message">
                             <span  v-if="isLoading" class="loader"></span>
                           </div>
                        </div>

                        <div class="chat_input">
                            <input type="text" v-model="userInput" placeholder="Введите сообщение"
                                @keyup.enter="sendMessage">
                            <button @click="sendMessage" title="Отправить"></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chatActive: false,
            isLoading: false,
            messages: [],
            userInput: this.name || '',
        };
    },
    props: {
        name: {
            type: String,
            required: true
        }
    },
    methods: {
        openChat() {
            this.chatActive = true;
        },
        chatDeactive() {
            this.chatActive = false;
        },

        async sendMessage() {
            if (this.userInput.trim() === '') return;

            console.log(this.userInput);

            this.messages.push({ text: this.userInput, sender: 'user' });

            const userMessage = this.userInput;
            this.userInput = '';

            try {
                const response = await this.getDeepseekResponse(userMessage);
                this.messages.push({ text: response, sender: 'bot' });
            } catch (error) {
                console.error('Ошибка при получении ответа от Deepseek GPT:', error);
                this.messages.push({ text: 'Произошла ошибка при обработке запроса.', sender: 'bot' });
            }
        },


        async getDeepseekResponse(userInput) {
            const url = `${import.meta.env.VITE_API_NEIRO_KINO_URL}`;
            const apiKey = `${import.meta.env.VITE_API_NEIRO_KINO_KEY}`;

            const data = JSON.stringify({
                messages: [
                    {
                        role: 'user',
                        content: userInput
                    }
                ],
                web_access: false
            });

            

            try {
                this.isLoading = true;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'x-rapidapi-key': apiKey,
                        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                        'Content-Type': 'application/json'
                    },
                    body: data
                });
                this.isLoading = false;

                if (!response.ok) {
                    throw new Error('Ошибка при обращении к API');
                }

                const result = await response.json();
                console.log("Ответ от API:", result); 
             
                if (result.result) {
                    
                    const formattedText = this.formatBoldText(result.result);
                    return formattedText;
                } else {
                    throw new Error('Неверная структура ответа от API: отсутствует поле "result"');
                }
            } catch (error) {
                console.error('Ошибка при запросе к API:', error);
                throw error;
            }
        },
        formatBoldText(text) {
            return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        }
    }
}
</script>

<style scoped>
.chat_open_button {
    position: fixed;
    bottom: 10px;
    right: 110px;
    background-color: transparent;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: grid;
    align-items: center;
    justify-items: center;
    width: 85px;
    height: 100px;



}

.message {
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    min-width: 70%;
}

.user {
    background-color: #e1f5fe;
    align-self: flex-end;
}

.bot {
    background-color: #f5f5f5;
    align-self: flex-start;
}
.chat_open_button{
    z-index: 5;
}
.chat_open_button img {
    width: 100%;
}

.chat_open_button {
  animation: pulse 1.5s linear infinite;
}

@keyframes pulse {
  0% { transform: scale(1); rotate: 0deg; }
  50% { transform: scale(1.06); rotate: 30deg; }
  100% { transform: scale(1); rotate: 0deg; }
}


.chat_input input {
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: none;
    outline: none;
    background: transparent;
    color: white;
    font-size: 15px;
}

.chat_input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
}

.chat_input button {
    width: 30px;
    height: 30px;
    background-color: transparent;
    background-image: url(../assets/Media/Components/telegram.svg);
    background-position: center;
    background-size: cover;
    border: none;
    transition: background-image 0.5s;

    &:hover {
        background-image: url(../assets/Media/Components/telegram_hover.svg);
    }
}

.container_neiro_chat_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #F2F60F;
    padding-bottom: 5px;
}

.title_neiro_box {
    font-size: 15px;
    color: white;
    font-weight: 600;
    line-height: 12.05px;
}

.ball_active {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgb(50, 188, 50);
    box-shadow: 1px 1px 20px rgb(50, 188, 50);
}

.modal {
    position: fixed;
    top: 1%;
    right: 2%;
    bottom: 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 400px;
    min-height: 100px;
    animation: animationChat 0.5s;

}

@keyframes animationChat {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
.main_chat__box {
    display: grid;
    align-content: space-between;

}

.load__message{
    display: flex;
    justify-content: center;
}

.chat_input {
    border-top: 1px solid white;
}

.messages__box {
    overflow-y: auto;
    max-height: 460px;
    padding: 10px;
}

.messages__box::-webkit-scrollbar {
    width: 8px;
}

.messages__box::-webkit-scrollbar-track {
    background: #2a324b;
    border-radius: 4px;
}

.messages__box::-webkit-scrollbar-thumb {
    background: #3657cb;
    border-radius: 4px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    transition: background 0.3s ease;
}

.messages__box::-webkit-scrollbar-thumb:hover {
    background: #1f4ae6;
}

.chat-input button:hover {
    background-color: #1f4ae6;
}



.main__container__chat_neiro {
    background: #1b2133;
    padding: 20px 20px 0px 20px;
    min-width: 400px;
    min-height: 570px;
    max-width: 400px;
    max-height: 570px;
    border-radius: 10px;
    display: grid;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}
</style>