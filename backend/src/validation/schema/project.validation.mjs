import { z } from 'zod'

export const ProjectCreateSchemaValidation = z.object({
  name: z.string(),
  userRootId: z.string().uuid(),
  description: z.string(),
})

export const ProjectUpdateSchemaValidaion = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  description: z.string().nullable(),
})

export const ProjectIdSchemaValidate = z.string().uuid()
