<template>
  <div class="container_profile_box">
    <div class="main_container_box">
      <div class="profile_settings_top_container">
        <div class="title_top_box">
          <span>
            <article>
              <h1>Ваш профиль</h1>
            </article>
          </span>
        </div>
        <div class="profile_settings_button_container">
          <div class="button_settings">
            <div class="logo_settings">
              <img
                src="../assets/Media/profile/settings 1.svg"
                alt="Logo profile"
              />
            </div>
            <span>Настройки</span>
          </div>
        </div>
      </div>
      <div class="profile_user_main_box">
        <div class="user_avatar_box">
          <img src="../assets/Media/profile/blank.png" width="100%" />
        </div>
        <div class="user_information_container">
          <div class="name_user">
            <span>
              <h1>Евгений Батиков</h1>
            </span>
          </div>
          <div class="description_box_user">
            <span>
              <p>
                Учитывая ключевые сценарии поведения, базовый вектор развития, а
                также свежий взгляд на привычные вещи - безусловно открывает
                новые горизонты для поставленных обществом задач.
              </p>
            </span>
          </div>
          <div class="parameters_user_box">
            <div class="parameter_user">
                <div class="title_parameter">
                    <span>Пол:</span>
                </div>
                <div class="value_parameter">
                    <span>Мужской</span>
                </div>
            </div>
            <div class="parameter_user">
                <div class="title_parameter">
                    <span>День рождения:</span>
                </div>
                <div class="value_parameter">
                    <span>1992.02.19</span>
                </div>
            </div>
            <div class="parameter_user">
                <div class="title_parameter">
                    <span>Страна:</span>
                </div>
                <div class="value_parameter">
                    <span>Россия</span>
                </div>
            </div>
            <div class="parameter_user">
                <div class="title_parameter">
                    <span>Город:</span>
                </div>
                <div class="value_parameter">
                    <span>Москва</span>
                </div>
            </div>
            <div class="parameter_user">
                <div class="title_parameter">
                    <span>Любимые жанры:</span>
                </div>
                <div class="value_parameter">
                    <span>Экшен</span>
                </div>
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
.container_profile_box {
  width: 1427px;
  height: 771px;
  border: 1px;
  background: #191e2e;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
}

.main_container_box {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.title_parameter{
    font-weight: 600;
    font-size: 18px;
    line-height: 22.01px;
    color: #ffffff;
    letter-spacing: 0%;

}
.parameters_user_box{
    display: grid;
    gap: 25px;
}
.parameter_user{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}
.value_parameter{
    font-weight: 400;
    font-size: 18px;
    line-height: 22.01px;
    color: #f2f60f;;
    letter-spacing: 0%;

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
  border-width: 1px;
}
.title_top_box span article h1 {
  color: #ffffff;
}
.user_information_container {
  width: 610px;
  height: 398px;
  padding: 40px;
}
.description_box_user{
    font-weight: 100;
    font-size: 17px;
    line-height: 20.23px;
    letter-spacing: 0%;
    color: #ffffff;
    margin-bottom: 30px;
}
.logo_settings {
  display: grid;
}
.button_settings span {
  font-weight: 500;
  font-size: 14px;
  line-height: 16.9px;
  letter-spacing: 0%;
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
</style>
