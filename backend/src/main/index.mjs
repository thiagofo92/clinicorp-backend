import 'dotenv'
import Express from 'express'
import { MainRouter } from './routers/main.router.mjs'
import * as ApiConfig from '../config/index.mjs'
import { MongoConnection } from '../repository/connection/mongo.connection.mjs'

export async function Start() {
  const app = Express()
  const mainRouter = new MainRouter(Express.Router())

  await MongoConnection.setup()
  app.use(Express.json())
  app.use(Object.values(ApiConfig))

  app.use('/api', mainRouter.build())
  console.log(app.mountpath)
  app.get('/ping', (req, res) => res.status(200).json({ message: 'pong' }))
  const server = process.env.SEVER_HOST || '0.0.0.0'
  const port = process.env.SERVER_PORT || 3500
  app.listen(Number(port), server, () => console.info('Server is running on port 3500'))
}
