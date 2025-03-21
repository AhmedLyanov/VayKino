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

                        <div class="filter-collumn" :class="{ disabled: (selectedFromYear || selectedToYear) }"
                            @click="(selectedFromYear || selectedToYear) ? this.$toast.error('Год и интервал - несовместимые фильтры!', { position: 'top-right', duration: 2000, dismissible: false }) : null">
                            <div class="filter-title">Год:</div>

                            <div class="filter-input">
                                <div class="filter-year">
                                    <VueSelect v-model="selectedYear" :options="optionsYear" :placeholder="'Год'"
                                        :isSearchable="false" :is-disabled="!!selectedFromYear || !!selectedToYear" />
                                </div>
                            </div>
                        </div>

                        <div class="filter-collumn" :class="{ disabled: selectedYear }"
                            @click="selectedYear ? this.$toast.error('Год и интервал - несовместимые фильтры!', { position: 'top-right', duration: 2000, dismissible: false }) : null">
                            <div class="filter-title">Интервал:</div>

                            <div class="filter-input">
                                <span>С</span>

                                <div class="filter-year">
                                    <VueSelect v-model="selectedFromYear" :options="optionsFromYear"
                                        :placeholder="'Год'" :isSearchable="false" :is-disabled="!!selectedYear" />
                                </div>

                                <span>По</span>

                                <div class="filter-year">
                                    <VueSelect v-model="selectedToYear" :options="optionsToYear" :placeholder="'Год'"
                                        :isSearchable="false" :is-disabled="!!selectedYear"
                                        :no-options="{ text: 'Нет годов выше' }">
                                        <template #no-options>
                                            Нет годов выше {{ selectedFromYear }}
                                        </template>
                                    </VueSelect>
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
                    </div>

                    <div class="filter-ratings">
                        <div class="filter-rating">
                            <div class="rating-header">
                                <label class="radio-container">
                                    <input type="radio" name="gender" value="male" @click="selectedRating = 'kp'"
                                        :checked="selectedRating === 'kp'"> Оценка Кинопоиск
                                    <span class="radio-custom"></span>
                                </label>
                            </div>
                            <div class="rating-main">
                                <VueDoubleRangeInput step="1" color="#3657CB" track-color="#1E2538" track-radius="5px"
                                    track-height="8px" handler-color="#3657CB" handler-width="24px"
                                    handler-height="24px" :push-on-touch="false" :show-numbers="true" :min="10"
                                    :max="100" v-model:minValue="minRatingKP" v-model:maxValue="maxRatingKP">
                                    <template #from="{ minValueRef }">
                                        <div class="rating">
                                            От

                                            <span>{{ (minValueRef / 10).toFixed(1) }}</span>
                                        </div>
                                        <!-- <input type="text" :value="(minValueRef/10).toFixed(1)" style="margin-top: 40px;"> -->
                                    </template>
                                    <template #to="{ maxValueRef }">
                                        <div class="rating">
                                            До

                                            <span>{{ (maxValueRef / 10).toFixed(1) }}</span>
                                        </div>
                                        <!-- <input type="text" :value="(maxValueRef/10).toFixed(1)" style="margin-top: 40px;"> -->
                                    </template>
                                </VueDoubleRangeInput>

                                <div class="rating-numbers">
                                    <div><span @click="setRating('Кинопоиск', 1)">1</span></div>
                                    <div><span @click="setRating('Кинопоиск', 2)">2</span></div>
                                    <div><span @click="setRating('Кинопоиск', 3)">3</span></div>
                                    <div><span @click="setRating('Кинопоиск', 4)">4</span></div>
                                    <div><span @click="setRating('Кинопоиск', 5)">5</span></div>
                                    <div><span @click="setRating('Кинопоиск', 6)">6</span></div>
                                    <div><span @click="setRating('Кинопоиск', 7)">7</span></div>
                                    <div><span @click="setRating('Кинопоиск', 8)">8</span></div>
                                    <div><span @click="setRating('Кинопоиск', 9)">9</span></div>
                                    <div><span @click="setRating('Кинопоиск', 10)">10</span></div>
                                </div>
                            </div>
                        </div>


                        <div class="filter-rating">
                            <div class="rating-header">
                                <label class="radio-container">
                                    <input type="radio" @click="selectedRating = 'imdb'"
                                        :checked="selectedRating == 'imdb'"> Оценка IMDb
                                    <span class="radio-custom"></span>
                                </label>
                            </div>
                            <div class="rating-main">
                                <VueDoubleRangeInput step="1" color="#3657CB" track-color="#1E2538" track-radius="5px"
                                    track-height="8px" handler-color="#3657CB" handler-width="24px"
                                    handler-height="24px" :push-on-touch="false" :show-numbers="true" :min="10"
                                    :max="100" v-model:minValue="minRatingIMDb" v-model:maxValue="maxRatingIMDb">
                                    <template #from="{ minValueRef }">
                                        <div class="rating">
                                            От

                                            <span>{{ (minValueRef / 10).toFixed(1) }}</span>
                                        </div>
                                        <!-- <input type="text" :value="(minValueRef/10).toFixed(1)" style="margin-top: 40px;"> -->
                                    </template>
                                    <template #to="{ maxValueRef }">
                                        <div class="rating">
                                            До

                                            <span>{{ (maxValueRef / 10).toFixed(1) }}</span>
                                        </div>
                                        <!-- <input type="text" :value="(maxValueRef/10).toFixed(1)" style="margin-top: 40px;"> -->
                                    </template>
                                </VueDoubleRangeInput>

                                <div class="rating-numbers">
                                    <div><span @click="setRating('IMDb', 1)">1</span></div>
                                    <div><span @click="setRating('IMDb', 2)">2</span></div>
                                    <div><span @click="setRating('IMDb', 3)">3</span></div>
                                    <div><span @click="setRating('IMDb', 4)">4</span></div>
                                    <div><span @click="setRating('IMDb', 5)">5</span></div>
                                    <div><span @click="setRating('IMDb', 6)">6</span></div>
                                    <div><span @click="setRating('IMDb', 7)">7</span></div>
                                    <div><span @click="setRating('IMDb', 8)">8</span></div>
                                    <div><span @click="setRating('IMDb', 9)">9</span></div>
                                    <div><span @click="setRating('IMDb', 10)">10</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="filter-type">
                        <label v-for="(type, index) in types" :key="index" class="checkbox-label">
                            <input type="checkbox" :id="'type-' + index" :value="type" v-model="selectedTypes"
                                class="checkbox-input">
                            <span class="checkbox-custom"></span>
                            {{ type }}
                        </label>
                    </div>

                    <div class="filter-button">
                        <button type="button" @click="search">Поиск</button>
                    </div>
                </div>
            </div>
        </div>
        <div style="color: white;">
            <h1>Итог:</h1>
            <ul>
                <li>Название: {{ name }} {{ typeof name }}</li>
                <li>Год: {{ selectedYear }} {{ typeof selectedYear }}</li>
                <li>Год с: {{ selectedFromYear }}</li>
                <li>Год по: {{ selectedToYear }}</li>
                <li>Жанр: {{ selectedGenre }}</li>
                <li>Страна: {{ selectedCountry }}</li>
                <li>Месяц: {{ selectedMonth }}</li>
                <li>Год премьеры: {{ selectedPremiereYear }}</li>
                <li>Премьера в: {{ selectedPremiereIn }}</li>
                <li>Минимальная оценка: {{ selectedRating }} {{ selectedRating === "kp" ? minRatingKP / 10 :
                    minRatingIMDb / 10
                    }}</li>
                <li>Максимальная оценка: {{ selectedRating }} {{ selectedRating === "kp" ? maxRatingKP / 10 :
                    maxRatingIMDb / 10
                    }}</li>
                <li>Типы медиа: {{ selectedTypes }}</li>
            </ul>
        </div>
    </main>
</template>

<script>
import BlockHeader from '@/Components/BlockHeader.vue';
import VueSelect from "vue3-select-component";
import { mapActions } from 'vuex';
import VueDoubleRangeInput from 'vue-double-range-input';
import 'vue-double-range-input/dist/style.css';

export default {
    data() {
        return {
            title: "",
            year: 0,
            optionsYear: Array.from({ length: 50 }, (_, i) => {
                const year = 2025 - i;
                return { label: String(year), value: String(year) };
            }),
            allYears: Array.from({ length: 50 }, (_, i) => 2025 - i),
            optionsGenre: [
                "аниме",
                "биография",
                "боевик",
                "вестерн",
                "военный",
                "детектив",
                "детский",
                "документальный",
                "драма",
                "игра",
                "история",
                "комедия",
                "концерт",
                "короткометражка",
                "криминал",
                "мелодрама",
                "музыка",
                "мультфильм",
                "мюзикл",
                "новости",
                "приключения",
                "реальное ТВ",
                "семейный",
                "спорт",
                "ток-шоу",
                "триллер",
                "ужасы",
                "фантастика",
                "фильм-нуар",
                "фэнтези",
                "церемония"
            ].map(genre => ({ label: genre.charAt(0).toUpperCase() + genre.slice(1), value: genre })),
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
            types: ['Фильм', 'Сериал', 'Мультфильм', 'Мультсериал', 'Аниме'],
            name: undefined,
            selectedYear: undefined,
            selectedFromYear: undefined,
            selectedToYear: undefined,
            selectedGenre: [],
            selectedCountry: undefined,
            selectedMonth: undefined,
            selectedPremiereYear: undefined,
            selectedPremiereIn: undefined,
            // budgetFrom: '',
            // budgetTo: '',
            selectedRating: "kp",
            minRatingKP: 10,
            maxRatingKP: 100,
            minRatingIMDb: 10,
            maxRatingIMDb: 100,
            selectedTypes: ['Фильм'],
        }
    },
    components: {
        BlockHeader,
        VueSelect,
        VueDoubleRangeInput
    },
    mounted() {
        window.scrollTo(0, 0);
        document.title = 'Расширенный поиск';
        this.showEmailMailing()
    },
    watch: {
        selectedGenre: {
            handler(newValue, oldValue) {
                if (newValue.length > 5) {
                    this.selectedGenre = newValue.slice(0, 5);
                    this.$toast.error('Вы можете выбрать не более 5 жанров', {
                        position: 'top-right',
                        duration: 2000,
                        dismissible: false
                    });
                }
            },
            deep: true
        }
    },
    computed: {
        optionsToYear() {
            const allOptions = this.allYears.map(year => ({ label: String(year), value: String(year) }));

            if (this.selectedFromYear === 0 || this.selectedFromYear === undefined) {
                return allOptions;
            }

            return allOptions.filter(option => parseInt(option.value) > this.selectedFromYear);
        },
        optionsFromYear() {
            const allOptions = this.allYears.map(year => ({ label: String(year), value: String(year) }));

            if (this.selectedToYear === 0 || this.selectedToYear === undefined) {
                return allOptions;
            }

            return allOptions.filter(option => parseInt(option.value) < this.selectedToYear);
        },
        hasAtLeastOneField() {
            const result = (
                this.name !== undefined && this.name !== '' ||
                this.selectedYear !== undefined && this.selectedYear !== null ||
                this.selectedFromYear !== undefined && this.selectedFromYear !== null ||
                this.selectedToYear !== undefined && this.selectedToYear !== null ||
                this.selectedGenre.length > 0 ||
                this.selectedCountry !== undefined && this.selectedCountry !== null ||
                this.selectedMonth !== undefined ||
                this.selectedPremiereYear !== undefined ||
                this.selectedPremiereIn !== undefined
            );
            return result;
        },
        isPremiereFilterActive() {
            const result = !!(this.selectedMonth || this.selectedPremiereYear || this.selectedPremiereIn);
            return result;
        },
        isYearRangeActive() {
            const result = !!(this.selectedFromYear || this.selectedToYear);
            return result;
        }
    },
    methods: {
        ...mapActions(['toggleEmailMailing']),

        showEmailMailing() {
            this.toggleEmailMailing(true)
        },
        // formatBudgetFrom() {
        //     let value = this.budgetFrom.replace(/[^0-9]/g, '');

        //     value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        //     this.budgetFrom = value;
        //     this.amount = value.replace(/\s/g, '');
        // }
        setRating(ratingName, ratingValue) {
            if (ratingName === "Кинопоиск") {
                if (ratingValue <= 5) {
                    this.minRatingKP = ratingValue * 10
                } else {
                    this.maxRatingKP = ratingValue * 10
                }
            } else {
                if (ratingValue <= 5) {
                    this.minRatingIMDb = ratingValue * 10
                } else {
                    this.maxRatingIMDb = ratingValue * 10
                }
            }
        },
        search() {
            if (!this.hasAtLeastOneField) {
                this.$toast.error('Необходимо заполнить хотя бы одно поле', { position: 'top-right', duration: 2000, dismissible: false, });
                return;
            }
            
            if (this.isYearRangeActive) {
                const isFromYearSelected = !!this.selectedFromYear;
                const isToYearSelected = !!this.selectedToYear;
                
                if ((isFromYearSelected || isToYearSelected) && !(isFromYearSelected && isToYearSelected)) {
                    this.$toast.error('Вы заполнили не все поля для фильтрации по интервалу.', {position: 'top-right', duration: 2000, dismissible: false,});
                    return;
                }
            }
            
            if (this.isPremiereFilterActive) {
                const isMonthSelected = !!this.selectedMonth;
                const isYearSelected = !!this.selectedPremiereYear;
                const isInSelected = !!this.selectedPremiereIn;
                
                if ((isMonthSelected || isYearSelected || isInSelected) && !(isMonthSelected && isYearSelected && isInSelected)) {
                    this.$toast.error( 'Вы заполнили не все поля для фильтрации по премьере.', { position: 'top-right', duration: 2000, dismissible: false, }
                    );
                    return;
                }
            }

            this.$toast.success('Все четко', { position: 'top-right', duration: 2000, dismissible: false, });
            console.log();
            
        },
    },
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

.filter-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.filter-collumn {
    margin-top: 20px;

    &:not(:first-child) {
        margin-left: 62px;
    }

    &:nth-child(5) {
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

        &::placeholder {
            color: #52525b;
        }

        /* &.filter-budget {
            padding: 22px 27px 22px 18px;
            border-radius: 0 10px 10px 0;
            width: 150px;
        } */
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
    width: 870px;
}

.filter-country {
    width: 340px;
}

.filter-month {
    width: 163px;
}

.filter-premiereIn {
    width: 160px;
}

.filter-ratings {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
}

.filter-rating {
    width: 49%;
    position: relative;
}

.rating-header {
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 17px;
    color: white;
}

.radio-container {
    display: inline-block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 16px;
    user-select: none;
}

/* Скрываем стандартный radio button */
.radio-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

/* Создаем кастомный radio button */
.radio-custom {
    position: absolute;
    top: 0;
    left: 0;
    height: 19px;
    width: 19px;
    background-color: transparent;
    border: 1px solid #838488;
    border-radius: 50%;
    /* Круглый вид */
}

/* При наведении курсора меняем фон */
.radio-container:hover input~.radio-custom {
    border: 1px solid #696a6d;
}

/* Добавляем стили при выборе (checked) */
.radio-container input:checked~.radio-custom {
    background-color: #F2F60F;
    /* Основной цвет */
    border: 1px solid #F2F60F;
}

/* Создаем внутренний круг для индикации выбранного состояния */
.radio-custom:after {
    content: "";
    position: absolute;
    display: none;
}

/* Показываем внутренний круг при выборе */
.radio-container input:checked~.radio-custom:after {
    display: block;
}

/* Стилизуем внутренний круг */
.radio-container .radio-custom:after {
    top: 3px;
    left: 3px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #151A26;
    /* Цвет внутреннего круга */
}

.rating-main {
    margin-top: 20px;
}

.rating {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 17px;
    color: white;
    margin-top: 40px;

    span {
        width: 100px;
        height: 55px;
        border-radius: 10px;
        background-color: #1E2538;
        margin-left: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.rating-numbers {
    font-weight: 400;
    font-size: 17px;
    color: #A5A8AF;
    display: flex;
    align-items: center;
    position: absolute;
    top: 80px;
    width: 100%;
    user-select: none;

    span {
        cursor: pointer;
        transition: 0.2s;
        padding: 5px;

        &:hover {
            color: white;
        }
    }

    div:nth-child(2) {
        margin-left: 63px;
    }

    div:nth-child(3) {
        margin-left: 56px;
    }

    div:nth-child(4) {
        margin-left: 56px;
    }

    div:nth-child(5) {
        margin-left: 57px;
    }

    div:nth-child(6) {
        margin-left: 56px;
    }

    div:nth-child(7) {
        margin-left: 57px;
    }

    div:nth-child(8) {
        margin-left: 57px;
    }

    div:nth-child(9) {
        margin-left: 56px;
    }

    div:nth-child(10) {
        margin-left: auto;
    }
}

.filter-type {
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    user-select: none;
    color: white;

    label {
        cursor: pointer;

        &:not(:first-child) {
            margin-left: 30px;
        }
    }

    input {
        accent-color: #F2F60F;
        cursor: pointer;
        margin-right: 5px;
    }
}

.checkbox-group {
    display: flex;
    flex-direction: column;
    /* Или row, если хотите в строку */
}

.checkbox-label {
    /* display: flex;
  align-items: center; */
    margin-bottom: 10px;
    position: relative;
    padding-left: 25px;
    /* Отступ для кастомного чекбокса */
    cursor: pointer;
    user-select: none;
}

.checkbox-input {
    position: absolute;
    opacity: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    border: 0;
}

.checkbox-custom {
    position: absolute;
    top: 0;
    left: 0;
    height: 17px;
    width: 17px;
    border-radius: 2px;
    background-color: transparent;
    border: 1px solid #A6A6A6;
    transition: background-color 0.2s, border-color 0.2s;
}

/* Галочка */
.checkbox-custom::after {
    content: "";
    position: absolute;
    display: none;
    left: 4px;
    top: 2px;
    width: 3px;
    height: 6px;
    border: solid black;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
}

/* Показываем галочку когда чекбокс выбран */
.checkbox-input:checked+.checkbox-custom::after {
    display: block;
}

.checkbox-input:checked+.checkbox-custom {
    background-color: #F2F60F;
    border-color: #F2F60F;
}

.filter-button {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
        padding: 20px 65px;
        border-radius: 10px;
        background-color: #F2F60F;
        font-weight: 700;
        font-size: 18px;
        border: none;
        outline: none;
        user-select: none;
        cursor: pointer;
    }
}

.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    user-select: none;
}
</style>