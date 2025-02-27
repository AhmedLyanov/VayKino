<template>
    <div class="slider-container" ref="container" v-if="data.length">
        <div class="slider-wrapper" :style="{ transform: `translateX(-${currentSlide * sWidth}px)` }">
            <div class="slide" :style="{ minWidth: `${sWidth}px`, gridTemplateColumns: `repeat(${cardsPerPage}, 340px)` }" v-for="(slide, index) in slides" :key="index">
                <Card v-for="(cardData, cardIndex) in slide" :key="cardIndex" :data="cardData" :contextMenu="false" />
            </div>
        </div>

        <div class="slider-controls">
            <button :style="currentSlide !== 0 ? 'cursor: pointer' : 'cursor: default'" class="arrow_button"
                @click="prevSlide">
                <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.939341 10.9392C0.353554 11.525 0.353554 12.4748 0.939341 13.0605L10.4853 22.6065C11.0711 23.1923 12.0208 23.1923 12.6066 22.6065C13.1924 22.0207 13.1924 21.0709 12.6066 20.4852L4.12132 11.9999L12.6066 3.5146C13.1924 2.92881 13.1924 1.97906 12.6066 1.39328C12.0208 0.807489 11.0711 0.807489 10.4853 1.39328L0.939341 10.9392ZM27 10.4999L2 10.4999V13.4999L27 13.4999V10.4999Z"
                        :fill="currentSlide !== 0 ? 'white' : 'grey'" />
                </svg>
            </button>
            <span class="slide-counter">{{ currentSlide + 1 }} / {{ slides.length }}</span>
            <button :style="currentSlide + 1 !== slides.length ? 'cursor: pointer' : 'cursor: default'"
                class="arrow_button" @click="nextSlide">
                <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M26.0607 13.0605C26.6464 12.4748 26.6464 11.525 26.0607 10.9392L16.5147 1.39328C15.9289 0.807489 14.9792 0.807489 14.3934 1.39328C13.8076 1.97906 13.8076 2.92881 14.3934 3.5146L22.8787 11.9999L14.3934 20.4852C13.8076 21.0709 13.8076 22.0207 14.3934 22.6065C14.9792 23.1923 15.9289 23.1923 16.5147 22.6065L26.0607 13.0605ZM0 13.4999L25 13.4999V10.4999L0 10.4999L0 13.4999Z"
                        :fill="currentSlide + 1 !== slides.length ? 'white' : 'grey'" />
                </svg>
            </button>
        </div>
    </div>

    <div class="slider-container" ref="container" v-else>
        <div class="slider-wrapper" :style="{ transform: `translateX(-${currentSlide * sWidth}px)` }">
            <div class="slide" :style="{ minWidth: `${sWidth}px`, gridTemplateColumns: `repeat(${cardsPerPage}, 340px)` }">
                <Card v-for="index in 4" :key="index" :data="{}" />
            </div>
        </div>

        <div class="slider-controls">
            <button :style="currentSlide !== 0 ? 'cursor: pointer' : 'cursor: default'" class="arrow_button"
                @click="prevSlide">
                <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.939341 10.9392C0.353554 11.525 0.353554 12.4748 0.939341 13.0605L10.4853 22.6065C11.0711 23.1923 12.0208 23.1923 12.6066 22.6065C13.1924 22.0207 13.1924 21.0709 12.6066 20.4852L4.12132 11.9999L12.6066 3.5146C13.1924 2.92881 13.1924 1.97906 12.6066 1.39328C12.0208 0.807489 11.0711 0.807489 10.4853 1.39328L0.939341 10.9392ZM27 10.4999L2 10.4999V13.4999L27 13.4999V10.4999Z"
                        :fill="currentSlide !== 0 ? 'white' : 'grey'" />
                </svg>
            </button>
            <span class="slide-counter">{{ currentSlide + 1 }} / {{ slides.length }}</span>
            <button :style="currentSlide + 1 !== slides.length ? 'cursor: pointer' : 'cursor: default'"
                class="arrow_button" @click="nextSlide">
                <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M26.0607 13.0605C26.6464 12.4748 26.6464 11.525 26.0607 10.9392L16.5147 1.39328C15.9289 0.807489 14.9792 0.807489 14.3934 1.39328C13.8076 1.97906 13.8076 2.92881 14.3934 3.5146L22.8787 11.9999L14.3934 20.4852C13.8076 21.0709 13.8076 22.0207 14.3934 22.6065C14.9792 23.1923 15.9289 23.1923 16.5147 22.6065L26.0607 13.0605ZM0 13.4999L25 13.4999V10.4999L0 10.4999L0 13.4999Z"
                        :fill="currentSlide + 1 !== slides.length ? 'white' : 'grey'" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import Card from './Card.vue';

export default {
    components: {
        Card,
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            cardsPerPage: 4,
            currentSlide: 0,
            sliderWidthPercentage: 0.8,
            cardWidth: 340,
            sWidth: null
        };
    },
    computed: {
        slides() {
            const slides = [];
            for (let i = 0; i < this.data.length; i += this.cardsPerPage) {
                slides.push(this.data.slice(i, i + this.cardsPerPage));
            }
            return slides;
        },
        slideWidth() {
            return this.sliderWidth;
        },
        sliderWidth() {
            return Math.min(1920 * this.sliderWidthPercentage, this.cardsPerPage * this.cardWidth);
        },
    },
    created() {
        window.addEventListener("resize", this.screenWidth);
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        this.screenWidth();
    },
    destroyed() {
        window.removeEventListener("resize", this.screenWidth);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        nextSlide() {
            if (this.currentSlide < this.slides.length - 1) {
                this.currentSlide++;
            }
        },
        prevSlide() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
            }
        },
        handleResize() {
            this.$forceUpdate();
        },
        screenWidth() {
            this.sWidth = this.$refs.container?.offsetWidth + 0.44;
            this.cardsPerPage = Math.floor(this.sWidth / 340)
        },
    },
    watch: {
        data(newValue, oldValue) {
            if (newValue && newValue.length > 0) {
                this.currentSlide = 0;
            }
        },
    }
};
</script>

<style scoped>
.slider-container {
    overflow: hidden;
    position: relative;
    margin-top: 20px;
}

.slider-wrapper {
    display: flex;
    transition: transform 0.3s ease-in-out;
    position: relative;
}

.slide {
    justify-content: space-between;
    display: grid;
    /* grid-template-columns: repeat(4, 340px); */
}

.slider-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.arrow_button {
    background: transparent;
    border: none;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
}

.arrow-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.slide-counter {
    color: #ccc;
    font-size: 18px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>