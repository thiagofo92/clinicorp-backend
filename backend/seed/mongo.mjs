import 'dotenv/config'
import Mongo from 'mongoose'
import { UserMock } from '../src/repository/__test__/mock/user.mock.mjs'
import { UserSchema } from '../src/repository/schema/index.mjs'

  ; (async () => {
    console.log('------ Start Seed -------')
    const uri = process.env.MONGO_URI || ''
    const user = process.env.MONGO_USER
    const pass = process.env.MONGO_PASS
    const dbName = process.env.MONGO_DB
    const conn = await Mongo.connect(uri, { user, pass, dbName })

    try {
      const promise = []

      promise.push(seedUser(conn))

      const result = await Promise.allSettled(promise)

      for (const value of result) {
        if (value.status == 'rejected') console.error(value.reason)
      }
    } catch (error) {
      console.error(error)
    }

    console.log('------ End Seed -------')
    process.exit(0)
  })()

/**
 * @param {Mongo} conn
 * */
async function seedUser(conn) {
  const model = conn.model('users', UserSchema)
  const mock = []
  mock.push({
    _id: UserMock.main.id,
    name: UserMock.main.name,
    login: UserMock.main.login,
    pass: UserMock.main.pass
  })
  mock.push({
    _id: UserMock.toupdate.id,
    name: UserMock.toupdate.name,
    login: UserMock.toupdate.login,
    pass: UserMock.toupdate.pass
  })
  mock.push({
    _id: UserMock.todelete.id,
    name: UserMock.todelete.name,
    login: UserMock.todelete.login,
    pass: UserMock.todelete.pass
  })

  await model.insertMany(mock)
}


