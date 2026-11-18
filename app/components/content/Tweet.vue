<script setup lang="ts">
const props = defineProps<{
  id: string | number
  conversation?: string
  cards?: 'hidden' | 'visible'
}>()

const colorMode = useColorMode()

const embedUrl = computed(() => {
  const query = new URLSearchParams({
    id: props.id.toString(),
    dnt: 'true',
    theme: colorMode.value === 'dark' ? 'dark' : 'light',
    conversation: props.conversation || 'none'
  })
  if (props.cards)
    query.set('cards', props.cards)
  return `https://platform.twitter.com/embed/Tweet.html?${query}`
})
</script>

<template>
  <div class="tweet nuxtcontent-tweet my-10">
    <iframe
      :src="embedUrl"
      :title="`Embedded post ${props.id}`"
      class="w-full min-h-80 border-0"
      height="520"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    />
    <NuxtLink
      :to="`https://twitter.com/i/status/${props.id}`"
      class="sr-only"
      target="_blank"
      rel="noopener noreferrer"
    >
      Open post {{ props.id }} on X
    </NuxtLink>
  </div>
</template>

<style>
.nuxtcontent-tweet iframe {
  border-radius: 1rem;
}
</style>
