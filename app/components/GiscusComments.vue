<script setup lang="ts">
import Giscus from '@giscus/vue'

const colorMode = useColorMode()
const theme = computed(() => colorMode.value === 'dark' ? 'dark' : 'light')
</script>

<template>
  <Giscus
    repo="techwatching/techwatching.dev"
    repo-id="R_kgDOGPrzmQ"
    category="Announcements"
    category-id="DIC_kwDOGPrzmc4B_fVQ"
    mapping="pathname"
    strict="0"
    reactions-enabled="1"
    emit-metadata="0"
    input-position="top"
    :theme="theme"
    loading="lazy"
    crossorigin="anonymous"
  />
</template>
