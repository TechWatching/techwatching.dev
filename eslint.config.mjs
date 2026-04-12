// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    // Your custom configs here
  },
  {
    files: ['**/*.md/**'],
    rules: {
      '@stylistic/eol-last': 'off'
    }
  }
)
