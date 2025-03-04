import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '11.Corleone',
    short_name: '11.Corleone',
    description: '11.Corleone - Itt mindenki hülye? Itt? Mindenki',
    start_url: '/',
    display: 'standalone',
    background_color: '#000',
    theme_color: '#000',
    lang: "hu_HU",
    categories: ["education", "event", "study"]
  }
}