<script setup lang="ts">
</script>

<template>
    <UDivider type="dashed" label="Share" class="mt-10 mb-5"/>
    <div class="flex flex-row gap-2 flex-wrap w-full mb-5">
      <SocialShare
        v-for="network in ['bluesky', 'twitter', 'linkedin', 'reddit', 'email']"
        :key="network"
        :network="network"
        :styled="false"
        :label="false"
        class="mx-auto"
      />
  </div>
</template>
