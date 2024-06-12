/**
 * @typedef TaskEntity
 * @type {Object}
 * @property {string} id
 * @property {string} projectId
 * @property {string} title
 * @property {string} description
 * @property {number} status (0 = pending, 1 = completed)
 * @property {Date} createdAt
 * @property {string} completedBy
 * @property {Date} completedAt
 * */

export const TASK_STATUS = {
  COMPLETED: 1,
  PENDING: 0
}
