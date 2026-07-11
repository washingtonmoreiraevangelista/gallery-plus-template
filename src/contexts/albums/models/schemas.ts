import { z } from 'zod'

export const albumNewFormsSchema = z.object({
  title: z.string().min(1, { message: "Campo obrigatorio" }).max(255),
  photosIds: z.array(z.string().uuid()).optional()
})

export type AlbumNewFormSchema = z.infer<typeof albumNewFormsSchema>