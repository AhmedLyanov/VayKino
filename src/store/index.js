import { createStore } from 'vuex';

const store = createStore({
  state: {
    showOverlay: false,
    blackList: [],
    lists: [
      {
          ico: `ТОП <mark>250</mark> ФИЛЬМОВ`,
          title: "ТОП 250 лучших фильмов",
          moviesCount: "250 фильмов",
          url: "top250",
      },
      {
          ico: `<mark>ПОПУЛЯРНЫЕ</mark> ФИЛЬМЫ`,
          title: "Популярные фильмы",
          moviesCount: "1000 фильмов",
          url: "popular-films",
      },
      {
          ico: `<mark>ОЖИДАЕМЫЕ</mark> ФИЛЬМЫ`,
          title: "Рейтинг ожидаемых фильмов",
          moviesCount: "486 фильмов",
          url: "planned-to-watch-films",
      },
      {
          ico: "ФИЛЬМЫ <br> <mark>XXI века</mark>",
          title: "100 великих фильмов XXI века",
          moviesCount: "101 фильм",
          url: "100_greatest_movies_XXI",
      },
      {
          ico: "ПРО <mark>ВАМПИРОВ</mark>",
          title: "Фильмы про вампиров",
          moviesCount: "30 фильмов",
          url: "theme_vampire",
      },
      {
          ico: "ПРО<br><mark>ЛЮБОВЬ</mark>",
          title: "Фильмы про любовь и страсть: список лучших романтических фильмов",
          moviesCount: "70 фильмов",
          url: "theme_love",
      },
      {
          ico: "ПРО<br><mark>ЗОМБИ</mark>",
          title: "Фильмы про зомби: список лучших фильмов про живых мертвецов",
          moviesCount: "31 фильм",
          url: "theme_zombie",
      },
      {
          ico: "ПРО<br><mark>КОСМОС</mark>",
          title: "Фильмы про космос: список лучших фильмов про космические путешествия",
          moviesCount: "49 фильмов",
          url: "theme_space",
      },
      {
          ico: "ПРО <mark>ПОДРОСТКОВ</mark>",
          title: "Фильмы про подростков",
          moviesCount: "34 фильма",
          url: "theme_teenagers",
      },
      {
          ico: "ПРО<br><mark>КАТАСТРОФЫ</mark>",
          title: "Фильмы-катастрофы",
          moviesCount: "30 фильмов",
          url: "theme_catastrophe",
      },
      {
          ico: "ПРО <mark>АКУЛ</mark>",
          title: "Фильмы про акул",
          moviesCount: "29 фильмов",
          url: "theme_shark",
      },
      {
          ico: "ПРО<br><mark>ШКОЛУ</mark>",
          title: "Фильмы про школу",
          moviesCount: "30 фильмов",
          url: "theme_school",
      },
      {
          ico: "ПРО<br><mark>ТАНЦЫ</mark>",
          title: "Фильмы про танцы",
          moviesCount: "31 фильм",
          url: "theme_dance",
      },
      {
          ico: "ПРО<br><mark>ПРОГРАММИ-СТОВ</mark>",
          title: "Фильмы и сериалы про программистов",
          moviesCount: "47 фильмов",
          url: "about_programmers",
      },
      {
          ico: "СЕМЕЙНЫЕ <mark>КОМЕДИИ</mark>",
          title: "Семейные комедии: список комедийных фильмов для всей семьи",
          moviesCount: "50 фильмов",
          url: "theme_family_comedy",
      },
      {
          ico: "ДЛЯ<br><mark>САМЫХ МАЛЕНЬКИХ</mark>",
          title: "Мультфильмы для самых маленьких",
          moviesCount: "30 фильмов",
          url: "theme_kids_animation",
      },
      {
          ico: "КОМЕДИЙНЫЕ <mark>БОЕВИКИ</mark>",
          title: "Комедийные боевики",
          moviesCount: "51 фильм",
          url: "theme_action_comdey",
      },
      {
          ico: "<mark>РОМАНТИЧЕ-СКИЕ</mark><br>КОМЕДИИ",
          title: "Романтические комедии: список лучших смешных фильмов о любви",
          moviesCount: "52 фильма",
          url: "theme_romantic_comedy",
      },
      {
          ico: "ФИЛЬМЫ<br><mark>ДЛЯ ДЕТЕЙ</mark>",
          title: "Лучшие фильмы для детей: список лучших детских фильмов",
          moviesCount: "50 фильмов",
          url: "theme_kids_films",
      },
      {
          ico: "ПО <mark>КОМИКСАМ</mark>",
          title: "Лучшие фильмы, основанные на комиксах",
          moviesCount: "100 фильмов",
          url: "theme_comics",
      },
      {
          ico: "ПРО<br><mark>АПОКА-ЛИПСИС</mark>",
          title: "Лучшие фильмы про апокалипсис: список фильмов про конец света",
          moviesCount: "50 фильмов",
          url: "theme_worlds_end",
      },
  ],
    showEmailMailing: false
  },
  mutations: {
    SET_OVERLAY(state, value) {
      state.showOverlay = value
    },
    SET_EMAILMAILING(state, value) {
      state.showEmailMailing = value
    },
    ADD_TO_BLACKLIST(state, newItem) {
      state.blackList.push(newItem);
    },
    SET_BLACKLIST(state, list) {
      state.blackList = list;
    },
  },
  actions: {
    updateBlackList({ commit }){
        if(!localStorage.getItem("kinoareaBlackList")){
          let list = ["Балерина", "Полный армагеддец", "Конклав", "Зимородок", "Дневники вампира","Отчаянные домохозяйки", "Гарри Поттер и Тайная Комната", "Совсем ошалели", "Гарри Поттер и Узник Азкабана", "Гарри Поттер и Кубок Огня", "Гарри Поттер и Принц-полукровка", "Гарри Поттер и Орден Феникса", "Анора", "Дети леса", "Постучись в мою Тверь", "Ущелье", "После. Глава 3", "Моя вина", "Из моего окна", "Пурпурные сердца", "Король Стейтен-Айленда", "После. Глава 2", "365 дней", "Борат 2", "Непослушная", "Не волнуйся, солнышко", "Субстанция", "Плохая девочка", "Оставь это ветру", "Как бы беременна", "Парни с тату. Прямо в сердце", "Моя вина: Лондон", "Ущелье", "Влюблённые глаза", "Бриджит Джонс. Без ума от мальчишки"]
          localStorage.setItem("kinoareaBlackList", JSON.stringify(list))
            commit('SET_BLACKLIST', list);
        } else{
            const list = JSON.parse(localStorage.getItem("kinoareaBlackList"));
            commit('SET_BLACKLIST', list);
        }
    },
    addToBlackList({ commit, state }, newItem) {
      commit('ADD_TO_BLACKLIST', newItem);
      localStorage.setItem('kinoareaBlackList', JSON.stringify(state.blackList));
    },
    toggleOverlay({ commit }, value) {
      commit('SET_OVERLAY', value)
    },
    toggleEmailMailing({ commit }, value) {
      commit('SET_EMAILMAILING', value)
    },
  },
  getters: {
    showOverlay: state => state.showOverlay,
    showEmailMailing: state => state.showEmailMailing,
    blackList: (state) => {
        return [...state.blackList];
      },
    getLists: state => state.lists,
    getCategoryTitleByUrl: (state) => (url) => {
      const category = state.lists.find(category => category.url === url).title;
      return category;
    },
  },
})

export default store;
