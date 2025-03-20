<template>
    <main>
        <div class="main-content">
            <div class="filter">
                <div class="filter-header">
                    <BlockHeader :title="'Расширенный поиск'" :text="false" :link="false" />
                </div>

                <div class="filter-main">
                    <div class="filter-row">
                        <div class="filter-name">
                            <div class="filter-title">Название фильма:</div>

                            <div class="filter-input">
                                <input type="text" placeholder="Полное или частичное название" v-model="name">
                            </div>
                        </div>

                        <div class="filter-year">
                            <div class="filter-title">Год:</div>

                            <div class="filter-input">
                                <VueSelect v-model="selectedYear" :options="optionsYear" :placeholder="'Год'"
                                    :isSearchable="false" :class="'input'" />
                            </div>
                        </div>

                        <div class="filter-interval">
                            <div class="filter-title">Интервал:</div>

                            <div style="display: flex;">
                                <div class="filter-input">
                                    <span>С</span>
                                    <VueSelect v-model="selectedFromYear" :options="optionsYear" :placeholder="'Год'"
                                        :isSearchable="false" :class="'input'" />
                                </div>

                                <div class="filter-input" style="margin-left: 20px;">
                                    <span>По</span>
                                    <VueSelect v-model="selectedToYear" :options="optionsYear" :placeholder="'Год'"
                                        :isSearchable="false" :class="'input'" />
                                </div>
                            </div>
                        </div>

<div class="filter-genre">
    <div class="filter-title">Жанр фильма:</div>

    <div class="filter-input">
        <VueSelect v-model="selectedGenre" :options="optionsGenre" :placeholder="'Жанр'"
            :is-multi="true" :isSearchable="false" :class="'input'" />
    </div>
</div>

<div class="filter-country">
    <div class="filter-title">Страна фильма:</div>

    <div class="filter-input">
        <VueSelect v-model="selectedGenre" :options="optionsCountry" :placeholder="'Страна'"
            :isSearchable="false" :class="'input'" />
    </div>
</div>
                    </div>
                </div>
            </div>
        </div>
        <div style="color: white;">
            <h1>Итог:</h1>
            <ul>
                <li>Название: {{ name }}</li>
                <li>Год: {{ selectedYear }}</li>
                <li>Год с: {{ selectedFromYear }}</li>
                <li>Год по: {{ selectedToYear }}</li>
                <li>Жанр: {{ selectedGenre }}</li>
            </ul>
        </div>
    </main>
</template>

<script>
import BlockHeader from '@/Components/BlockHeader.vue';
import VueSelect from "vue3-select-component";

export default {
    data() {
        return {
            title: "",
            year: 0,
            optionsYear: Array.from({ length: 50 }, (_, i) => {
                const year = 2025 - i;
                return { label: String(year), value: String(year) };
            }),
            optionsGenre: [
                "аниме",
                "биография",
                "боевик",
                "вестерн",
                "военный",
                "детектив",
                "документальный",
                "драма",
                "история",
                "комедия",
                "короткометражка",
                "мелодрама",
                "мультфильм",
                "мюзикл",
                "приключения",
                "триллер",
                "ужасы",
                "фантастика",
            ].map(genre => ({ label: genre, value: genre })),
            optionsCountry: [
                "Австралия",
                "Австрия",
                "Азербайджан",
                "Албания",
                "Алжир",
                "Американские Виргинские острова",
                "Американское Самоа",
                "Ангола",
                "Андорра",
                "Антарктида",
                "Антигуа и Барбуда",
                "Антильские Острова",
                "Аргентина",
                "Армения",
                "Аруба",
                "Афганистан",
                "Багамы",
                "Бангладеш",
                "Барбадос",
                "Бахрейн",
                "Беларусь",
                "Белиз",
                "Бельгия",
                "Бенин",
                "Берег Слоновой кости",
                "Бермуды",
                "Бирма",
                "Болгария",
                "Боливия",
                "Босния",
                "Босния и Герцеговина",
                "Ботсвана",
                "Бразилия",
                "Бруней-Даруссалам",
                "Буркина-Фасо",
                "Бурунди",
                "Бутан",
                "Вануату",
                "Ватикан",
                "Великобритания",
                "Венгрия",
                "Венесуэла",
                "Виргинские Острова",
                "Внешние малые острова США",
                "Вьетнам",
                "Вьетнам Северный",
                "Габон",
                "Гаити",
                "Гайана",
                "Гамбия",
                "Гана",
                "Гваделупа",
                "Гватемала",
                "Гвинея",
                "Гвинея-Бисау",
                "Германия",
                "Германия (ГДР)",
                "Германия (ФРГ)",
                "Гибралтар",
                "Гондурас",
                "Гонконг",
                "Гренада",
                "Гренландия",
                "Греция",
                "Грузия",
                "Гуам",
                "Дания",
                "Джибути",
                "Доминика",
                "Доминикана",
                "Египет",
                "Заир",
                "Замбия",
                "Западная Сахара",
                "Зимбабве",
                "Израиль",
                "Индия",
                "Индонезия",
                "Иордания",
                "Ирак",
                "Иран",
                "Ирландия",
                "Исландия",
                "Испания",
                "Италия",
                "Йемен",
                "Кабо-Верде",
                "Казахстан",
                "Каймановы острова",
                "Камбоджа",
                "Камерун",
                "Канада",
                "Катар",
                "Кения",
                "Кипр",
                "Кирибати",
                "Китай",
                "Колумбия",
                "Коморы",
                "Конго",
                "Конго (ДРК)",
                "Корея",
                "Корея Северная",
                "Корея Южная",
                "Косово",
                "Коста-Рика",
                "Кот-д’Ивуар",
                "Куба",
                "Кувейт",
                "Кыргызстан",
                "Лаос",
                "Латвия",
                "Лесото",
                "Либерия",
                "Ливан",
                "Ливия",
                "Литва",
                "Лихтенштейн",
                "Люксембург",
                "Маврикий",
                "Мавритания",
                "Мадагаскар",
                "Макао",
                "Македония",
                "Малави",
                "Малайзия",
                "Мали",
                "Мальдивы",
                "Мальта",
                "Марокко",
                "Мартиника",
                "Маршалловы острова",
                "Мексика",
                "Мозамбик",
                "Молдова",
                "Монако",
                "Монголия",
                "Монтсеррат",
                "Мьянма",
                "Намибия",
                "Непал",
                "Нигер",
                "Нигерия",
                "Нидерланды",
                "Никарагуа",
                "Новая Зеландия",
                "Новая Каледония",
                "Норвегия",
                "ОАЭ",
                "Оккупированная Палестинская территория",
                "Оман",
                "Остров Мэн",
                "Острова Кука",
                "Пакистан",
                "Палау",
                "Палестина",
                "Панама",
                "Папуа - Новая Гвинея",
                "Парагвай",
                "Перу",
                "Польша",
                "Португалия",
                "Пуэрто Рико",
                "Реюньон",
                "Российская империя",
                "Россия",
                "Руанда",
                "Румыния",
                "СССР",
                "США",
                "Сальвадор",
                "Самоа",
                "Сан-Марино",
                "Саудовская Аравия",
                "Свазиленд",
                "Северная Македония",
                "Сейшельские острова",
                "Сенегал",
                "Сент-Винсент и Гренадины",
                "Сент-Китс и Невис",
                "Сент-Люсия ",
                "Сербия",
                "Сербия и Черногория",
                "Сиам",
                "Сингапур",
                "Сирия",
                "Словакия",
                "Словения",
                "Соломоновы Острова",
                "Сомали",
                "Судан",
                "Суринам",
                "Сьерра-Леоне",
                "Таджикистан",
                "Таиланд",
                "Тайвань",
                "Танзания",
                "Тимор-Лесте",
                "Того",
                "Тонга",
                "Тринидад и Тобаго",
                "Тувалу",
                "Тунис",
                "Туркменистан",
                "Турция",
                "Уганда",
                "Узбекистан",
                "Украина",
                "Уругвай",
                "Фарерские острова",
                "Федеративные Штаты Микронезии",
                "Фиджи",
                "Филиппины",
                "Финляндия",
                "Фолклендские острова",
                "Франция",
                "Французская Гвиана",
                "Французская Полинезия",
                "Хорватия",
                "ЦАР",
                "Чад",
                "Черногория",
                "Чехия",
                "Чехословакия",
                "Чили",
                "Швейцария",
                "Швеция",
                "Шри-Ланка",
                "Эквадор",
                "Экваториальная Гвинея",
                "Эритрея",
                "Эсватини",
                "Эстония",
                "Эфиопия",
                "ЮАР",
                "Югославия",
                "Югославия (ФР)",
                "Ямайка",
                "Япония"
            ].map(country => ({ label: country, value: country })),
            name: '',
            selectedYear: 0,
            selectedFromYear: 0,
            selectedToYear: 0,
            selectedGenre: ''
        }
    },
    components: {
        VueSelect,
        BlockHeader
    }
}
</script>

<style scoped>
.filter {
    width: 100%;
}

.filter-main {
    background-color: #191E2E;
    padding: 43px;
    border-radius: 10px;
}

.filter-title {
    font-weight: 700;
    font-size: 25px;
    color: white;
    margin-bottom: 20px;
}

.filter-input {

    input {
        background-color: #1E2538;
        border-radius: 10px;
        padding: 22px 27px;
        border: none;
        outline: none;
        color: white;
        font-weight: 400;
        font-size: 17px;
    }
}

.filter-year {
    width: 130px;
}

.filter-interval {
    .filter-input {
        width: 150px;
        display: flex;
        align-items: center;

        span {
            font-weight: 500;
            font-size: 17px;
            color: white;
            margin-right: 10px;
        }
    }
}
</style>