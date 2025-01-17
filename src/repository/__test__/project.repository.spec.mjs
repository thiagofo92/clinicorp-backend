import 'dotenv/config'
import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { ProjectsRepository } from '../projects.repository.mjs'
import { MongoConnection } from '../connection/mongo.connection.mjs'
import { ProjectMock } from './mock/project.mock.mjs'
import { InternalServer, NotFound } from '../../shared/error/general.error.mjs';

/**
 * @returns {import('dto/project.dto.mjs').ProjectCreateDto}
 * */
function projectsMock() {
  return Object.assign({}, ProjectMock.main)
}

describe('# Projects - Unit', () => {
  beforeAll(async () => {
    await MongoConnection.setup()
  })

  afterAll(async () => {
    await MongoConnection.disconnect()
  })

  test('Create - [SUCCESS] - "Create new project"', async () => {
    const rep = new ProjectsRepository()
    const input = projectsMock()
    const result = await rep.create(input)

    expect(result).toBeTypeOf('string')
    expect(result).not.toStrictEqual('')
  })

  test('Create - [ERROR] - "Internal server error"', async () => {
    const rep = new ProjectsRepository()
    const { instance } = MongoConnection

    // @ts-ignore
    MongoConnection.instance = null

    // @ts-ignore
    const result = await rep.create({})

    MongoConnection.instance = instance
    expect(result).toBeInstanceOf(InternalServer)
  })

  test('Update - [SUCCESS] - "Update the project by id"', async () => {
    const rep = new ProjectsRepository()
    const input = {
      id: ProjectMock.toupdate.id,
      name: 'test - update',
      description: 'test to update the data'
    }
    const result = await rep.update(input)

    expect(result).not.toBeInstanceOf(Error)
  })

  test('Update - [ERROR] - "Project not found"', async () => {
    const rep = new ProjectsRepository()
    const input = {
      id: ProjectMock.tonotfound.id,
      name: 'test',
      description: 'test'
    }
    const result = await rep.update(input)
    expect(result).toBeInstanceOf(NotFound)
  })

  test('Update - [ERROR] - "Internal server error"', async () => {
    const rep = new ProjectsRepository()
    const { instance } = MongoConnection

    // @ts-ignore
    MongoConnection.instance = null

    // @ts-ignore
    const result = await rep.update({})

    MongoConnection.instance = instance
    expect(result).toBeInstanceOf(InternalServer)
  })

  test('FindById - [SUCCESS] - "Find project by ID"', async () => {
    const rep = new ProjectsRepository()
    const result = await rep.findById(ProjectMock.main.id)

    expect(result).toEqual(
      expect.objectContaining({
        id: ProjectMock.main.id,
        name: ProjectMock.main.name,
        description: ProjectMock.main.description,
        userRootId: ProjectMock.main.userRootId
      })
    )
  })

  test('FindById - [ERROR] - "Project not found"', async () => {
    const rep = new ProjectsRepository()
    const result = await rep.findById(ProjectMock.tonotfound.id)
    expect(result).toBeInstanceOf(NotFound)
  })

  test('FindById - [ERROR] - "Internal server error"', async () => {
    const rep = new ProjectsRepository()
    const { instance } = MongoConnection

    // @ts-ignore
    MongoConnection.instance = null

    // @ts-ignore
    const result = await rep.findById({})

    MongoConnection.instance = instance
    expect(result).toBeInstanceOf(InternalServer)
  })

  test('FindByUserId - [SUCCESS] - "Find projects using the user id"', async () => {
    const rep = new ProjectsRepository()
    const result = await rep.findByUserId(ProjectMock.main.userRootId, 20, 1)

    expect(result).toEqual(
      expect.arrayContaining(
        [
          expect.objectContaining({
            id: ProjectMock.main.id,
            name: ProjectMock.main.name,
            description: ProjectMock.main.description,
            userRootId: ProjectMock.main.userRootId
          })
        ]
      )
    )
  })

  test('FindByUserId - [ERROR] - "Project not found"', async () => {
    const rep = new ProjectsRepository()
    const result = await rep.findByUserId(ProjectMock.tonotfound.id, 20, 1)
    expect(result).toBeInstanceOf(NotFound)
  })

  test('FindByUserId - [ERROR] - "Internal server error"', async () => {
    const rep = new ProjectsRepository()
    const { instance } = MongoConnection

    // @ts-ignore
    MongoConnection.instance = null

    // @ts-ignore
    const result = await rep.findByUserId({})

    MongoConnection.instance = instance
    expect(result).toBeInstanceOf(InternalServer)
  })

  test('Delete - [SUCCESS] - "Delete the project"', async () => {
    const rep = new ProjectsRepository()
    const result = await rep.delete(ProjectMock.todelete.id)

    expect(result).not.toBeInstanceOf(Error)
    expect(result).toStrictEqual(true)
  })

  test('Delete - [ERROR] - "Project not found"', async () => {
    const rep = new ProjectsRepository()
    const result = await rep.delete(ProjectMock.tonotfound.id)
    expect(result).toBeInstanceOf(NotFound)
  })

  test('Delete - [ERROR] - "Internal server error"', async () => {
    const rep = new ProjectsRepository()
    const { instance } = MongoConnection

    // @ts-ignore
    MongoConnection.instance = null

    // @ts-ignore
    const result = await rep.delete({})

    MongoConnection.instance = instance
    expect(result).toBeInstanceOf(InternalServer)
  })
})
