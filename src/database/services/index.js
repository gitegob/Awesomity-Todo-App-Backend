import { error } from '../../utils/response';
import { dbAction } from '../config';

export const create = async (res, Model, data) => {
  const result = await dbAction(res, Model.create(data));
  if (result === 'error') return null;
  return result;
};
export const update = async (res, instance, data) => {
  const result = await dbAction(res, instance.update(data));
  if (result === 'error') return null;
  return result;
};
export const findAndCount = async (res, Model, conditions) => {
  const result = await dbAction(res, Model.findAndCountAll(conditions));
  if (result === 'error') return null;
  return result;
};
export const findAll = async (res, Model, conditions) => {
  const result = await dbAction(res, Model.findAll(conditions));
  if (result === 'error') return null;
  return result;
};
export const findOne = async (res, Model, conditions) => {
  const result = await dbAction(res, Model.findOne(conditions));
  if (result === 'error') return null;
  return result;
};
export const deleteOne = async (res, instance, conditions) => {
  const result = await dbAction(res, instance.destroy(conditions));
  if (result === 'error') return null;
  return result;
};