import { Router } from 'express'
import { LoginRouter } from "./login/login.router.mjs";
import { ProjectRouter } from './login/project.router.mjs';
import { TaskRouter } from './login/task.router.mjs';
import { AuthMiddlware } from './middleware/auth.middleware.mjs';

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
    const route = new LoginRouter(Router())
    this.#route.use('/v1/logins', route.build())
  }

  #project() {
    const route = new ProjectRouter(Router())
    this.#route.use('/v1/projects', AuthMiddlware, route.build())
  }

  #task() {
    const route = new TaskRouter(Router())
    this.#route.use('/v1/tasks', AuthMiddlware, route.build())
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
