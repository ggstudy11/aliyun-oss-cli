const OSS = require('ali-oss');

function createClient(config) {
  return new OSS({
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
  });
}

function createClientWithBucket(config, region, bucket) {
  return new OSS({
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    region: region,
    bucket: bucket,
  });
}

module.exports = { createClient, createClientWithBucket };
