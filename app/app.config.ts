export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    },
    prose: {
      codeIcon: {
        cs: 'vscode-icons:file-type-csharp',
        csx: 'vscode-icons:file-type-csharp'
      }
    }
  },
  socials: [
    {
      icon: 'i-simple-icons-linkedin',
      to: 'https://www.linkedin.com/in/alexandre-n%C3%A9d%C3%A9lec-24565549/',
      label: 'LinkedIn'
    },
    {
      icon: 'i-simple-icons-mastodon',
      to: 'https://mas.to/@techwatching',
      label: 'Mastodon'
    },
    {
      icon: 'i-simple-icons-bluesky',
      to: 'https://bsky.app/profile/techwatching.bsky.social',
      label: 'Bluesky'
    },
    {
      icon: 'i-simple-icons-hashnode',
      to: 'https://techwatching.hashnode.dev/',
      label: 'Hashnode'
    },
    {
      icon: 'i-simple-icons-devdotto',
      to: 'https://dev.to/techwatching',
      label: 'Dev.to'
    },
    {
      icon: 'i-simple-icons-github',
      to: 'https://github.com/TechWatching',
      label: 'GitHub'
    }
  ]
})
