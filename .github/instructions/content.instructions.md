---
name: "nuxt-content-layer"
description: "@nuxt/content v3 collection structure with numeric-prefix directory naming, zod-based defineCollection schemas in content.config.ts, YAML frontmatter conventions for posts (title, description, date, tags, badge, image, authors), and YAML index files for page-level content"
applyTo: "content/**/*.{md,yml}"
---

## Blog Post Frontmatter

- Every post in `content/1.posts/` MUST include all required fields from the `posts` collection schema in `content.config.ts`
- Required fields: `title` (non-empty string), `description` (non-empty string), `date` (ISO date `YYYY-MM-DD`), `image.src` (media path), `badge.label` (category string)
- Optional fields: `tags` (string array), `authors` (array with `name`, `to`, `avatar.src`), `canonical` (string URL for cross-posts)

```yaml
---
title: "Post Title Here"
description: "One sentence describing the post content."
date: 2026-03-09
image:
  src: /images/placeholder_1.jpg
badge:
  label: Tooling
tags:
  - tag1
  - tag2
authors:
  - name: Alexandre Nédélec
    to: https://twitter.com/techwatching
    avatar:
      src: /images/profile.png
---
```

## File Naming Convention

- Blog posts: numeric prefix + kebab-case slug — `78.post-slug.md` where 78 is the next available number
- Goodies: no numeric prefix required — `tool-name.md` in `content/3.goodies/`
- Determine next post number by reading the highest existing number in `content/1.posts/` and incrementing by 1
- YAML collection pages use numeric prefix + name: `0.index.yml`, `1.posts.yml`, `2.speaking.yml`, `3.goodies.yml`

## Markdown Formatting

- Use ATX-style headings (`##`, `###`) — never underline-style
- Images use Nuxt Content attribute syntax for TailwindCSS classes: `![alt text](/path/image.png){.rounded-lg .mx-auto}`
- Code blocks include language and optional filename: ` ```typescript [filename.ts] `
- Use `---` horizontal rules sparingly — only for major section breaks if needed

## Collection Schema in content.config.ts

- Always use `defineCollection` with explicit `source` glob and `type: 'page'`
- Extend schemas with `createBaseSchema()` for new page-level collections that need `title` and `description`
- Use `createLinkSchema()` for link objects, `createImageSchema()` for image objects with `src`, `alt`, `loading`, `srcset`
- Field constraints use zod: `.nonempty()` for required strings, `.optional()` for optional fields, `.editor({ input: 'icon' })` for icon picker, `.editor({ input: 'media' })` for media picker

```typescript
// Extending an existing schema
posts: defineCollection({
  source: '1.posts/**/*',
  type: 'page',
  schema: z.object({
    tags: z.array(z.string()).optional(),
    image: z.object({ src: z.string().nonempty().editor({ input: 'media' }) }),
    date: z.date(),
    badge: z.object({ label: z.string().nonempty() })
  })
})
```

## YAML Index Files

- `0.index.yml` — home page structured data (hero, roles, sections, cta)
- `1.posts.yml` — blog listing page metadata (align, links, image)
- `2.speaking.yml` — speaking events array with `type` and `format` enums
- `3.goodies.yml` — goodies listing page metadata

## Speaking Events

- `type` must be one of: `conference`, `meetup`, `podcast`, `webinar`
- `format` must be one of: `talk`, `workshop`, `panel`, `keynote`, `lightning`
- Fields: `name`, `date` (string), `event`, `type`, `format`, `location`, `url`, `slides`, `image`, `speakers` (string array)

```yaml
events:
  - name: "Talk Title"
    date: "2026-03-09"
    event: "Conference Name"
    type: conference
    format: talk
    location: "City, Country"
    url: https://example.com
```
