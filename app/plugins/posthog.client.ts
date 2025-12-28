import posthog from 'posthog-js'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
    api_host: runtimeConfig.public.posthogHost,
    person_profiles: 'identified_only',
    capture_pageview: false, // We'll handle this manually with the router,
    cookieless_mode: 'always', // Use cookieless mode to avoid cookie consent issues
    loaded: (posthog) => {
      if (import.meta.env.MODE === 'development') posthog.debug()
    }
  })

  // Track page views with Vue Router
  const router = useRouter()
  router.afterEach((to) => {
    nextTick(() => {
      posthog.capture('$pageview', {
        current_url: to.fullPath
      })
    })
  })

  return {
    provide: {
      posthog: () => posthogClient
    }
  }
})
