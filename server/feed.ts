import {joinURL} from "ufo";
import {Feed} from "feed";
import {serverQueryContent} from "#content/server";
import {EventHandlerRequest, H3Event} from "h3";

export async function generateFeed(event: H3Event<EventHandlerRequest>) {
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

  const articles = await serverQueryContent(event, '/posts')
    .sort({ date: -1 })
    .where({ _partial: false, _draft: false, _type: 'markdown' })
    .find()

  for (const article of articles) {
    feed.addItem({
      link: joinURL(baseUrl, article._path ?? ''),
      image: joinURL(baseUrl, article.image.src),
      title: article.title!,
      date: new Date(article.date),
      description: article.description,
      author: article.authors,
      category: article.category
    })
  }

  return feed
}
