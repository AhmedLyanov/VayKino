<template>
  <div class="container_profile_box">
    <div class="main_container_box" v-if="!isEditing">
      <div class="profile_settings_top_container">
        <div class="title_top_box">
          <span>
            <article>
              <h1>Ваш профиль</h1>
            </article>
          </span>
        </div>
        <div class="profile_settings_button_container">
          <div class="button_settings" @click="toggleEdit">
            <div class="logo_settings">
              <img src="../assets/Media/profile/settings 1.svg" alt="Logo profile" />
            </div>
            <span>Настройки</span>
          </div>
        </div>
      </div>
      <div class="profile_user_main_box">
        <div class="user_avatar_box">
          <img :src="avatarSrc" width="100%" />
        </div>
        <div class="user_information_container">
          <div class="name_user">
            <span>
              <h1>{{ userProfile.name }} {{ userProfile.surname }}</h1>
            </span>
          </div>
          <div class="description_box_user">
            <span>
              <p>{{ userProfile.description }}</p>
            </span>
          </div>
          <div class="parameters_user_box">
            <div class="parameter_user">
              <div class="title_parameter">
                <span>Пол:</span>
              </div>
              <div class="value_parameter">
                <span>{{ userProfile.gender || "Не определено" }}</span>
              </div>
            </div>
            <div class="parameter_user">
              <div class="title_parameter">
                <span>День рождения:</span>
              </div>
              <div class="value_parameter">
                <span>{{ userProfile.birthdate || "Не определено" }}</span>
              </div>
            </div>
            <div class="parameter_user">
              <div class="title_parameter">
                <span>Страна:</span>
              </div>
              <div class="value_parameter">
                <span>{{ userProfile.country || "Не определено" }}</span>
              </div>
            </div>
            <div class="parameter_user">
              <div class="title_parameter">
                <span>Город:</span>
              </div>
              <div class="value_parameter">
                <span>{{ userProfile.city || "Не определено" }}</span>
              </div>
            </div>
            <div class="parameter_user">
              <div class="title_parameter">
                <span>Любимые жанры:</span>
              </div>
              <div class="value_parameter">
                <span>{{ userProfile.genre || "Не определено" }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="profile-edit-container" v-if="isEditing">
      <div class="profile-edit-main">
        <div class="profile-edit-header">
          <div class="profile-edit-title">
            <span>
              <article>
                <h1>Настройки профиля</h1>
              </article>
            </span>
          </div>
          <div class="profile-edit-save-container">
            <div class="profile-edit-save-button" @click="saveProfile">
              <div class="profile-edit-save-icon">
                <img src="../assets/Media/profile/succesfull.svg" alt="Logo profile" />
              </div>
              <span>Сохранить</span>
            </div>
          </div>
        </div>
        <div class="profile-edit-content">
          <div class="profile-avatar-container">
            <img :src="avatarSrc" width="100%" />
            <input type="file" @change="handleFileUpload" accept="image/*" style="display: none;" ref="fileInput" />
            <button @click="triggerFileInput" class="upload-avatar-button">Загрузить аватар</button>
          </div>
          <div class="profile-edit-form">
            <div class="profile-edit-fields">
              <div class="profile-edit-field">
                <div class="profile-edit-input">
                  <input type="text" v-model="userProfile.name" placeholder="Имя" />
                </div>
              </div>
              <div class="profile-edit-field">
                <div class="profile-edit-input">
                  <input type="text" v-model="userProfile.surname" placeholder="Фамилия" />
                </div>
              </div>
              <select name="gender" class="gender_select" v-model="userProfile.gender">
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
                <option value="Средний">Средний</option>
              </select>
              <select name="country" class="country_select" v-model="userProfile.country">
                <option value="Россия">Россия</option>
                <option value="Америка">Америка</option>
                <option value="Азия">Азия</option>
                <option value="Африка">Африка</option>
                <option value="Европа">Европа</option>
                <option value="Австралия">Австралия</option>
              </select>
              <div class="profile-edit-field">
                <div class="profile-edit-input">
                  <input type="text" v-model="userProfile.city" placeholder="Город" />
                </div>
              </div>
              <div class="profile-edit-field">
                <div class="profile-edit-input">
                  <input type="date" v-model="userProfile.birthdate" placeholder="2000.00.00" />
                </div>
              </div>
              <div class="genre_container">
                <select name="genre" class="genre_select" v-model="userProfile.genre">
                  <option value="Экшен">Экшен</option>
                  <option value="Фэнтези">Фэнтези</option>
                  <option value="Боевик">Боевик</option>
                  <option value="Для детей">Для детей</option>
                  <option value="Комедия">Комедия</option>
                  <option value="Мистика">Мистика</option>
                  <option value="Триллер">Триллер</option>
                  <option value="Документальное">Документальное</option>
                  <option value="Биография">Биография</option>
                  <option value="Драма">Драма</option>
                  <option value="Семейное">Семейное</option>
                  <option value="Сказка">Сказка</option>
                  <option value="Ужасы">Ужасы</option>
                  <option value="Криминал">Криминал</option>
                  <option value="Аниме">Аниме</option>
                </select>
              </div>
            </div>
            <div class="profile_set_info">
              <div class="profile-set-info-text">
                <textarea v-model="userProfile.description" placeholder="Информация о себе"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showNotification" class="notification">
      <span><img src="../assets/Media/profile/succesfull.svg" alt="Logo profile" />Сохранено</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import defaultAvatar from '../assets/Media/profile/default.png';

const userProfile = ref({
  name: '',
  surname: '',
  gender: '',
  country: '',
  city: '',
  birthdate: '',
  genre: '',
  description: '',
  avatarUrl: '',
});
const isEditing = ref(false);
const showNotification = ref(false);
const avatarUrl = ref('');
const fileInput = ref(null);
const avatarSrc = computed(() => {
  return avatarUrl.value || defaultAvatar;
});
const toast = useToast();

const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Токен отсутствует');
    return;
  }
  try {
    const response = await axios.get('https://dreamfood.space:3000/user/me', {
      headers: {
        'Authorization': token,
      },
    });
    if (response.data) {
      userProfile.value = response.data;
      avatarUrl.value = response.data.avatarUrl;
    }
  } catch (error) {
    if (error.response?.status === 401) {
      await refreshToken();
      await fetchUserProfile();
    } else {
      console.error('Ошибка при получении данных пользователя:', error);
    }
  }
};
const saveProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Токен отсутствует');
    return;
  }
  try {
    const response = await axios.put('https://dreamfood.space:3000/user/me', userProfile.value, {
      headers: {
        'Authorization': token,
      },
    });
    if (response.data) {
      isEditing.value = false;
      showNotification.value = true;
      setTimeout(() => {
        showNotification.value = false;
      }, 3000);
      await fetchUserProfile();
    }
  } catch (error) {
    if (error.response?.status === 401) {
      await refreshToken();
      await saveProfile();
    } else {
      console.error('Ошибка при сохранении данных пользователя:', error);
    }
  }
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    logout();
    return;
  }
  try {
    const response = await axios.post('https://dreamfood.space:3000/refresh-token', { refreshToken });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    } else {
      logout();
    }
  } catch (error) {
    console.error('Ошибка при обновлении токена:', error);
    logout();
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('currentUser');
  window.location.href = '/login';
};

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append('avatar', file);
  try {
    const response = await axios.post('https://dreamfood.space:3000/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    avatarUrl.value = response.data.url;
    userProfile.value.avatarUrl = response.data.url;
  } catch (error) {
    console.error('Ошибка при загрузке аватара:', error);
  }
};

onMounted(() => {
  fetchUserProfile();
});
</script>
<style scoped>
.container_profile_box {
  width: 1427px;
  height: 771px;
  border: 1px;
  background: #191e2e;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
}

.main_container_box,
.profile-edit-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.title_parameter {
  font-weight: 600;
  font-size: 18px;
  line-height: 22.01px;
  color: #ffffff;
}

.parameters_user_box {
  display: grid;
  gap: 25px;
}

.parameter_user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.value_parameter {
  font-weight: 400;
  font-size: 18px;
  line-height: 22.01px;
  color: #f2f60f;
}

.profile_settings_top_container {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 17px;
}

.profile_user_main_box {
  width: 1132px;
  height: 477px;
  display: flex;
}

.title_top_box span article h1 {
  color: #ffffff;
}

.user_information_container {
  width: 610px;
  height: 398px;
  padding: 40px;
}

.description_box_user {
  font-weight: 100;
  font-size: 17px;
  line-height: 20.23px;
  color: #ffffff;
  margin-bottom: 30px;
}

.logo_settings {
  display: grid;
}

.notification {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%) translateY(20px);
  background-color: #4CAF50;
  color: white;
  padding: 15px;
  width: 350px;
  border-radius: 5px;
  animation: fadeInOut 3s ease-in-out;
  text-align: center;
  z-index: 1000;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
}

.button_settings span {
  font-weight: 500;
  font-size: 14px;
  line-height: 16.9px;
  color: #ffffff;
}

.name_user span h1 {
  color: #ffffff;
  font-weight: 900;
  font-size: 50px;
}

.button_settings {
  display: flex;
  align-items: center;
  gap: 5px;
}

.profile_settings_button_container {
  width: 147px;
  height: 51px;
  display: grid;
  align-items: center;
  justify-items: center;
  border-radius: 10px;
  background-color: #1e2538;
}

.user_avatar_box {
  width: 477px;
  height: 477px;
}

.profile-edit-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.profile-edit-title {
  font-weight: 600;
  font-size: 18px;
  line-height: 22.01px;
  color: #ffffff;
}

.profile-edit-fields {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  width: 545px;
}

.profile-edit-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.profile-edit-input {
  font-weight: 400;
  font-size: 18px;
  line-height: 22.01px;
  width: 260px;
  background: #1e2538;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
  border-radius: 10px;
}

.profile-set-info-text textarea {
  max-width: 545px;
  max-height: 350px;
  min-width: 545px;
  background: #1E2538;
  padding: 20px;
  font-family: Qanelas;
  font-weight: 400;
  font-size: 17px;
  line-height: 28.31px;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  min-height: 70px;
}

.profile-edit-input input {
  width: 100%;
  height: 100%;
  color: #ffffff;
  font-size: 17px;
  border-radius: 10px;
  background: #1e2538;
  padding: 15px;
  border: none;
}

.profile-edit-form {
  display: grid;
  gap: 35px;
}

.profile-set-info-text input {
  font-weight: 400;
  font-size: 18px;
  line-height: 22.01px;
  width: 100%;
  background: #1e2538;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
  padding: 15px;
  border: none;
  color: #ffffff;
  border-radius: 10px;
}

.gender_select,
.country_select,
.genre_select {
  font-weight: 400;
  font-size: 18px;
  line-height: 22.01px;
  width: 260px;
  background: #1e2538;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
  padding: 15px;
  border: none;
  color: #ffffff;
  border-radius: 10px;
}

.genre_container {
  width: 100%;
}

.profile-edit-header {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 17px;
}

.profile-edit-content {
  width: 1132px;
  height: 477px;
  display: flex;
  justify-content: space-between;
}

.profile-edit-header h1 {
  color: #ffffff;
}

.profile-edit-save-icon {
  display: grid;
}

.profile-edit-save-button span {
  font-weight: 500;
  font-size: 14px;
  line-height: 16.9px;
  color: #ffffff;
}

.profile-edit-save-button {
  display: flex;
  align-items: center;
  gap: 5px;
}

.profile-edit-save-container {
  width: 147px;
  height: 51px;
  display: grid;
  align-items: center;
  justify-items: center;
  border-radius: 10px;
  background-color: #1e2538;
}

.profile-avatar-container {
  width: 477px;
  height: 477px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.upload-avatar-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #1e2538;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.upload-avatar-button:hover {
  background-color: #2a3348;
}
</style>