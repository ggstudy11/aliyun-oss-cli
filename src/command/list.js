async function list(client) {
  const resp = await client.listBuckets();
  const buckets = resp.buckets.map((bucket) => ({
    name: bucket.name,
    region: bucket.region,
    createDate: bucket.createDate,
  }));

  printBuckets(buckets);
}

function printBuckets(buckets) {
  if (!buckets || buckets.length === 0) {
    console.log('没有找到任何存储桶');
    return;
  }

  // 打印表头
  console.log('存储桶列表:');
  console.log('+----------------------+------------------+----------------------------+');
  console.log('| 存储桶名称           | 区域             | 创建时间                   |');
  console.log('+----------------------+------------------+----------------------------+');

  // 打印每个存储桶的信息
  for (const bucket of buckets) {
    // 格式化日期为本地时间字符串
    const formattedDate = Date(bucket.createDate);
    const index = formattedDate.lastIndexOf('GMT');

    // 对齐输出（使用padEnd确保固定宽度）
    console.log(
      `| ${bucket.name.padEnd(20)} | ${bucket.region.padEnd(16)} | ${formattedDate.substring(0, index).padEnd(26)} |`,
    );
  }

  // 打印表尾
  console.log('+----------------------+------------------+----------------------------+');
  console.log(`共 ${buckets.length} 个存储桶`);
}

module.exports = list;
