import 'dotenv/config'
import { describe, test, beforeAll, afterAll, expect } from 'vitest'

import { MongoConnection } from '../connection/mongo.connection.mjs'
import { UserRepository } from '../user.repository.mjs'
import { UserMock } from './mock/user.mock.mjs'

describe('# User - [Unit Test]', () => {
  beforeAll(async () => {
    await MongoConnection.setup()
  })

  afterAll(async () => {
    await MongoConnection.disconnect()
  })
  test('Create - [SUCESS] - "Create a new user"', async () => {
    const rep = new UserRepository()
    const mock = {
      name: UserMock.main.name,
      login: UserMock.main.login,
      pass: UserMock.main.pass
    }
    const id = await rep.create(mock)

    expect(id).toBeTypeOf('string')
    expect(id).not.toStrictEqual('')
  })

  test('Create - [ERROR] - "Internal server error"', async () => {
    const rep = new UserRepository()
    const { instance } = MongoConnection

    // @ts-ignore
    MongoConnection.instance = null

    // @ts-ignore
    const result = await rep.create({})

    MongoConnection.instance = instance
    expect(result).toStrictEqual('')
  })

  test('Auth - [SUCESS] - "Authenticate the user login"', async () => {
    const rep = new UserRepository()
    const { login, pass } = UserMock.main
    const exist = await rep.auth(login, pass)

    expect(exist).toStrictEqual(true)
  })

  test('Auth - [ERROR] - "Invalid login or pass"', async () => {
    const rep = new UserRepository()
    const { login } = UserMock.main
    const exist = await rep.auth(login, '12')

    expect(exist).toStrictEqual(false)
  })
})
