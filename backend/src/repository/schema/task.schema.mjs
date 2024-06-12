import { Schema } from 'mongoose'

export const TaskSchema = new Schema({
  projectId: { type: String, require: true },
  title: { type: String, require: true },
  description: { type: String, require: true },
  status: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() },
  completedBy: { type: String },
  completedAt: { type: Date },
})
