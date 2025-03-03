<template>
  <div class="container_reg">
    <div class="form_reg">
      <div class="title_form">
        <h1 class="Title_Reg">Зарегистрироваться</h1>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="container_input_form">
          <div class="form-group">
            <input
              type="text"
              v-model="name"
              @input="validateField('name')"
              class="form-control"
              id="name"
              placeholder="Имя"
            />
            <p class="error_text_pass" v-if="errors.name">{{ errors.name }}</p>
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="surname"
              @input="validateField('surname')"
              class="form-control"
              id="surname"
              placeholder="Фамилия"
            />
            <p class="error_text_pass" v-if="errors.surname">{{ errors.surname }}</p>
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="login"
              @input="validateField('login')"
              class="form-control"
              id="login"
              placeholder="Придумайте логин"
            />
            <p class="error_text_pass" v-if="errors.login">{{ errors.login }}</p>
          </div>
          <div class="form-group">
            <input
              type="password"
              v-model="password"
              @input="validateField('password')"
              class="form-control"
              id="password"
              placeholder="Придумайте пароль"
            />
            <p class="error_text_pass" v-if="errors.password">{{ errors.password }}</p>
          </div>
          <div class="form-group">
            <input
              type="password"
              v-model="passwordCheck"
              @input="validateField('passwordCheck')"
              class="form-control"
              id="password_check"
              placeholder="Повторите пароль"
            />
            <p class="error_text_pass" v-if="errors.passwordCheck">{{ errors.passwordCheck }}</p>
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="email"
              @input="validateField('email')"
              class="form-control"
              id="email"
              placeholder="Номер телефона или e-mail"
            />
            <p class="error_text_pass" v-if="errors.email">{{ errors.email }}</p>
          </div>
          <div class="agreement_policy">
            <input
              type="checkbox"
              v-model="agreementPolicy"
              id="agreement_policy"
              name="agreement_policy"
              value="agree"
            />
            <label style="color: #ffffff" for="agreement_policy"
              >Соглашаюсь на условия <a href="#" style="color: #f2f60f">Политики конфиденциальности</a></label
            >
          </div>
          <div class="data_processing">
            <input
              type="checkbox"
              v-model="dataProcessing"
              id="data_processing"
              name="data_processing"
              value="agree"
            />
            <label style="color: #ffffff" for="data_processing"
              >Соглашаюсь на обработку персональных данных</label
            >
          </div>
          <button type="submit" class="post_button_reg" :disabled="!isFormValid">Зарегистрироваться</button>
          <span class="have-account"
            >У вас уже есть аккаунт? <router-link class="link-to" to="/login">Войти</router-link></span
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const name = ref('');
const surname = ref('');
const login = ref('');
const password = ref('');
const passwordCheck = ref('');
const email = ref('');
const agreementPolicy = ref(false);
const dataProcessing = ref(false);
const errors = reactive({
  name: '',
  surname: '',
  login: '',
  password: '',
  passwordCheck: '',
  email: '',
});

document.title = "Регистрация";

// Валидация конкретного поля
const validateField = (field) => {
  errors[field] = '';
  if (field === 'name' && !name.value.trim()) {
    errors.name = 'Имя обязательно';
  } else if (field === 'name' && name.value.trim().length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа';
  }

  if (field === 'surname' && !surname.value.trim()) {
    errors.surname = 'Фамилия обязательна';
  } else if (field === 'surname' && surname.value.trim().length < 2) {
    errors.surname = 'Фамилия должна содержать минимум 2 символа';
  }

  if (field === 'login' && !login.value.trim()) {
    errors.login = 'Логин обязателен';
  } else if (field === 'login' && login.value.trim().length < 4) {
    errors.login = 'Логин должен содержать минимум 4 символа';
  }

  if (field === 'password' && !password.value.trim()) {
    errors.password = 'Пароль обязателен';
  } else if (field === 'password' && password.value.trim().length < 6) {
    errors.password = 'Пароль должен содержать минимум 6 символов';
  }

  if (field === 'passwordCheck' && !passwordCheck.value.trim()) {
    errors.passwordCheck = 'Повторите пароль';
  } else if (field === 'passwordCheck' && password.value !== passwordCheck.value) {
    errors.passwordCheck = 'Пароли не совпадают';
  }

  if (field === 'email' && !email.value.trim()) {
    errors.email = 'Email обязателен';
  } else if (field === 'email' && !/\S+@\S+\.\S+/.test(email.value)) {
    errors.email = 'Некорректный email';
  }
};

// Общая валидация формы
const validate = () => {
  validateField('name');
  validateField('surname');
  validateField('login');
  validateField('password');
  validateField('passwordCheck');
  validateField('email');
};

// Проверка, что форма валидна
const isFormValid = computed(() => {
  return (
    agreementPolicy.value &&
    dataProcessing.value &&
    Object.values(errors).every((error) => !error)
  );
});

// Отправка формы
const onSubmit = async () => {
  validate();
  if (Object.values(errors).some((error) => error)) {
    return;
  }
  const userData = {
    name: name.value,
    surname: surname.value,
    login: login.value,
    password: password.value,
    email: email.value,
  };
  try {
    const registerResponse = await axios.post('http://91.197.96.204:3000/register', userData);
    if (registerResponse.status === 201) {
      const loginResponse = await axios.post('http://91.197.96.204:3000/login', {
        login: login.value,
        password: password.value,
      });
      if (loginResponse.status === 200) {
        localStorage.setItem('currentUser', JSON.stringify(loginResponse.data));
        router.push('/profile');
        setTimeout(() => {
          window.location.reload();
        }, 100);
    
      }
    }
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    alert('Ошибка при регистрации: ' + (error.response?.data.error || 'Попробуйте позже.'));
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
.container_reg {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 30px;
}
.form_reg {
  border-radius: 5px;
  border-radius: 10px;
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
}
.error_text_pass {
  color: red;
  font-family: sans-serif;
}
.Title_Reg {
  font-family: "Inter", serif;
  font-weight: 600;
  font-style: normal;
  font-size: 40px;
  text-align: center;
  color: #ffffff;
  line-height: 50.2px;
  letter-spacing: 0%;
}
.post_button_reg {
  width: 422px;
  height: 55px;
  top: 743px;
  left: 196px;
  border-radius: 10px;
  background: #f2f60f;
  font-family: "Inter" sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 28.31px;
  letter-spacing: 0%;
  text-align: center;
}
.form-control {
  width: 422px;
  height: 67px;
  top: 184px;
  left: 196px;
  border-radius: 10px;
  background: #191e2e;
  color: #ffffff;
  padding-left: 18px;
  font-size: 17px;
  line-height: 28.31px;
  font-weight: 400;
  font-family: "Inter", sans-serif;
  border: none;
  outline: none;
}
.container_input_form {
  display: grid;
  gap: 15px;
}

.title_form {
  margin-bottom: 35px;
}
.data_processing {
  font-size: 14px;
  color: #ffffff;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 200;
  letter-spacing: 0;
  display: flex;
  align-items: center;
}
.data_processing input {
  margin-right: 10px;
}
input[type="checkbox"] {
  accent-color: #f2f60f;
}
.agreement_policy {
  font-size: 14px;
  color: #ffffff;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 200;
  letter-spacing: 0;
  display: flex;
  align-items: center;
}
.agreement_policy input {
  margin-right: 10px;
}

.have-account {
  width: 100%;
  display: flex;
  justify-content: center;
  color: white;

  a {
    color: #f2f60f;
    margin-left: 10px;
  }
}
</style>
