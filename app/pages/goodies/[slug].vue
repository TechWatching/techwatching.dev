<script setup lang="ts">
import { joinURL } from 'ufo'

const route = useRoute()

const { data: goodie } = await useAsyncData(route.path, () => queryCollection('goodies').path(route.path).first())
if (!goodie.value) {
  throw createError({ statusCode: 404, statusMessage: 'Goodie not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('goodies', route.path, {
    fields: ['description']
  })
})

const title = goodie.value.seo?.title || goodie.value.title
const description = goodie.value.seo?.description || goodie.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

// OG Image: use goodie cover image if available, otherwise generate one
if (goodie.value.image?.src) {
  const site = useSiteConfig()
  useSeoMeta({
    ogImage: joinURL(site.url, goodie.value.image.src),
    twitterImage: joinURL(site.url, goodie.value.image.src)
  })
} else {
  defineOgImageComponent('Saas', {
    headline: 'Goodies'
  })
}
</script>

<template>
  <UContainer v-if="goodie">
    <NuxtImg
      v-if="goodie.image?.src"
      :src="goodie.image.src"
      :alt="goodie.image.alt || goodie.title"
      :width="goodie.image.width"
      :style="goodie.image.maxHeight ? { maxHeight: `${goodie.image.maxHeight}px` } : undefined"
      :class="[
        'goodie-cover-image rounded-lg shadow-lg mb-8',
        goodie.image.width ? 'mx-auto' : 'w-full',
        goodie.image.maxHeight ? 'object-cover w-full' : ''
      ]"
    />

    <UPageHeader
      :title="goodie.title"
      :description="goodie.lead"
    />

    <UPage>
      <UPageBody>
        <ContentRenderer
          v-if="goodie"
          :value="goodie"
        />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template
        v-if="goodie?.body?.toc?.links?.length"
        #right
      >
        <UContentToc :links="goodie.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>

<style scoped>
.goodie-cover-image {
  view-transition-name: selected-goodie;
  contain: layout;
}
</style>
