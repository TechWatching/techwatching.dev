<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('goodiesPage', () => queryCollection('goodiesPage').first())
const { data: goodies } = await useAsyncData(route.path, () => queryCollection('goodies').all())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')

const activeGoodie = useState<number | null>('activeGoodie', () => null)
</script>

<template>
  <UContainer>
    <UPageHeader
      :title="page?.title || 'Goodies'"
      :description="page?.description || 'Some things you might find useful.'"
      class="py-[50px]"
    />

    <UPageBody>
      <UBlogPosts>
        <UBlogPost
          v-for="(goodie, index) in goodies"
          :key="index"
          :to="goodie.path"
          :title="goodie.title"
          :description="goodie.description"
          :image="goodie.image"
          orientation="horizontal"
          class="col-span-full"
          :class="activeGoodie === index && 'active'"
          variant="naked"
          :ui="{
            root: 'lg:grid lg:grid-cols-2 lg:items-center gap-x-8',
            title: 'text-3xl',
            description: 'text-xl line-clamp-3'
          }"
          @click="activeGoodie = index"
        />
      </UBlogPosts>
    </UPageBody>
  </UContainer>
</template>

<style scoped>
.active {
  view-transition-name: selected-goodie;
  contain: layout;
}
</style>
