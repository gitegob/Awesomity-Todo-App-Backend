import jwt from 'jsonwebtoken';
import env from '../config/env';

export default class JWTService {
  /** Generate a token
   *
   * @param {object} data Payload
   * @returns {string} Token
   */
  static signToken(data) {
    const token = jwt.sign(data, env.JWT_KEY, { expiresIn: '24h' });
    return token;
  }

  /** Generate a token
   *
   * @param {string} Token
   * @returns {object} Decoded payload
   */
  static verifyToken(token) {
    let decoded;
    try {
      decoded = jwt.verify(token, env.JWT_KEY);
    } catch (err) {
      decoded = null;
    }
    return decoded;
  }
}
