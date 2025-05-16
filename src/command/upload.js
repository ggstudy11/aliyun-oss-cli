const path = require('path');
const getClient = require('../utils/client');
const getRlInstance = require('../utils/readline');

const rl = getRlInstance();

async function updload() {
  const ask = (question) => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => resolve(answer.trim()));
    });
  };

  const bucket = await ask('请选择一个bucket: ');
  const region = await ask('输入对应的region: ');
  const client = await getClient(region, bucket);

  while (true) {
    const fileUrl = await ask('请输入文件路径(exit退出): ');
    if (fileUrl === 'exit') {
      break;
    }
    const filename = fileUrl.substring(fileUrl.lastIndexOf('/'));
    /* 切割文件名 */
    const headers = {
      // 指定Object的存储类型。
      'x-oss-storage-class': 'Standard',
      // 指定Object的访问权限。
      'x-oss-object-acl': 'public',
      // 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.txt。
      'Content-Disposition': `'attachment; filename=${filename}`,
      // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
      'x-oss-forbid-overwrite': 'false',
    };
    const resp = await client.put(filename, path.normalize(fileUrl));
    console.log(resp.url);
  }
}

module.exports = updload;
