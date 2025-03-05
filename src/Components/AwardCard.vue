<template>
    <div class="award_card">
        <div>
            <div class="award_card-img" v-if="award.imageUrl">
                <img :src="award.imageUrl" alt="" />
            </div>
        </div>
        <div :style="award.imageUrl ? 'max-width: 250px;' : 'width: fit-content;'">
            <div class="award_card-name">{{ award.name }}</div>
            <div class="award_card-nominationName">{{ award.nominationName }}</div>
            <div class="award_card-year">{{ award.year }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        award: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>
.award_card{
    width: 370px;
    background-color: #3657CB4D;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
}

.award_card-img img{
    height: 100px;
    margin-right: 20px;
}

.award_card-right{
    margin-left: 30px;
}

.award_card-name{
font-size: 18px;
font-weight: 600;
line-height: 22.01px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #FFFFFF;
}

.award_card-nominationName{
font-size: 16px;
font-weight: 400;
line-height: 19.04px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
    color: #F2F60F;
}

.award_card-year{
font-size: 14px;
font-weight: 400;
line-height: 16.66px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #FFFFFFB2;
}
</style>