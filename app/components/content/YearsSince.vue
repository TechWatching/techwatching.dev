<script setup lang="ts">
const props = defineProps<{
  date: string
}>()

const years = computed(() => {
  const startDate = new Date(props.date)
  const now = new Date()
  return Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
})
</script>

<template>
  <span>{{ years }}</span>
</template>
