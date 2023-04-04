<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
// useHead({
//   title: 'BucksTrybe Pay - Simplify Group Contributions, Save Together and Bond Better',
//   meta: [
//     { name: 'description', content: 'BucksTrybe is an all-encompassing solution for groups and couples who want to save collectively.' },
//     {
//       name: 'theme-color',
//       content: computed(() => isDark.value ? '#000' : '#ffffff'),
//     },
//   ],
//   link: [
//     {
//       rel: 'icon',
//       type: 'image/ico',
//       href: computed(() => preferredDark.value ? '/favicon``.ico' : '/favicon.ico'),
//     },
//   ],
// })
// </script>

<template>
  <RouterView />
</template>
