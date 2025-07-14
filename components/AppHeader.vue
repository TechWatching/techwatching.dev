<script setup lang="ts">
import type {NavItem} from '@nuxt/content'
import {NuxtImg} from '#components'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [{
  label: 'Home',
  to: '/'
}, {
  label: 'Blog',
  to: '/posts'
}, {
  label: 'Speaking',
  to: '/speaking'
},
{
  label: 'Goodies',
  to: '/goodies'
}, {
  label: 'About',
  to: '/about'
}]

// const {metaSymbol} = useShortcuts()
const metaSymbol = '⌘' // Fallback for shortcuts display

</script>

<template>
  <UHeader :links="links" :ui="{ container: 'gap-0', logo: 'text-lg sm:text-2xl items-center', center: 'text-2xl'}">
    <template #logo>
      <UAvatar
        src="/images/profile.png"
        alt="Picture of Alexandre Nédélec"
        class="sm:w-10 sm:h-10"
        :as="NuxtImg"
      />
      Alexandre Nédélec
    </template>

    <template #center>
      <UHeaderLinks :links="links" :ui="{ base: 'text-xl font-semibold flex items-center gap-1 hidden lg:flex' }"/>
    </template>

    <template #right>
      <UTooltip text="Search" :shortcuts="[metaSymbol, 'K']">
        <UContentSearchButton size="xl" label=""/>
      </UTooltip>
      <UTooltip :text="$colorMode.preference === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
        <UColorModeButton size="xl"/>
      </UTooltip>
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open/>
    </template>
  </UHeader>
</template>
