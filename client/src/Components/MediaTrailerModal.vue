<template>
    <div class="modal-overlay" v-if="isOpen" @click.self="closeModal">
        <div class="modal">
            <iframe width="100%" height="auto" :src="`https://www.youtube.com/embed/${videoId}`"
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        videoId: {
            type: String,
        }
    },
    mounted() {
        document.addEventListener('keydown', this.handleEsc);
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.handleEsc);
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        handleEsc(event) {
            if (event.key === 'Escape' || event.keyCode === 27) {
                this.closeModal();
            }
        },
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.89);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    width: 80%;

    iframe {
        width: calc(100% - 16px);
        aspect-ratio: 16/9;
        border-radius: 10px;
    }
}
</style>