import { MongoConnection } from "./connection/mongo.connection.mjs";
import { UserSchema } from "./schema/user.schema.mjs";
import { Logger } from "../shared/logger.mjs";
import { InternalServer } from "../shared/error/general.error.mjs";

export class UserRepository {
  #modelName = 'users'
  constructor() { }

  /**
   * @param {import("dto/user.dto.mjs").UserCreateDto} user 
   * @returns {Promise<string|InternalServer>}
   * */
  async create(user) {
    try {
      const model = MongoConnection.getModel(this.#modelName, UserSchema)
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
   * @returns {Promise<boolean|InternalServer>}
   * */
  async auth(login, pass) {
    try {
      const model = MongoConnection.getModel(this.#modelName, UserSchema)
      const result = await model.exists({ login, pass })

      if (!result) return false

      return true
    } catch (error) {
      Logger.error('Error to auth user: ', error)
      return new InternalServer()
    }
  }
}
