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

    const id = rep.create(mock)

    expect(id).toBeTypeOf('string')
    expect(id).not.toStrictEqual('')
  })
  test('Create - [ERROR] - "Internal server error"')
  test('Auth - [SUCESS] - "Authenticate the user login"')
  test('Auth - [ERROR] - "Invalid login or pass"')
})
