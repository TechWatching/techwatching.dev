import { generateFeed } from '~~/server/feed'

export default defineEventHandler(async (event) => {
  const feed = await generateFeed(event, ['.NET'])
  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.atom1()
})
