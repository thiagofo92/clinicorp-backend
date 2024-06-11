import * as ApiConfig from '../config/index.mjs'

import Express from 'express'

const app = Express()

app.use(Express.json())
app.use(Object.values(ApiConfig))

app.get('/test', async (req, res) => {
  res.end('Ok')
  return
})

export function Start() {
  const server = process.env.SEVER_HOST || '0.0.0.0'
  const port = process.env.SERVER_PORT || 3500
  app.listen(Number(port), server, () => console.info('Server is running on port 3500'))
}
