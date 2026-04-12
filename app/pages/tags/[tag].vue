<script setup lang="ts">
const route = useRoute()

const tagSlug = route.params.tag as string

const { data: tagsBySlug } = await useFetch<[string, string][]>('/api/tags.json')
const tag = new Map<string, string>(tagsBySlug.value)?.get(tagSlug) ?? ''

const { data: posts } = await useAsyncData(`tags-${tag}`, () =>
  queryCollection('posts')
    .where('tags', 'LIKE', `%${tag}%`)
    .order('date', 'DESC')
    .all()
)

const title = computed(() => `${tag.charAt(0).toUpperCase()}${tag.slice(1)}`)
const description = computed(() => `List of articles about ${tag}`)

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')

const activePost = useState<number | null>('activePost', () => null)
</script>

<template>
  <UContainer>
    <UPageHeader
      :title="title"
      :description="description"
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
          :badge="post.badge"
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
