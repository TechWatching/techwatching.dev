<script lang="ts" setup>
const title = 'Contact'
const description = `If you have any questions or would like to discuss anything, don't hesitate to drop me a line.`

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
      <ContactForm/>
    </UPageBody>
  </UContainer>
</template>
