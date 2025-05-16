const setConfig = require('../src/utils/config');
const logger = require('../src/utils/logger');

async function configTest() {
  try {
    const config = await setConfig();
    logger.info('配置加载成功:', config); // 明确提示成功
  } catch (err) {
    // 可选：在函数内部处理错误（但通常建议在调用处统一处理）
    throw err; // 继续抛出，让调用者处理
  }
}

// 正确的错误处理方式
configTest()
  .then(() => {
    logger.info('配置测试完成');
  })
  .catch((err) => {
    logger.error(`配置测试失败: ${err.message}`);
  });
