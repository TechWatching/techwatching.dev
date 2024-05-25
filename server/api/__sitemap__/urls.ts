import { defineEventHandler } from 'h3'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { serverQueryContent } from '#content/server'
import { asSitemapUrl, defineSitemapEventHandler } from '#imports'
import {getTagRoute} from "~/utils/tag";
import {SitemapUrlInput} from "#sitemap";

export default defineSitemapEventHandler(async (e) => {
  const contentList = (await serverQueryContent(e).find()) as ParsedContent[]
  const tags = new Set(contentList.flatMap(c => c?.tags)
    .filter(t => t != null)
    .map(t => getTagRoute(t)))

  const tagItems = [...tags]
    .map((t) => asSitemapUrl({ loc: t}))

  const contentItems = contentList
    .filter(c => !c._path?.endsWith('_dir') && (c._path?.startsWith('/posts') || c._path?.startsWith('/goodies')))
    .map((c) => {
      return asSitemapUrl({
        loc: c._path,
        lastmod: c.date ?? ''
      })
    })

  return [...tagItems, ...contentItems]
})
