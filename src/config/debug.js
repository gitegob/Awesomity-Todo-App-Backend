import debug from 'debug';

const log = {
  app: debug('app:app:'),
  db: debug('app:db:'),
  authCont: debug('app:auth:controller:'),
  todosCont: debug('app:todos:controller:'),
  error: debug('app:error:'),
  helpers: debug('app:lib.helpers:'),
  sqlz: debug('sequelize:'),
  test: debug('app:test:'),
  env: debug('app:env:'),
};
export default log;
