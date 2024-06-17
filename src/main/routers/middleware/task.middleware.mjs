import { TaskCreateSchemaValidation, TaskIdSchemaValidate, TaskUpdateSchemaValidaion } from "../../../validation/schema/index.mjs";


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 * */
export async function TaskCreateMiddlware(req, res, next) {
  const result = TaskCreateSchemaValidation.safeParse(req.body)

  if (result.success) return next()

  res.status(400).json({ data: result.error.issues })
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 * */
export async function TaskUpdateMiddlware(req, res, next) {
  const payload = {
    id: req.params.id,
    ...req.body
  }
  const result = TaskUpdateSchemaValidaion.safeParse(payload)

  if (result.success) return next()

  res.status(400).json({ data: result.error.issues })
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 * */
export async function TaskIdMiddlware(req, res, next) {
  const result = TaskIdSchemaValidate.safeParse(req.params.id)

  if (result.success) return next()

  res.status(400).json({ data: result.error.issues })
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 * */
export async function TaskProjectIdMiddlware(req, res, next) {
  // TODO
  const result = TaskIdSchemaValidate.safeParse(req.query.projectId)

  if (result.success) return next()

  res.status(400).json({ data: result.error.issues })
}
