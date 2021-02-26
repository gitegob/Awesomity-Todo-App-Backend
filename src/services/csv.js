import ObjectsToCsv from 'objects-to-csv';
import logger from './logger';

export default class CSVService {
  /** Export array to csv
   *
   * @param {object} arr array to csverize
   * @returns {data} Data converted to csv
   */
  static async toCSV(arr) {
    try {
      const csv = new ObjectsToCsv(arr);
      const result = await csv.toDisk(`${__dirname}/../../todos.csv`);
      return { result };
    } catch (error) {
      logger.error(error.stack);
      return { error };
    }
  }
}
