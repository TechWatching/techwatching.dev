import { defineCollection, z } from '@nuxt/content'

const variantEnum = z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
const colorEnum = z.enum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info'])
const sizeEnum = z.enum(['xs', 'sm', 'md', 'lg', 'xl'])
const orientationEnum = z.enum(['vertical', 'horizontal'])

const createBaseSchema = () => z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty()
})

const _createFeatureItemSchema = () => createBaseSchema().extend({
  icon: z.string().nonempty().editor({ input: 'icon' })
})

const createLinkSchema = () => z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: z.string().optional().editor({ input: 'icon' }),
  size: sizeEnum.optional(),
  trailing: z.boolean().optional(),
  target: z.string().optional(),
  color: colorEnum.optional(),
  variant: variantEnum.optional()
})

const createImageSchema = () => z.object({
  src: z.string().nonempty().editor({ input: 'media' }),
  alt: z.string().optional(),
  loading: z.enum(['lazy', 'eager']).optional(),
  srcset: z.string().optional()
})

export const collections = {
  index: defineCollection({
    source: '0.index.yml',
    type: 'page',
    schema: z.object({
      hero: z.object(({
        title: z.string().optional(),
        description: z.string().optional(),
        links: z.array(createLinkSchema())
      })),
      roles: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        items: z.array(
          z.object({
            title: z.string().nonempty(),
            description: z.string().nonempty(),
            icon: z.string().nonempty().editor({ input: 'icon' }),
            to: z.string().optional(),
            target: z.string().optional()
          })
        )
      }).optional(),
      socials: z.object({
        title: z.string().nonempty(),
        links: z.array(
          z.object({
            icon: z.string().nonempty().editor({ input: 'icon' }),
            to: z.string().nonempty(),
            label: z.string().nonempty()
          })
        )
      }).optional(),
      sections: z.array(
        z.object({
          title: z.string().nonempty(),
          description: z.string().nonempty(),
          id: z.string().nonempty(),
          orientation: orientationEnum.optional(),
          reverse: z.boolean().optional(),
          image: z.object({
            src: z.string().nonempty().editor({ input: 'media' }),
            alt: z.string().optional(),
            to: z.string().optional(),
            target: z.string().optional(),
            width: z.number().optional()
          }).optional(),
          features: z.array(
            z.object({
              name: z.string().nonempty(),
              description: z.string().nonempty(),
              icon: z.string().nonempty().editor({ input: 'icon' })
            })
          ).optional()
        })
      ),
      cta: createBaseSchema().extend({
        links: z.array(createLinkSchema())
      }).optional()
    })
  }),
  blog: defineCollection({
    source: '1.posts.yml',
    type: 'page',
    schema: z.object({
      align: z.string().optional(),
      links: z.array(createLinkSchema()).optional(),
      image: createImageSchema().optional()
    })
  }),
  posts: defineCollection({
    source: '1.posts/**/*',
    type: 'page',
    schema: z.object({
      tags: z.array(z.string()).optional(),
      canonical: z.string().optional(),
      image: z.object({ src: z.string().nonempty().editor({ input: 'media' }) }),
      authors: z.array(
        z.object({
          name: z.string().nonempty(),
          to: z.string().nonempty(),
          avatar: z.object({ src: z.string().nonempty().editor({ input: 'media' }) })
        })
      ).optional(),
      date: z.date(),
      badge: z.object({ label: z.string().nonempty() })
    })
  }),
  goodiesPage: defineCollection({
    source: '3.goodies.yml',
    type: 'page',
    schema: z.object({
      align: z.string().optional(),
      image: createImageSchema().optional()
    })
  }),
  goodies: defineCollection({
    source: '3.goodies/*.md',
    type: 'page',
    schema: z.object({
      lead: z.string().optional(),
      image: createImageSchema().optional()
    })
  }),
  content: defineCollection({
    source: '*.md',
    type: 'page',
    schema: z.object({})
  })
}
