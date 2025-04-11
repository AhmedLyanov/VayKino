<template>
    <main>
        <div class="main-content">
            <div class="filter">
                <div class="filter-header">
                    <BlockHeader :title="'Расширенный поиск'" :text="false" :link="false" />
                </div>

                <div class="filter-main">
                    <div class="filter-row">
                        <div class="filter-collumn" :class="{ disabled2: isFilterNameActive }"
                            @click="isFilterNameActive ? setErrorNotificarion('Поиск по названию не совместим с другими фильтрами!') : null">
                            <div :class="{ disabled1: isFilterNameActive }">
                                <div class="filter-title">Название фильма:</div>

                                <div class="filter-input">
                                    <input type="text" placeholder="Полное или частичное название" v-model="name"
                                        class="filter-name">
                                </div>
                            </div>
                        </div>

                        <div class="filter-collumn"
                            :class="{ disabled2: (!!selectedFromYear || !!selectedToYear || name) }"
                            @click="(!!selectedFromYear || !!selectedToYear) ? setErrorNotificarion('Год и интервал - несовместимые фильтры!') : name ? setErrorNotificarion('Этот фильтр не совместим с поиском по названию!') : null">
                            <div :class="{ disabled1: !!selectedFromYear || !!selectedToYear || name }">
                                <div class="filter-title">Год:</div>

                                <div class="filter-input">
                                    <div class="filter-year">
                                        <VueSelect v-model="selectedYear" :options="optionsYear" :placeholder="'Год'"
                                            :isSearchable="false"
                                            :is-disabled="!!selectedFromYear || !!selectedToYear || !!name" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="filter-collumn" :class="{ disabled2: !!selectedYear || !!name }"
                            @click="selectedYear ? setErrorNotificarion('Год и интервал - несовместимые фильтры!') : name ? setErrorNotificarion('Этот фильтр не совместим с поиском по названию!') : null">
                            <div :class="{ disabled1: !!selectedYear || !!name }">
                                <div class="filter-title">Интервал:</div>

                                <div class="filter-input">
                                    <span>С</span>

                                    <div class="filter-year">
                                        <VueSelect v-model="selectedFromYear" :options="optionsFromYear"
                                            :placeholder="'Год'" :isSearchable="false"
                                            :is-disabled="!!selectedYear || !!name" />
                                    </div>

                                    <span>По</span>

                                    <div class="filter-year">
                                        <VueSelect v-model="selectedToYear" :options="optionsToYear"
                                            :placeholder="'Год'" :isSearchable="false"
                                            :is-disabled="!!selectedYear || !!name"
                                            :no-options="{ text: 'Нет годов выше' }">
                                            <template #no-options>
                                                Нет годов выше {{ selectedFromYear }}
                                            </template>
                                        </VueSelect>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="filter-collumn" :class="{ disabled2: !!name }"
                            @click="name ? setErrorNotificarion('Этот фильтр не совместим с поиском по названию!') : null">
                            <div :class="{ disabled1: !!name }">
                                <div class="filter-title">Страна фильма:</div>

                                <div class="filter-input">
                                    <div class="filter-country">
                                        <VueSelect v-model="selectedCountry" :options="optionsCountry"
                                            :placeholder="'Страна'" :is-disabled="!!name" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="filter-collumn" :class="{ disabled2: !!name }"
                            @click="name ? setErrorNotificarion('Этот фильтр не совместим с поиском по названию!') : null">
                            <div :class="{ disabled1: !!name }">
                                <div class="filter-title">Жанр фильма:</div>

                                <div class="filter-input">
                                    <div class="filter-genre">
                                        <VueSelect v-model="selectedGenre" :options="optionsGenre" :placeholder="'Жанр'"
                                            :is-multi="true" :is-disabled="!!name" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="filter-collumn" :class="{ disabled2: !!name }"
                            @click="name ? setErrorNotificarion('Этот фильтр не совместим с поиском по названию!') : null">
                            <div :class="{ disabled1: !!name }">
                                <div class="filter-title">Премьера:</div>

                                <div class="filter-input">
                                    <div class="filter-month">
                                        <VueSelect v-model="selectedMonth" :options="optionsMonth"
                                            :placeholder="'Месяц'" :is-disabled="!!name" />
                                    </div>
                                    <span></span>
                                    <div class="filter-year">
                                        <VueSelect v-model="selectedPremiereYear" :options="optionsYear"
                                            :placeholder="'Год'" :isSearchable="false" :is-disabled="!!name" />
                                    </div>
                                    <span></span>
                                    <div class="filter-premiereIn">
                                        <VueSelect v-model="selectedPremiereIn" :options="optionsPremiereIn"
                                            :placeholder="'Выходит в'" :isSearchable="false" :is-disabled="!!name" />
                                    </div>
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

                    <div class="filter-ratings" :class="{ disabled2: !!name }"
                        @click="name ? setErrorNotificarion('Этот фильтр не совместим с поиском по названию!') : null">
                        <div :class="{ disabled1: !!name }">
                            <div class="filter-rating">
                                <div class="rating-header">
                                    <label class="radio-container">
                                        <input type="radio" name="gender" value="male" @click="selectedRating = 'kp'"
                                            :checked="selectedRating === 'kp'"> Оценка Кинопоиск
                                        <span class="radio-custom"></span>
                                    </label>
                                </div>
                                <div class="rating-main">
                                    <VueDoubleRangeInput step="1" color="#3657CB" track-color="#1E2538"
                                        track-radius="5px" track-height="8px" handler-color="#3657CB"
                                        handler-width="24px" handler-height="24px" :push-on-touch="false"
                                        :show-numbers="true" :min="10" :max="100" v-model:minValue="minRatingKP"
                                        v-model:maxValue="maxRatingKP">
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
                                            :checked="selectedRating == 'imdb'"> Оценка
                                        IMDb
                                        <span class="radio-custom"></span>
                                    </label>
                                </div>
                                <div class="rating-main">
                                    <VueDoubleRangeInput step="1" color="#3657CB" track-color="#1E2538"
                                        track-radius="5px" track-height="8px" handler-color="#3657CB"
                                        handler-width="24px" handler-height="24px" :push-on-touch="false"
                                        :show-numbers="true" :min="10" :max="100" v-model:minValue="minRatingIMDb"
                                        v-model:maxValue="maxRatingIMDb">
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
                    </div>

                    <div class="filter-type" :class="{ disabled2: !!name }"
                        @click="name ? setErrorNotificarion('Этот фильтр не совместим с поиском по названию!') : null">
                        <div :class="{ disabled1: !!name }">
                            <label v-for="(type, index) in types" :key="index" class="checkbox-label">
                                <input type="checkbox" :id="'type-' + index" :value="type" v-model="selectedTypes"
                                    class="checkbox-input">
                                <span class="checkbox-custom"></span>
                                {{ type }}
                            </label>
                        </div>
                    </div>

                    <div class="filter-button">
                        <button type="button" @click="search">Поиск</button>
                    </div>
                </div>
            </div>

            <div class="search-output" v-if="endRequest" ref="searchOutput">
                <BlockHeader :title="'Результаты поиска'" :text="false" :link="false" />

                <div class="search-loading" v-if="isLoading">
                  <span class="loader"></span>
                </div>
            
                <div class="search-error" v-if="errorMessage">
                  {{ errorMessage }}
                </div>

                <div class="movies" v-if="movies.length">
                    <Card v-for="(film, index) in movies" :contextMenu="false" :data="film" :key="index" />
                </div>
                <div class="movies-loadmore" v-if="movies.length && !(movies.length < 40)" @click="searchPage++">Загрузить еще</div>
            </div>
        </div>
    </main>
</template>

<script>
import BlockHeader from '@/Components/BlockHeader.vue';
import Card from '@/Components/Card.vue';
import VueSelect from "vue3-select-component";
import { mapActions } from 'vuex';
import VueDoubleRangeInput from 'vue-double-range-input';
import 'vue-double-range-input/dist/style.css';
import { fetchAdvancedSearch } from '@/Services/apiService';

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
            movies: [],
            endRequest: '',
            isLoading: false,
            errorMessage: '',
            searchPage: 1,
        }
    },
    components: {
        BlockHeader,
        Card,
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
        },
        async searchPage(){
            let searchParams = this.endRequest
            searchParams = searchParams.replace(/page=\d+/, `page=${this.searchPage}`)
            let newSearch = await fetchAdvancedSearch(searchParams)
            this.movies = this.movies.concat(newSearch)
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
        isFilterNameActive() {
            return (
                this.selectedYear ||
                this.selectedFromYear ||
                this.selectedToYear ||
                this.selectedCountry ||
                this.selectedGenre.length > 0 ||
                this.selectedMonth ||
                this.selectedPremiereYear ||
                this.selectedPremiereIn
            );
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
            const ratingScaled = ratingValue * 10;
            const isKinopoisk = ratingName === "Кинопоиск";
            const ratingType = isKinopoisk ? "KP" : "IMDb";
            const minRatingKey = `minRating${ratingType}`;
            const maxRatingKey = `maxRating${ratingType}`;

            const currentMinRating = this[minRatingKey] ?? 10;
            const currentMaxRating = this[maxRatingKey] ?? 100;

            const distanceToMin = Math.abs(ratingScaled - currentMinRating);
            const distanceToMax = Math.abs(ratingScaled - currentMaxRating);

            if (distanceToMin < distanceToMax) {
                this[minRatingKey] = ratingScaled;
            } else {
                this[maxRatingKey] = ratingScaled;
            }
        },
        async search() {
            if (!this.hasAtLeastOneField) {
                this.$toast.error('Необходимо заполнить хотя бы одно поле', { position: 'top-right', duration: 2000, dismissible: false });
                return;
            }

            if (this.isYearRangeActive && ((!!this.selectedFromYear) !== (!!this.selectedToYear))) {
                this.$toast.error('Вы заполнили не все поля для фильтрации по интервалу.', { position: 'top-right', duration: 2000, dismissible: false });
                return;
            }

            if (this.isPremiereFilterActive && !((!!this.selectedMonth) && (!!this.selectedPremiereYear))) {
                this.$toast.error('Вы заполнили не все поля для фильтрации по премьере.', { position: 'top-right', duration: 2000, dismissible: false });
                return;
            }

            if (this.selectedTypes.length === 0) {
                this.$toast.error('Необходимо выбрать хотя бы один типа фильма.', { position: 'top-right', duration: 2000, dismissible: false });
                return;
            }

            if (!this.name) {
                let params = {};

                if (this.name) params.name = this.name;
                if (this.selectedYear) params.year = this.selectedYear;
                if (this.selectedFromYear && this.selectedToYear) params.year = `${this.selectedFromYear}-${this.selectedToYear}`;

                if (this.selectedCountry) params['countries.name'] = this.selectedCountry;

                if (this.selectedMonth && this.selectedPremiereYear && this.selectedPremiereIn) {
                    const monthNameToNumber = {
                        "Январь": 1,
                        "Февраль": 2,
                        "Март": 3,
                        "Апрель": 4,
                        "Май": 5,
                        "Июнь": 6,
                        "Июль": 7,
                        "Август": 8,
                        "Сентябрь": 9,
                        "Октябрь": 10,
                        "Ноябрь": 11,
                        "Декабрь": 12,
                        "В мире": undefined,
                        "В России": undefined,
                        "В Америке": undefined,
                        "В стриминговых сервисах": undefined,
                        "В кинотеатрах": undefined
                    };

                    const monthNumber = monthNameToNumber[this.selectedMonth];

                    if (monthNumber) {
                        const monthIndex = monthNumber - 1;
                        const lastDayOfMonth = new Date(this.selectedPremiereYear, monthIndex + 1, 0).getDate();
                        const month = String(monthIndex + 1).padStart(2, '0');
                        const startDate = `01.${month}.${this.selectedPremiereYear}`;
                        const endDate = `${lastDayOfMonth}.${month}.${this.selectedPremiereYear}`;

                        let premiereType = '';
                        switch (this.selectedPremiereIn) {
                            case "В мире":
                                premiereType = 'premiere.world';
                                break;
                            case "В России":
                                premiereType = 'premiere.russia';
                                break;
                            case "В Америке":
                                premiereType = 'premiere.usa';
                                break;
                            case "В стриминговых сервисах":
                                premiereType = 'premiere.digital';
                                break;
                            case "В кинотеатрах":
                                premiereType = 'premiere.cinema';
                                break;
                            default:
                                console.warn("Неизвестный тип премьеры:", this.selectedPremiereIn);
                                break;
                        }

                        if (premiereType) {
                            params[premiereType] = `${startDate}-${endDate}`;
                        }
                    } else {
                        console.error("Неверное название месяца:", this.selectedMonth);
                    }
                }

                if (this.selectedRating && (this.minRatingKP !== undefined && this.maxRatingKP !== undefined) || (this.minRatingIMDb !== undefined && this.maxRatingIMDb !== undefined)) {
                    let ratingType = `rating.${this.selectedRating}`;

                    if (this.selectedRating === 'kp') {
                        params[ratingType] = `${this.minRatingKP / 10}-${this.maxRatingKP / 10}`;
                    } else {
                        params[ratingType] = `${this.minRatingIMDb / 10}-${this.maxRatingIMDb / 10}`;
                    }
                }

                if (this.selectedGenre.length > 0) {
                    this.selectedGenre.forEach(genre => {
                        if (!params['genres.name']) {
                            params['genres.name'] = [];
                        }
                        params['genres.name'].push(genre);
                    });
                }

                const englishMoviesTypes = {
                    'Фильм': "movie",
                    'Сериал': "tv-series",
                    'Мультфильм': "cartoon",
                    'Мультсериал': "animated-series",
                    'Аниме': "anime",
                }

                if (this.selectedTypes.length > 0) {
                    this.selectedTypes.forEach(type => {
                        if (!params['type']) {
                            params['type'] = [];
                        }
                        params['type'].push(englishMoviesTypes[type]);
                    });
                }

                let queryString = Object.entries(params)
                    .map(([key, value]) => {
                        if (Array.isArray(value)) {
                            return value.map(item => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`).join('&');
                        } else {
                            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
                        }
                    })
                    .filter(Boolean)
                    .join('&');

                if (queryString) {
                    queryString = `?page=1&limit=40&sortField=rating.${this.selectedRating}&sortType=-1&` + queryString;
                } else {
                    queryString = `?page=1&limit=40&sortField=rating.${this.selectedRating}&sortType=-1&`;
                }
                try {
                    this.endRequest = queryString
                    this.isLoading = true
                    this.$nextTick(() => {
                      const searchOutputElement = this.$refs.searchOutput;
                      if (searchOutputElement) {
                        searchOutputElement.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        console.error('Элемент trailer не найден!');
                      }
                    });
                    this.movies = await fetchAdvancedSearch(queryString)
                    if (!this.movies.length) {
                        this.errorMessage = 'Ничего не найдено, измените фильтры и попробуйте заново'
                    }
                    this.isLoading = false
                } catch (error) {
                    console.error(error);
                }
            } else {
                try {
                    this.endRequest = `/search?page=1&limit=40&query=${encodeURIComponent(this.name)}`;
                    this.isLoading = true
                    this.$nextTick(() => {
                      const searchOutputElement = this.$refs.searchOutput;
                      if (searchOutputElement) {
                        searchOutputElement.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        console.error('Элемент trailer не найден!');
                      }
                    });
                    this.movies = await fetchAdvancedSearch(`/search?page=1&limit=40&query=${encodeURIComponent(this.name)}`)
                    if (!this.movies.length) {
                        this.errorMessage = 'Ничего не найдено, измените фильтры и попробуйте заново'
                    }
                    this.isLoading = false
                } catch (error) {
                    console.error(error);
                }
            }
        },
        setErrorNotificarion(text) {
            this.$toast.error(text, { position: 'top-right', duration: 2000, dismissible: false })
        }
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


        padding: 22px 27px 22px 18px;
        border-radius: 0 10px 10px 0;
        width: 150px;

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
    margin-top: 40px;

    &>div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
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


.radio-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}


.radio-custom {
    position: absolute;
    top: 0;
    left: 0;
    height: 19px;
    width: 19px;
    background-color: transparent;
    border: 1px solid #838488;
    border-radius: 50%;

}


.radio-container:hover input~.radio-custom {
    border: 1px solid #696a6d;
}


.radio-container input:checked~.radio-custom {
    background-color: #F2F60F;

    border: 1px solid #F2F60F;
}


.radio-custom:after {
    content: "";
    position: absolute;
    display: none;
}


.radio-container input:checked~.radio-custom:after {
    display: block;
}


.radio-container .radio-custom:after {
    top: 3px;
    left: 3px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #151A26;

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

}

.checkbox-label {
    margin-bottom: 10px;
    position: relative;
    padding-left: 25px;

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

.search-output{
    width: 100%;
}

.movies {
    display: grid;
    grid-template-columns: repeat(5, 280px);
    justify-content: space-between;
    gap: 30px;
    margin-top: 60px;
}

.disabled1 {
    opacity: 0.3;
    user-select: none;
    pointer-events: none;
}

.disabled2 {
    cursor: not-allowed;
}

.search-loading{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 330px;
    margin-bottom: 330px;
}

.loader {
  width: 96px;
  height: 96px;
  background: #FFF;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 12px;
  top: 20px;
  width: 24px;
  height: 24px;
  color: #3657cb;
  background: currentColor;
  border-radius: 50%;
  box-shadow: 50px 4px, 20px 44px;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.search-error{
    text-align: center;
    color: white;
    font-weight: 600;
    font-size: 23px;
    margin-top: 350px;
    margin-bottom: 350px;
}

.movies-loadmore {
    padding: 20px 25px;
    border: 1px solid white;
    color: white;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    cursor: pointer;
    user-select: none;
    width: fit-content;
}
</style>