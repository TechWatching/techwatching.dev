<script setup lang="ts">
const route = useRoute()

const { open: searchOpen } = useContentSearch()

const open = ref(false)

// Both modals portal to `body` with no z-index, so after a client-side layout
// change the menu can end up painted over the search
watch(searchOpen, (value) => {
  if (value) {
    open.value = false
  }
})

const items = computed(() => [
  {
    label: 'Home',
    to: '/',
    active: route.path === '/'
  },
  {
    label: 'Blog',
    to: '/posts',
    active: route.path.startsWith('/posts')
  },
  {
    label: 'Speaking',
    to: '/speaking',
    active: route.path.startsWith('/speaking')
  },
  {
    label: 'Goodies',
    to: '/goodies',
    active: route.path.startsWith('/goodies')
  },
  {
    label: 'About',
    to: '/about',
    active: route.path === '/about'
  }
])
</script>

<template>
  <UHeader v-model:open="open">
    <template #left>
      <NuxtLink
        to="/"
        class="flex items-center gap-2 focus-visible:outline-3 outline-primary/25 rounded-md p-1 -ms-1"
      >
        <AppLogo />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      :ui="{
        link: 'text-lg font-semibold'
      }"
    />

    <template #right>
      <UContentSearchButton />
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
