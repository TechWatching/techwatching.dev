<script setup lang="ts">
import { NuxtImg } from '#components'

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryCollection('content').path(route.path).first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <UContainer>
    <UPageHero
      v-if="page"
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :ui="{ container: 'gap-8 sm:gap-12 lg:gap-16 py-8 sm:py-12 lg:py-16', wrapper: 'py-0', title: 'text-4xl sm:text-5xl', description: 'text-lg text-muted' }"
    >
      <NuxtImg
        src="/images/bordeaux_1.jpg"
        alt="Picture of Place de la Bourse (Bordeaux) at night."
        class="w-full rounded-md shadow-xl"
        width="800"
        height="533"
        quality="90"
      />
    </UPageHero>
    <UPage>
      <UPageBody prose>
        <ContentRenderer v-if="page" :value="page" />
        <div class="flex justify-center mt-8">
          <UAvatar
            src="/images/profile.png"
            alt="Picture of Alexandre Nédélec"
            :width="176"
            :height="176"
            :ui="{ root: 'size-44' }"
          />
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
