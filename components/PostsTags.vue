<script lang="ts" setup>
import {getTagSlug} from "~/utils/tag";

defineProps<{ tags: string[] }>()
</script>

<template>
  <UDivider type="dashed" label="Tags"/>
  <div class="flex flex-wrap w-full items-center gap-3 mt-5">
    <UBadge
v-for="(tag, index) in tags"
            :key="index"
            :ui="{base: 'text-center justify-center'}">
      <NuxtLink :to="`/tags/${getTagSlug(tag)}`">{{tag}}</NuxtLink>
    </UBadge>
  </div>
</template>
