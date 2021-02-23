import bcrypt from 'bcrypt';

/** Hash user password
 *
 * @param {string} password password
 * @returns {string} Password hash
 */
export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/** Compare password with hash
 *
 * @param {string} password password
 * @param {string} hashed password
 * @returns {boolean} Result
 */
export const checkPassword = (password, hashed) => bcrypt.compareSync(password, hashed);
