<script setup lang="ts">
interface McpServer {
  title: string
  description: string
  icon: string
  to: string
  category: 'vcs' | 'testing' | 'docs' | 'cloud'
}

const props = defineProps<{
  servers: McpServer[]
  shuffle?: boolean
}>()

const categories = {
  vcs: { label: 'Version Control', color: 'var(--color-cat-vcs)' },
  testing: { label: 'Browser Automation', color: 'var(--color-cat-testing)' },
  docs: { label: 'Documentation', color: 'var(--color-cat-docs)' },
  cloud: { label: 'Cloud & DevOps', color: 'var(--color-cat-cloud)' }
} as const

const activeFilter = ref<string | null>(null)

// Shuffle once on component mount to avoid hydration mismatch
const isReady = ref(!props.shuffle)
const shuffledServers = ref<McpServer[]>(props.shuffle ? [] : props.servers)
onMounted(() => {
  if (props.shuffle) {
    // Fisher-Yates shuffle (no built-in in JS/VueUse)
    const arr = [...props.servers]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j]!, arr[i]!]
    }
    shuffledServers.value = arr
    isReady.value = true
  }
})

const filteredServers = computed(() => {
  return shuffledServers.value
})

function toggleFilter(categoryId: string) {
  activeFilter.value = activeFilter.value === categoryId ? null : categoryId
}

function getCategoryInfo(category: keyof typeof categories) {
  return categories[category] || categories.docs
}

function isHighlighted(category: string) {
  return !activeFilter.value || activeFilter.value === category
}
</script>

<template>
  <div
    v-if="isReady"
    class="space-y-6"
  >
    <!-- Legend / Filter -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="(cat, id) in categories"
        :key="id"
        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border-2"
        :style="{
          backgroundColor: activeFilter === id ? cat.color : `color-mix(in srgb, ${cat.color} 12%, transparent)`,
          borderColor: cat.color,
          color: activeFilter === id ? 'white' : cat.color
        }"
        @click="toggleFilter(id)"
      >
        <span
          class="w-2.5 h-2.5 rounded-full"
          :style="{ backgroundColor: cat.color }"
        />
        {{ cat.label }}
      </button>
      <button
        v-if="activeFilter"
        class="px-3 py-1.5 rounded-full text-sm font-medium bg-neutral-500/20 text-neutral-400 hover:bg-neutral-500/30 transition-all cursor-pointer"
        @click="activeFilter = null"
      >
        Show all
      </button>
    </div>

    <!-- Grid -->
    <UPageGrid>
      <UPageCard
        v-for="server in filteredServers"
        :key="server.title"
        :title="server.title"
        :description="server.description"
        :icon="server.icon"
        :to="server.to"
        target="_blank"
        :class="[
          'transition-all duration-300',
          !isHighlighted(server.category) && 'opacity-25 grayscale scale-95'
        ]"
        :style="{
          boxShadow: isHighlighted(server.category)
            ? `inset 0 0 0 2px ${getCategoryInfo(server.category).color}, 0 0 20px color-mix(in srgb, ${getCategoryInfo(server.category).color} 25%, transparent)`
            : 'none'
        }"
        :ui="{
          root: 'relative',
          header: 'absolute top-2 right-2 z-10'
        }"
      >
        <template #header>
          <span
            class="px-2 py-0.5 rounded-full text-xs font-medium"
            :style="{
              backgroundColor: `color-mix(in srgb, ${getCategoryInfo(server.category).color} 19%, transparent)`,
              color: getCategoryInfo(server.category).color
            }"
          >
            {{ getCategoryInfo(server.category).label }}
          </span>
        </template>
      </UPageCard>
    </UPageGrid>
  </div>
</template>
