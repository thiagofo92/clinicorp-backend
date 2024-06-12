import 'dotenv/config'
import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import { MongoConnection } from '../../repository/connection/mongo.connection.mjs'
import { TaskRepository } from '../../repository/task.repository.mjs'
import { InternalServer, NotFound } from '../../shared/error/general.error.mjs'
import { TaskMock } from './mock/task.mock.mjs'
import { ProjectMock } from './mock/project.mock.mjs'

/**
 * @returns {import('dto/task.dto.mjs').TaskCreateDto}
 * */
function taskMock() {
  return {
    projectId: ProjectMock.main.id,
    title: 'Mock test',
    description: 'Unit test mock'
  }
}

describe('# Task - Unit', () => {
  beforeAll(async () => {
    await MongoConnection.setup()
  })

  afterAll(async () => {
    await MongoConnection.disconnect()
  })

  test('Create - [SUCCESS] - "Create new project"', async () => {
    const rep = new TaskRepository()
    const input = taskMock()
    const result = await rep.create(input)

    expect(result).toBeTypeOf('string')
    expect(result).not.toStrictEqual('')
  })

  test('Create - [ERROR] - "Internal server error"', async () => {
    const rep = new TaskRepository()
    const { instance } = MongoConnection

    // @ts-ignore
    MongoConnection.instance = null

    // @ts-ignore
    const result = await rep.create({})

    MongoConnection.instance = instance
    expect(result).toBeInstanceOf(InternalServer)
  })

  test('Update - [SUCCESS] - "Update the project by id"', async () => {
    const rep = new TaskRepository()
    const input = {
      id: TaskMock.toupdate.id,
      title: 'test - update',
      description: 'test to update the data'
    }
    const result = await rep.update(input)

    expect(result).not.toBeInstanceOf(Error)
  })

  test('Update - [ERROR] - "Task not found"', async () => {
    const rep = new TaskRepository()
    const input = {
      id: TaskMock.tonotfound.id,
      title: 'test',
      description: 'test'
    }
    const result = await rep.update(input)
    expect(result).toBeInstanceOf(NotFound)
  })

  test('Update - [ERROR] - "Internal server error"', async () => {
    const rep = new TaskRepository()
    const { instance } = MongoConnection

    // @ts-ignore
    MongoConnection.instance = null

    // @ts-ignore
    const result = await rep.update({})

    MongoConnection.instance = instance
    expect(result).toBeInstanceOf(InternalServer)
  })

  test('FindById - [SUCCESS] - "Find project by ID"', async () => {
    const rep = new TaskRepository()
    const result = await rep.findById(TaskMock.main.id)

    expect(result).toEqual(
      expect.objectContaining({
        id: TaskMock.main.id,
        title: TaskMock.main.title,
        description: TaskMock.main.description,
        projectId: TaskMock.main.projectId
      })
    )
  })

  test('FindById - [ERROR] - "Task not found"', async () => {
    const rep = new TaskRepository()
    const result = await rep.findById(TaskMock.tonotfound.id)
    expect(result).toBeInstanceOf(NotFound)
  })

  test('FindById - [ERROR] - "Internal server error"', async () => {
    const rep = new TaskRepository()
    const { instance } = MongoConnection

    // @ts-ignore
    MongoConnection.instance = null

    // @ts-ignore
    const result = await rep.findById({})

    MongoConnection.instance = instance
    expect(result).toBeInstanceOf(InternalServer)
  })

  test('findByProjectId - [SUCCESS] - "Find task using the user id"', async () => {
    const rep = new TaskRepository()
    const result = await rep.findByProjectId(TaskMock.main.projectId, 20, 1)

    expect(result).toEqual(
      expect.arrayContaining(
        [
          expect.objectContaining({
            id: TaskMock.main.id,
            title: TaskMock.main.title,
            description: TaskMock.main.description,
            projectId: TaskMock.main.projectId,
            completedBy: TaskMock.main.completedBy
          })
        ]
      )
    )
  })

  test('FindByUserId - [ERROR] - "Task not found"', async () => {
    const rep = new TaskRepository()
    const result = await rep.findByProjectId(ProjectMock.tonotfound.id, 20, 1)
    expect(result).toBeInstanceOf(NotFound)
  })

  test('FindByUserId - [ERROR] - "Internal server error"', async () => {
    const rep = new TaskRepository()
    const { instance } = MongoConnection

    // @ts-ignore
    MongoConnection.instance = null

    // @ts-ignore
    const result = await rep.findByProjectId({})

    MongoConnection.instance = instance
    expect(result).toBeInstanceOf(InternalServer)
  })

  test('Delete - [SUCCESS] - "Delete the project"', async () => {
    const rep = new TaskRepository()
    const result = await rep.delete(TaskMock.todelete.id)

    expect(result).not.toBeInstanceOf(Error)
    expect(result).toStrictEqual(true)
  })

  test('Delete - [ERROR] - "Task not found"', async () => {
    const rep = new TaskRepository()
    const result = await rep.delete(TaskMock.tonotfound.id)
    expect(result).toBeInstanceOf(NotFound)
  })

  test('Delete - [ERROR] - "Internal server error"', async () => {
    const rep = new TaskRepository()
    const { instance } = MongoConnection

    // @ts-ignore
    MongoConnection.instance = null

    // @ts-ignore
    const result = await rep.delete({})

    MongoConnection.instance = instance
    expect(result).toBeInstanceOf(InternalServer)
  })

  test('UpdateStatus - [SUCCES] - "Update task status"', async () => {
    const rep = new TaskRepository()
    const input = {
      id: TaskMock.toupdate.id,
      status: 0,
      completedBy: ''
    }
    const result = await rep.updateStatus(input)

    expect(result).toStrictEqual(true)
  })

  test('UpdateStatus - [ERROR] - "Task not found"', async () => {
    const rep = new TaskRepository()
    const input = {
      id: TaskMock.tonotfound.id,
      status: 0,
      completedBy: ''
    }
    const result = await rep.updateStatus(input)

    expect(result).toBeInstanceOf(NotFound)
  })

  test('UpdateStatus - [SUCCES] - "Internal server error"', async () => {
    const rep = new TaskRepository()
    const { instance } = MongoConnection

    // @ts-ignore
    MongoConnection.instance = null

    // @ts-ignore
    const result = await rep.updateStatus({})

    MongoConnection.instance = instance
    expect(result).toBeInstanceOf(InternalServer)
  })
})
