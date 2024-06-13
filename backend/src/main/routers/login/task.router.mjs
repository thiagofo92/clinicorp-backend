import { TaskController } from '../../../controller/task.controller.mjs'
import { TaskRepository } from '../../../repository/task.repository.mjs'

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
}
