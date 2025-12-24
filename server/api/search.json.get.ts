import { serverQueryContent } from '#content/server'

export default eventHandler(async (event) => {
  return serverQueryContent(event)
    .where({ _type: 'markdown', navigation: { $ne: false } })
    .only(['_path', '_id', 'title', 'description', 'navigation', 'icon', 'badge', 'lead'])
    .find()
})