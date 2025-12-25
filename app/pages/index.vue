<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('index').first())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <div v-if="page">
    <UPageHero
      :title="page.hero?.title || page.title"
      :description="page.hero?.description || page.description"
      :links="page.hero?.links"
      :ui="{
        title: 'text-4xl sm:text-5xl lg:text-6xl text-center',
        description: 'text-lg sm:text-xl text-gray-600 dark:text-gray-300 text-center',
        headline: 'mb-8'
      }"
    >
      <template #headline>
        <NuxtImg
          src="/images/profile.png"
          alt="Picture of Alexandre Nédélec"
          width="288"
          height="288"
          class="mx-auto h-56 w-56 md:h-72 md:w-72 rounded-full object-cover"
        />
      </template>
    </UPageHero>

    <UPageSection
      v-if="page.roles"
      :title="page.roles.title"
      :description="page.roles.description"
      :ui="{
        title: 'text-3xl sm:text-4xl',
        description: 'text-lg text-gray-600 dark:text-gray-300'
      }"
    >
      <UPageGrid>
        <UPageCard
          v-for="(item, index) in page.roles.items"
          :key="index"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          :to="item.to"
          :target="item.target"
          spotlight
          :ui="{
            title: 'text-xl font-semibold',
            description: 'text-base text-gray-600 dark:text-gray-400',
            leadingIcon: 'size-8'
          }"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection>
      <div class="text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          You can find me on
        </h2>
        <div class="flex flex-wrap justify-center gap-8">
          <SocialLinks icon-class="text-white" />
        </div>
      </div>
    </UPageSection>

    <UPageSection
      v-for="section in page.sections"
      :key="section.id"
      :title="section.title"
      :description="section.description"
      :orientation="section.orientation"
      :reverse="section.reverse"
      :features="section.features"
      :ui="{
        title: 'text-3xl sm:text-4xl',
        description: 'text-lg text-gray-600 dark:text-gray-300'
      }"
    >
      <NuxtLink
        v-if="section.image?.src"
        :to="section.image.to"
        :target="section.image.target"
        class="block"
      >
        <NuxtImg
          :src="section.image.src"
          :alt="section.image.alt"
          class="mx-auto max-w-[320px] sm:max-w-[420px] md:max-w-[500px]"
          loading="lazy"
        />
      </NuxtLink>
    </UPageSection>

    <UPageSection v-if="page.cta">
      <UPageCTA
        :title="page.cta.title"
        :description="page.cta.description"
        :links="page.cta.links"
        variant="subtle"
        :ui="{
          title: 'text-3xl sm:text-4xl',
          description: 'text-lg text-muted'
        }"
      />
    </UPageSection>
  </div>
</template>
