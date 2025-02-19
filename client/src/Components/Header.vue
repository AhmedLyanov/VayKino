<template>
  <header>
    <div class="header-cont">
      <div class="header-left">
        <div class="header-logo" @click="this.$router.replace('/')">
          <div class="header-logo-img">
            <img :src="`${linkToImg}/logo.svg`" alt="" />
          </div>

          <div class="header-logo-title">Vay<mark>Kino</mark></div>
        </div>

        <div class="header-social_networks">
          <div><img :src="`${linkToImg}/vk_social_media_icon.svg`" alt="" /></div>
          <div><img :src="`${linkToImg}/instagram_social_media_icon.svg`" alt="" /></div>
          <div><img :src="`${linkToImg}/facebook_social_media_icon.svg`" alt="" /></div>
          <div><img :src="`${linkToImg}/twitter_social_media_icon.svg`" alt="" /></div>
        </div>
      </div>

      <div class="header-center">
        <nav>
          <div>Афиша</div>
          <div>Медиа</div>
          <div>Фильмы</div>
          <div>Актеры</div>
          <div>Новости</div>
          <div>Подборки</div>
          <div>Категории</div>
        </nav>
      </div>

      <div class="header-right">
        <div class="header-search_btn" @click="showModal">
          <img :src="`${linkToImg}/search.svg`" alt="" />
        </div>
        <div class="header-login" @click="this.$router.replace('/login')">Войти</div>
      </div>
    </div>

    <SearchModal ref="modal"></SearchModal>
  </header>
</template>

<script>
import SearchModal from './SearchModal.vue';

export default {
  data() {
    return {
      linkToImg: "../src/assets/Media/Components"
    }
  },
  components: {
    SearchModal
  },
  methods: {
    showModal: function () {
      this.$refs.modal.show = true
    }
  },
}
</script>

<style scoped>
header {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

.header-cont {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-logo {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

.header-logo-img {
  height: 24px;
}

.header-logo-title {
  margin-left: 7px;
}

.header-logo-title,
.header-logo-title mark {
  font-size: 25px;
  font-weight: 800;
  line-height: 31.37px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #3657cb;

  mark {
    background-color: transparent;
    color: white;
  }
}

.header-social_networks {
  margin-top: 10px;
  display: flex;
  width: 130px;
  margin-left: 3px;
  align-items: center;
  justify-content: space-between;

  div {
    width: 20px;
    opacity: 0.6;
    transition: 0.3s;
    user-select: none;
    cursor: pointer;
    filter: invert();

    &:hover {
      opacity: 1;
    }
  }
}

.header-center nav {
  display: flex;

  div {
    font-size: 17px;
    font-weight: 700;
    line-height: 21.06px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: white;
    transition: 0.3s;
    user-select: none;
    cursor: pointer;

    &:not(:first-child) {
      margin-left: 40px;
    }

    &:hover {
      color: #3657cb;
    }
  }
}

.header-right {
  display: flex;
}

.header-search_btn {
  width: 55px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0px 0px 0px 0px white;

  &:hover {
    box-shadow: 0px 0px 15px 0px white;
  }
}

.header-login {
  width: 140px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 10px;
  background-color: #3657cb;
  transition: 0.3s;
  user-select: none;
  cursor: pointer;
  margin-left: 15px;
  box-shadow: 0px 0px 0px 0px #3657cb;

  &:hover {
    box-shadow: 0px 0px 15px 0px #3657cb;
  }
}
</style>