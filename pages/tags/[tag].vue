<script setup lang="ts">
import type {BlogPost} from '~/types'

const route = useRoute()

const tagSlug = route.params.tag as string

const { data: tagsBySlug } = await useFetch<[string, string][]>('/api/tags.json')
const tag = new Map<string, string>(tagsBySlug.value)?.get(tagSlug) ?? ''

const {data: posts} = await useAsyncData(`tags-${tag}`, () => queryContent<BlogPost>('/posts')
  .where({tags: {$contains: tag}, _extension: 'md' })
  .sort({ date: -1 })
  .find())

const title = computed(() => `${tag.charAt(0).toUpperCase()}${tag.slice(1)}`)
const description = computed(() => `List of articles about ${tag}`)

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description
})

</script>

<template>
  <UContainer>
    <UPageHeader :title="title" :description="description"/>

    <UPageBody>
      <UBlogList>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          :to="post._path"
          :title="post.title"
          :description="post.description"
          :image="post.image"
          :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
          :authors="post.authors"
          :badge="post.badge"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          :ui="{
            description: 'line-clamp-2'
          }"
        >
        </UBlogPost>
      </UBlogList>
    </UPageBody>
  </UContainer>
</template>
