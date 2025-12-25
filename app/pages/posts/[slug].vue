<script setup lang="ts">
import { joinURL } from 'ufo'

const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => queryCollection('posts').path(route.path).first())
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('posts', route.path, {
    fields: ['description']
  })
})

const title = post.value.seo?.title || post.value.title
const description = post.value.seo?.description || post.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

// Schema.org Article markup for rich snippets
useSchemaOrg([
  defineArticle({
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: post.value.date,
    image: post.value.image?.src,
    author: {
      '@type': 'Person',
      name: 'Alexandre Nédélec',
      url: 'https://techwatching.dev/about'
    }
  })
])

// OG Image: use post cover image if available, otherwise generate one
if (post.value.image?.src) {
  const site = useSiteConfig()
  useSeoMeta({
    ogImage: joinURL(site.url, post.value.image.src),
    twitterImage: joinURL(site.url, post.value.image.src)
  })
} else {
  defineOgImageComponent('Saas', {
    headline: 'Blog'
  })
}
</script>

<template>
  <UContainer v-if="post">
    <NuxtImg
      v-if="post.image?.src"
      :src="post.image.src"
      :alt="post.title"
      class="post-cover-image w-full rounded-lg shadow-lg mb-8"
    />

    <UPageHeader
      :title="post.title"
      :description="post.description"
    >
      <template #headline>
        <UBadge
          v-bind="post.badge"
          variant="subtle"
        />
        <span class="text-muted">&middot;</span>
        <time class="text-muted">{{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
      </template>

      <div class="flex flex-wrap items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in post.authors"
          :key="index"
          :to="author.to"
          color="neutral"
          variant="subtle"
          target="_blank"
          size="sm"
        >
          <UAvatar
            v-bind="author.avatar"
            alt="Author avatar"
            size="2xs"
          />

          {{ author.name }}
        </UButton>
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <ContentRenderer
          v-if="post"
          :value="post"
        />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />

        <SocialsShare />

        <GiscusComments />
      </UPageBody>

      <template
        v-if="post?.body?.toc?.links?.length"
        #right
      >
        <UContentToc :links="post.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>

<style scoped>
.post-cover-image {
  view-transition-name: selected-post;
  contain: layout;
}
</style>
