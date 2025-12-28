import { queryCollection } from '@nuxt/content/server'
import { getTagSlug } from '~/utils/tag'
import type { Collections } from '@nuxt/content'

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'posts').all()

  const tagsBySlug = new Map<string, string>(posts
    ?.flatMap((post: Collections['posts']) => post.tags ?? [])
    .map((tag: string) => [getTagSlug(tag), tag]))

  return [...tagsBySlug]
})
