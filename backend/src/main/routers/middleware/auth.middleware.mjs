import { AuthJwt } from '../../../validation/auth/jwt.mjs'

const MESSAGE = 'Invalid token'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 * */
export async function AuthMiddlware(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).json({ message: MESSAGE })
    return
  }

  const token = req.headers.authorization.split(' ')

  if (!token[1]) {
    res.status(401).json({ message: MESSAGE })
    return
  }

  const valid = AuthJwt.verify(token[1])

  if (!valid) {
    res.status(401).json({ message: MESSAGE })
    return
  }

  next()
}
