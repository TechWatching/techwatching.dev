<script setup lang="ts"></script>

<template>
  <UFooter>
    <template #top>
      <div class="mx-auto mt-10 flex flex-wrap items-center gap-8 justify-center">
        <SocialLinks/>
      </div>
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }} Alexandre Nédélec. All rights reserved.
      </p>
    </template>

    <template #center>
      <p class="text-gray-500 dark:text-gray-400 text-sm text-wrap max-w-2xl text-center">
        The opinions expressed herein are my own and do not represent those of my employer or any other third-party views in any way.
      </p>
    </template>

    <template #right>
      <UTooltip :text="$colorMode.preference === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
        <UColorModeButton />
      </UTooltip>
      <UButton to="https://github.com/techwatching" target="_blank" icon="i-simple-icons-github" aria-label="GitHub" color="gray" variant="ghost" />
    </template>
  </UFooter>
</template>
