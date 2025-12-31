<script setup lang="ts">
const { data: posts } = await useAsyncData('tags', () =>
  queryCollection('posts')
    .select('tags')
    .all()
)

if (!posts.value) {
  throw createError({ statusCode: 404, statusMessage: 'Tags not found', fatal: true })
}

const tagOccurrences = computed(() => {
  // count each tag occurrence and sort them descending
  const occurrences = posts.value
    ?.flatMap(t => t.tags ?? [])
    .reduce((acc, tag) => {
      acc.set(tag, (acc.get(tag) || 0) + 1)
      return acc
    }, new Map<string, number>()) ?? new Map<string, number>()
  return [...occurrences.entries()]
    .sort(([_tagA, occurrenceA], [_tagB, occurrenceB]) => occurrenceB - occurrenceA)
})

const title = 'Tags'
const description = 'All tags used in this blog'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="title"
        :description="description"
      />
      <UPageBody>
        <div class="flex flex-wrap place-content-evenly gap-5 mt-4">
          <UChip
            v-for="[tag, occurrence] in tagOccurrences"
            :key="tag"
            size="2xl"
            :text="occurrence"
          >
            <UButton
              color="neutral"
              variant="subtle"
              :to="getTagRoute(tag)"
            >
              {{ tag }}
            </UButton>
          </UChip>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
