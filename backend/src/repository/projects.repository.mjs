import { MongoConnection } from "./connection/mongo.connection.mjs";
import { ProjectSchema } from "./schema/project.schema.mjs";
import { Logger } from "../shared/logger.mjs";
import { InternalServer, NotFound } from "../shared/error/general.error.mjs";

export class ProjectsRepository {
  #modelName = 'projects'
  /**
   * @param {import("dto/project.dto.mjs").ProjectCreateDto} input 
   * @returns {Promise<string|InternalServer>}
   * */
  async create(input) {
    try {
      const model = MongoConnection.getModel(this.#modelName, ProjectSchema)
      const result = await model.create({
        name: input.name,
        userRootId: input.userRootId,
        description: input.description
      })

      return result._id.toHexString()
    } catch (error) {
      Logger.error(`Error to create a new project`, error)
      return new InternalServer()
    }
  }

  /**
   * @param {import("dto/project.dto.mjs").ProjectUpdateDto} input 
   * @returns {Promise<NotFound|InternalServer|void>}
   * */
  async update(input) {
    try {
      const model = MongoConnection.getModel(this.#modelName, ProjectSchema)
      const result = await model.updateOne({ _id: input.id }, {
        $set: {
          name: input.name,
          description: input.description
        }
      })

      if (result.matchedCount <= 0) return new NotFound()

      return
    } catch (error) {
      Logger.error(`Error to update project`)
      return new InternalServer()
    }
  }

  /**
   * @param {string} id
   * @returns {Promise<InternalServer|NotFound|import("entity/project.entity.mjs").ProjectEntity>}
   * */
  async findById(id) {
    try {
      const model = MongoConnection.getModel(this.#modelName, ProjectSchema)
      const result = await model.findById(id)

      if (!result) return new NotFound()

      return {
        id: result._id.toHexString(),
        userRootId: result.userRootId,
        name: result.name,
        description: result.description,
        createdAt: result.createdAt,
      }

    } catch (error) {
      Logger.error(`Error to find project by ID: [${id}]`)
      return new InternalServer()
    }
  }

  /**
   * @param {string} userId 
   * @param {number} offset 
   * @param {number} page 
   * @returns {Promise<Array<import("entity/project.entity.mjs").ProjectEntity>|NotFound|InternalServer>}
   * */
  async findByUserId(userId, offset, page) {
    try {
      const model = MongoConnection.getModel(this.#modelName, ProjectSchema)
      const result = await model.find({ userRootId: userId })
        .skip(offset * (page - 1))
        .limit(offset)

      if (result.length <= 0) return new NotFound()

      return result.map(item => ({
        id: item._id.toHexString(),
        name: item.name,
        userRootId: item.userRootId,
        description: item.description,
        createdAt: item.createdAt
      }))
    } catch (error) {
      Logger.error(`Error to find projects by user id`)
      return new InternalServer()
    }
  }

  /**
   * @param {string} id
   * @returns {Promise<NotFound|InternalServer|boolean>}
   * */
  async delete(id) {
    try {
      const model = MongoConnection.getModel(this.#modelName, ProjectSchema)
      const result = await model.deleteOne({ _id: id })

      if (result.deletedCount <= 0) return new NotFound()
      return true
    } catch (error) {
      Logger.error(`Error to delete project ID:[${id}]`)
      return new InternalServer()
    }
  }
}
