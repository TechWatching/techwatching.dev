export default defineAppConfig({
  ui: {
    primary: 'sky',
    gray: 'cool',
    button: {
      rounded: 'rounded-full',
      default: {
        size: 'md'
      }
    },
    variables: {
      header: {
        height: '6rem'
      }
    },
    input: {
      default: {
        size: 'md'
      }
    },
    // avatar: { size: [''] },
    card: {
      rounded: 'rounded-xl'
    },
    footer: {
      top: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800',
        container: 'py-8 lg:py-16'
      },
      bottom: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    },
    page: {
      hero: {
        wrapper: 'lg:py-24'
      }
    },
    content: {
      prose: {
        code: {
          icon: {
            cs: 'vscode-icons:file-type-csharp',
            csx: 'vscode-icons:file-type-csharp'
          }
        }
      }
    }
  }
})
