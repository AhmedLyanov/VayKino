<template>
    <main>
        <div class="main-content">
            <div class="person-info">
                <div>
                    <div>
                        <div class="person-img">
                            <img v-if="!isLoading" :src="person.photo" :alt="person.name || person.enName">
                            <div v-else class="loading" style="width: 100%; height: 100%"></div>
                        </div>
                    </div>

                    <div class="person-right">
                        <div class="person-name">
                            <span v-if="!isLoading">{{ person.name }}</span>
                            <div v-else class="loading" style="width: 600px; height: 83px;"></div>
                            </div>
                        <div class="person-enName">
                            <span v-if="!isLoading">{{ person.enName }}</span>
                            <div v-else class="loading" style="width: 350px; height: 30px;"></div>
                        </div>

                        <div class="person-table" v-if="!isLoading">
                            <div class="person-table__row" v-if="person.birthday">
                                <div class="person-table__cell--header">
                                    Дата рождения:
                                </div>
                                <div class="person-table__cell">
                                    {{ new Date(person.birthday).toLocaleDateString('ru-RU', {
                                        day: 'numeric', month:
                                            'long', year: 'numeric'
                                    }).replace(/\.$/, '') }}, {{ getZodiacSign(new
                                        Date(person.birthday)) }}
                                </div>
                            </div>

                            <div class="person-table__row" v-if="person.death">
                                <div class="person-table__cell--header">
                                    Дата смерти:
                                </div>
                                <div class="person-table__cell">
                                    {{ new Date(person.death).toLocaleDateString('ru-RU', {
                                        day: 'numeric', month:
                                            'long', year: 'numeric'
                                    }).replace(/\.$/, '') }}
                                </div>
                            </div>

                            <div class="person-table__row" v-if="person?.birthPlace?.length">
                                <div class="person-table__cell--header">
                                    Место рождения:
                                </div>
                                <div class="person-table__cell">
                                    <span v-for="(place, index) in person.birthPlace" :key="index">{{ place.value
                                    }}<span v-if="index < person.birthPlace.length - 1">, </span></span>
                                </div>
                            </div>

                            <div class="person-table__row" v-if="person?.deathPlace?.length">
                                <div class="person-table__cell--header">
                                    Место рождения:
                                </div>
                                <div class="person-table__cell">
                                    <span v-for="(place, index) in person.deathPlace" :key="index">{{ place.value
                                    }}<span v-if="index < person.deathPlace.length - 1">, </span></span>
                                </div>
                            </div>

                            <div class="person-table__row" v-if="person?.profession?.length">
                                <div class="person-table__cell--header">
                                    Карьера:
                                </div>
                                <div class="person-table__cell">
                                    <span v-for="(place, index) in person.profession" :key="index">{{ place.value
                                    }}<span v-if="index < person.profession.length - 1">, </span></span>
                                </div>
                            </div>

                            <div class="person-table__row" v-if="person.sex">
                                <div class="person-table__cell--header">
                                    Пол:
                                </div>
                                <div class="person-table__cell">
                                    {{ person.sex }}
                                </div>
                            </div>

                            <div class="person-table__row" v-if="person.age">
                                <div class="person-table__cell--header">
                                    Возраст:
                                </div>
                                <div class="person-table__cell">
                                    {{ person.age }} {{ pluralizeYears(person.age) }}
                                </div>
                            </div>

                            <div class="person-table__row" v-if="person.growth">
                                <div class="person-table__cell--header">
                                    Рост:
                                </div>
                                <div class="person-table__cell">
                                    {{ person.growth / 100 }} м
                                </div>
                            </div>

                            <div class="person-table__row" v-if="person?.movies?.length">
                                <div class="person-table__cell--header">
                                    Всего фильмов:
                                </div>
                                <div class="person-table__cell">
                                    {{ person.movies.length }}
                                </div>
                            </div>
                        </div>
                        <div v-else class="loading" style="width: 600px; height: 213px; margin-top: 30px;"></div>
                    </div>
                </div>
            </div>

            <div class="person-facts" v-if="person?.facts?.length">
                <div class="facts-title">Интересные факты:</div>

                <div class="facts-cont">
                    <div class="fact" v-for="(fact, index) in person.facts" :key="index">
                        <img src="../assets/Media/PersonPage/fact.svg" alt="">
                        <span v-for="(item, itemIndex) in processFact(fact.value)" :key="itemIndex">
                            <template v-if="item.type === 'text'">
                                {{ item.content }}
                            </template>
                            <template v-else-if="item.type === 'link'">
                                <template v-if="item.newTab">
                                    <a :href="item.to" :class="item.class" target="_blank" rel="noopener noreferrer">{{
                                        item.content }}</a>
                                </template>
                                <template v-else>
                                    <router-link :to="item.to" :class="item.class">{{ item.content }}</router-link>
                                </template>
                            </template>
                        </span>
                    </div>
                </div>
            </div>

            <div class="person-movies" v-if="person?.movies?.length > 3">
                <div class="person_movies-title">Фильмы</div>

                <div class="person_movies-cont">
                    <PersonMovieCard v-for="(movie, index) in displayedMovies" :key="index" :id="movie.id"
                        :name="movie.name" :enName="movie.alternativeName" :rating="movie.rating"
                        :role="movie.description" />

                    <div v-if="displayedMovies.length < notNullRatingMovies.length" class="person_movie-loadmore">
                        <button @click="loadMore">Загрузить еще</button>
                    </div>
                </div>
            </div>
        </div>

        <UpArrow />
    </main>
</template>

<script>
import PersonMovieCard from "@/Components/PersonMovieCard.vue";
import UpArrow from "@/Components/UpArrow.vue";
import { fetchActor } from "@/Services/apiService";

export default {
    data() {
        return {
            person: {},
            notNullRatingMovies: [],
            displayedCount: 10,
            isLoading: false
        }
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    methods: {
        getZodiacSign(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;

            if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
                return "Козерог";
            } else if ((month == 1 && day >= 21) || (month == 2 && day <= 19)) {
                return "Водолей";
            } else if ((month == 2 && day >= 20) || (month == 3 && day <= 20)) {
                return "Рыбы";
            } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
                return "Овен";
            } else if ((month == 4 && day >= 21) || (month == 5 && day <= 21)) {
                return "Телец";
            } else if ((month == 5 && day >= 22) || (month == 6 && day <= 21)) {
                return "Близнецы";
            } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
                return "Рак";
            } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
                return "Лев";
            } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
                return "Дева";
            } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
                return "Весы";
            } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
                return "Скорпион";
            } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
                return "Стрелец";
            }
        },
        pluralizeYears(age) {
            const lastDigit = age % 10;
            const lastTwoDigits = age % 100;

            if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
                return "лет";
            }
            if (lastDigit === 1) {
                return "год";
            }
            if (lastDigit >= 2 && lastDigit <= 4) {
                return "года";
            }
            return "лет";
        },
        processFact(fact) {
            const regex = /<a href="\/name\/(\d+)\/" class="([^"]*)">([^<]*)<\/a>/g;
            const result = [];
            let match;
            let lastIndex = 0;

            while ((match = regex.exec(fact)) !== null) {
                if (match.index > lastIndex) {
                    result.push({ type: 'text', content: fact.substring(lastIndex, match.index) });
                }

                const personId = match[1];

                result.push({
                    type: 'link',
                    to: `/person/${personId}`,
                    class: match[2],
                    content: match[3],
                    newTab: true
                });

                lastIndex = regex.lastIndex;
            }

            if (lastIndex < fact.length) {
                result.push({ type: 'text', content: fact.substring(lastIndex) });
            }

            return result;
        },
        loadMore() {
            this.displayedCount += 40;
        },
    },
    computed: {
        displayedMovies() {
            return this.notNullRatingMovies.slice(0, this.displayedCount);
        },
    },
    async mounted() {
        window.scrollTo(0, 0);
        this.isLoading = true;
        this.person = await fetchActor(this.id);
        document.title = this.person.name || this.person.enName
        this.isLoading = false;
        this.notNullRatingMovies = this.person?.movies?.filter(el => el.rating != null)
    },
    components: {
        PersonMovieCard,
        UpArrow
    }
}
</script>

<style scoped>
main {
    color: white;
}

.main-content {
    display: flex;
}

.person-info {
    width: 85%;
    margin-top: 40px;

    &>div {
        display: flex;
    }
}

.person-right {
    margin-left: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.person-img {
    width: 395px;
    height: 539px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    border-radius: 10px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        display: block;
    }
}

.person-name {
    font-weight: 900;
    font-size: 65px;
}

.person-enName {
    font-weight: 500;
    font-size: 25px;
    margin-top: 10px;
}

.person-table {
    margin-top: 30px;
}

.person-table__row {
    display: grid;
    grid-template-columns: 160px 1fr;
    padding-right: 30px;
    align-items: center;
}

.person-table__cell--header {
    font-size: 18px;
    font-weight: 500;
    margin-top: 15px;
    color: white;
}

.person-table__cell {
    font-size: 18px;
    font-weight: 400;
    margin-top: 15px;
    color: #f2f60f;
}

.person-facts {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.facts-title {
    font-weight: 900;
    font-size: 65px;
}

.facts-cont {
    margin-top: 10px;
}

.fact {
    width: 100%;
    margin-top: 25px;
    background-color: #191E2E;
    padding: 45px 30px 30px 30px;
    border-radius: 10px;
    position: relative;

    img {
        position: absolute;
        top: -8px;
        left: 29px;
        pointer-events: none;
    }

    a {
        color: #3657cb;
    }
}

.person-movies {
    width: 100%;
    margin-top: 60px;
}

.person_movies-title {
    font-weight: 900;
    font-size: 65px;
}

.person_movie-loadmore {
    display: flex;
    justify-content: center;
    margin-top: 50px;

    button {
        border: 1px solid white;
        border-radius: 10px;
        background: transparent;
        color: white;
        padding: 20px 30px;
        user-select: none;
        cursor: pointer;
    }
}
</style>