import { AuthJwt } from 'validation/auth/jwt.mjs'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 * */
export async function ProjectIdMiddlware(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).json({ message: 'Empty token' })
    return
  }

  const token = req.headers.authorization.split(' ')

  if (!token[1]) {
    res.status(401).json({ message: 'Invalid token' })
    return
  }

  const valid = AuthJwt.verify(token[1])

  if (!valid) {
    res.status(401).json({ message: 'Invalid token' })
    return
  }

  next()
}
