<script setup lang="ts">
const {data: page} = await useAsyncData('index', () => queryContent('/').findOne())
if (!page.value) {
  throw createError({statusCode: 404, statusMessage: 'Page not found', fatal: true})
}

useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
})
</script>

<template>
  <div v-if="page">
    <ULandingHero :title="page.hero.title" :description="page.hero.description" :links="page.hero.links"
                  :ui="{description: 'text-primary dark:text-primary'}">
      <template #headline>
        <UAvatar
          src="/images/profile.png"
          alt="Picture of Alexandre Nédélec"
          size="3xl"
          :ui="{size: {'3xl': 'h-72 w-72' } }"
        />
      </template>
    </ULandingHero>

    <ULandingSection :title="page.roles.title" :description="page.roles.description"
                     :ui="{description: 'text-primary dark:text-primary'}">
      <UPageGrid>
        <ULandingCard v-for="(item, index) in page.roles.items" :key="index" v-bind="item"
                      :ui="{ icon: { base: 'text-primary dark:text-primary' } }"/>
      </UPageGrid>
    </ULandingSection>

    <ULandingSection>
      <ULandingLogos title="You can find me on" align="center" :ui="{ images: 'justify-center sm:justify-between'}">
        <SocialLinks/>
      </ULandingLogos>
    </ULandingSection>

    <ULandingSection
      v-for="section in page.sections"
      :key="section.id"
      :title="section.title"
      :description="section.description"
      :align="section.align"
      :features="section.features"
    >
      <NuxtLink v-if="section.image?.src" :to="section.image.to" :target="section.image.target">
        <NuxtImg :src="section.image.src" sizes="10vw" :alt="section.image.alt"/>
      </NuxtLink>
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA v-bind="page.cta" class="bg-gray-100/50 dark:bg-gray-800/50"/>
    </ULandingSection>
  </div>

</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image: linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
  linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}

.dark {
  .landing-grid {
    background-image: linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}
</style>
