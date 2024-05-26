<script setup lang="ts">
import {NuxtImg} from "#components";

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
})

</script>

<template>
  <UContainer>
    <UPageHero
      v-if="page"
      :title="page.title"
      :description="page.description"
      align="left"
      :ui="{wrapper: 'py-8 sm:py-8 lg:py-8'}"
    >
      <img
        src="/images/bordeaux_1.jpg"
        class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        alt="Picture of Place de la Bourse (Bordeaux) at night."/>
    </UPageHero>
    <UPage>
      <UPageBody prose>
        <ContentRenderer :value="page" />
        <UAvatar
          src="/images/profile.png"
          alt="Picture of Alexandre Nédélec"
          size="3xl"
          :ui="{size: {'3xl': 'h-44 w-44 text-3xl' } }"
          class="w-full"
          :as="NuxtImg"
        />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
