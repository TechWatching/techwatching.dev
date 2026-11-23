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
    enabled: false
  },

  app: {
    head: {
      titleTemplate: '%s - Alexandre Nédélec'
    }
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://techwatching.dev',
    name: 'Alexandre Nédélec\'s personal website',
    description: 'Alexandre Nédélec\'s personal website'
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

  runtimeConfig: {
    public: {
      submitJsonApiKey: '',
      posthogPublicKey: '',
      posthogHost: 'https://eu.i.posthog.com'
    }
  },

  // Route rules for prerendering (proxies handled by Netlify)
  routeRules: {
    '/**': { prerender: true },
    '/api/**': { prerender: true },
    '/*.rss': { prerender: true },
    '/*.atom': { prerender: true }
  },

  experimental: {
    viewTransition: true
  },

  compatibilityDate: '2024-07-11',

  // Prerender all routes at build time for static hosting
  nitro: {
    prerender: {
      routes: ['/', '/feed.rss', '/feed.atom', '/dotnet_feed.rss', '/dotnet_feed.atom'],
      crawlLinks: true,
      failOnError: true
    }
  },

  ui: {
    eslint: {
      rules: {
        'no-unknown-classes': 'warn',
        'no-conflicting-classes': 'warn',
        'no-palette-colors': 'warn'
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    provider: 'local',
    local: {
      packages: ['@fontsource-variable/public-sans']
    }
  },

  icon: {
    clientBundle: {
      icons: [
        'simple-icons:bluesky',
        'simple-icons:devdotto',
        'simple-icons:github',
        'simple-icons:hashnode',
        'simple-icons:linkedin',
        'simple-icons:mastodon'
      ],
      scan: {
        globInclude: [
          'app/**/*.{vue,ts}',
          'content/**/*.{md,mdc,yml,yaml}'
        ]
      }
    },
    fallbackToApi: false
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    exclude: ['/login', '/signup']
  },

  socialShare: {
    baseUrl: 'https://techwatching.dev'
  }
})
