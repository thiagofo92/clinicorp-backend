import { Schema } from "mongoose"

export const LoginSchema = new Schema({
  name: { type: String, require: true },
  login: { type: String, require: true },
  pass: { type: String, require: true }
})
