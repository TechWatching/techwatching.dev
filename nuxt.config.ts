// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxt/hints',
    '@nuxt/scripts'
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
    name: 'Alexandre Nédélec'
  },

  experimental: {
    viewTransition: true
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
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
