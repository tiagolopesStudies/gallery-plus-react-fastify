import { z } from 'zod'

export const photoNewFormSchema = z.object({
  title: z.string().min(1, { error: 'Campo obrigatório' }).max(255),
  file: z.instanceof(FileList).refine((file) => file.length > 0, {
    error: 'Campo obrigatório'
  }),
  albumsIds: z.array(z.uuid()).optional()
})

export type PhotoNewFormSchema = z.infer<typeof photoNewFormSchema>
