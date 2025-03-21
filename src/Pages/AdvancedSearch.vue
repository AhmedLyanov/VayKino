<template>
    <main>
        <div class="main-content">
            <div class="filter">
                <div class="filter-header">
                    <BlockHeader :title="'Расширенный поиск'" :text="false" :link="false" />
                </div>

                <div class="filter-main">
                    <div class="filter-row">
                        <div class="filter-collumn">
                            <div class="filter-title">Название фильма:</div>

                            <div class="filter-input">
                                <input type="text" placeholder="Полное или частичное название" v-model="name"
                                    class="filter-name">
                            </div>
                        </div>

                        <div class="filter-collumn">
                            <div class="filter-title">Год:</div>

                            <div class="filter-input">
                                <div class="filter-year">
                                    <VueSelect v-model="selectedYear" :options="optionsYear" :placeholder="'Год'"
                                        :isSearchable="false" />
                                </div>
                            </div>
                        </div>

                        <div class="filter-collumn">
                            <div class="filter-title">Интервал:</div>

                            <div class="filter-input">
                                <span>С</span>

                                <div class="filter-year">
                                    <VueSelect v-model="selectedFromYear" :options="optionsYear" :placeholder="'Год'"
                                        :isSearchable="false" />
                                </div>

                                <span>По</span>

                                <div class="filter-year">
                                    <VueSelect v-model="selectedToYear" :options="optionsYear" :placeholder="'Год'"
                                        :isSearchable="false" />
                                </div>
                            </div>
                        </div>

<div class="filter-collumn">
    <div class="filter-title">Страна фильма:</div>

    <div class="filter-input">
        <div class="filter-country">
            <VueSelect v-model="selectedCountry" :options="optionsCountry"
                :placeholder="'Страна'" />
        </div>
    </div>
</div>

                        <div class="filter-collumn">
                            <div class="filter-title">Жанр фильма:</div>

                            <div class="filter-input">
                                <div class="filter-genre">
                                    <VueSelect v-model="selectedGenre" :options="optionsGenre" :placeholder="'Жанр'"
                                        :is-multi="true" />
                                </div>
                            </div>
                        </div>

                        <div class="filter-collumn">
                            <div class="filter-title">Премьера:</div>

                            <div class="filter-input">
                                <div class="filter-month">
                                    <VueSelect v-model="selectedMonth" :options="optionsMonth" :placeholder="'Месяц'" />
                                </div>
                                <span></span>
                                <div class="filter-year">
                                    <VueSelect v-model="selectedPremiereYear" :options="optionsYear"
                                        :placeholder="'Год'" :isSearchable="false" />
                                </div>
                                <span></span>
                                <div class="filter-premiereIn">
                                    <VueSelect v-model="selectedPremiereIn" :options="optionsPremiereIn"
                                        :placeholder="'Выходит в'" :isSearchable="false" />
                                </div>
                            </div>
                        </div>

                        <!-- <div class="filter-collumn">
                            <div class="filter-title">Бюджет:</div>

                            <div class="filter-input">
                                <span>От</span>
                                <span class="budget-currency">$</span>
                                <input v-model="budgetFrom" @input="formatBudgetFrom" type="text" placeholder="Бюджет" class="filter-budget" maxlength="11">
                                
                                <span>До</span>
                                <span class="budget-currency">$</span>
                                <input v-model="budgetFrom" @input="formatBudgetFrom" type="text" placeholder="Бюджет" class="filter-budget" maxlength="11">
                            </div>
                        </div> -->

                        <div class="filter-collumn">
                            
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
                <li>Страна: {{ selectedCountry }}</li>
                <li>Месяц: {{ selectedMonth }}</li>
                <li>Год премьеры: {{ selectedPremiereYear }}</li>
                <li>Премьера в: {{ selectedPremiereIn }}</li>
            </ul>
        </div>
    </main>
</template>

<script>
import BlockHeader from '@/Components/BlockHeader.vue';
import VueSelect from "vue3-select-component";
import { mapActions } from 'vuex';

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
            optionsMonth: [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ].map(month => ({ label: month, value: month })),
            optionsPremiereIn: [
                "В мире",
                "В России",
                "В Америке",
                "В стриминговых сервисах",
                "В кинотеатрах",
            ].map(premiereIn => ({ label: premiereIn, value: premiereIn })),
            name: '',
            selectedYear: 0,
            selectedFromYear: 0,
            selectedToYear: 0,
            selectedGenre: [],
            selectedCountry: '',
            selectedMonth: '',
            selectedPremiereYear: 0,
            selectedPremiereIn: '',
            budgetFrom: '',
            budgetTo: '',
        }
    },
    components: {
        VueSelect,
        BlockHeader
    },
    mounted() {
        window.scrollTo(0, 0);
        document.title = 'Расширенный поиск';
        this.showEmailMailing()
    },
    methods: {
    ...mapActions(['toggleEmailMailing']),

    showEmailMailing() {
      this.toggleEmailMailing(true)
    },
        formatBudgetFrom(){
            let value = this.budgetFrom.replace(/[^0-9]/g, '');

            // Форматируем число с разделением тысяч пробелами
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            this.budgetFrom = value;
            this.amount = value.replace(/\s/g, '');
        }
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

.filter-row{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.filter-collumn{
    margin-top: 20px;
    
    &:not(:first-child){
        margin-left: 62px;
    }

    &:nth-child(5){
        margin-left: 0;
    }
}

.filter-title {
    font-weight: 700;
    font-size: 25px;
    color: white;
    margin-bottom: 20px;
}

.filter-input {
    display: flex;
    align-items: center;
    color: white;
    font-weight: 500;
    font-size: 17px;

    input {
        background-color: #1E2538;
        border-radius: 10px;
        padding: 22px 27px;
        border: none;
        outline: none;
        color: white;
        font-weight: 400;
        font-size: 17px;

        &.filter-name {
            width: 450px;
        }

        &.filter-budget{
            padding: 22px 27px 22px 18px;
            border-radius: 0 10px 10px 0;
            width: 150px;
        }
    }

    span {
        margin-right: 10px;

        &:not(:first-child) {
            margin-left: 15px;
        }
    }

    .budget-currency {
        margin-right: 0;
        margin-left: 0 !important;
        padding: 22px 0 22px 27px;
        background-color: #1E2538;
        user-select: none;
        border-radius: 10px 0 0 10px;
        color: #FFFFFF99;
    }

}

.filter-year {
    width: 130px;
}

.filter-genre {
    width: 860px;
}

.filter-country {
    width: 340px;
}

.filter-month {
    width: 163px;
}

.filter-premiereIn {
    min-width: 170px;
}
</style>