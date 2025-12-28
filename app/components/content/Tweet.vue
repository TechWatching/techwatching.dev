<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  id: string | number
  conversation?: string
  cards?: 'hidden' | 'visible'
}>()

useHead({
  script: [
    { id: 'twitter-wjs', type: 'text/javascript', src: 'https://platform.twitter.com/widgets.js', async: true, defer: true }
  ]
})
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const tweet = ref<HTMLElement | null>()

const loaded = ref(false)
const tweetNotFound = ref(false)

async function create(retries = 10) {
  // @ts-expect-error global external script injected
  if (!window.twttr?.widgets?.createTweet) {
    if (retries <= 0)
      return console.error('Failed to load Twitter widget after 10 retries.')
    setTimeout(() => create(retries - 1), 1000)
    return
  }
  // @ts-expect-error global external script injected
  const element = await window.twttr.widgets.createTweet(
    props.id.toString(),
    tweet.value,
    {
      theme: isDark.value ? 'dark' : 'light',
      conversation: props.conversation || 'none',
      cards: props.cards,
    },
  )
  loaded.value = true
  if (element === undefined)
    tweetNotFound.value = true
}

onMounted(() => {
  create()
})
</script>

<template>
    <div ref="tweet" class="tweet nuxtcontent-tweet">
      <div v-if="!loaded || tweetNotFound" class="w-30 h-30 my-10px bg-gray-400 bg-opacity-10 rounded-lg flex opacity-50">
        <div class="m-auto animate-pulse text-4xl">
          <UIcon name="i-carbon-logo-twitter" />
          <span v-if="tweetNotFound">Could not load tweet with id="{{ props.id }}"</span>
        </div>
      </div>
    </div>
</template>

<style>
.nuxtcontent-tweet iframe {
  border-radius: 1rem;
  overflow: hidden;
}
</style>
