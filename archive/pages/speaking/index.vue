<script setup lang="ts">
const title = 'Public speaking'
const description = ''

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description
})
</script>

<template>
  <UContainer>
    <UPageHeader :title="title" :description="description"/>
    <UPageBody>
      {{ 'Coming soon' }}
    </UPageBody>
  </UContainer>
</template>
