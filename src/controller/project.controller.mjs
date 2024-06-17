import { ProjectsRepository } from '../repository/projects.repository.mjs';
import { HttpResponseError, HttpResponse } from '../shared/http/response.http.mjs';

export class ProjectController {
  /**
   * @param {ProjectsRepository} rep
   * */
  #rep

  /**
   * @param {ProjectsRepository} rep
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

    const data = HttpResponse({ id: result }, 201)

    res.status(data.code).json(data)
    return
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   * */
  async update(req, res) {
    const payload = req.body
    const id = req.params.id

    payload.id = String(id)
    const result = await this.#rep.update(payload)

    if (result instanceof Error) {
      const err = HttpResponseError(result)
      res.status(err.code).json({ data: err.data })
      return
    }

    const data = HttpResponse(result, 204)

    res.status(data.code).json({ data })
    return
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   * */
  async findById(req, res) {
    const id = req.params.id

    const result = await this.#rep.findById(String(id))

    if (result instanceof Error) {
      const err = HttpResponseError(result)
      res.status(err.code).json({ data: err.data })
      return
    }

    const data = HttpResponse(result, 200)

    res.status(data.code).json(data)
    return
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   * */
  async findByUserId(req, res) {
    const { userId } = req.query
    const offset = Number(req.query.offset) || 20
    const page = Number(req.query.page) || 1
    //TODO Try to use the user ID in url or use as a context
    const result = await this.#rep.findByUserId(String(userId), offset, page)

    if (result instanceof Error) {
      const err = HttpResponseError(result)
      res.status(err.code).json({ data: err.data })
      return
    }

    const data = HttpResponse(result, 200)

    res.status(data.code).json(data)
    return
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   * */
  async delete(req, res) {
    const id = req.params.id

    const result = await this.#rep.delete(String(id))

    if (result instanceof Error) {
      const err = HttpResponseError(result)
      res.status(err.code).json({ data: err.data })
      return
    }

    const data = HttpResponse(result, 200)

    res.status(data.code).json(data)
    return
  }
}
