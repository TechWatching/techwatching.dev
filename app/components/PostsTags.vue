<script lang="ts" setup>
import { getTagSlug } from '~/utils/tag'

defineProps<{ tags: string[] }>()
</script>

<template>
  <div>
    <USeparator
      type="dashed"
      label="Tags"
    />
    <div class="flex flex-wrap w-full items-center gap-3 mt-5">
      <UBadge
        v-for="(tag, index) in tags"
        :key="index"
        variant="subtle"
        color="primary"
        :ui="{ base: 'transition-all duration-200 cursor-pointer hover:bg-primary/20 hover:ring-primary/50' }"
      >
        <NuxtLink :to="`/tags/${getTagSlug(tag)}`">
          {{ tag }}
        </NuxtLink>
      </UBadge>
    </div>
  </div>
</template>
