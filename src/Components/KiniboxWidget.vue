<template>
  <div class="kinobox_player"></div>
</template>

<script setup>
import { onMounted, watch } from 'vue';

const props = defineProps({
  kinopoiskId: {
    type: String,
    required: true,
  },
});

const initializeKbox = async (kinopoiskId) => {
  const playerElement = document.querySelector('.kinobox_player');
  if (playerElement) {
    playerElement.innerHTML = '';
  }

  await kbox(".kinobox_player", {
    search: {
      kinopoisk: kinopoiskId,
    },
  });
};

onMounted(async () => {
  await initializeKbox(props.kinopoiskId);
});

watch(
  () => props.kinopoiskId,
  async (newKinopoiskId) => {
    await initializeKbox(newKinopoiskId);
  }
);
</script>

