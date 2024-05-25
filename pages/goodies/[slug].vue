<script setup lang="ts">
import { withoutTrailingSlash, joinURL } from 'ufo'
import type { BlogPost } from '~/types'
import Giscus from '@giscus/vue'

const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => queryContent<BlogPost>(route.path).findOne())
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('/posts')
  .where({ _extension: 'md' })
  .without(['body', 'excerpt'])
  .sort({ date: -1 })
  .findSurround(withoutTrailingSlash(route.path))
, { default: () => [] })

const title = post.value.head?.title || post.value.title
const description = post.value.head?.description || post.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})

if (post.value.image?.src) {
  const site = useSiteConfig()

  useSeoMeta({
    ogImage: joinURL(site.url, post.value.image.src),
    twitterImage: joinURL(site.url, post.value.image.src)
  })
} else {
  defineOgImage({
    component: 'Saas',
    title,
    description,
    headline: 'Blog'
  })
}

const colorMode = useColorMode()
const theme = computed(() => colorMode.value == "dark" ? "" : "light")
</script>

<template>
  <UContainer v-if="post">
    <img v-if="post.image?.src" :src="post.image.src" :alt="post.image.alt" class="mt-8 w-full object-cover rounded-lg aspect-[16/9]">
    <UPageHeader :title="post.title" :description="post?.lead"/>

    <UPage>
      <UPageBody prose>
        <ContentRenderer v-if="post && post.body" :value="post" />

        <hr v-if="surround?.length">

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template #right>
        <UContentToc v-if="post.body && post.body.toc" :links="post.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>

<style scoped>
img {
  view-transition-name: selected-article;
}
</style>
