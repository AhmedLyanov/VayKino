<template>
    <main>
        <div class="main-content">
            <div class="notifications">
                <div class="notifications-header">
                    <BlockHeader :title="'Уведомления'" :text="false" :link="false" />
                    <div class="notifications-count">{{ notifications.length }}</div>
                </div>

                <div class="notification-main">
                    <div class="notification" v-for="(notification, index) in notifications" :key="index">
                        <div class="notification-title">{{ notification.title }}</div>
                        <div class="notification-message">{{ notification.message }}</div>
                        <div class="notification-date">{{ formatDate(notification.createdAt) }}</div>
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
            notifications: 0
        }
    },
    mounted() {
        this.notifications = JSON.parse(localStorage.getItem("currentUser")).notifications

        this.notifications.reverse()
    },
    components: {
        BlockHeader
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Сегодняшняя дата без времени
            const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1); // Вчерашняя дата без времени

            const timeFormat = { hour: '2-digit', minute: '2-digit' };
            const timeString = date.toLocaleTimeString('ru-RU', timeFormat);

            if (date >= today) {
                return `Сегодня, ${timeString}`;
            } else if (date >= yesterday) {
                return `Вчера, ${timeString}`;
            } else {
                const dateFormat = { day: '2-digit', month: '2-digit', year: 'numeric' };
                const dateString = date.toLocaleDateString('ru-RU', dateFormat);
                return `${dateString}, ${timeString}`;
            }
        },
    },
}
</script>

<style scoped>
.notifications {
    width: 100%;
}

.notifications-header {
    width: 100%;
    display: flex;
    align-items: center;
}

.notifications-count {
    color: #3657cb;
    font-size: 65px;
    font-weight: 900;
    line-height: 82.81px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin-top: 60px;
    margin-bottom: 10px;
    margin-left: 25px;
}

.notification{
    color: white;
    padding: 10px 15px;
    border-radius: 10px;
    border: 1px solid white;
    margin-top: 20px;
}

.notification-title{
    font-size: 20px;
    font-weight: 700;
}

.notification-message{
    margin-left: 15px;
    margin-top: 10px;
    font-size: 17px;
    font-weight: 500;
}

.notification-date{
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: rgb(187, 187, 187);
}
</style>