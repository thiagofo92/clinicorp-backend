import { AuthJwt } from "../validation/auth/jwt.mjs";
import { LoginRepository } from "../repository/index.mjs";
import { HttpResponse, HttpResponseError } from "../shared/http/response.http.mjs";

export class LoginController {
  /**
   * @type {LoginRepository}
   * */
  #rep

  /**
   * @param {LoginRepository} rep
   * */
  constructor(rep) {
    this.#rep = rep
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   * */
  async create(req, res) {
    const { body } = req

    const result = await this.#rep.create(body)

    if (result instanceof Error) {
      const err = HttpResponseError(result)
      res.status(err.code).json({ data: err.data })
      return
    }

    const { data, code } = HttpResponse(result, 201)

    res.status(code).json({ data })
    return
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   * */
  async auth(req, res) {
    const { login, pass } = req.body
    const result = await this.#rep.auth(login, pass)

    if (result instanceof Error) {
      const err = HttpResponseError(result)
      res.status(err.code).json({ data: err.data })
      return
    }

    const token = AuthJwt.sign(result.id)

    const { data, code } = HttpResponse({ token }, 201)

    res.status(code).json({ data })
    return
  }
}
