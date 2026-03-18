# GitHub Copilot Instructions

## Project Overview

This is **TechWatching.dev**, Alexandre Nédélec's personal blog at https://techwatching.dev. It is a statically generated site built with:

- **Nuxt 4** — Vue.js meta-framework (compatibility date `2024-07-11`)
- **Nuxt UI v3** (`@nuxt/ui`) — UI component library based on TailwindCSS v4
- **Nuxt Content v3** (`@nuxt/content`) — Markdown/YAML content management with SQLite
- **TailwindCSS v4** — Utility-first CSS
- **@nuxtjs/seo** — SEO, OG images, schema.org, sitemap
- **TypeScript** — strict typing throughout

## Development Environment

### Package Manager

This project uses **pnpm** (version specified in `package.json` → `"packageManager": "pnpm@10.29.2"`). Always use `pnpm` — never `npm` or `yarn`.

The `.npmrc` sets `shamefully-hoist=true`.

### Bootstrap

```bash
corepack enable        # ensure pnpm is managed by corepack
pnpm install           # install all dependencies
```

### Common Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server at http://localhost:3000 |
| `pnpm build` | Build for production (SSR) |
| `pnpm generate` | Generate static site (prerendered) |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint with auto-fix |
| `pnpm typecheck` | Run TypeScript type checking via `nuxt typecheck` |

### CI Validation

The CI workflow (`.github/workflows/ci.yml`) runs on every push:

1. `pnpm install` — install dependencies
2. `pnpm run lint` — **must pass with zero errors**
3. `pnpm run typecheck` — **must pass with zero errors**

Always run both `pnpm lint` and `pnpm typecheck` before committing. Fix all lint and type errors before marking work as done.

## Project Layout

```
techwatching.dev/
├── .github/
│   ├── copilot-instructions.md   # this file — repository-wide Copilot instructions
│   ├── git-commit-instructions.md # Conventional Commits format guide
│   ├── instructions/             # path-specific instructions (.instructions.md)
│   │   ├── content.instructions.md  # applyTo: content/**/*.{md,yml}
│   │   └── nuxt.instructions.md     # applyTo: **/*.vue
│   ├── prompts/                  # reusable prompt templates
│   │   └── new-article.prompt.md
│   ├── agents/                   # Copilot agent definitions
│   │   └── nuxt.agent.md
│   └── workflows/
│       └── ci.yml                # lint + typecheck on every push
├── app/                          # Nuxt app source (Nuxt 4 layout)
│   ├── app.vue                   # root Vue component
│   ├── app.config.ts             # Nuxt UI theme config (colors, components)
│   ├── components/               # shared Vue components (AppHeader, GiscusComments, etc.)
│   ├── pages/                    # file-based routes (index.vue, blog/[slug].vue, etc.)
│   ├── layouts/                  # Nuxt layouts (default.vue)
│   ├── assets/css/main.css       # global TailwindCSS entry point
│   ├── plugins/                  # Nuxt plugins (posthog.client.ts)
│   ├── types/                    # shared TypeScript types
│   └── utils/                    # utility functions
├── content/                      # @nuxt/content source files
│   ├── 0.index.yml               # home page structured data
│   ├── 1.posts/                  # blog posts — {number}.{slug}.md
│   ├── 2.speaking.yml            # speaking events array
│   └── 3.goodies/                # goodies/tools — {slug}.md
├── server/
│   ├── api/                      # JSON API endpoints (*.<method>.ts)
│   └── routes/                   # custom routes (RSS/Atom: *.rss, *.atom)
├── public/                       # static assets served as-is
├── content.config.ts             # @nuxt/content collection schemas (zod)
├── nuxt.config.ts                # Nuxt configuration
├── eslint.config.mjs             # ESLint flat config
├── tsconfig.json                 # TypeScript config
├── pnpm-workspace.yaml           # pnpm workspace
└── .npmrc                        # pnpm config
```

### Key architecture notes

- **Static generation**: all routes prerendered via `routeRules: { '/**': { prerender: true } }` and Nitro crawl
- **Content collections**: defined in `content.config.ts` using `defineCollection` + zod schemas; collection names are `index`, `posts`, `speaking`, `goodies`, `goodiesPage`, `content`
- **Server handlers**: must import from `@nuxt/content/server` and pass `event` as first arg: `queryCollection(event, 'posts')`
- **Commit messages**: follow Conventional Commits (see `.github/git-commit-instructions.md`)

## MCP Tool Usage

When answering questions about this project, use the appropriate MCP (Model Context Protocol) tools:

### Nuxt UI Questions

For questions about **Nuxt UI components, styling, theming, or UI-related features**, use the Nuxt UI MCP tools:

- `mcp_nuxt-ui_list-components` - List all available Nuxt UI components
- `mcp_nuxt-ui_get-component-metadata` - Get detailed props, slots, and events for a component
- `mcp_nuxt-ui_list-examples` - Browse UI examples and code demonstrations
- `mcp_nuxt-ui_get-example` - Get specific example implementation code
- `mcp_nuxt-ui_get-migration-guide` - Get migration guides between versions
- `mcp_nuxt-ui_list-getting-started-guides` - List installation and setup guides
- `mcp_nuxt-ui_get-template` - Get template details and setup instructions

**Examples of Nuxt UI questions:**
- How do I use the UButton component?
- What props does UHeader accept?
- How do I customize the color theme?
- How do I create a navigation menu?
- What's the difference between UCard and UPageCard?

### Nuxt Framework Questions

For questions about **Nuxt framework, routing, configuration, modules, content, or deployment**, use the Nuxt MCP tools:

- `mcp_nuxt_get-getting-started-guide` - Get the Nuxt getting started guide
- `mcp_nuxt_list-documentation-pages` - Search/explore Nuxt documentation
- `mcp_nuxt_list-modules` - Discover available Nuxt modules
- `mcp_nuxt_list-deploy-providers` - List deployment/hosting options

Activate additional tool groups as needed:
- `activate_nuxt_documentation_tools` - For detailed documentation pages
- `activate_nuxt_module_management_tools` - For module details
- `activate_nuxt_deployment_tools` - For deployment guides
- `activate_nuxt_blog_management_tools` - For Nuxt blog posts

**Examples of Nuxt questions:**
- How do I configure nuxt.config.ts?
- How does Nuxt Content v3 work?
- How do I set up SSR/SSG?
- How do I deploy to Netlify/Vercel?
- How do I create API routes in Nuxt?

## Nuxt UI v3 Styling Guidelines

When customizing Nuxt UI v3 components:

### Use the `ui` prop for styling
Do NOT use `class` to style internal parts of components. Instead, use the `ui` prop with slot names:

```vue
<!-- ❌ Wrong - class doesn't affect internal elements -->
<UNavigationMenu :items="items" class="text-xl font-semibold" />

<!-- ✅ Correct - use ui prop with slot names -->
<UNavigationMenu 
  :items="items" 
  :ui="{ link: 'text-xl font-semibold' }"
/>
```

### Common ui slots by component
- **UNavigationMenu**: `root`, `list`, `link`, `linkLabel`, `linkLeadingIcon`, etc.
- **UButton**: `base`, `label`, `leadingIcon`, `trailingIcon`
- **UHeader**: `root`, `left`, `center`, `right`, `logo`
- **UAvatar**: `root`, `image`, `fallback`

### UAvatar custom sizes
When using UAvatar with a custom size via the `ui` prop, always set explicit `width` and `height` props to match the display size. This ensures NuxtImg fetches the image at the correct resolution and avoids blurry images:

```vue
<!-- ❌ Wrong - image will be blurry (fetched at default small size) -->
<UAvatar
  src="/images/profile.png"
  :ui="{ root: 'size-44' }"
/>

<!-- ✅ Correct - explicit dimensions match the display size (size-44 = 176px) -->
<UAvatar
  src="/images/profile.png"
  :width="176"
  :height="176"
  :ui="{ root: 'size-44' }"
/>
```

### Always check component documentation
Use `mcp_nuxt-ui_get-component` or `mcp_nuxt-ui_get-component-metadata` to find:
- Available props and their types
- Available slots for customization
- The `ui` prop structure with all customizable slots
- Theme configuration in `app.config.ts`

