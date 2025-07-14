import kebabCase from "just-kebab-case";

export const getTagSlug = (tag: string) => kebabCase(tag.toLowerCase().replace('/', ''))

export const getTagRoute = (tag: string) => `/tags/${getTagSlug(tag)}`
