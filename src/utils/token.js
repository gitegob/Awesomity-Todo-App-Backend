import jwt from 'jsonwebtoken';
import env from '../config/env';

export const signToken = (data, res) => {
  const token = jwt.sign(data, env.JWT_KEY, { expiresIn: '24h' });
  return token;
};