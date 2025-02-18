<template>
  <div class="profile-edit-container">
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
          <div class="profile-edit-save-button">
            <div class="profile-edit-save-icon">
              <img
                src="../assets/Media/profile/succesfull.svg"
                alt="Logo profile"
              />
            </div>
            <span>Сохранить</span>
          </div>
        </div>
      </div>
      <div class="profile-edit-content">
        <div class="profile-avatar-container">
          <img src="../assets/Media/profile/blank.png" width="100%" />
        </div>
        <div class="profile-edit-form">
          <div class="profile-edit-fields">
            <div class="profile-edit-field">
              <div class="profile-edit-input">
                <input type="text" placeholder="Имя" />
              </div>
            </div>
            <div class="profile-edit-field">
              <div class="profile-edit-input">
                <input type="text" placeholder="Фамилия" />
              </div>
            </div>
            <select name="gender" class="gender_select">
              <option value="">Пол</option>
              <option value="Женский">Женский</option>
              <option value="Мужской">Мужской</option>
            </select>
            <select name="country" class="country_select">
              <option value="">Страна</option>
              <option value="Россия">Россия</option>
              <option value="Америка">Америка</option>
              <option value="Азия">Азия</option>
              <option value="Аfrica">Аfrica</option>
              <option value="Европа">Европа</option>
              <option value="Аustralia">Австралия</option>
            </select>
            <div class="profile-edit-field">
              <div class="profile-edit-input">
                <input type="text" placeholder="Город" />
              </div>
            </div>
            <div class="profile-edit-field">
              <div class="profile-edit-input">
                <input type="text" placeholder="2000.00.00" />
              </div>
            </div>
            <div class="genre_container">
              <select name="genre" class="genre_select">
                <option value="Рок">Рок</option>
                <option value="Поп">Поп</option>
                <option value="Классика">Классика</option>
                <option value="Джаз">Джаз</option>
                <option value="Рэп">Рэп</option>
                <option value="хип-хоп">хип-хоп</option>
                <option value="Блюз">Блюз</option>
                <option value="Электроника">Электроника</option>
                <option value="Регги">Регги</option>
                <option value="Кантри">Кантри</option>
                <option value="Комедия">Комедия</option>
              </select>
            </div>
          </div>
          <div class="profile_set_info">
            <div class="profile-set-info-text">
              <textarea placeholder="Информация о себе" type="text" name="" id=""></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.profile-edit-container {
  width: 1427px;
  height: 771px;
  background: #191e2e;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
}
.profile-edit-main {
  width: 100%;
  height: 100%;
  padding: 20px;
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
  top: 2981px;
  border-radius: 10px;
}
.profile-set-info-text textarea{
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
  letter-spacing: 0%;

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
.profile-edit-form{
  display: grid;
  gap: 35px;
}
.profile-set-info-text input{
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
  top: 2981px;
  border: none;
  color: #ffffff;
  border-radius: 10px;
}

.gender_select {
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
  top: 2981px;
  border: none;
  color: #ffffff;
  border-radius: 10px;
}

.genre_container {
  width: 100%;
}
.genre_select {
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
  top: 2981px;
  border: none;
  color: #ffffff;
  border-radius: 10px;
}

.country_select {
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
  top: 2981px;
  border: none;
  color: #ffffff;
  border-radius: 10px;
}

.profile-edit-input input::placeholder {
  width: 100%;
  height: 100%;
  background: #1e2538;
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
}
</style>
