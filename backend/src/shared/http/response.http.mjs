import { LoginExist } from "../../shared/error/login.error.mjs"
import { EmptyContent, NotFound } from "../error/general.error.mjs"

/**
 * @typedef ResponseData
 * @type {Object}
 * @property {*} data
 * @property {number} code
 * @property {*} [metadata]
 * */

/**
 * @param {*} data
 * @param {number} code
 * @param {*} [metadata]
 * @returns {ResponseData}
 * */
export function HttpResponse(data, code, metadata) {
  return {
    data,
    code,
    metadata
  }
}

/**
 * @param {Error} input
 * @returns {ResponseData}
 * */
export function HttpResponseError(input) {
  if (input instanceof NotFound) return HttpResponse(input.message, 404)

  if (input instanceof EmptyContent) return HttpResponse(input.message, 204)

  if (input instanceof LoginExist) return HttpResponse(input.message, 400)

  return HttpResponse('Internal Server error', 500)
}
