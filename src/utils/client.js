const OSS = require('ali-oss');
const { readConfig } = require('./config');

async function getClient(...args) {
  const config = await readConfig();
  if (!config) {
    console.error('请先设置密钥配置');
    return;
  }

  if (args.length == 0) {
    return new OSS({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
    });
  } else if (args.length == 2) {
    return new OSS({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      region: args[0],
      bucket: args[1],
    });
  }
}
module.exports = getClient;
