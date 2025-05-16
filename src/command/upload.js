const path = require('path');

async function updload(client, fileUrl) {
  const filename = fileUrl.substring(fileUrl.lastIndexOf('/'));

  const headers = {
    // 指定Object的存储类型。
    'x-oss-storage-class': 'Standard',
    // 指定Object的访问权限。
    'x-oss-object-acl': 'public',
    // 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.txt。
    'Content-Disposition': `'attachment; filename=${filename}`,
    // 设置Object的标签，可同时设置多个标签。
    'x-oss-tagging': 'Tag1=1&Tag2=2',
    // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
    'x-oss-forbid-overwrite': 'false',
  };

  const resp = await client.put(filename, path.normalize(fileUrl));
  console.log(resp);
}

module.exports = updload;
