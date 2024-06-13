import { ProjectCreateSchemaValidation, ProjectIdSchemaValidate, ProjectUpdateSchemaValidaion } from "../../../validation/schema/project.validation.mjs";


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 * */
export async function ProjectCreateMiddlware(req, res, next) {
  const payload = {
    userRootId: req.params.userId,
    ...req.body
  }
  const result = ProjectCreateSchemaValidation.safeParse(payload)

  if (result.success) return next()

  res.status(400).json({ data: result.error.issues })
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 * */
export async function ProjectUpdateMiddlware(req, res, next) {
  const payload = {
    userRootId: req.params.userId,
    ...req.body
  }
  const result = ProjectUpdateSchemaValidaion.safeParse(payload)

  if (result.success) return next()

  res.status(400).json({ data: result.error.issues })
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 * */
export async function ProjectIdMiddlware(req, res, next) {
  const result = ProjectIdSchemaValidate.safeParse(req.params.projectId)

  if (result.success) return next()

  res.status(400).json({ data: result.error.issues })
}
