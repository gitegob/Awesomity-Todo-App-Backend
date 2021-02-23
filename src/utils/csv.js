import logger from '../config/logger';
import ObjectsToCsv from 'objects-to-csv';

export const toCSV = async (arr) => {
  try {
    const csv = new ObjectsToCsv(arr);
    await csv.toDisk(`${__dirname}/../../todos.csv`);
    return null;
  } catch (error) {
    logger.error(error.stack);
    return error;
  }
};