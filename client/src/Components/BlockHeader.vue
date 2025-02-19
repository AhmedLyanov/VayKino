<template>
    <div class="block_header">
        <div class="block_header-title">{{ title }}</div>

        <div v-if="text" class="block_header-btn" @click="this.$router.push({ path: link })">{{ text }} <span>→</span></div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: [String, Boolean],
            required: true,
        },
        link: {
            type: [String, Boolean],
            required: true,
        },
    }
}
</script>

<style scoped>
.block_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 60px;
}

.block_header-title {
    color: white;
    font-size: 65px;
    font-weight: 900;
    line-height: 82.81px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    height: 100px;
}

.block_header-btn {
    font-size: 22px;
    font-weight: 600;
    line-height: 27.26px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: white;
    cursor: pointer;
    user-select: none;

    span {
        margin-left: 15px;
        font-family: serif;
        font-size: 25px;
    }
}
</style>