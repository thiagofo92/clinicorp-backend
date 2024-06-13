import { LoginRepository } from '../../../repository/index.mjs'
import { LoginController } from '../../../controller/index.mjs'
import { LoginCreateMiddleware, LoginAuthMiddleware } from '../middleware/login.middleware.mjs'
import { ProjectRouter } from './project.router.mjs'

/**
 * @description This class represent the path login
 * */
export class LoginRouter {
  /**
   * @param {import('express').Router} route
   * */
  #route
  /**
   * @param {LoginController} route
   * */
  #controller
  /**
   * @param {import('express').Router} route
   * */
  constructor(route) {
    this.#controller = new LoginController(new LoginRepository())
    this.#route = route
  }

  #login() {
    this.#route.post('/', LoginCreateMiddleware, this.#controller.create.bind(this.#controller))
    this.#route.post('/auth', LoginAuthMiddleware, this.#controller.auth.bind(this.#controller))
  }

  #projects() {
    const router = new ProjectRouter(this.#route)
    this.#route.use('/:loginId/projects', router.build())
  }

  build() {
    this.#login()
    this.#projects()

    return this.#route
  }
}
