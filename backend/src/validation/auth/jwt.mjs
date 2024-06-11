import Jwt from 'jsonwebtoken'

export class AuthJwt {

  /**
   * @param {string} id 
   * @description Function to create the JWT
   * @returns {string}
   * */
  static sign(id) {
    const token = process.env.TOKEN_KEY

    if (!token) throw Error('Token key is missing')

    try {
      const result = Jwt.sign({ id }, token, { expiresIn: '15m' })
      return result

    } catch (error) {
      return ''
    }
  }


  /**
   * @param {string} payload
   * @returns {boolean}
   * */
  static verify(payload) {
    try {
      const key = process.env.TOKEN_KEY

      if (!key) throw Error('Token key is missing')

      Jwt.verify(payload, key)
      return true
    } catch (error) {

      return false
    }
  }
}
