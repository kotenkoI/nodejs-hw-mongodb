const { setupServer } = require('./server');

setupServer();

const { initMongoConnection } = require('./db/initMongoConnection');
const { setupServer } = require('./server');

(async () => {
  await initMongoConnection();
  setupServer();
})();
