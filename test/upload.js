const upload = require('../src/command/upload');
const { createClient, createClientWithBucket } = require('../src/utils/client');
const setConfig = require('../src/utils/config');
const logger = require('../src/utils/logger');

async function uploadTest() {
  const config = await setConfig();
  const client = createClientWithBucket(config, 'oss-cn-shanghai', 'yyhyy-blog');
  upload(client, './list.js');
}

uploadTest()
  .then(() => {
    logger.info('测试通过!');
  })
  .catch((err) => {
    logger.error(`测试失败: ${err}`);
  });
