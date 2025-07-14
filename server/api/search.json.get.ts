import { queryCollection } from '#imports'

export default eventHandler(async (event) => {
  return queryCollection(event, 'posts')
    .where('_type', '=', 'markdown')
    .where('navigation', '<>', false)
    .all()
})