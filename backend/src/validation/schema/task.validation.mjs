import { z } from 'zod'

export const TaskCreateSchemaValidation = z.object({
  projectId: z.string(),
  title: z.string().uuid(),
  description: z.string(),
})

export const TaskUpdateSchemaValidaion = z.object({
  id: z.string().uuid(),
  title: z.string().nullable(),
  description: z.string().nullable(),
})

export const TaskIdSchemaValidate = z.string().uuid()
