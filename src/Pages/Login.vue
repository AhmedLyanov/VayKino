<template>
  <div class="container_reg">
    <div class="form_log">
      <div class="title_form">
        <h1 class="Title_Login">Войти</h1>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="container_input_form">
          <div class="form-group">
            <input type="text" v-model="login" class="form-control" id="login_text" placeholder="Логин, почта или телефон" />
            <span v-if="error && error.includes('login')" class="error-message">{{ error }}</span>
          </div>
          <div class="form-group">
            <input type="password" v-model="password" class="form-control" id="your_Pass" placeholder="Ваш пароль" />
          </div>
        </div>
        <div class="button_log">
          <button type="submit" class="get_button_login">Войти</button>
          <button type="button" class="get_button_reg" @click="router.push('/registration')">
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div class="help_user_container">
        <div class="forgot_pass">
          <a href="#" class="forgot_pass_link">Восстановить пароль</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const login = ref('');
const password = ref('');
const error = ref('');

document.title = "Вход"

const onSubmit = async () => {
  try {
    const response = await fetch('http://91.197.96.204:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login: login.value, password: password.value }),
    });
    
    if (response.ok) {
      const userData = await response.json();
      localStorage.setItem('currentUser', JSON.stringify(userData)); 
      router.push('/profile');
      setTimeout(() => {
        window.location.reload(); 
      }, 100);
     
     
    } else {
      const errorData = await response.json();
      error.value = errorData.error || 'Неверный логин или пароль';
      alert(error.value);
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Ошибка сети. Попробуйте позже.');
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
    margin-top: 100px;
    margin-bottom: 70px;
}

.form_log {
    width: 815px;
    height: 562px;
    border-radius: 5px;
    border-radius: 10px;
    display: grid;
    align-items: center;
    align-content: center;
    justify-items: center;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.Title_Login {
    font-family: "Inter", serif;
    font-weight: 600;
    font-style: normal;
    font-size: 40px;
    text-align: center;
    color: #ffffff;
    line-height: 50.2px;
    letter-spacing: 0%;
}

.get_button_login {
    width: 422px;
    height: 55px;
    top: 743px;
    left: 196px;
    border-radius: 10px;
    background: #f2f60f;
    font-family: sans-serif;
    font-weight: 600;
    font-size: 17px;
    line-height: 28.31px;
    letter-spacing: 0%;
    text-align: center;
    border: 0;
    user-select: none;
    cursor: pointer;
}

.forgot_pass a {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 16px;
    line-height: 24px;
    color: #3657cb;
    letter-spacing: 0%;
    text-align: center;
}
.help_user_container{
    display: grid;
    justify-items: center;
    gap: 20px;
    margin-top: 20px;
}

.get_button_reg {
    width: 422px;
    height: 55px;
    top: 743px;
    left: 196px;
    border-radius: 10px;
    background: #191e2e;
    color: #ffffff;
    font-family: sans-serif;
    font-weight: 200;
    font-size: 17px;
    line-height: 28.31px;
    letter-spacing: 0%;
    text-align: center;
    border: 0;
    user-select: none;
    cursor: pointer;
}

.get_button_reg a {
    color: #ffffff;
    text-decoration: none;
}

.button_log {
    display: grid;
    justify-content: space-between;
    margin-top: 25px;
    gap: 20px;
}

.social_login{
    display: flex;
    gap: 15px;
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
    border: 0;
    outline: none;
}

.container_input_form {
    display: grid;
    width: 52%;
    gap: 20px;
}

.title_form {
    margin-bottom: 35px;
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
</style>







