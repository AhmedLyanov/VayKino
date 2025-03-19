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
                                <input type="text" placeholder="Полное или частичное название">
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
                                <VueSelect v-model="selectedYear" :options="optionsGenre" :placeholder="'Жанр'"
                                    :is-multi="true" :isSearchable="false" :class="'input'" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            selectedYear: 0,
            selectedFromYear: 0,
            selectedToYear: 0,
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