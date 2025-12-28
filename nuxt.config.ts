// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@nuxt/hints',
    '@nuxt/scripts',
    '@stefanobartoletti/nuxt-social-share'
  ],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      titleTemplate: '%s - Alexandre Nédélec'
    }
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://techwatching.dev',
    name: "Alexandre Nédélec's personal website",
    description: "Alexandre Nédélec's personal website"
  },

  socialShare: {
    baseUrl: 'https://techwatching.dev'
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    exclude: ['/login', '/signup']
  },

  runtimeConfig: {
    public: {
      submitJsonApiKey: '',
      posthogPublicKey: '',
      posthogHost: 'https://eu.i.posthog.com'
    }
  },

  experimental: {
    viewTransition: true
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: [
            'json', 'js', 'ts', 'html', 'xml', 'css', 'vue', 'shell',
            'mdc', 'md', 'yaml', 'csharp', 'powershell', 'http',
            'nushell', 'razor', 'sql'
          ]
        }
      }
    }
  },

  compatibilityDate: '2024-07-11',

  // Prerender all routes at build time for static hosting
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      failOnError: false
    }
  },

  // Optional: Add route rules for full prerendering
  routeRules: {
    '/**': { prerender: true },
    '/gitcheatsheet': { redirect: '/goodies/gitcheatsheet', prerender: true },
    '/*.rss': { prerender: true },
    '/*.atom': { prerender: true }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
