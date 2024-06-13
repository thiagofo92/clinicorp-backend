import { ProjectController } from '../../../controller/project.controller.mjs'
import { ProjectsRepository } from '../../../repository/projects.repository.mjs'
import { ProjectCreateMiddlware, ProjectIdMiddlware, ProjectUpdateMiddlware } from '../middleware/projects.middleware.mjs'

export class ProjectRouter {
  /**
   * @type {import('express').Router}
   * */
  #route
  /**
   * @type {ProjectController}
   * */
  #controller

  /**
   * @param {import('express').Router} route
   * */
  constructor(route) {
    this.#controller = new ProjectController(new ProjectsRepository())
    this.#route = route
  }

  #project() {
    this.#route.post('/', ProjectCreateMiddlware, this.#controller.create.bind(this.#controller))
    this.#route.put('/:projectId', ProjectUpdateMiddlware, this.#controller.update.bind(this.#controller))
    this.#route.get('/:projectId', ProjectIdMiddlware, this.#controller.findById.bind(this.#controller))
    this.#route.get('/', this.#controller.findByUserId.bind(this.#controller))
    this.#route.delete('/:projectId', ProjectIdMiddlware, this.#controller.delete.bind(this.#controller))
  }

  build() {
    this.#project()
    return this.#route
  }
}
