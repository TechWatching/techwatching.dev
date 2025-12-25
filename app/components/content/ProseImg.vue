<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  width?: string | number
  height?: string | number
}>()
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    loading="lazy"
    format="webp"
    quality="80"
    sizes="100vw sm:80vw md:720px lg:800px"
    class="rounded-lg"
  />
</template>
