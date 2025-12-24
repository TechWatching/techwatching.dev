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

### Always check component documentation
Use `mcp_nuxt-ui_get-component` or `mcp_nuxt-ui_get-component-metadata` to find:
- Available props and their types
- Available slots for customization
- The `ui` prop structure with all customizable slots
- Theme configuration in `app.config.ts`
