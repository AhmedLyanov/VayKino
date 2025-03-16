<template>
  <div v-if="show" class="modal-shadow" :class="{ 'active': isActive }" @click.self="closeModal">
    <div class="modal" :class="{ 'active': isActive }">
      <div className="modal-logo" @click="logoAction">
        <div className="modal-logo-img">
          <img :src="`${linkToImg}/logo.svg`" alt="" />
        </div>

        <div className="modal-logo-title">Vay<mark>Kino</mark></div>
      </div>

      <div className="modal-input">
        <input ref="searchInputField" type="text" placeholder="Введите название фильма" v-model="searchInput" @keyup.enter="searchMovie" />
        <div className="modal-butts">
          <button className="modal-filter">
            <img :src="`${linkToImg}/filter.svg`" alt="filter" />
          </button>
          <button className="modal-search" @click="searchMovie">
            <img :src="`${linkToImg}/search.svg`" alt="search" />
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="modal-loading">
        <span class="loader"></span>
      </div>

      <div v-if="errorMessage" class="modal-error">
        {{ errorMessage }}
      </div>

      <div v-if="searchResults.length" className="modal-search_output">
        <SearchCard @click="closeModal" v-for="result in searchResults" :key="result.id" :result="result" />
      </div>
    </div>
  </div>
</template>

<script>
import { fetchFreeAPI } from '@/Services/apiService';
import SearchCard from './SearchCard.vue';

export default {
  name: "ModalWindow",
  data: function () {
    return {
      show: false,
      isActive: false,
      linkToImg: "../src/assets/Media/Components",
      searchInput: "",
      searchResults: [],
      errorMessage: null,
      isLoading: false
    }
  },
  components: {
    SearchCard
  },
  watch: {
    show(newValue) {
      if (newValue) {
        document.body.classList.add('no-scroll');
        this.isActive = false
        setTimeout(() => {
          this.isActive = true;
          this.$nextTick(() => {
            this.$refs.searchInputField.focus();
          });
        }, 10);
        
        document.addEventListener('keydown', this.handleEsc);

      } else {
        document.body.classList.remove('no-scroll');
        this.isActive = false;
        
        document.removeEventListener('keydown', this.handleEsc);
      }
    }
  },
  methods: {
    closeModal: function () {
      this.searchResults = [];
      this.searchInput = "";
      this.show = false;
      this.errorMessage = null;
    },
    logoAction() {
      this.searchResults = [];
      this.searchInput = "";
      this.$router.replace('/');
      this.show = false;
      this.errorMessage = null;
    },

    async searchMovie() {
      if (this.searchInput !== '') {
        try {
          this.isLoading = true;
          this.searchResults = [];
          this.errorMessage = null;

          let a = await fetchFreeAPI(`&name=${this.searchInput}`);
          if (a.length !== 0) {
            this.errorMessage = null;
            this.searchResults = a;
          } else {
            this.searchResults = [];
            this.errorMessage = 'Фильм не найден.';
          }
          this.isLoading = false;
        } catch (error) {
          console.error("Component error", error);
          this.errorMessage = "Ошибка при выполнении запроса";
          this.searchResults = [];
          this.isLoading = false;
        }

      } else {
        this.errorMessage = "Введите название фильма";
        this.searchResults = [];
        this.isLoading = false;
      }
    },
    handleEsc(event) {
      if (event.key === 'Escape' || event.keyCode === 27) {
        this.closeModal();
      }
    },
  }
}
</script>



<style scoped>
.modal-shadow {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  &.active{
    background: rgba(0, 0, 0, 0.89);
  }
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-800px);
  transition: transform 0.35s ease-out;
}

.modal.active {
  transform: translateY(0);
}

.modal-logo {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  margin-bottom: 40px;
}

.modal-logo-img {
  height: 24px;
}

.modal-logo-title {
  margin-left: 7px;
}

.modal-logo-title,
.modal-logo-title mark {
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

.modal-input {
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;

  input {
    width: 700px;
    height: 55px;
    border: 1px solid #fff;
    outline: none;
    padding-left: 15px;
    font-size: 20px;
    font-weight: 500;
  }
}

.modal-butts {
  background-color: #fff;
  height: 55px;
  display: flex;
  align-items: center;
  padding: 8px;
  padding-right: 5px;
  border: 1px solid #fff;

  button {
    width: 50px;
    height: 50px;
    border: 1px solid white;
    outline: none;
    cursor: pointer;
    user-select: none;
    transition: 0.4s;

    &:hover {
      border: 1px solid #3657cb;
    }

    img {
      pointer-events: none;
    }
  }
}

.modal-search {
  border-radius: 10px;
  background-color: #f2f60f;
}

.modal-filter {
  margin-right: 10px;
  border-radius: 10px;
  background-color: transparent;
}

.modal-error{
  width: 100%;
  height: 173px;
  margin-top: 20px;
  background-color: #1e2538;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
}

.modal-loading{
  width: 100%;
  height: 173px;
  margin-top: 20px;
  background-color: #1e2538;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-search_output {
  margin-top: 20px;
  max-width: 100%;
  width: 100%;
  max-height: 700px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #1e2538;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #3657cb;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #1f4ae6;
  }
}

.loader {
  width: 48px;
  height: 48px;
  background: #FFF;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 6px;
  top: 10px;
  width: 12px;
  height: 12px;
  color: #3657cb;
  background: currentColor;
  border-radius: 50%;
  box-shadow: 25px 2px, 10px 22px;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
</style>
