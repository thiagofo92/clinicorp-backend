import { LoginMock } from "./user.mock.mjs";

/**
 * @typedef SeedProject
 * @type{Object}
 * @property {import("entity/project.entity.mjs").ProjectEntity} main
 * @property {import("entity/project.entity.mjs").ProjectEntity} toupdate
 * @property {import("entity/project.entity.mjs").ProjectEntity} todelete
 * @property {{id: string}} tonotfound
 * */

/**
 * @type {SeedProject}
 * */
export const ProjectMock = {
  main: {
    id: '6668c231339f3b629c52d145',
    name: 'Project Mock Main',
    userRootId: LoginMock.main.id,
    description: 'Project mock',
    createdAt: new Date()
  },
  toupdate: {
    id: '6668c25b4a85953360e0bf7f',
    name: 'Project Mock to Update',
    userRootId: LoginMock.main.id,
    description: 'Project mock',
    createdAt: new Date()
  },
  todelete: {
    id: '6668c255b9f931cc5080ec52',
    name: 'Project Mock to Delete',
    userRootId: LoginMock.main.id,
    description: 'Project mock',
    createdAt: new Date()
  },
  tonotfound: {
    id: '6668c2804539129bbd075be6'
  }
}
