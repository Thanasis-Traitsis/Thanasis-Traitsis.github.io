import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  return builder.image(source)
}

// Preset configurations for common use cases
export const imagePresets = {
  thumbnail: (source) => 
    urlFor(source)
      .width(400)
      .height(300)
      .fit('crop')
      .auto('format')
      .quality(80),
  
  card: (source) =>
    urlFor(source)
      .width(600)
      .height(400)
      .fit('crop')
      .auto('format')
      .quality(85),
  
  hero: (source) =>
    urlFor(source)
      .width(1920)
      .height(1080)
      .fit('crop')
      .auto('format')
      .quality(90),
  
  detail: (source) =>
    urlFor(source)
      .width(1200)
      .auto('format')
      .quality(90),
  
  responsive: (source, width) =>
    urlFor(source)
      .width(width)
      .auto('format')
      .quality(85)
}
