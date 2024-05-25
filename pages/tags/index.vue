<script setup lang="ts">
import {getTagRoute} from "~/utils/tag";

const { data: tags } = await useAsyncData('tags', () => queryContent<{ tags: string[]}>('/posts')
  .where({ _extension: 'md' })
  .only('tags')
  .find())

if (!tags.value) {
  throw createError({ statusCode: 404, statusMessage: 'Tags not found', fatal: true})
}

const tagOccurences = computed(() => {
    // count each tag occurence and sort them descending
    const occurences = tags.value
      ?.flatMap(t => t.tags ?? [])
      .reduce((acc, tag) => {
        acc.set(tag, (acc.get(tag) || 0) + 1)
        return acc;
      }, new Map<string, number>()) ?? new Map<string, number>()
    return [...occurences.entries()]
      .sort(([tagA, occurenceA], [tagB, occurenceB]) => occurenceB - occurenceA)
  });

const title = 'Tags'
const description = 'All tags used in this blog'

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description
})

</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader :title="title" :description="description"/>
      <UPageBody>
        <div class="flex flex-wrap place-content-evenly gap-5 mt-4">
          <UChip size="2xl" v-for="[tag, occurence] in tagOccurences" :key="tag" :text="occurence">
            <UButton color="white" :to="getTagRoute(tag)">{{tag}}</UButton>
          </UChip>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>

</template>
