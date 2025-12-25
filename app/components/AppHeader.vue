<script setup lang="ts">
const route = useRoute()

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
  <UHeader>
    <template #left>
      <NuxtLink
        to="/"
        class="flex items-center gap-2"
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
