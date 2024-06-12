import { MongoConnection } from "./connection/mongo.connection.mjs";
import { LoginSchema } from "./schema/login.schema.mjs";
import { Logger } from "../shared/logger.mjs";
import { InternalServer } from "../shared/error/general.error.mjs";
import { Unauthorized } from "../shared/error/login.error.mjs";

export class LoginRepository {
  #modelName = 'users'
  constructor() { }

  /**
   * @param {import("dto/login.dto.mjs").LoginCreateDto} user 
   * @returns {Promise<string|InternalServer>}
   * */
  async create(user) {
    try {
      const model = MongoConnection.getModel(this.#modelName, LoginSchema)
      const result = await model.create(user)

      return result._id.toHexString()
    } catch (error) {
      Logger.error('Error to create user: ', error)
      return new InternalServer()
    }
  }

  /**
   * @param {string} login 
   * @param {string} pass 
   * @returns {Promise<boolean|InternalServer|Unauthorized>}
   * */
  async auth(login, pass) {
    try {
      const model = MongoConnection.getModel(this.#modelName, LoginSchema)
      const result = await model.exists({ login, pass })

      if (!result) return false

      return true
    } catch (error) {
      Logger.error('Error to auth user: ', error)
      return new InternalServer()
    }
  }
}
