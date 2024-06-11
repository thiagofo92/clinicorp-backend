import { UserEntity } from "entity/index.mjs";
import { MongoConnection } from "./connection/mongo.connection.mjs";
import { UserSchema } from "./schema/user.schema.mjs";
import { Logger } from "shared/logger.mjs";

export class UserRepository {
  #modelName = 'users'
  constructor() { }

  /**
   * @param {UserEntity} user 
   * @returns {Promise<string>}
   * */
  async create(user) {
    try {
      const model = MongoConnection.getModel(this.#modelName, UserSchema)
      const result = await model.create(user)

      return result._id.toHexString()
    } catch (error) {
      Logger.error('Error to create user: ', error)
      return ''
    }
  }

  /**
   * @param {string} login 
   * @param {string} pass 
   * @returns {Promise<boolean>}
   * */
  async auth(login, pass) {
    try {
      const model = MongoConnection.getModel(this.#modelName, UserSchema)
      const result = await model.exists({ login, pass })

      if (!result) return false

      return true
    } catch (error) {
      Logger.error('Error to create user: ', error)
      return false
    }
  }
}