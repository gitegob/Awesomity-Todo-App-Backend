import ObjectsToCsv from 'objects-to-csv';
import logger from '../config/logger';

/** Export array to csv
 *
 * @param {object} arr array to csverize
 * @returns {null}
 */
const toCSV = async (arr) => {
  try {
    const csv = new ObjectsToCsv(arr);
    await csv.toDisk(`${__dirname}/../../todos.csv`);
    return null;
  } catch (error) {
    logger.error(error.stack);
    return error;
  }
};

export default toCSV;
