import { rateLimit } from "express-rate-limit";
import { TIME_SEC } from "../util/time-sec.mjs"


export const RateLimitConfig = rateLimit({
  windowMs: TIME_SEC.MIN * 2,
  limit: 1000,
  legacyHeaders: false
})
