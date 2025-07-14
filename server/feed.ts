import { joinURL } from "ufo";
import { Feed } from "feed";
import { queryCollection } from '#imports'
import type { Collections, CollectionQueryBuilder } from '@nuxt/content'
import type { EventHandlerRequest, H3Event } from "h3";

type queryCollectionWithEvent = <T extends keyof Collections>(event: H3Event, collection: T) => CollectionQueryBuilder<Collections[T]>

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
      rss: `${siteUrl}/feed.rss`
    }
  })

  const articles = await (queryCollection as queryCollectionWithEvent)(event, 'posts')
    .order('date', 'DESC')
    .where('partial', '=', false)
    .where('draft', '=', false)
    .where('type', '=', 'markdown')
    .all()

  for (const article of articles.filter(article => tags.length === 0 || article.tags?.some((tag: string) => tags.includes(tag)))) {
    feed.addItem({
      link: joinURL(baseUrl, article.path ?? ''),
      image: joinURL(baseUrl, article.image.src),
      title: article.title!,
      date: new Date(article.date),
      description: article.description,
      author: article.authors?.map(author => ({ name: author.name, email: author.to })),
      category: article.tags?.map((tag: string) => ({ name: tag }))
    })
  }

  return feed
}
