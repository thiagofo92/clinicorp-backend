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

export class EmptyContent extends Error {
  constructor() {
    super()
    this.name = 'EmptyContent'
    this.message = 'Empty content'
  }
}

export class InvalidToken extends Error {
  constructor() {
    super()
    this.name = 'InvalidToken'
    this.message = 'Token invalid or empty'
  }
}
