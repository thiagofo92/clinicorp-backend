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
    const input = projectsMock()
    const result = await rep.create(input)

    expect(result).toBeTypeOf('string')
    expect(result).not.toStrictEqual('')
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
})
