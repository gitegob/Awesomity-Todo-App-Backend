/* eslint-disable no-unused-vars */
import log from '../../config/debug';
import db from '../config';
// Models must be imported in the file to be accessible during sync
import Todoist from '../models/Todoist';
import Todo from '../models/Todo';
import Password from '../models/Password';

/**
 *
 * @param {object}
 * @returns {promise} Promise
 */
db.sync({ logging: (msg) => log.sqlz(msg) }).then(() => db.close());
