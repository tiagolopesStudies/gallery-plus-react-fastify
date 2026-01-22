import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.url(),
  VITE_IMAGES_URL: z.url()
})

const result = envSchema.safeParse(import.meta.env)

if (!result.success) {
  console.error('Invalid environment variables:', result.error.message)
  throw new Error('Invalid enviroment variables')
}

export const env = result.data
