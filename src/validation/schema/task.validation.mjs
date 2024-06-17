import { z } from 'zod'

export const TaskCreateSchemaValidation = z.object({
  projectId: z.string(),
  title: z.string(),
  description: z.string(),
})

export const TaskUpdateSchemaValidaion = z.object({
  id: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable(),
})

export const TaskIdSchemaValidate = z.string()
