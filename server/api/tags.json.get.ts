import { queryCollection } from '#imports'
import {getTagSlug} from "../../utils/tag";

export default defineEventHandler(async (event) => {
  const tags = await queryCollection(event, 'posts')
    .where('_type', '=', 'markdown')
    .where('navigation', '<>', false)
    .select('tags')
    .all()

  const tagsBySlug = new Map<string, string>(tags
    ?.flatMap(t => t.tags ?? [])
    .map(tag => [getTagSlug(tag), tag]));

  return [ ...tagsBySlug]
})
