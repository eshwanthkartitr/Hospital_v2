import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '1yx3ufgp',
  dataset: 'production',
  apiVersion: '2024-02-25',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN // Only if you need write access
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}