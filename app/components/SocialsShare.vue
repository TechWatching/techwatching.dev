<script setup lang="ts">
</script>

<template>
  <div>
    <USeparator
      type="dashed"
      label="Share"
      class="mt-4 mb-5"
    />
    <div class="flex flex-wrap gap-2 justify-center mb-5">
      <SocialShare
        v-for="network in ['bluesky', 'mastodon', 'linkedin', 'hackernews', 'reddit', 'email']"
        :key="network"
        :network="network"
        :styled="false"
        :label="false"
        class="p-2 rounded-lg text-muted transition-all duration-200 hover:text-primary hover:bg-elevated hover:scale-110"
      />
    </div>
  </div>
</template>
