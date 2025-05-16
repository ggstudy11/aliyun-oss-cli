const list = require('../src/command/list');
const { createClient } = require('../src/utils/client');
const setConfig = require('../src/utils/config');
const logger = require('../src/utils/logger');

async function listTest() {
  const config = await setConfig();
  const client = createClient(config);
  await list(client);
}

listTest()
  .then(() => {
    logger.info('测试通过');
  })
  .catch((err) => {
    logger.error(`测试失败 Err : ${err}`);
  });
