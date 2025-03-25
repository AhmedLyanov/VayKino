<template>
    <main>
        <div class="main-content">
            <div class="list_servers">
                <div class="search_server">
                    <div class="board_server_list">
                        <div class="search_container">
                            <div class="search_icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M21 21L16.65 16.65" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div class="search_input">
                                <input 
                                    type="text" 
                                    placeholder="Введите название комнаты" 
                                    v-model="searchTerm"
                                >
                            </div>
                        </div>
                        
                        <div class="add_new_server">
                            <button class="new_server_button" @click="createNewServer">
                                <span class="button_icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
                        <span>ФИЛЬМ</span>
                    </div>
                    <div class="server___placeholder">
                        <span>ЛИМИТ</span>
                    </div>
                </div>
                
                <div class="server__box">
                    <div 
                        class="server__information_box"
                        v-for="(server, index) in filteredServers"
                        :key="index"
                        @click="joinServer(server)"
                    >
                        <div class="server__name">
                            <span class="attribute_server_box">{{ server.name }}</span>
                        </div>
                        <div class="leader__element">
                            <span class="attribute_server_box">{{ server.leader }}</span>
                        </div>
                        <div class="movie_name">
                            <span class="attribute_server_box">{{ server.movie }}</span>
                        </div>
                        <div class="users_limit_list">
                            <span class="attribute_server_box">{{ server.users }}/{{ server.limit }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            searchTerm: '',
            servers: [
                {
                    name: 'vaykinoTop',
                    leader: 'DevAhmed',
                    movie: 'Соник 3 в кино',
                    users: 4,
                    limit: 4
                },
                {
                    name: 'FilmLovers',
                    leader: 'CinemaPro',
                    movie: 'Дюна: Часть вторая',
                    users: 2,
                    limit: 6
                },
                {
                    name: 'AnimeWorld',
                    leader: 'Sakura',
                    movie: 'Наруто: Фильм',
                    users: 3,
                    limit: 5
                }
            ]
        }
    },
    computed: {
        filteredServers() {
            return this.servers.filter(server => 
                server.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                server.movie.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    },
    methods: {
        createNewServer() {
          
            console.log('Создание новой комнаты');
        },
        joinServer(server) {
            console.log('Подключение к комнате:', server.name);
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