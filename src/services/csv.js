import ObjectsToCsv from 'objects-to-csv';

export default class CSVService {
  /** Export array to csv (async)
   *
   * @param {object} arr array to csverize
   * @returns {data} Data converted to csv
   */
  static async toCSV(arr) {
    const csv = new ObjectsToCsv(arr);
    const result = await csv.toDisk(`${__dirname}/../../todos.csv`);
    return result;
  }
}
