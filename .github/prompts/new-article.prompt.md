# New Blog Article

Initialize a new blog article for TechWatching.dev with frontmatter and placeholder content.

## Instructions

1. **Determine the next article number** by checking the files in `content/1.posts/` directory. The new article should have the next sequential number.

2. **Create the article file** with the naming convention: `{number}.{slug}.md`
   - The slug should be lowercase, hyphen-separated, and derived from the title
   - Example: `77.my-new-topic.md`

3. **Categories for the badge label** (choose based on topic):
   - `Tooling` - Tools, extensions, CLI utilities, developer productivity
   - `DevOps` - CI/CD, infrastructure, cloud platforms, deployment
   - `Development` - Programming concepts, frameworks, coding practices
   - `Essay` - Thoughts, retrospectives, career advice, learning
   - `Tips` - Weekly tips posts

4. **Tags** should be relevant to the content. Use proper casing for technologies:
   - Proper casing: `.NET`, `ASP.NET Core`, `Nuxt`, `Vue.js`, `TypeScript`, `OpenTelemetry`
   - Lowercase for concepts: `tooling`, `learning`, `thoughts`, `devops`, `api`
   - For weekly tips: include `tips learned this week` tag

5. **Frontmatter fields**:
   - `title`: Can use quotes for titles with colons or special characters
   - `description`: Brief summary (can also use quotes)
   - `date`: Today's date in YYYY-MM-DD format
   - `image.src`: Cover image path
   - `badge.label`: Category
   - `tags`: Array of relevant tags
   - `canonical`: (optional) URL if cross-posted from another site
   - `ImageAttribution`: (optional) Credit for stock photos

6. **Code blocks with filenames**: Use `[filename]` syntax after the language:
   ```typescript [nuxt.config.ts]
   // code here
   ```

## User Request

Topic: $ARGUMENTS

## Template

Create the file with this exact structure (fill in frontmatter based on the topic):

```markdown
---
title: {Title based on topic}
description: {Brief description}
date: {Today's date YYYY-MM-DD}
image:
  src: /images/placeholder_1.jpg
badge:
  label: {Category}
tags:
  - {tag1}
  - {tag2}
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Section Title

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

![Image description](/posts/images/{slug}_1.png){.rounded-lg .mx-auto}

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

```typescript [example.ts]
// Sample code block
const example = "Hello World";
console.log(example);
```

## Another Section

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Subsection

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.

::callout{icon="i-heroicons-light-bulb"}
This is a callout for tips or important notes.
::
```

## Output

Create only the initialized article file in `content/1.posts/` with frontmatter filled based on the topic and the placeholder structure above. Do NOT write actual article content.
