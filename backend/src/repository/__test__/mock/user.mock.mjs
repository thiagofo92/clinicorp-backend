/**
 * @typedef SeedUser
 * @type{Object}
 * @property {import("entity/user.entity.mjs").UserEntity} main
 * @property {import("entity/user.entity.mjs").UserEntity} toupdate
 * @property {import("entity/user.entity.mjs").UserEntity} todelete
 * @property {{id: string}} tonotfound
 * */

/**
 * @type {SeedUser}
 * */
export const UserMock = {
  main: {
    id: '6668613e8b10225532b3584c',
    name: 'User mock main',
    login: 'mock-main',
    pass: '1234'
  },
  toupdate: {
    id: '6668615e029b631ef503e8bd',
    name: 'User mock to update',
    login: 'mock-update',
    pass: '1234'
  },
  todelete: {
    id: '666861624a766e885da58c0b',
    name: 'User mock to delete',
    login: 'mock-todelete',
    pass: '1234'
  },
  tonotfound: {
    id: '666861721d2aab3e94b56e16'
  }
}
