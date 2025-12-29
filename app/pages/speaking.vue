<script setup lang="ts">
interface SpeakingEvent {
  name?: string
  date?: string
  event?: string
  type?: 'conference' | 'meetup' | 'podcast' | 'webinar'
  format?: 'talk' | 'workshop' | 'panel' | 'keynote' | 'lightning'
  location?: string
  url?: string
  slides?: string
  image?: string
  speakers?: string[]
}

const { data: page } = await useAsyncData('speaking', () => queryCollection('speaking').first())

const title = page.value?.seo?.title || page.value?.title || 'Speaking'
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')

// Sort events by date (most recent first) and filter out incomplete entries
const events = computed(() => {
  if (!page.value?.events) return []
  return [...page.value.events]
    .filter((e: SpeakingEvent) => e.name && e.event)
    .sort((a: SpeakingEvent, b: SpeakingEvent) => {
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
})

const upcomingEvents = computed(() =>
  events.value.filter((e: SpeakingEvent) => e.date && new Date(e.date) > new Date())
)

const pastEvents = computed(() =>
  events.value.filter((e: SpeakingEvent) => !e.date || new Date(e.date) <= new Date())
)

// Group past events by year with timeline items
const eventsByYear = computed(() => {
  const groups: Record<string, SpeakingEvent[]> = {}
  pastEvents.value.forEach((event: SpeakingEvent) => {
    const year = event.date ? new Date(event.date).getFullYear().toString() : 'Unknown'
    if (!groups[year]) groups[year] = []
    groups[year].push(event)
  })
  return Object.entries(groups)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, yearEvents]) => ({
      year,
      timelineItems: yearEvents.map((event, index) => ({
        date: formatDate(event.date),
        title: event.event,
        icon: getTypeIcon(event.type),
        value: index,
        talkName: event.name,
        format: event.format,
        location: event.location,
        isOnline: event.location === 'Online',
        url: event.url,
        slides: event.slides
      }))
    }))
})

// Stats
const stats = computed(() => ({
  totalTalks: events.value.length,
  conferences: events.value.filter((e: SpeakingEvent) => e.type === 'conference').length,
  years: new Set(events.value.map((e: SpeakingEvent) => e.date ? new Date(e.date).getFullYear() : null).filter(Boolean)).size,
  podcasts: events.value.filter((e: SpeakingEvent) => e.type === 'podcast').length
}))

// Icon based on event type
function getTypeIcon(type?: string) {
  switch (type) {
    case 'podcast': return 'i-lucide-mic'
    case 'webinar': return 'i-lucide-video'
    case 'meetup': return 'i-lucide-users'
    default: return 'i-lucide-presentation'
  }
}

// Format badge color
function getFormatColor(format?: string) {
  switch (format) {
    case 'workshop': return 'warning'
    case 'panel': return 'info'
    case 'keynote': return 'error'
    case 'lightning': return 'neutral'
    case 'interview': return 'secondary'
    default: return 'success'
  }
}

// Format display label
function getFormatLabel(format?: string) {
  switch (format) {
    case 'workshop': return 'hands-on lab'
    default: return format
  }
}

function formatDate(date?: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <UContainer>
    <UPageHeader
      :title="page?.title || 'Speaking'"
      :description="page?.description"
      class="py-[50px]"
    >
      <template #headline>
        <UBadge
          variant="subtle"
          icon="i-lucide-mic"
          label="Public Speaking"
        />
      </template>
    </UPageHeader>

    <UPageBody>
      <!-- Stats Overview -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <UPageCard variant="soft" class="text-center">
          <div class="text-3xl font-bold text-primary">
            {{ stats.totalTalks }}
          </div>
          <div class="text-muted text-sm">
            Speaking Events
          </div>
        </UPageCard>
        <UPageCard variant="soft" class="text-center">
          <div class="text-3xl font-bold text-primary">
            {{ stats.conferences }}
          </div>
          <div class="text-muted text-sm">
            Conferences
          </div>
        </UPageCard>
        <UPageCard variant="soft" class="text-center">
          <div class="text-3xl font-bold text-primary">
            {{ stats.years }}
          </div>
          <div class="text-muted text-sm">
            Years Speaking
          </div>
        </UPageCard>
        <UPageCard variant="soft" class="text-center">
          <div class="text-3xl font-bold text-primary">
            {{ stats.podcasts }}
          </div>
          <div class="text-muted text-sm">
            Podcasts
          </div>
        </UPageCard>
      </section>

      <!-- Upcoming Events -->
      <section v-if="upcomingEvents.length" class="mb-16">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
          <UIcon name="i-lucide-calendar-clock" class="text-primary" />
          Upcoming Events
        </h2>
        <UPageGrid>
          <UPageCard
            v-for="event in upcomingEvents"
            :key="`${event.event}-${event.date}`"
            :title="event.name"
            :description="event.event"
            :icon="getTypeIcon(event.type)"
            :to="event.url"
            :target="event.url ? '_blank' : undefined"
            highlight
            highlight-color="primary"
            variant="outline"
          >
            <template #footer>
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <UBadge
                  :label="formatDate(event.date)"
                  variant="subtle"
                  icon="i-lucide-calendar"
                />
                <UBadge
                  v-if="event.location"
                  :label="event.location"
                  color="neutral"
                  variant="soft"
                  icon="i-lucide-map-pin"
                />
              </div>
            </template>
          </UPageCard>
        </UPageGrid>
      </section>

      <!-- Past Events as Timeline grouped by Year -->
      <section>
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-2 justify-center">
          <UIcon name="i-lucide-history" class="text-primary" />
          Past Talks
        </h2>

        <div class="max-w-2xl mx-auto space-y-12">
          <div v-for="{ year, timelineItems } in eventsByYear" :key="year">
            <!-- Year Header -->
            <div class="flex items-center gap-4 mb-6">
              <div class="h-px flex-1 bg-default" />
              <span class="text-xl font-bold text-primary px-4 py-1 rounded-full bg-primary/10">
                {{ year }}
              </span>
              <div class="h-px flex-1 bg-default" />
            </div>

            <!-- Timeline for this year -->
            <UTimeline
              :items="timelineItems"
              :default-value="timelineItems.length - 1"
              color="primary"
              size="md"
            >
              <template #description="{ item }">
                <UPageCard
                  variant="subtle"
                  class="mt-1"
                  :ui="{ container: 'p-3 sm:p-4' }"
                >
                  <div class="flex items-center justify-between gap-4">
                    <div class="flex-1 min-w-0">
                      <div class="flex items-start gap-2">
                        <h4 class="font-semibold text-highlighted">
                          {{ item.talkName }}
                        </h4>
                        <UBadge
                          v-if="item.format"
                          :label="getFormatLabel(item.format)"
                          :color="getFormatColor(item.format)"
                          variant="subtle"
                          size="sm"
                          class="capitalize shrink-0"
                        />
                      </div>
                      <p v-if="item.location" class="text-muted text-sm mt-0.5 flex items-center gap-1">
                        <UIcon
                          :name="item.isOnline ? 'i-lucide-globe' : 'i-lucide-map-pin'"
                          class="size-3.5"
                        />
                        {{ item.location }}
                      </p>
                    </div>
                    <div v-if="item.url || item.slides" class="flex items-center gap-2 shrink-0">
                      <UButton
                        v-if="item.url"
                        :to="item.url"
                        target="_blank"
                        :icon="item.icon === 'i-lucide-mic' ? 'i-lucide-headphones' : 'i-lucide-play-circle'"
                        :label="item.icon === 'i-lucide-mic' ? 'Listen' : 'Watch'"
                        size="xs"
                        variant="soft"
                        color="primary"
                      />
                      <UButton
                        v-if="item.slides"
                        :to="item.slides"
                        target="_blank"
                        icon="i-lucide-presentation"
                        label="Slides"
                        size="xs"
                        variant="outline"
                        color="neutral"
                      />
                    </div>
                  </div>
                </UPageCard>
              </template>
            </UTimeline>
          </div>
        </div>
      </section>

      <!-- Contact CTA -->
      <section class="mt-16">
        <UPageCard variant="subtle" class="text-center max-w-2xl mx-auto">
          <div class="flex flex-col items-center gap-4 py-4">
            <div class="p-3 rounded-full bg-primary/10">
              <UIcon name="i-lucide-message-circle" class="size-8 text-primary" />
            </div>
            <h3 class="text-xl font-semibold text-highlighted">
              Want me to speak at your event?
            </h3>
            <p class="text-muted max-w-md">
              I'd love to share knowledge about Cloud, Infrastructure as Code, Pulumi, and .NET development at your conference or meetup.
            </p>
            <UButton
              to="/contact"
              label="Get in Touch"
              icon="i-lucide-send"
              size="lg"
              class="mt-2"
            />
          </div>
        </UPageCard>
      </section>
    </UPageBody>
  </UContainer>
</template>
