import log from '../../config/debug';
import db from '../config';
import Todoist from '../models/Todoist';
import Todo from '../models/Todo';
import Password from '../models/Password';

db.sync({ force: true, logging: msg => log.sqlz(msg) }).then(() => db.close());