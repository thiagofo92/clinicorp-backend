export class Unauthorized extends Error {
  constructor() {
    super()
    this.name = 'Unauthorized'
    this.message = 'Login Unauthorized'
  }
}
