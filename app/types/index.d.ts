import type { ParsedContent } from '@nuxt/content'
import type { Avatar, Badge, Link } from '#ui/types'

export interface BlogPost extends ParsedContent {
  title: string
  lead?: string
  description: string
  date: string
  image?: HTMLImageElement
  badge?: Badge
  authors?: ({
    name: string
    description?: string
    avatar: Avatar
  } & Link)[]
  canonical?: string
}

export interface Events extends ParsedContent {
  name: string
  date: string
  type: 'online' | 'conference' | 'meetup'
  image?: HTMLImageElement
  url: string
}