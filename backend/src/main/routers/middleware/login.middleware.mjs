import { LoginCreateSchemaValidation } from '../../../validation/schema/user.validation.mjs'


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * */
export function LoginCreateMiddleware(req, res, next) {
  const { body } = req

  const result = LoginCreateSchemaValidation.safeParse(body)

  if (result.success) return next()

  res.status(400).json({ data: result.error.issues })
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * */
export function LoginAuthMiddleware(req, res, next) {
  const { body } = req

  const result = LoginCreateSchemaValidation.safeParse(body)

  if (result.success) return next()

  res.status(400).json({ data: result.error.issues })
}
