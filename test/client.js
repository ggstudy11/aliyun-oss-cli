const { createClient } = require('../src/utils/client');
const setConfig = require('../src/utils/config');
const logger = require('../src/utils/logger');

async function clientTest() {
  const config = await setConfig();
  const client = createClient(config); // 假设传入 config 而非 client
  // 可选：使用 client 执行测试逻辑
  return client; // 返回 client 供后续使用
}

// 正确调用函数并处理 Promise
clientTest()
  .then((client) => {
    logger.info('测试通过');
    return client; // 可选：传递 client 到下一个 then
  })
  .catch((err) => {
    logger.error(`测试不通过 Err: ${err.message}`);
  });
