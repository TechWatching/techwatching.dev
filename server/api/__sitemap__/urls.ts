import { queryCollection } from '#imports'
import { asSitemapUrl, defineSitemapEventHandler } from '#imports'
import {getTagRoute} from "../../../utils/tag";

export default defineSitemapEventHandler(async (e) => {
  const contentList = await queryCollection(e, 'posts').all()
  const tags = new Set(contentList.flatMap(c => c?.tags)
    .filter(t => t != null)
    .map(t => getTagRoute(t)))

  const tagItems = [...tags]
    .map((t) => asSitemapUrl({ loc: t}))

  const contentItems = contentList
    .filter(c => !c.path?.endsWith('_dir') && (c.path?.startsWith('/posts') || c.path?.startsWith('/goodies')))
    .map((c) => {
      return asSitemapUrl({
        loc: c.path,
        lastmod: c.date ?? ''
      })
    })

  return [...tagItems, ...contentItems]
})
