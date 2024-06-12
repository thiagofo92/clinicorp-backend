import { LoginController, ProjectController, TaskController } from "../../controller/index.mjs";
import { LoginRepository, ProjectsRepository, TaskRepository } from "../../repository/index.mjs";
import { LoginAuthMiddleware, LoginCreateMiddleware } from "./middleware/index.mjs";

export class MainRouter {
  /**
   * @param {import('express').Router} route
   * */
  #route

  /**
   * @param {import('express').Router} route
   * */
  constructor(route) {
    this.#route = route
  }

  #login() {
    const rep = new LoginRepository()
    const controller = new LoginController(rep)

    this.#route.post('/logins', LoginCreateMiddleware, controller.create)
    this.#route.post('/logins/auth', LoginAuthMiddleware, controller.auth)
  }

  #project() {
    const rep = new ProjectsRepository()
    const controller = new ProjectController(rep)

    this.#route.post('/projects', LoginCreateMiddleware, controller.create)
    this.#route.put('/projects/:id', LoginCreateMiddleware, controller.update)
    this.#route.get('/projects/:id', LoginCreateMiddleware, controller.findById)
    this.#route.get('/projects', LoginCreateMiddleware, controller.findByUserId)
    this.#route.delete('/projects/:id', LoginCreateMiddleware, controller.delete)
  }

  #task() {
    const rep = new TaskRepository()
    const controller = new TaskController(rep)

    this.#route.post('/task', LoginCreateMiddleware, controller.create)
    this.#route.put('/task/:id', LoginCreateMiddleware, controller.update)
    this.#route.get('/task/:id', LoginCreateMiddleware, controller.findById)
    this.#route.get('/task', LoginCreateMiddleware, controller.findByProjectId)
    this.#route.delete('/task/:id', LoginCreateMiddleware, controller.delete)
  }

  /**
   * @returns {import('express').Router}
   * */
  build() {
    this.#login()
    this.#project()
    this.#task()

    return this.#route
  }
}
