// 美化控制台输出
const chalk = require('chalk');
const boxen = require('boxen');
const figlet = require('figlet');

function welcome() {
  // 使用figlet生成艺术字标题
  const title = figlet.textSync('ALIYUN OSS CLI', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true,
  });

  console.log(chalk.black(title));
  console.log(
    boxen(
      `欢迎使用阿里云OSS命令行工具\n\n` +
        `${chalk.bold('作者')} : ggstudy11\n` +
        `${chalk.bold('版本')} : 1.0.0\n\n` +
        `${chalk.bold('说明')} : https://github.com/ggstudy11/aliyun-oss-cli/#readme\n\n` +
        `${chalk.bold('命令列表')} :\n` +
        `${chalk.yellow('list')}   - 列出所有bucket\n` +
        `${chalk.yellow('upload')} - 上传文件\n` +
        `${chalk.yellow('clear')}  - 清屏\n` +
        `${chalk.yellow('help')}   - 帮助文档\n` +
        `${chalk.yellow('exit')}   - 退出`,
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'white',
        backgroundColor: 'black',
      },
    ),
  );
}

module.exports = welcome;
