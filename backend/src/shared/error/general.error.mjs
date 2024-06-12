export class NotFound extends Error {
  constructor() {
    super()
    this.name = 'NotFound'
    this.message = 'Data not found'
  }
}

export class InternalServer extends Error {
  constructor() {
    super()
    this.name = 'InternalServer'
    this.message = 'Unexpected error - Internal server error'
  }
}
