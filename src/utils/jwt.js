import jwt from 'jsonwebtoken';
import env from '../config/env';

export const signToken = (data, res) => {
  const token = jwt.sign(data, env.JWT_KEY, { expiresIn: '24h' });
  return token;
};

export const verifyToken = (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, env.JWT_KEY);
  } catch (err) {
    decoded = null;
  }
  return decoded;
};