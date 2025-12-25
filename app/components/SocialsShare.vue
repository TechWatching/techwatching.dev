<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center gap-3 mb-5">
    <span class="text-sm text-muted">Share this post</span>
    <div class="flex flex-wrap justify-center gap-4">
      <SocialShare
        v-for="network in ['bluesky', 'mastodon', 'linkedin', 'hackernews', 'reddit', 'email']"
        :key="network"
        :network="network"
        :styled="false"
        :label="false"
        class="text-muted p-3 rounded-lg transition-all duration-200 hover:text-primary hover:bg-elevated hover:scale-110"
      />
    </div>
  </div>
</template>
