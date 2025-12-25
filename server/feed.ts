import { joinURL } from 'ufo'
import { Feed } from 'feed'
import { queryCollection } from '@nuxt/content/server'
import type { EventHandlerRequest, H3Event } from 'h3'

export async function generateFeed(event: H3Event<EventHandlerRequest>, tags: string[] = []): Promise<Feed> {
  const baseUrl = 'https://techwatching.dev'
  const siteUrl = joinURL(baseUrl, 'posts')
  const feed = new Feed({
    title: 'Alexandre Nedelec\'s blog',
    description: 'Alexandre Nédélec\'s blog',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    favicon: joinURL(baseUrl, 'favicon.ico'),
    copyright: `Copyright © 2019-${new Date().getFullYear()} Alexandre Nedelec All Rights Reserved`,
    feedLinks: {
      rss: `${baseUrl}/feed.rss`,
      atom: `${baseUrl}/feed.atom`
    }
  })

  const articles = await queryCollection(event, 'posts')
    .order('date', 'DESC')
    .all()

  for (const article of articles.filter(article => tags.length === 0 || article.tags?.some((tag: string) => tags.includes(tag)))) {
    feed.addItem({
      link: joinURL(baseUrl, article.path ?? ''),
      image: joinURL(baseUrl, article.image?.src ?? ''),
      title: article.title!,
      date: new Date(article.date),
      description: article.description,
      author: article.authors?.map(a => ({ name: a.name, link: a.to })),
      category: article.tags?.map(tag => ({ name: tag }))
    })
  }

  return feed
}
