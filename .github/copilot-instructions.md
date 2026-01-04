# GitHub Copilot Instructions

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

## Project Context

This is a personal blog built with:
- **Nuxt 4** - Vue.js meta-framework
- **Nuxt UI v3** - UI component library
- **Nuxt Content v3** - Markdown/content management
- **TailwindCSS v4** - Styling

Content is stored in the `content/` directory with blog posts in `content/1.posts/`.

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

## Git Commit Guidelines

This project uses **Conventional Commits** for all commit messages.

### Commit Message Format
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries
- **ci**: Changes to CI configuration files and scripts

### Scope (optional)
Use the scope to specify the area of the codebase affected:
- `content` - Blog posts and content files
- `ui` - UI components and styling
- `config` - Configuration files (nuxt.config.ts, app.config.ts)
- `deps` - Dependency updates

### Examples
```
feat(content): add new blog post about TypeScript tips
fix(ui): correct navigation menu alignment on mobile
docs: update README with deployment instructions
chore(deps): update nuxt to v4.1.0
refactor(ui): simplify AppHeader component structure
```

### Rules
- Use lowercase for the type and description
- Do not end the description with a period
- Use imperative mood in the description ("add" not "added" or "adds")
- Keep the first line under 72 characters
