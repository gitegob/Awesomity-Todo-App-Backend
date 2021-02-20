import bcrypt from 'bcrypt';

export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const checkPassword = (password, hashed) => bcrypt.compareSync(password, hashed);