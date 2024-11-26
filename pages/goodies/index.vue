<script setup lang="ts">
import type {BlogPost} from "~/types";

const { data: articles } = await useAsyncData('goodies', () => queryContent<BlogPost>('/goodies')
  .where({ _extension: 'md' })
  .sort({ date: -1 })
  .find())

const title = 'Goodies'
const description = 'Some things you might find useful.'

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description
})

const activeArticle = useState()
</script>

<template>
  <UContainer>
    <UPageHeader :title="title" :description="description"/>
    <UPageBody>
      <UBlogList>
        <UBlogPost
v-for="(article, index) in articles"
          :key="index"
          :to="article._path"
          :title="article.title"
          :description="article.description"
          :image="article.image"
          orientation="horizontal"
          class="col-span-full"
          :class="activeArticle === index && 'active'"
          :ui="{ title: 'text-3xl', description: 'text-xl'}"
          @click="activeArticle = index"
        />
      </UBlogList>
    </UPageBody>
  </UContainer>
</template>

<style scoped>
  .active {
    view-transition-name: selected-article;
    contain: layout;
  }
</style>
