<script setup lang="ts">
import { withoutTrailingSlash, joinURL } from 'ufo'
import type { BlogPost } from '~/types'
import Giscus from '@giscus/vue'
import {NuxtImg} from "#components";

const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => queryContent<BlogPost>(route.path).findOne())
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('/posts')
  .where({ _extension: 'md' })
  .without(['body', 'excerpt'])
  .sort({ date: -1 })
  .findSurround(withoutTrailingSlash(route.path))
, { default: () => [] })

const title = post.value.head?.title || post.value.title
const description = post.value.head?.description || post.value.description

if(post.value.canonical) {
  useHead({
    link: [
      { rel: 'canonical', href: post.value.canonical }
    ]
  })
}

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
    <NuxtImg v-if="post.image?.src" :src="post.image.src" :alt="post.image.alt" class="mt-8 w-full object-cover rounded-lg aspect-[16/9]"/>
    <UPageHeader :title="post.title" :description="post?.lead">
      <template #headline>
        <UBadge v-bind="post.badge" variant="subtle" />
        <span class="text-gray-500 dark:text-gray-400">&middot;</span>
        <time class="text-gray-500 dark:text-gray-400">{{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
      </template>

      <div class="flex flex-wrap items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in post.authors"
          :key="index"
          :to="author.to"
          color="white"
          target="_blank"
          size="sm"
        >
          <UAvatar v-bind="author.avatar" :alt="author.name" size="2xs" :as="NuxtImg"/>

          {{ author.name }}
        </UButton>
      </div>
    </UPageHeader>

    <UPage :ui="{ right: 'sticky top-[--header-height] bg-background/75 backdrop-blur group -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))] z-10'}">
      <UPageBody>
        <ContentRenderer v-if="post && post.body" :value="post" class="prose prose-primary dark:prose-invert max-w-none" />

        <div class="block sm:hidden">
          <Tags :tags="post.tags"></Tags>
          <SocialsShare/>
        </div>

        <hr v-if="surround?.length">

        <UContentSurround :surround="surround" />

      </UPageBody>

      <template #right>
        <UContentToc v-if="post.body && post.body.toc" :links="post.body.toc.links" :ui="{ wrapper: ''}"/>
        <div class="hidden sm:block">
          <Tags :tags="post.tags"></Tags>
          <SocialsShare/>
        </div>
      </template>
    </UPage>
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
      crossorigin="anonymous">
    </Giscus>
  </UContainer>
</template>

<style scoped>
img {
  view-transition-name: selected-post;
}
</style>
