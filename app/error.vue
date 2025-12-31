<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

// Query navigation for each collection
const { data: postsNavigation } = useLazyAsyncData('navigation-posts', () => queryCollectionNavigation('posts'), {
  server: false
})
const { data: goodiesNavigation } = useLazyAsyncData('navigation-goodies', () => queryCollectionNavigation('goodies'), {
  server: false
})
const { data: contentNavigation } = useLazyAsyncData('navigation-content', () => queryCollectionNavigation('content'), {
  server: false
})

// Helper to add icon to navigation items
const addIconToItems = (items: { path?: string, title?: string, [key: string]: unknown }[] | undefined, icon: string) =>
  (items || []).map(item => ({ ...item, icon }))

// Combine navigation with proper section labels and icons on each item
const navigation = computed(() => [
  { title: 'Blog', icon: 'i-lucide-file-text', path: '/posts', children: addIconToItems(postsNavigation.value?.find(item => item.path === '/posts')?.children || postsNavigation.value, 'i-lucide-file-text') },
  { title: 'Goodies', icon: 'i-lucide-gift', path: '/goodies', children: addIconToItems(goodiesNavigation.value, 'i-lucide-gift') },
  { title: 'About', icon: 'i-lucide-user', path: '/about', children: addIconToItems(contentNavigation.value?.filter(item => item.path === '/about'), 'i-lucide-user') }
])

// Query multiple collections for search (posts, goodies, and about page)
const { data: postsFiles } = useLazyAsyncData('search-posts', () => queryCollectionSearchSections('posts'), {
  server: false
})
const { data: goodiesFiles } = useLazyAsyncData('search-goodies', () => queryCollectionSearchSections('goodies'), {
  server: false
})
const { data: contentFiles } = useLazyAsyncData('search-content', () => queryCollectionSearchSections('content'), {
  server: false
})

// Combine all search files
const files = computed(() => [
  ...(postsFiles.value || []),
  ...(goodiesFiles.value || []),
  ...(contentFiles.value || [])
])

const links = [{
  label: 'Home',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: 'Blog',
  icon: 'i-lucide-file-text',
  to: '/posts'
}, {
  label: 'Speaking',
  icon: 'i-lucide-mic',
  to: '/speaking'
}, {
  label: 'Goodies',
  icon: 'i-lucide-gift',
  to: '/goodies'
}, {
  label: 'About',
  icon: 'i-lucide-user',
  to: '/about'
}]
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>

    <UToaster />
  </div>
</template>
