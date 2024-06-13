export class Unauthorized extends Error {
  constructor() {
    super()
    this.name = 'Unauthorized'
    this.message = 'Login Unauthorized'
  }
}

export class LoginExist extends Error {
  constructor() {
    super()
    this.name = 'LoginExist'
    this.message = 'Login already registered'
  }
}
