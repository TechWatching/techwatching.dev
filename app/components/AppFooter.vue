<script setup lang="ts">
</script>

<template>
  <UFooter>
    <template #top>
      <USeparator />
      <div class="mx-auto my-10 flex flex-wrap items-center gap-8 justify-center">
        <SocialLinks />
      </div>
      <USeparator />
    </template>

    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ new Date().getFullYear() }} Alexandre Nédélec. All rights reserved.
      </p>
    </template>

    <template #default>
      <p class="text-muted text-sm text-wrap max-w-2xl text-center">
        The opinions expressed herein are my own and do not represent those of my employer or any other third-party views in any way.
      </p>
    </template>

    <template #right>
      <UColorModeButton />
      <UButton
        to="https://github.com/TechWatching/techwatching.dev"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub Repository"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
