import 'dotenv/config'
import Mongo from 'mongoose'
import { UserMock, ProjectMock } from '../src/repository/__test__/mock/index.mjs'
import { ProjectSchema, UserSchema } from '../src/repository/schema/index.mjs'

(async () => {
  console.log('------ Start Seed -------')
  const uri = process.env.MONGO_URI || ''
  const user = process.env.MONGO_USER
  const pass = process.env.MONGO_PASS
  const dbName = process.env.MONGO_DB
  const conn = await Mongo.connect(uri, { user, pass, dbName })

  try {
    await drop(conn)
    const promise = []

    promise.push(seed(conn, 'users', UserSchema, UserMock))
    promise.push(seed(conn, 'projects', ProjectSchema, ProjectMock))


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
 * @param {string} modelName
 * @param {*} schema
 * @param {*} mock
 * */
async function seed(conn, modelName, schema, mock) {
  const model = conn.model(modelName, schema)
  const input = []

  for (const [key, values] of Object.entries(mock)) {
    if (key !== 'tonotfound') input.push(generate(values))
  }

  await model.insertMany(input)
}

/**
 * @param {*} obj 
 * @returns {*}
 * @description Function to create a data dynamicaly using the values in Mock data, this data is to be use in MongoDd
 * @example { _id: 'mongodb id', ...Object }
 * */
function generate(obj) {
  const dyn = {}

  for (const [key, value] of Object.entries(obj)) {
    if (key == 'id') dyn._id = value
    else dyn[key] = value
  }
  return dyn
}

/**
 * @param {Mongo} conn
 * */
async function drop(conn) {
  await conn.connection.dropDatabase()
  console.log(`Database droped ${conn.connection.db.databaseName}`)
}

