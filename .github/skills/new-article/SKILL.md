---
name: new-article
description: "Initialize a new blog article for TechWatching.dev with sequential numbering, frontmatter, and placeholder content. Use when creating a new blog post, starting a new article, scaffolding a post, or adding content to the blog."
argument-hint: "topic or title for the new article"
---

# New Blog Article

Initialize a new blog article for TechWatching.dev with correct frontmatter and placeholder content.

## When to Use

- Creating a new blog post / article
- Scaffolding a post with frontmatter and placeholder sections
- Starting content for TechWatching.dev

## Procedure

### 1. Determine the next article number

Check the files in `content/1.posts/` directory. Find the highest numeric prefix and increment by 1 to get the next article number.

### 2. Create the article file

Use the naming convention: `{number}.{slug}.md` inside `content/1.posts/`.

- The slug should be lowercase, hyphen-separated, and derived from the topic/title.
- Example: `79.my-new-topic.md`

### 3. Choose the badge category

Pick the `badge.label` based on the topic:

| Category | When to use |
|----------|-------------|
| `Tooling` | Tools, extensions, CLI utilities, developer productivity |
| `DevOps` | CI/CD, infrastructure, cloud platforms, deployment |
| `Development` | Programming concepts, frameworks, coding practices |
| `Essay` | Thoughts, retrospectives, career advice, learning |
| `Tips` | Weekly tips posts |

### 4. Choose tags

Tags should be relevant to the content. Follow these casing rules:

- **Proper casing for technologies**: `.NET`, `ASP.NET Core`, `Nuxt`, `Vue.js`, `TypeScript`, `OpenTelemetry`
- **Lowercase for concepts**: `tooling`, `learning`, `thoughts`, `devops`, `api`
- **Weekly tips**: always include `tips learned this week` tag

### 5. Fill in frontmatter fields

| Field | Required | Notes |
|-------|----------|-------|
| `title` | Yes | Use quotes for titles with colons or special characters |
| `description` | Yes | Brief summary (can use quotes) |
| `date` | Yes | Today's date in `YYYY-MM-DD` format |
| `image.src` | Yes | Cover image path (default: `/images/placeholder_1.jpg`) |
| `badge.label` | Yes | Category from the table above |
| `tags` | No | Array of relevant tags |
| `canonical` | No | URL if cross-posted from another site |
| `ImageAttribution` | No | Credit for stock photos |

### 6. Apply the template

Use the [article template](./templates/article.md) as the body structure. Fill in frontmatter based on the topic but keep the placeholder body content as-is.

### 7. Code block convention

Code blocks with filenames use `[filename]` syntax after the language identifier:

````markdown
```typescript [nuxt.config.ts]
// code here
```
````

## Output

Create only the initialized article file in `content/1.posts/` with frontmatter filled based on the topic and the placeholder structure from the template. Do NOT write actual article content.
