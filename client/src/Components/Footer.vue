<template>
    <footer  v-if="showEmailMailing">
        <div class="email_mailing">
            <div class="email_mailing-img">
                <img src="../assets/Media/Components/email_mailing.jpg" alt="">
            </div>

            <div class="email_mailing-blue">
                <div class="email_mailing-cont">
                    <div class="email_mailing-cont-logo" @click="this.$router.replace('/')">
                        <div class="email_mailing-cont-logo-img">
                            <img src="../assets/Media/Components/logo.svg" alt="">
                        </div>
                        <div class="email_mailing-cont-logo-title">VayKino</div>
                    </div>

                    <div class="email_mailing-cont-title">Подпишитесь на E-mail рассылку</div>

                    <div class="email_mailing-cont-discription">Если хотиет быть в курсе последних
                        новостей и новинок кино - заполните форму ниже и оформите бесплатную E-mail рассылку! </div>

                        <form class="email_mailing-cont-form" @submit.prevent="subscribe">
                <div class="email_mailing-cont-form-cont">
                    <input class="email_mailing-cont-form-input_text" type="email"
                        placeholder="Введите свой E-mail адрес" required />
                    <input class="email_mailing-cont-form-input_submit" type="submit" value="Подписаться" />
                </div>
                <label>
                    <input class="email_mailing-cont-form-input_checkbox" type="checkbox" id=""
                        defaultChecked />
                    <div class="email_mailing-cont-form-input_checkbox-txt">Соглашаюсь на
                        условия <router-link to="">политики конфиденциальности</router-link></div>
                </label>
            </form>
                </div>
            </div>


        </div>

        <div class="footer-cont">
            <div class="footer-social_networks">
                <a href="https://vk.com/" target="_blank"><img src="../assets/Media/Components/vk_social_media_icon.svg" alt=""></a>
                <a href="https://www.instagram.com/" target="_blank"><img src="../assets/Media/Components/instagram_social_media_icon.svg" alt=""></a>
                <a href="https://facebook.com/" target="_blank"><img src="../assets/Media/Components/facebook_social_media_icon.svg" alt=""></a>
                <a href="https://x.com/" target="_blank"><img src="../assets/Media/Components/twitter_social_media_icon.svg" alt=""></a>
                <a href="https://youtube.com/" target="_blank"><img src="../assets/Media/Components/youtube_social_media_icon.svg" alt=""></a>
            </div>

            <div class="footer-nav">
                <router-link to="/premiere" active-class="active">Афиша</router-link>
                <router-link to="/media" active-class="active">Медиа</router-link>
                <router-link to="/movies" active-class="active">Фильмы</router-link>
                <router-link to="/posts" active-class="active">Новости</router-link>
                <router-link to="/lists" active-class="active">Подборки</router-link>
                <router-link to="/chat" active-class="active" class="chat">Премиум-Чат</router-link>
            </div>

            <div class="footer-all_rights">
                2025 © VayKino. Все права защищены
            </div>

            <div class="footer-privacy_policy">
                Политика конфиденциальности
            </div>
        </div>
    </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            linkToImg: "../src/assets/Media/Components"
        } 
    },
    computed: {
        ...mapGetters(['showEmailMailing']),
    }
}
</script>

<style scoped>
.email_mailing {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    width: 80%;
    max-width: 1920px;
}

.email_mailing-img {
    position: relative;
    height: 600px;
    border-radius: 10px;
    overflow: hidden;

    img {
        width: 100%;
        height: 600px;
        z-index: 0;
        user-select: none;
    }
}

.email_mailing-blue {
    width: 100%;
    height: 600px;
    z-index: 2;
    opacity: 0.9;
    position: absolute;
    top: 0;
    background-color: #1d3aa0e5;
    display: flex;
    justify-content: center;
    align-items: center;
}

.email_mailing-cont {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.email_mailing-cont-logo {
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
}

.email_mailing-cont-logo-img img {
    width: 24px;
}

.email_mailing-cont-logo-title {
    font-size: 25px;
    font-weight: 800;
    line-height: 31.37px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: white;
    height: 35px;
    margin-left: 10px;
}

.email_mailing-cont-title {
    font-size: 40px;
    font-weight: 900;
    line-height: 63.7px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: white;
}

.email_mailing-cont-discription {
    font-size: 22px;
    font-weight: 500;
    line-height: 30.84px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    width: 700px;
    color: white;
}

.email_mailing-cont-form label {
    display: flex;
    justify-content: center;
}

.email_mailing-cont-form-cont {
    display: flex;
}

.email_mailing-cont-form-input_text {
    width: 430px;
    height: 70px;
    border-radius: 10px;
    border: none;
    outline: none;
    padding-left: 25px;
    font-size: 17px;
    font-weight: 400;
    line-height: 28.31px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

    &::placeholder {
        color: #151a2699;
    }
}

.email_mailing-cont-form-input_submit {
    width: 180px;
    height: 70px;
    background-color: #f2f60f;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    margin-left: 10px;
    font-size: 18px;
    font-weight: 700;
    line-height: 29.97px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
}

.email_mailing-cont-form label {
    margin-top: 15px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

.email_mailing-cont-form-input_checkbox {
    accent-color: #f2f60f;
}

.email_mailing-cont-form-input_checkbox-txt {
    color: white;
    font-size: 17px;
    font-weight: 400;
    line-height: 23.83px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin-left: 7px;

    a {
        color: #f2f60f;
    }
}


footer {
    background-color: #151a26;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 0 50px 0;
}

.footer-cont {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.footer-social_networks {
    display: flex;
    align-items: center;
    margin-top: 70px;
}

.footer-social_networks a {
    width: 25px;
    opacity: 0.6;
    transition: 0.3s;
    user-select: none;
    cursor: pointer;
    filter: invert();

    &:hover {
        opacity: 1;
    }

    &:not(:first-child) {
        margin-left: 25px;
    }
}

.footer-nav {
    display: flex;
    align-items: center;
    margin-top: 30px;
}

.footer-nav a {
    text-decoration: none;
    font-size: 17px;
    font-weight: 700;
    line-height: 21.06px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: white;
    user-select: none;
    cursor: pointer;
    transition: 0.3s;

    &.active{
      color: #3657cb;
      text-shadow: 0 0 15px rgba(54, 87, 203, .7);
    }

    &:hover {
        color: #3657cb;
    }

    &:not(:first-child) {
        margin-left: 35px;
    }

    &:nth-child(6){
      color: #f2f60f;
    }
}

.footer-all_rights {
    font-size: 15px;
    font-weight: 400;
    line-height: 17.85px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #e3e6f0b8;
    margin-top: 40px;
}

.footer-privacy_policy {
    font-size: 15px;
    font-weight: 400;
    line-height: 17.85px;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #e3e6f0b8;
    margin-top: 30px;
}

@media (max-width: 900px){
    footer .email_mailing{
        display: none;
    }
    .footer-nav a {
    &[data-v-f6420dc9] {
        text-decoration: none;
        font-size: 10px;
        font-weight: 700;
        line-height: 21.06px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: white;
        user-select: none;
        cursor: pointer;
        transition: 0.3s;
    }
}
}
</style>