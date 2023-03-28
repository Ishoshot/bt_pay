<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <nav text-xl mt-6 flex flex-col justify-between h-20>
    <button
      class="icon-btn mx-2 !outline-none text-2xl"
      :title="t('button.toggle_dark')"
      @click="toggleDark()"
    >
      <div i="carbon-sun dark:carbon-moon" />
    </button>
  </nav>
</template>
