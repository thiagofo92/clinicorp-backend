import 'dotenv/config'
import { describe, test, beforeAll, afterAll, expect } from 'vitest'

import { MongoConnection } from '../connection/mongo.connection.mjs'
import { LoginRepository } from '../login.repository.mjs'
import { LoginMock } from './mock/user.mock.mjs'
import { InternalServer } from '../../shared/error/general.error.mjs'

describe('# User - [Unit Test]', () => {
  beforeAll(async () => {
    await MongoConnection.setup()
  })

  afterAll(async () => {
    await MongoConnection.disconnect()
  })

  test('Create - [SUCESS] - "Create a new user"', async () => {
    const rep = new LoginRepository()
    const mock = {
      name: LoginMock.main.name + 'Test',
      login: LoginMock.main.login,
      pass: LoginMock.main.pass
    }
    const id = await rep.create(mock)

    expect(id).toBeTypeOf('string')
    expect(id).not.toStrictEqual('')
  })

  test('Create - [ERROR] - "Internal server error"', async () => {
    const rep = new LoginRepository()
    const { instance } = MongoConnection

    // @ts-ignore
    MongoConnection.instance = null

    // @ts-ignore
    const result = await rep.create({})

    MongoConnection.instance = instance
    expect(result).toBeInstanceOf(InternalServer)
  })

  test('Auth - [SUCESS] - "Authenticate the user login"', async () => {
    const rep = new LoginRepository()
    const { login, pass } = LoginMock.main
    const exist = await rep.auth(login, pass)

    expect(exist).toStrictEqual(true)
  })

  test('Auth - [ERROR] - "Invalid login or pass"', async () => {
    const rep = new LoginRepository()
    const { login } = LoginMock.main
    const exist = await rep.auth(login, '12')

    expect(exist).toStrictEqual(false)
  })
})
