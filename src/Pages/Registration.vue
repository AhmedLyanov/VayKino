<template>
    <div class="container_reg">
        <div class="form_reg">
            <div class="title_form">
                <h1 class="Title_Reg">Зарегистрироваться</h1>
            </div>
            <form @submit.prevent="onSubmit">
                <div class="container_input_form">
                    <div class="form-group">
                        <input type="text" v-model="name" class="form-control" id="name" placeholder="Имя">
                        <p class="error_text_pass" v-if="errors.name">{{ errors.name }}</p>
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="surname" class="form-control" id="surname" placeholder="Фамилия">
                        <p class="error_text_pass" v-if="errors.surname">{{ errors.surname }}</p>
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="login" class="form-control" id="login" placeholder="Придумайте логин">
                        <p class="error_text_pass" v-if="errors.login">{{ errors.login }}</p>
                    </div>
                    <div class="form-group">
                        <input type="password" v-model="password" class="form-control" id="password" placeholder="Придумайте пароль">
                        <p class="error_text_pass" v-if="errors.password">{{ errors.password }}</p>
                    </div>
                    <div class="form-group">
                        <input type="password" v-model="passwordCheck" class="form-control" id="password_check" placeholder="Повторите пароль">
                        <p class="error_text_pass" v-if="errors.passwordCheck">{{ errors.passwordCheck }}</p>
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="email" class="form-control" id="email" placeholder="Номер телефона или e-mail">
                        <p class="error_text_pass" v-if="errors.email">{{ errors.email }}</p>
                    </div>
                    <div class="agreement_policy">
                        <input type="checkbox" v-model="agreementPolicy" id="agreement_policy" name="agreement_policy" value="agree" >
                        <label style="color: #ffffff;" for="agreement_policy">Соглашаюсь на условия <a href="#" style="color: #F2F60F;">Политики конфиденциальности</a></label>
                    </div>
                    <div class="data_processing">
                        <input type="checkbox" v-model="dataProcessing" id="data_processing" name="data_processing" value="agree" >
                        <label style="color: #ffffff;" for="data_processing">Соглашаюсь на обработку персональных данных</label>
                    </div>
                    <button type="submit" class="post_button_reg" :disabled="!isFormValid">Зарегистрироваться</button>
                    <span class="have-account">У вас уже есть аккаунт? <router-link class="link-to" to="/login">Войти</router-link></span>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';

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
    email: ''
});

const validate = () => {

    Object.keys(errors).forEach(key => {
        errors[key] = '';
    });

    if (!name.value.trim()) {
        errors.name = 'Имя обязательно';
    }
    if (!surname.value.trim()) {
        errors.surname = 'Фамилия обязательна';
    }
    if (!login.value.trim()) {
        errors.login = 'Логин обязателен';
    }
    if (password.value.trim().length < 6) {
        errors.password = 'Пароль должен быть не менее 6 символов';
    }
    if (password.value !== passwordCheck.value) {
        errors.passwordCheck = 'Пароли не совпадают';
    }
    if (!email.value.trim()) {
        errors.email = 'Email обязателен';
    }
};



const isFormValid = computed(() => {
    return agreementPolicy.value && dataProcessing.value;
});

const onSubmit = () => {
    validate();
    if (Object.values(errors).some(error => error)) {
        return; 
    }
    const userData = {
        name: name.value,
        surname: surname.value,
        login: login.value,
        password: password.value,
        email: email.value
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
};
</script>


<style scoped> 
@import url('https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');@import url('https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'); 
.container_reg{ 
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
.error_text_pass{ 
    color: red; 
    font-family: sans-serif; 
} 
.Title_Reg{ 
    font-family: "Inter", serif; 
    font-weight: 600; 
    font-style: normal; 
    font-size: 40px; 
    text-align: center; 
    color: #ffffff; 
    line-height: 50.2px; 
    letter-spacing: 0%; 
} 
.post_button_reg{ 
    width: 422px; 
    height: 55px; 
    top: 743px; 
    left: 196px; 
    border-radius: 10px; 
    background: #F2F60F; 
    font-family: "Inter" sans-serif; 
    font-weight: 600; 
    font-size: 17px; 
    line-height: 28.31px; 
    letter-spacing: 0%; 
    text-align: center; 
} 
.form-control{ 
    width: 422px; 
    height: 67px; 
    top: 184px; 
    left: 196px; 
    border-radius: 10px; 
    background: #191E2E; 
    color: #ffffff; 
    padding-left: 18px ; 
    font-size: 17px; 
    line-height: 28.31px; 
    font-weight: 400; 
    font-family: "Inter", sans-serif; 
    border: none;
    outline: none; 
} 
.container_input_form{ 
    display: grid;
    gap: 15px; 
}

.title_form{ 
    margin-bottom: 35px; 
} 
.data_processing{ 
    font-size: 14px; 
    color: #ffffff; 
    font-family: "Inter", sans-serif; 
    font-style: normal; 
    font-weight: 200; 
    letter-spacing: 0; 
    display: flex; 
    align-items: center; 
} 
.data_processing input{ 
    margin-right: 10px; 
} 
input[type="checkbox"] { 
    accent-color: #F2F60F ; 
} 
.agreement_policy{ 
    font-size: 14px; 
    color: #ffffff; 
    font-family: "Inter", sans-serif; 
    font-style: normal; 
    font-weight: 200; 
    letter-spacing: 0; 
    display: flex; 
    align-items: center; 
} 
.agreement_policy input{ 
    margin-right: 10px; 
} 

.have-account{
    width: 100%;
    display: flex;
    justify-content: center;
    color: white;

    a{
        color: #F2F60F;
        margin-left: 10px;
    }
}
</style> 



