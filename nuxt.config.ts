// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  experimental: {
    viewTransition: true
  },
  // solve build issue on netlify
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano: process.env.NODE_ENV === 'production' ? {preset: ['default', {discardComments: {removeAll: true}}]} : false,
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    'nuxt-og-image',
    "@stefanobartoletti/nuxt-social-share",
    "@nuxtjs/seo",
    '@unlighthouse/nuxt',
    "@nuxtjs/mdc"
  ],
  content: {
    highlight: {
      langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'csharp', 'powershell', 'http', 'nushell', 'razor', 'powershell', 'sql']
    },
  },
  site: {
    url: 'https://techwatching.dev',
    name: 'Alexandre Nédélec\'s personal website'
  },
  sitemap: {
    sources: [
      '/api/__sitemap__/urls'
    ]
  },
  image: {
    format: ['webp']
  },
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter((c) => ['UButton'].includes(c.pascalName))

      globals.forEach((c) => c.global = true)
    }
  },
  ui: {
    icons: ['heroicons', 'simple-icons', 'fluent-emoji-flat', 'ph'],
  },
  routeRules: {
    '/api/tags.json': {prerender: true},
    '/api/search.json': { prerender: true },
    '/feed.atom': {prerender: true},
    '/feed.rss': {prerender: true},
    '/gitcheatsheet': {redirect: '/goodies/gitcheatsheet', prerender: true},
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  runtimeConfig: {
    public: {
      posthogPublicKey: '',
      posthogHost: "https://eu.i.posthog.com",
      submitJsonApiKey: '',
      mdc: {
        useNuxtImage : true
      }
    }
  }
})
