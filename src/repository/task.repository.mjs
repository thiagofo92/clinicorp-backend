import { TASK_STATUS } from "../entity/task.entity.mjs";
import { EmptyContent, InternalServer, NotFound } from "../shared/error/general.error.mjs"; import { Logger } from "../shared/logger.mjs";
import { MongoConnection } from "./connection/mongo.connection.mjs"; import { TaskSchema } from "./schema/task.schema.mjs";
export class TaskRepository {
  #modelName = 'tasks'

  /**
   * @param {import("dto/task.dto.mjs").TaskCreateDto} input
   * @returns {Promise<string|InternalServer>}
   * */
  async create(input) {
    try {
      const model = MongoConnection.getModel(this.#modelName, TaskSchema)
      const result = await model.create(input)

      return result._id.toHexString()
    } catch (error) {
      Logger.error(`Error to create a new task Project ID: ${input.projectId} - [${error}]`)
      return new InternalServer()
    }
  }

  /**
   * @param {import("dto/task.dto.mjs").TaskUpdateDto} input
   * @returns {Promise<InternalServer|NotFound|boolean>}
   * */
  async update(input) {
    try {
      const model = MongoConnection.getModel(this.#modelName, TaskSchema)
      const result = await model.updateOne({ _id: input.id }, {
        $set: {
          title: input.title,
          description: input.description
        }
      })

      if (result.matchedCount <= 0) return new NotFound()

      return true
    } catch (error) {
      Logger.error(`Error to update task ID: ${input.id} - [${error}]`)
      return new InternalServer()
    }
  }

  /**
   * @param {string} projectId
   * @param {number} offset
   * @param {number} page
   * @returns {Promise<InternalServer|NotFound|EmptyContent|Array<import("entity/task.entity.mjs").TaskEntity>>}
   * */
  async findByProjectId(projectId, offset, page) {
    try {
      const model = MongoConnection.getModel(this.#modelName, TaskSchema)

      const exist = await model.exists({ projectId })

      if (!exist) return new NotFound()

      const result = await model.find({ projectId })
        .skip(offset * (page - 1))
        .limit(offset)

      if (result.length <= 0) return new EmptyContent()

      return result.map(item => ({
        id: item._id.toHexString(),
        projectId: item.projectId,
        title: item.title,
        description: item.description,
        status: item.status,
        createdAt: item.createdAt,
        completedBy: item.completedBy,
        completedAt: item.completedAt
      }))

    } catch (error) {
      Logger.error(`Error to find task by project id ${projectId} - [${error}]`)
      return new InternalServer()
    }
  }

  /**
   * @param{string} id
   * @returns {Promise<InternalServer|NotFound|boolean>}
   * */
  async delete(id) {
    try {
      const model = MongoConnection.getModel(this.#modelName, TaskSchema)
      const result = await model.deleteOne({ _id: id })

      if (result.deletedCount <= 0) return new NotFound()

      return true
    } catch (error) {
      Logger.error(`Error to delete task ID: ${id} - [${error}]`)
      return new InternalServer()
    }
  }

  /**
   * @param {string} id
   * @returns {Promise<InternalServer|NotFound|import("entity/task.entity.mjs").TaskEntity>}
   * */
  async findById(id) {
    try {
      const model = MongoConnection.getModel(this.#modelName, TaskSchema)
      const result = await model.findOne({ _id: id })

      if (!result) return new NotFound()
      return {
        id: result._id.toHexString(),
        projectId: result.projectId,
        title: result.title,
        description: result.description,
        status: result.status,
        createdAt: result.createdAt,
        completedBy: result.completedBy,
        completedAt: result.completedAt
      }
    } catch (error) {
      Logger.error(`Error to find task by id ${id} - [${error}]`)
      return new InternalServer()
    }
  }

  /**
   * @param {import("dto/task.dto.mjs").TaskUpdateStatusDto} input
   * @returns {Promise<NotFound|InternalServer|boolean>}
   * */
  async updateStatus({ id, status, completedBy }) {
    try {
      const model = MongoConnection.getModel(this.#modelName, TaskSchema)

      const result = await model.updateOne({ _id: id }, {
        $set: {
          status: status === TASK_STATUS.COMPLETED ? TASK_STATUS.COMPLETED : TASK_STATUS.PENDING,
          completedBy: status === TASK_STATUS.COMPLETED ? completedBy : '',
          complentedAt: status === TASK_STATUS.COMPLETED ? new Date() : null
        }
      })

      if (result.matchedCount <= 0) return new NotFound()

      return true
    } catch (error) {
      Logger.error(`Error to update status ID: ${id} - [${error}]`)
      return new InternalServer()
    }
  }
}
