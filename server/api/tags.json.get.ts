import { getTagSlug } from '~/utils/tag'

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'posts')
    .select('tags')
    .all()

  const tagsBySlug = new Map<string, string>(posts
    ?.flatMap((t: { tags?: string[] }) => t.tags ?? [])
    .map((tag: string) => [getTagSlug(tag), tag]))

  return [...tagsBySlug]
})
