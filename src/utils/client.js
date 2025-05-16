const OSS = require('ali-oss');

function createClient(config) {
  return new OSS({
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
  });
}

module.exports = { createClient };
