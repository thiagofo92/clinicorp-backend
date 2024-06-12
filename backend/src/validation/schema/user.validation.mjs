import { z } from 'zod'

export const LoginCreateSchemaValidation = z.object({
  name: z.string(),
  login: z.string(),
  pass: z.string()
})

export const LoginUpdateSchemaValidation = z.object({
  name: z.string().nullable(),
  login: z.string().nullable(),
  pass: z.string().nullable(),
})

export const LoginIdSchemaValidation = z.string().uuid()
