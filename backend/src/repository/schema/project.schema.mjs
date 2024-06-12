import { Schema } from 'mongoose'

export const ProjectSchema = new Schema({
  name: { type: String, require: true },
  userRootId: { type: String, require: true },
  description: { type: String, require: true },
  createdAt: { type: String, default: Date.now() },
})
