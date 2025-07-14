const kebabCase = (str: string) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '')

export const getTagSlug = (tag: string) => kebabCase(tag.toLowerCase().replace('/', ''))

export const getTagRoute = (tag: string) => `/tags/${getTagSlug(tag)}`
