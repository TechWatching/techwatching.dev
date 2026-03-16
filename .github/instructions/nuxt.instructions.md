---
name: "nuxt-frontend"
description: "Vue 3 Composition API with <script setup lang=\"ts\">, Nuxt 4 file-based routing in app/pages/, @nuxt/ui component patterns, TailwindCSS utility classes, queryCollection for content fetching, and useSeoMeta/useSchemaOrg for SEO metadata"
applyTo: "**/*.vue"
---

## Component Structure

- Always use `<script setup lang="ts">` — never Options API, `defineComponent`, or `<script>` without `setup`
- Place `<script setup>` before `<template>`, and `<style scoped>` last when needed
- Use `const { data } = await useAsyncData(key, () => queryCollection(...))` — the key should be unique (use `route.path` for dynamic routes)
- Destructure reactive refs directly: `const { data: post } = await useAsyncData(...)` not `const result = await useAsyncData(...); result.data`

```vue
<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('posts').path(route.path).first()
)
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}
</script>
```

## @nuxt/ui Component Usage

- Use `@nuxt/ui` v4 components: `UPageHero`, `UPageSection`, `UPageGrid`, `UPageCard`, `UPageHeader`, `UPageBody`, `UContainer`, `UPage`, `UContentToc`, `UContentSurround`, `UBadge`, `UButton`, `UAvatar`, `USeparator`
- Pass `:ui="{}"` prop objects for layout customization — prefer TailwindCSS utility classes over custom CSS
- Use `NuxtLink` for internal navigation and `NuxtImg` for all images (never `<a>` or `<img>` directly)
- Use `NuxtImg` with explicit `width` and `height` props; add `loading="lazy"` for below-fold images

```vue
<template>
  <UContainer>
    <UPageHeader :title="post.title" :description="post.description">
      <template #headline>
        <UBadge v-bind="post.badge" variant="subtle" />
      </template>
    </UPageHeader>
    <UPage>
      <UPageBody>
        <ContentRenderer :value="post" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
```

## SEO & Schema.org

- Call `useSeoMeta({ title, ogTitle, description, ogDescription })` in every page — read `seo` overrides from content first: `post.value.seo?.title || post.value.title`
- Use `useSchemaOrg([defineArticle({ '@type': 'BlogPosting', ... })])` on post pages
- For OG images: use `joinURL(site.url, post.image.src)` if a cover image exists; otherwise call `defineOgImageComponent('Saas', { headline: 'Blog' })`
- Import `joinURL` from `ufo`, get site config via `const site = useSiteConfig()`

```vue
<script setup lang="ts">
import { joinURL } from 'ufo'
const title = post.value.seo?.title || post.value.title
useSeoMeta({ title, ogTitle: title, description, ogDescription: description })
if (post.value.image?.src) {
  const site = useSiteConfig()
  useSeoMeta({ ogImage: joinURL(site.url, post.value.image.src) })
} else {
  defineOgImageComponent('Saas', { headline: 'Blog' })
}
</script>
```

## Content Fetching

- Use `queryCollection('collectionName')` — collection names match keys in `content.config.ts` exports: `index`, `blog`, `posts`, `goodies`, `goodiesPage`, `speaking`, `content`
- Filter by path: `.path(route.path).first()` for single items, `.all()` for lists
- Order posts by date: `.order('date', 'DESC').all()`
- Use `queryCollectionItemSurroundings('posts', route.path, { fields: ['description'] })` for prev/next post navigation

## View Transitions

- Apply `view-transition-name` in `<style scoped>` for elements that animate between pages
- The `experimental.viewTransition: true` is already enabled in `nuxt.config.ts` — no additional config needed

## Nitro Server Handlers

- Place handlers in `server/api/` (JSON responses) or `server/routes/` (custom response types like RSS)
- Name files with HTTP method suffix: `tags.json.get.ts`, not `tags.json.ts`
- In server context, always pass `event` as the first arg to `queryCollection`: `queryCollection(event, 'posts')`
- Import from `@nuxt/content/server`: `import { queryCollection } from '@nuxt/content/server'`
