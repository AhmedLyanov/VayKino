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
          <button className="modal-filter" @click="filterAction">
            <img :src="`data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xXzE5MTcpIj4NCjxwYXRoIGQ9Ik05LjIxMDk0IDE5LjAzNzFDOC42OTMxNiAxOS4wMzcxIDguMjczNDQgMTkuNDU2OCA4LjI3MzQ0IDE5Ljk3NDZWMjMuMDYyNkM4LjI3MzQ0IDIzLjU4MDQgOC42OTMxNiAyNC4wMDAxIDkuMjEwOTQgMjQuMDAwMUM5LjcyODcyIDI0LjAwMDEgMTAuMTQ4NCAyMy41ODA0IDEwLjE0ODQgMjMuMDYyNlYxOS45NzQ2QzEwLjE0ODQgMTkuNDU2OCA5LjcyODcyIDE5LjAzNzEgOS4yMTA5NCAxOS4wMzcxWiIgZmlsbD0iIzFFMjUzOCIvPg0KPHBhdGggZD0iTTExLjA4NTkgMTUuMjgxMkgxMC4xNDg0VjAuOTM3NUMxMC4xNDg0IDAuNDE5NzE5IDkuNzI4NzIgMCA5LjIxMDk0IDBDOC42OTMxNiAwIDguMjczNDQgMC40MTk3MTkgOC4yNzM0NCAwLjkzNzVWMTUuMjgxMkg3LjMzNTk0QzYuODE4MTYgMTUuMjgxMiA2LjM5ODQ0IDE1LjcwMSA2LjM5ODQ0IDE2LjIxODhDNi4zOTg0NCAxNi43MzY1IDYuODE4MTYgMTcuMTU2MiA3LjMzNTk0IDE3LjE1NjJIMTEuMDg1OUMxMS42MDM3IDE3LjE1NjIgMTIuMDIzNCAxNi43MzY1IDEyLjAyMzQgMTYuMjE4OEMxMi4wMjM0IDE1LjcwMSAxMS42MDM3IDE1LjI4MTIgMTEuMDg1OSAxNS4yODEyWiIgZmlsbD0iIzFFMjUzOCIvPg0KPHBhdGggZD0iTTIuODM1OTQgNi43NTU4NkMyLjMxODE2IDYuNzU1ODYgMS44OTg0NCA3LjE3NTU4IDEuODk4NDQgNy42OTMzNlYyMy4wNjI2QzEuODk4NDQgMjMuNTgwNCAyLjMxODE2IDI0LjAwMDEgMi44MzU5NCAyNC4wMDAxQzMuMzUzNzIgMjQuMDAwMSAzLjc3MzQ0IDIzLjU4MDQgMy43NzM0NCAyMy4wNjI2VjcuNjkzMzZDMy43NzM0NCA3LjE3NTU4IDMuMzUzNzIgNi43NTU4NiAyLjgzNTk0IDYuNzU1ODZaIiBmaWxsPSIjMUUyNTM4Ii8+DQo8cGF0aCBkPSJNNC43MTA5NCAzLjAxMTQ0SDMuNzczNDRWMC45Mzc1QzMuNzczNDQgMC40MTk3MTkgMy4zNTM3MiAwIDIuODM1OTQgMEMyLjMxODE2IDAgMS44OTg0NCAwLjQxOTcxOSAxLjg5ODQ0IDAuOTM3NVYzLjAxMTQ0SDAuOTYwOTM4QzAuNDQzMTU2IDMuMDExNDQgMC4wMjM0Mzc1IDMuNDMxMTYgMC4wMjM0Mzc1IDMuOTQ4OTRDMC4wMjM0Mzc1IDQuNDY2NzIgMC40NDMxNTYgNC44ODY0NCAwLjk2MDkzOCA0Ljg4NjQ0SDQuNzEwOTRDNS4yMjg3MiA0Ljg4NjQ0IDUuNjQ4NDQgNC40NjY3MiA1LjY0ODQ0IDMuOTQ4OTRDNS42NDg0NCAzLjQzMTE2IDUuMjI4NzIgMy4wMTE0NCA0LjcxMDk0IDMuMDExNDRaIiBmaWxsPSIjMUUyNTM4Ii8+DQo8cGF0aCBkPSJNMjEuMTY0MSA4LjAyMzQ0QzIwLjY0NjMgOC4wMjM0NCAyMC4yMjY2IDguNDQzMTYgMjAuMjI2NiA4Ljk2MDk0VjIzLjA2MjRDMjAuMjI2NiAyMy41ODAyIDIwLjY0NjMgMjMuOTk5OSAyMS4xNjQxIDIzLjk5OTlDMjEuNjgxOCAyMy45OTk5IDIyLjEwMTYgMjMuNTgwMiAyMi4xMDE2IDIzLjA2MjRWOC45NjA5NEMyMi4xMDE2IDguNDQzMTYgMjEuNjgxOCA4LjAyMzQ0IDIxLjE2NDEgOC4wMjM0NFoiIGZpbGw9IiMxRTI1MzgiLz4NCjxwYXRoIGQ9Ik0yMy4wMzkxIDQuMjcxMzRIMjIuMTAxNlYwLjkzNzVDMjIuMTAxNiAwLjQxOTcxOSAyMS42ODE4IDAgMjEuMTY0MSAwQzIwLjY0NjMgMCAyMC4yMjY2IDAuNDE5NzE5IDIwLjIyNjYgMC45Mzc1VjQuMjcxMzRIMTkuMjg5MUMxOC43NzEzIDQuMjcxMzQgMTguMzUxNiA0LjY5MTA2IDE4LjM1MTYgNS4yMDg4NEMxOC4zNTE2IDUuNzI2NjIgMTguNzcxMyA2LjE0NjM0IDE5LjI4OTEgNi4xNDYzNEgyMy4wMzkxQzIzLjU1NjggNi4xNDYzNCAyMy45NzY2IDUuNzI2NjIgMjMuOTc2NiA1LjIwODg0QzIzLjk3NjYgNC42OTEwNiAyMy41NTY4IDQuMjcxMzQgMjMuMDM5MSA0LjI3MTM0WiIgZmlsbD0iIzFFMjUzOCIvPg0KPHBhdGggZD0iTTE1LjA3MDMgMTQuOTEyMUMxNC41NTI1IDE0LjkxMjEgMTQuMTMyOCAxNS4zMzE4IDE0LjEzMjggMTUuODQ5NlYyMy4wNjI2QzE0LjEzMjggMjMuNTgwNCAxNC41NTI1IDI0LjAwMDEgMTUuMDcwMyAyNC4wMDAxQzE1LjU4ODEgMjQuMDAwMSAxNi4wMDc4IDIzLjU4MDQgMTYuMDA3OCAyMy4wNjI2VjE1Ljg0OTZDMTYuMDA3OCAxNS4zMzE4IDE1LjU4ODEgMTQuOTEyMSAxNS4wNzAzIDE0LjkxMjFaIiBmaWxsPSIjMUUyNTM4Ii8+DQo8cGF0aCBkPSJNMTYuOTQ1MyAxMS4xNjc3SDE2LjAwNzhWMC45Mzc1QzE2LjAwNzggMC40MTk3MTkgMTUuNTg4MSAwIDE1LjA3MDMgMEMxNC41NTI1IDAgMTQuMTMyOCAwLjQxOTcxOSAxNC4xMzI4IDAuOTM3NVYxMS4xNjc3SDEzLjE5NTNDMTIuNjc3NSAxMS4xNjc3IDEyLjI1NzggMTEuNTg3NCAxMi4yNTc4IDEyLjEwNTJDMTIuMjU3OCAxMi42MjMgMTIuNjc3NSAxMy4wNDI3IDEzLjE5NTMgMTMuMDQyN0gxNi45NDUzQzE3LjQ2MzEgMTMuMDQyNyAxNy44ODI4IDEyLjYyMyAxNy44ODI4IDEyLjEwNTJDMTcuODgyOCAxMS41ODc0IDE3LjQ2MzEgMTEuMTY3NyAxNi45NDUzIDExLjE2NzdaIiBmaWxsPSIjMUUyNTM4Ii8+DQo8L2c+DQo8ZGVmcz4NCjxjbGlwUGF0aCBpZD0iY2xpcDBfMV8xOTE3Ij4NCjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0id2hpdGUiLz4NCjwvY2xpcFBhdGg+DQo8L2RlZnM+DQo8L3N2Zz4NCg==`" alt="filter" />
          </button>
          <button className="modal-search" @click="searchMovie">
            <img :src="`data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xMS4xMDg3IDExLjEwODdMMTYgMTZNMTIuNzM5MSA2Ljg2OTU3QzEyLjczOTEgMTAuMTExMiAxMC4xMTEyIDEyLjczOTEgNi44Njk1NyAxMi43MzkxQzMuNjI3ODkgMTIuNzM5MSAxIDEwLjExMTIgMSA2Ljg2OTU3QzEgMy42Mjc4OSAzLjYyNzg5IDEgNi44Njk1NyAxQzEwLjExMTIgMSAxMi43MzkxIDMuNjI3ODkgMTIuNzM5MSA2Ljg2OTU3WiIgc3Ryb2tlPSIjMzY1N0NCIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+DQo8L3N2Zz4NCg==`" alt="search" />
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
    filterAction(){
      this.searchResults = [];
      this.searchInput = "";
      this.$router.replace('/search');
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
