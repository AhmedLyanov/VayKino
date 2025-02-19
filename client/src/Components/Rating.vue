<template>
    <div class="rating-container">
        <div class="rating" :style="{backgroundColor: colorScale[Math.ceil(rating)]?.dull}">
            <CircleProgress :size="55" :percent="rating * 10" :viewport="true" :show-percent="false"
                :background="'none'" :empty-color="'none'" :fill-color="colorScale[Math.ceil(rating)]?.bright || 'none'" :border-width="9"
                :border-bg-width="9" :linecap="'buff'" />

            <span>{{ rating?.toFixed(2) }}</span>
        </div>

        <div class="rating-label">{{ label }}</div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
export default {
    name: "App",
    components: {
        CircleProgress: CircleProgress,
    },
    props: {
        rating: {
            type: Number,
            required: true,
        },
        label: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            colorScale: {
                1: { bright: "#FF0000", dull: "#FF00004D" },
                2: { bright: "#FF3300", dull: "#FF33004D" },
                3: { bright: "#FF6600", dull: "#FF66004D" },
                4: { bright: "#FF9900", dull: "#FF99004D" },
                5: { bright: "#FFCC00", dull: "#FFCC004D" },
                6: { bright: "#FFFF00", dull: "#FFFF004D" },
                7: { bright: "#CCFF00", dull: "#CCFF004D" },
                8: { bright: "#99FF00", dull: "#99FF004D" },
                9: { bright: "#66FF00", dull: "#66FF004D" },
                10: { bright: "#00FF00", dull: "#00FF004D" },
            }
        }
    }
};
</script>

<style scoped>
.rating-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.rating {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: rgba(153, 255, 0, 0.3);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        position: absolute;
        font-weight: 600;
        font-size: 14px;
        color: white;
        margin-top: -3px;

    }
}

.rating-label {
    font-weight: 500;
    font-size: 15px;
    color: white;
    margin-top: 4px;
}
</style>