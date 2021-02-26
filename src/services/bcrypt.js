import bcrypt from 'bcrypt';

export default class PwdService {/** Hash user password
 *
 * @param {string} password password
 * @returns {string} Password hash
 */
  static hashPassword(password) { return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); }

  /** Compare password with hash
 *
 * @param {string} password password
 * @param {string} hashed password
 * @returns {boolean} Result
 */
  static checkPassword(password, hashed) { return bcrypt.compareSync(password, hashed); }
}
