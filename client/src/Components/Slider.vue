<template>
    <div class="container_card_slide">
        <div class="card_slide" ref="slider" :style="{ transform: `translateX(-${currentSlide * (100 / maxSlides.value)}%)` }">
            <Card v-for="(item, index) in items" :key="index" :data="item" />
        </div>
        <div class="slider_controls">
            <button :style="currentSlide !== 0 ? 'cursor: pointer' : 'cursor: default'" class="arrow_button left"
                @click="prevSlide">
                <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.939341 10.9392C0.353554 11.525 0.353554 12.4748 0.939341 13.0605L10.4853 22.6065C11.0711 23.1923 12.0208 23.1923 12.6066 22.6065C13.1924 22.0207 13.1924 21.0709 12.6066 20.4852L4.12132 11.9999L12.6066 3.5146C13.1924 2.92881 13.1924 1.97906 12.6066 1.39328C12.0208 0.807489 11.0711 0.807489 10.4853 1.39328L0.939341 10.9392ZM27 10.4999L2 10.4999V13.4999L27 13.4999V10.4999Z"
                        :fill="currentSlide !== 0 ? 'white' : 'grey'" />
                </svg>
            </button>
            <div class="slide_counter">
                {{ currentSlide + 1 }} / {{ maxSlides + 1 }}
            </div>
            <button :style="currentSlide != maxSlides ? 'cursor: pointer' : 'cursor: default'"
                class="arrow_button right" @click="nextSlide">
                <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M26.0607 13.0605C26.6464 12.4748 26.6464 11.525 26.0607 10.9392L16.5147 1.39328C15.9289 0.807489 14.9792 0.807489 14.3934 1.39328C13.8076 1.97906 13.8076 2.92881 14.3934 3.5146L22.8787 11.9999L14.3934 20.4852C13.8076 21.0709 13.8076 22.0207 14.3934 22.6065C14.9792 23.1923 15.9289 23.1923 16.5147 22.6065L26.0607 13.0605ZM0 13.4999L25 13.4999V10.4999L0 10.4999L0 13.4999Z"
                        :fill="currentSlide != maxSlides ? 'white' : 'grey'" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import { nextTick } from 'vue';
import Card from './Card.vue';

export default {
    components: {
        Card
    },
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            items: this.data,
            currentSlide: 0,
            itemsPerSlide: 4,
            slider: null
        };
    },
    computed: {
        maxSlides() {
            return Math.ceil(this.items.length / this.itemsPerSlide) - 1;
        }
    },
    methods: {
        nextSlide() {
            if (this.currentSlide < this.maxSlides) {
                this.currentSlide++;
            }
        },
        prevSlide() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
            }
        },
        updateSliderPosition() {
            if (this.slider) {
                const offset = -this.currentSlide * 100;
                this.slider.style.transition = 'transform 0.5s ease-in-out';
                this.slider.style.transform = `translateX(${offset}%)`;
            }
        }
    },
    watch: {
        currentSlide() {
            this.updateSliderPosition();
        }
    },
    mounted() {
        nextTick(() => {
            this.slider = this.$refs.slider;
            this.updateSliderPosition();
        });
    }
};
</script>


<style scoped>
.container_card_slide {
    position: relative;
    overflow: hidden;
    margin-top: 20px;
}

.card_slide {
    display: flex;
    transition: transform 0.5s ease;
    gap: 54px;
}

.slider_controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.arrow_button {
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #ccc;
    height: 24px;
}

.slide_counter {
    color: #ccc;
    font-size: 18px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>