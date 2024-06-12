import { LoginController } from "../../controller/index.mjs";
import { LoginRepository } from "../../repository/index.mjs";
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

  #user() {
    const rep = new LoginRepository()
    const controller = new LoginController(rep)

    this.#route.post('/logins', LoginCreateMiddleware, controller.create)
    this.#route.post('/logins/auth', LoginAuthMiddleware, controller.auth)
  }

  /**
   * @returns {import('express').Router}
   * */
  build() {
    this.#user()
    return this.#route
  }
}
