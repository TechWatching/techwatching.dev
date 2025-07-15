import {generateFeed} from "~~/server/feed";

export default defineEventHandler(async (event) => {
  const feed = await generateFeed(event)
  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
