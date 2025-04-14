<template>
    <main class="notifications-main">
        <div class="bg-joker"></div>
        <div class="bg-joker-temnee"></div>
        
        <div class="main-content-notifications">
            <div class="notifications-wrapper">
                <div class="notifications-header">
                    <BlockHeader :title="'Уведомления'" :text="false" :link="false" />
                    <div class="notifications-count">{{ notifications.length }}</div>
                </div>

                <div class="notifications-grid">
                    <div 
                        class="notification-card" 
                        v-for="(notification, index) in notifications" 
                        :key="index"
                        @click="handleNotificationClick(notification)"
                    >
                        <div class="notification-body">
                            <div class="notification-header">
                                <span class="notification-title">{{ notification.title }}</span>
                                <span class="notification-date">{{ formatDate(notification.createdAt) }}</span>
                            </div>
                            <div class="notification-content">
                                <p class="notification-message">{{ notification.message }}</p>
                                <div class="notification-link" v-if="notification.link">
                                    <i class="link-icon"></i>
                                    <span>{{ formatLink(notification.link) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import BlockHeader from '@/Components/BlockHeader.vue';

export default {
    data() {
        return {
            notifications: []
        }
    },
    mounted() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.notifications = currentUser?.notifications || [];
        this.notifications.reverse();
    },
    components: {
        BlockHeader
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

            const timeFormat = { hour: '2-digit', minute: '2-digit' };
            const timeString = date.toLocaleTimeString('ru-RU', timeFormat);

            if (date >= today) {
                return `Сегодня, ${timeString}`;
            } else if (date >= yesterday) {
                return `Вчера, ${timeString}`;
            } else {
                const dateFormat = { day: '2-digit', month: '2-digit', year: 'numeric' };
                const dateStr = date.toLocaleDateString('ru-RU', dateFormat);
                return `${dateStr}, ${timeString}`;
            }
        },
        formatLink(link) {
            try {
                const url = new URL(link);
                return url.hostname + (url.pathname !== '/' ? url.pathname : '');
            } catch {
                return link.length > 30 ? link.substring(0, 30) + '...' : link;
            }
        },
        handleNotificationClick(notification) {
            if (notification.link) {
                window.open(notification.link, '_blank');
            }
        }
    }
}
</script>

<style scoped>
.notifications-main {
    position: relative;
    min-height: 100vh;
    color: white;
}

.bg-joker {
    background-image: url("../assets/Media/Main/bg-img.jpg");
    width: 100%;
    height: 1080px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.bg-joker-temnee {
    width: 100%;
    height: 1080px;
    background: linear-gradient(rgba(70, 44, 148, 0) -320%, #1e2538 83.8%);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

.main-content-notifications {
   width: 100%;
}

.notifications-wrapper {
    background: rgba(27, 33, 51, 0.85);
    padding: 50px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.notifications-header {
    display: flex;
    align-items: flex-end;
    margin-bottom: 40px;
    padding-bottom: 25px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.notifications-count {
    color: #3657cb;
    font-size: 72px;
    font-weight: 900;
    line-height: 1;
    margin-left: 30px;
    margin-bottom: -15px;
    text-shadow: 0 2px 10px rgba(54, 87, 203, 0.5);
}

.notifications-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

.notification-card {
    background: rgba(27, 33, 51, 0.7);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    cursor: pointer;
    overflow: hidden;
}

.notification-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    border-color: rgba(54, 87, 203, 0.5);
    background: rgba(27, 33, 51, 0.9);
}

.notification-body {
    padding: 25px 30px;
}

.notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.notification-title {
    font-size: 22px;
    font-weight: 800;
    color: white;
    letter-spacing: 0.5px;
}

.notification-date {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
}

.notification-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.notification-message {
    font-size: 17px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.85);
}

.notification-link {
    display: flex;
    align-items: center;
    color: #4a7dff;
    font-size: 15px;
    font-weight: 600;
    margin-top: 5px;
}

.notification-link i {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%234a7dff' viewBox='0 0 24 24'%3E%3Cpath d='M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    margin-right: 8px;
}

.notification-link:hover {
    text-decoration: underline;
    color: #5d8bff;
}

.notification-card {
    opacity: 0;
    animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.notification-card:nth-child(1) { animation-delay: 0.1s; }
.notification-card:nth-child(2) { animation-delay: 0.2s; }
.notification-card:nth-child(3) { animation-delay: 0.3s; }
.notification-card:nth-child(4) { animation-delay: 0.4s; }
.notification-card:nth-child(5) { animation-delay: 0.5s; }
</style>