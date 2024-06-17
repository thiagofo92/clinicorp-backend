import { TaskController } from '../../../controller/task.controller.mjs'
import { TaskRepository } from '../../../repository/task.repository.mjs'
import { TaskCreateMiddlware, TaskIdMiddlware, TaskProjectIdMiddlware, TaskUpdateMiddlware } from '../middleware/task.middleware.mjs'

export class TaskRouter {
  /**
   * @type {import('express').Router}
   * */
  #route
  /**
   * @type {TaskController}
   * */
  #controller

  /**
   * @param {import('express').Router} route
   * */
  constructor(route) {
    this.#controller = new TaskController(new TaskRepository())
    this.#route = route
  }

  #task() {
    this.#route.post('/', TaskCreateMiddlware, this.#controller.create.bind(this.#controller))
    this.#route.put('/:id', TaskUpdateMiddlware, this.#controller.update.bind(this.#controller))
    this.#route.get('/:id', TaskIdMiddlware, this.#controller.findById.bind(this.#controller))
    this.#route.get('/', TaskProjectIdMiddlware, this.#controller.findByProjectId.bind(this.#controller))
    this.#route.delete('/:id', TaskIdMiddlware, this.#controller.delete.bind(this.#controller))
  }

  build() {
    this.#task()
    return this.#route
  }
}
