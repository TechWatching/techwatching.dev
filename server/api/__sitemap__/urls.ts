import { asSitemapUrl, defineSitemapEventHandler } from '#imports'
import kebabCase from 'just-kebab-case'
import type { Collections } from '@nuxt/content'

const getTagSlug = (tag: string) => kebabCase(tag.toLowerCase().replace('/', ''))
const getTagRoute = (tag: string) => `/tags/${getTagSlug(tag)}`

export default defineSitemapEventHandler(async (e) => {
  // Query all posts
  const posts = await queryCollection(e, 'posts').all()

  // Query all goodies
  const goodies = await queryCollection(e, 'goodies').all()

  // Collect unique tags from posts
  const tags = new Set<string>()
  posts.forEach((post: Collections['posts']) => {
    post.tags?.forEach((tag: string) => {
      tags.add(getTagRoute(tag))
    })
  })

  // Generate tag URLs
  const tagItems = [...tags].map((t) => asSitemapUrl({ loc: t }))

  // Generate post URLs
  const postItems = posts.map((post: Collections['posts']) => {
    return asSitemapUrl({
      loc: post.path,
      lastmod: post.date ? new Date(post.date).toISOString() : undefined
    })
  })

  // Generate goodie URLs
  const goodieItems = goodies.map((goodie: Collections['goodies']) => {
    return asSitemapUrl({
      loc: goodie.path
    })
  })

  return [...tagItems, ...postItems, ...goodieItems]
})
