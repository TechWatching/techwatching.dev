<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('blog', () => queryCollection('blog').first())
const { data: posts } = await useAsyncData(route.path, () => queryCollection('posts').order('date', 'DESC').all())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')

const activePost = useState<number | null>('activePost', () => null)

// Map badge labels to colors for visual variety
const badgeColors: Record<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
  development: 'primary',
  tips: 'success',
  tutorial: 'warning',
  essay: 'warning',
  devops: 'error',
  tip: 'success',
  announcement: 'error'
}

function getBadgeWithColor(badge: any) {
  if (!badge) return undefined
  if (typeof badge === 'string') {
    const color = badgeColors[badge.toLowerCase()] || 'primary'
    return { label: badge, color, variant: 'subtle' }
  }
  // If badge is already an object, add color if not present
  const label = badge.label || badge
  const color = badge.color || badgeColors[String(label).toLowerCase()] || 'primary'
  return { ...badge, color, variant: badge.variant || 'subtle' }
}
</script>

<template>
  <UContainer>
    <UPageHeader
      v-bind="page"
      class="py-[50px]"
    />

    <UPageBody>
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          :to="post.path"
          :title="post.title"
          :description="post.description"
          :image="post.image"
          :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
          :authors="post.authors"
          :badge="getBadgeWithColor(post.badge)"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full', activePost === index && 'active']"
          variant="naked"
          :ui="{
            description: 'line-clamp-2'
          }"
          @click="activePost = index"
        />
      </UBlogPosts>
    </UPageBody>
  </UContainer>
</template>

<style scoped>
.active {
  view-transition-name: selected-post;
  contain: layout;
}
</style>
