/**
 * @typedef SeedTask
 * @type{Object}
 * @property {import("entity/task.entity.mjs").TaskEntity} main
 * @property {import("entity/task.entity.mjs").TaskEntity} toupdate
 * @property {import("entity/task.entity.mjs").TaskEntity} todelete
 * @property {{id: string}} tonotfound
 * */

import { TASK_STATUS } from "../../../entity/task.entity.mjs";
import { ProjectMock } from "./project.mock.mjs";
import { UserMock } from "./user.mock.mjs";

/**
 * @type {SeedTask}
 * */
export const TaskMock = {
  main: {
    id: '6669a23a7963199ce53d961c',
    projectId: ProjectMock.main.id,
    title: 'Task mock - Main',
    description: 'task created by mock',
    status: TASK_STATUS.COMPLETED,
    createdAt: new Date(),
    completedBy: UserMock.main.id,
    completedAt: new Date()
  },
  toupdate: {
    id: '6669a234025ba4ffd0d8864c',
    projectId: ProjectMock.main.id,
    title: 'Task mock - To update',
    description: 'task created by mock',
    status: TASK_STATUS.COMPLETED,
    createdAt: new Date(),
    completedBy: UserMock.main.id,
    completedAt: new Date()
  },
  todelete: {
    id: '6669a22d4804a5b5167861be',
    projectId: ProjectMock.main.id,
    title: 'Task mock - To Delete',
    description: 'task created by mock',
    status: TASK_STATUS.COMPLETED,
    createdAt: new Date(),
    completedBy: UserMock.main.id,
    completedAt: new Date()
  },
  tonotfound: {
    id: '6669a218b47fa9f7a8c9133b'
  }
}

