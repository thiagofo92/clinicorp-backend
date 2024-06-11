'user strict'
import Mongo from 'mongoose'

export class MongoConnection {
  /**
   * @static
   * @type {MongoConnection}
   * */
  static instance

  /**
   * @type {Mongo}
   * */
  #conn

  /**
   * @param {Mongo} conn - MongoDB connection
   * */
  constructor(conn) {
    this.#conn = conn
  }

  /**
   * @static setup the connection with database
   * */
  static async setup() {
    const uri = process.env.MONGO_URI || ''
    const user = process.env.MONGO_USER || ''
    const pass = process.env.MONGO_PASS || ''

    const mongo = await Mongo.connect(uri, { user, pass })

    this.instance = new MongoConnection(mongo)
  }

  /**
   * @param {string} model 
   * @param {*} schema 
   * @param {*} collection 
   * @param {*} opts 
   * @returns {Mongo.Model}
   * */
  static getModel(model, schema, collection, opts) {
    return this.instance.getModel(model, schema, collection, opts)
  }

  static async disconnect() {
    await this.instance.disconnect()
  }

  /**
   * @param {string} model 
   * @param {*} schema 
   * @param {*} collection 
   * @param {*} opts 
   * @returns {Mongo.Model}
   * */
  getModel(model, schema, collection, opts) {
    return this.#conn.model(model, schema, collection, opts)
  }

  async disconnect() {
    await this.#conn.disconnect()
  }
}


