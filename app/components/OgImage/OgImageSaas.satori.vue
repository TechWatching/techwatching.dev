<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  headline: {
    type: String,
    default: undefined
  }
})
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center text-center bg-slate-900 p-8">
    <div class="relative">
      <p
        v-if="headline"
        class="text-3xl text-blue-400 mb-4 uppercase tracking-widest"
      >
        {{ headline }}
      </p>
      <h1 class="text-8xl mb-4 text-white">
        {{ title }}
      </h1>
      <p class="text-5xl text-gray-200 leading-tight">
        {{ description }}
      </p>
    </div>
  </div>
</template>
