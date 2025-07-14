import {serverQueryContent} from "#content/server";
import {getTagSlug} from "~/utils/tag";

export default defineEventHandler(async (event) => {
  const tags = await serverQueryContent(event)
    .where({ _type: 'markdown', navigation: { $ne: false } })
    .only('tags')
    .find()

  const tagsBySlug = new Map<string, string>(tags
    ?.flatMap(t => t.tags ?? [])
    .map(tag => [getTagSlug(tag), tag]));

  return [ ...tagsBySlug]
})
