import { MongoConnection } from "./connection/mongo.connection.mjs";
import { LoginSchema } from "./schema/login.schema.mjs";
import { Logger } from "../shared/logger.mjs";
import { InternalServer } from "../shared/error/general.error.mjs";
import { LoginExist, Unauthorized } from "../shared/error/login.error.mjs";

export class LoginRepository {
  #modelName = 'users'
  constructor() { }

  /**
   * @param {import("dto/login.dto.mjs").LoginCreateDto} input
   * @returns {Promise<{id: string}|InternalServer>}
   * */
  async create(input) {
    try {
      const model = MongoConnection.getModel(this.#modelName, LoginSchema)


      const exist = await model.exists({ login: input.login })

      if (exist) return new LoginExist()
      const result = await model.create(input)

      return { id: result._id.toHexString() }
    } catch (error) {
      Logger.error('Error to create user: ', error)
      return new InternalServer()
    }
  }

  /**
   * @param {string} login 
   * @param {string} pass 
   * @returns {Promise<{id: string}|InternalServer|Unauthorized>}
   * */
  async auth(login, pass) {
    try {
      const model = MongoConnection.getModel(this.#modelName, LoginSchema)
      const result = await model.exists({ login, pass })

      if (!result) return new Unauthorized()

      return { id: result._id.toHexString() }
    } catch (error) {
      Logger.error('Error to auth user: ', error)
      return new InternalServer()
    }
  }
}
