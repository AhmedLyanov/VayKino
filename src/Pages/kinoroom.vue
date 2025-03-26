html
Copy
<template>
    <main>
        <div class="main-content">
            <div class="list_servers">
                <div class="search_server">
                    <div class="board_server_list">
                        <div class="search_container">
                            <div class="search_icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                        stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M21 21L16.65 16.65" stroke="#9CA3AF" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div class="search_input">
                                <input type="text" placeholder="Введите название комнаты" v-model="searchTerm">
                            </div>
                        </div>

                        <div class="add_new_server">
                            <button class="new_server_button" @click="showCreateModal = true">
                                <span class="button_icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span class="button_text">Новая комната</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="attributes_servers">
                    <div class="server___placeholder">
                        <span>НАЗВАНИЕ</span>
                    </div>
                    <div class="server___placeholder">
                        <span>ЛИДЕР</span>
                    </div>
                    <div class="server___placeholder">
                        <span>ЛИМИТ</span>
                    </div>
                </div>

                <div class="server__box">
                    <template v-if="filteredServers.length > 0">
                        <div class="server__information_box" v-for="(server, index) in filteredServers" :key="index"
                            @click="joinServer(server)">
                            <div class="server__name">
                                <span class="attribute_server_box">{{ server.name }}</span>
                            </div>
                            <div class="leader__element">
                                <span class="attribute_server_box">{{ server.leader.login }}</span>
                            </div>
                            <div class="users_limit_list">
                                <span class="attribute_server_box">{{ server.users.length }}/{{ server.maxUsers
                                    }}</span>
                            </div>
                        </div>
                    </template>

                    <div v-else class="no-servers-message">
                        <div class="no-servers-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
                                <path fill="white"
                                    d="M20 3H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 9V5h16v4zm16 4H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zM4 19v-4h16v4z" />
                                <path fill="white" d="M17 6h2v2h-2zm-3 0h2v2h-2zm3 10h2v2h-2zm-3 0h2v2h-2z" />
                            </svg>

                        </div>
                        <div class="no-servers-text">
                            Нет доступных серверов
                        </div>
                        <div class="no-servers-hint">
                            Попробуйте изменить параметры поиска или создайте новый сервер
                        </div>
                        <button class="no-servers-button" @click="showCreateModal = true">
                            Создать новую комнату
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showCreateModal" class="modal-overlay" @click.self="showCreateModal = false">
            <div class="modal-content">
                <h2>Создать новую комнату</h2>
                <form @submit.prevent="createNewServer">
                    <div class="form-group">
                        <label for="roomName">Название комнаты</label>
                        <input id="roomName" type="text" v-model="newRoom.name" required
                            placeholder="Уникальное название">
                    </div>
                    <div class="form-group">
                        <label for="maxUsers">Максимальное количество пользователей</label>
                        <input id="maxUsers" type="number" v-model="newRoom.maxUsers" min="1" max="20" required>
                    </div>
                    <div class="form-group checkbox-group">
                        <input id="isPrivate" type="checkbox" v-model="newRoom.isPrivate">
                        <label for="isPrivate">Приватная комната</label>
                    </div>
                    <div class="form-group" v-if="newRoom.isPrivate">
                        <label for="password">Пароль</label>
                        <input id="password" type="password" v-model="newRoom.password" required>
                    </div>
                    <div class="modal-actions">
                        <button type="button" @click="showCreateModal = false">Отмена</button>
                        <button type="submit">Создать</button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<script>
import server from "../assets/Media/Components/server.svg"
export default {
    data() {
        return {
            searchTerm: '',
            servers: [],
            showCreateModal: false,
            newRoom: {
                name: '',
                maxUsers: 10,
                isPrivate: false,
                password: ''
            }
        }
    },
    computed: {
        filteredServers() {
            return this.servers.filter(server =>
                server.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    },
    async created() {
        await this.fetchServers();
    },
    methods: {
        async fetchServers() {
            try {
                const response = await fetch('https://dreamfood.space:3000/rooms');
                if (!response.ok) {
                    const errorData = await response.json();
                    this.$toast.error(
                        errorData.error || 'Ошибка загрузки серверов',
                        { position: 'top-right', duration: 2000 }
                    );
                    return;
                }
                this.servers = await response.json();
            } catch (error) {
                console.error('Ошибка при загрузке серверов:', error);
                this.$toast.error(
                    'Не удалось загрузить серверы',
                    { position: 'top-right', duration: 2000 }
                );
            }
        },
        async createNewServer() {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('https://dreamfood.space:3000/rooms', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(this.newRoom)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    this.$toast.error(
                        errorData.error || 'Ошибка создания комнаты',
                        { position: 'top-right', duration: 2000 }
                    );
                    return;
                }
                const newServer = await response.json();
                this.servers.push(newServer);
                this.showCreateModal = false;
                this.resetNewRoomForm();
                this.$toast.success(
                    'Комната успешно создана',
                    { position: 'top-right', duration: 2000 }
                );

            } catch (error) {
                console.error('Ошибка при создании комнаты:', error);
                this.$toast.error(
                    'Ошибка при создании комнаты',
                    { position: 'top-right', duration: 2000 }
                );
            }
        },
        async joinServer(server) {
            try {
                const token = localStorage.getItem('token');
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));

                if (!token || !currentUser) {
                    throw new Error('Требуется авторизация');
                }

                let password = '';
                if (server.isPrivate) {
                    password = prompt('Введите пароль для комнаты:');
                    if (!password) return;
                }

                const response = await fetch(`https://dreamfood.space:3000/rooms/${server._id}/join`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({ password })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Ошибка входа в комнату');
                }

                currentUser.currentRoom = server._id;
                localStorage.setItem('user', JSON.stringify(currentUser));

                this.$router.push(`/room/${server._id}`);

            } catch (error) {
                console.error('Ошибка при входе в комнату:', error);
                this.$toast.error(
                    error.message || 'Ошибка при входе в комнату',
                    { position: 'top-right', duration: 2000 }
                );
            }
        },
        resetNewRoomForm() {
            this.newRoom = {
                name: '',
                maxUsers: 10,
                isPrivate: false,
                password: ''
            };
        }
    }
}
</script>


<style scoped>
.main-content {
    width: 100%;
    height: 100%;
    background-color: #1b2133;
    color: white;
}




.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.checkbox-group {
    display: flex;
    align-items: center;
}

.checkbox-group input {
    width: auto;
    margin-right: 0.5rem;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
}

.modal-actions button {
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.modal-actions button:first-child {
    background-color: #f0f0f0;
}

.modal-actions button:last-child {
    background-color: #4CAF50;
    color: white;
}

.list_servers {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: grid;
    gap: 15px;
}

.search_server {
    width: 100%;
    height: 80px;
    background-color: #2a3448;
    padding: 0 25px;
    border-radius: 12px;
    display: flex;
    align-items: center;
}

.board_server_list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.search_container {
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 8px 16px;
    width: 450px;
    transition: all 0.3s ease;
}

.search_container:hover {
    background-color: rgba(255, 255, 255, 0.12);
}

.no-servers-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    text-align: center;
    background-color: transparent;
    border-radius: 8px;
    margin-top: 20px;
}

.no-servers-icon {
    margin-bottom: 20px;
}

.no-servers-icon svg {
    width: 64px;
    height: 64px;
}

.no-servers-text {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 10px;
}

.no-servers-hint {
    font-size: 14px;
    color: #b9bbbe;
    margin-bottom: 20px;
    max-width: 400px;
}

.no-servers-button {
    padding: 10px 20px;
    background-color: #5865f2;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
}

.no-servers-button:hover {
    background-color: #4752c4;
}


.search_icon {
    margin-right: 12px;
    display: flex;
    align-items: center;
}

.search_input {
    flex: 1;
}

.search_input input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: 16px;
    font-weight: 500;
    padding: 8px 0;
}

.search_input input::placeholder {
    color: #9CA3AF;
    font-weight: 400;
}

.add_new_server {
    display: flex;
    align-items: center;
}

.new_server_button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #4F46E5;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.new_server_button:hover {
    background-color: #4338CA;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.new_server_button:active {
    transform: translateY(0);
}

.button_icon {
    display: flex;
    align-items: center;
}


.attributes_servers {
    display: grid;
    grid-template-columns: 3fr 2fr 3fr 1fr;
    align-items: center;
    padding: 0 30px;
    height: 60px;
    margin-top: 10px;
    border-bottom: 3px solid rgba(255, 255, 255, 0.189);
    gap: 15px;
}

.server__box {
    display: grid;
    gap: 12px;
    margin-top: 10px;
}

.server__information_box {
    display: grid;
    grid-template-columns: 3fr 2fr 3fr 1fr;
    align-items: center;
    padding: 20px 30px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
    gap: 15px;
}

.server___placeholder {
    font-weight: 600;
    font-size: 16px;
    color: #9CA3AF;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}

.attribute_server_box {
    font-weight: 600;
    font-size: 18px;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.server___placeholder:nth-child(1),
.attribute_server_box:nth-child(1) {
    text-align: left;
    padding-right: 10px;
}

.server___placeholder:nth-child(2),
.attribute_server_box:nth-child(2),
.server___placeholder:nth-child(3),
.attribute_server_box:nth-child(3),
.server___placeholder:nth-child(4),
.attribute_server_box:nth-child(4) {
    text-align: left;
}

.server__information_box:hover {
    background: rgba(255, 255, 255, 0.12);
    cursor: pointer;
}

@media (max-width: 1200px) {

    .server__information_box,
    .attributes_servers {
        padding: 15px 20px;
        gap: 10px;
    }
}

@media (max-width: 992px) {

    .attributes_servers,
    .server__information_box {
        grid-template-columns: 2fr 1.5fr 2fr 1fr;
    }
}

@media (max-width: 768px) {
    .board_server_list {
        flex-direction: column;
        gap: 15px;
    }

    .search_container {
        width: 100%;
    }

    .new_server_button {
        width: 100%;
    }

    .server___placeholder {
        font-size: 14px;
    }

    .attribute_server_box {
        font-size: 16px;
    }

    .attributes_servers,
    .server__information_box {
        grid-template-columns: 2fr 1.5fr 1.5fr 1fr;
        padding: 10px 15px;
    }
}

@media (max-width: 576px) {

    .attributes_servers,
    .server__information_box {
        grid-template-columns: 2fr 1.2fr 1.2fr 0.8fr;
        font-size: 12px;
    }

    .attribute_server_box {
        font-size: 14px;
    }
}
</style>