import { TaskRepository } from '../repository/index.mjs';
import { HttpResponseError, HttpResponse } from '../shared/http/response.http.mjs';

export class TaskController {
  /**
   * @param {TaskRepository} rep
   * */
  #rep

  /**
   * @param {TaskRepository} rep
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

    const data = HttpResponse(result, 201)

    res.status(data.code).json({ data })
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

    const data = HttpResponse(result, 200)

    res.status(data.code).json({ data })
    return
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   * */
  async findById(req, res) {
    const id = req.params

    const result = await this.#rep.findById(String(id))

    if (result instanceof Error) {
      const err = HttpResponseError(result)
      res.status(err.code).json({ data: err.data })
      return
    }

    const data = HttpResponse(result, 200)

    res.status(data.code).json({ data })
    return
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   * */
  async findByProjectId(req, res) {
    const { projectId } = req.query
    const offset = req.query.offset ? req.query.offset : 20
    const page = req.query.page ? req.query.page : 20
    //TODO Try to use the user ID in url or use as a context
    const result = await this.#rep.findByProjectId(String(projectId), Number(offset), Number(page))

    if (result instanceof Error) {
      const err = HttpResponseError(result)
      res.status(err.code).json({ data: err.data })
      return
    }

    const data = HttpResponse(result, 200)

    res.status(data.code).json({ data })
    return
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   * */
  async delete(req, res) {
    const id = req.params

    const result = await this.#rep.delete(String(id))

    if (result instanceof Error) {
      const err = HttpResponseError(result)
      res.status(err.code).json({ data: err.data })
      return
    }

    const data = HttpResponse(result, 200)

    res.status(data.code).json({ data })
    return
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   * */
  async updateStatus(req, res) {
    const id = req.params.id
    //TODO Try to use the user ID in url or use as a context
    const result = await this.#rep.findById(String(id))

    if (result instanceof Error) {
      const err = HttpResponseError(result)
      res.status(err.code).json({ data: err.data })
      return
    }

    const data = HttpResponse(result, 200)

    res.status(data.code).json({ data })
    return
  }
}