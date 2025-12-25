<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: '%s - Alexandre Nédélec',
  ogImage: '/images/social-card.png',
  twitterImage: '/images/social-card.png',
  twitterCard: 'summary_large_image'
})

const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('posts'), {
  server: false
})

const { data: navigation } = useLazyAsyncData('navigation', () => queryCollectionNavigation('posts'), {
  server: false
})

const links = [{
  label: 'Blog',
  icon: 'i-lucide-pencil',
  to: '/posts'
}]

// Use the content search composable
const { open } = useContentSearch()

// Also support '/' as a shortcut for search (common pattern)
defineShortcuts({
  '/': () => {
    open.value = true
  }
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
