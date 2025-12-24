<script setup lang="ts">
const { socials } = useAppConfig()

defineProps<{
  iconClass?: string
}>()
</script>

<template>
  <ULink
    v-for="social in socials"
    :key="social.label"
    :to="social.to"
    target="_blank"
    :aria-label="social.label"
  >
    <UIcon :name="social.icon" class="w-10 h-10 shrink-0" :class="iconClass" />
  </ULink>
</template>
