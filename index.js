const set = require('./src/utils/config');
const welcome = require('./src/utils/entry');
const getRlInstance = require('./src/utils/readline');
const chalk = require('chalk');
const logger = require('./src/utils/logger');
const commands = require('./src/command/commands');
const { setConfig } = require('./src/utils/config');
const upload = require('./src/command/upload');

const rl = getRlInstance();
const COMMANDS = {
  set: setConfig,
  list: commands.list,
  upload: commands.upload,
  clear: commands.clear,
  help: commands.help,
  exit: commands.exit,
};

welcome();

rl.prompt();

rl.on('line', async (line) => {
  const [command, ...args] = line.trim().split(/\s+/);

  if (command in COMMANDS) {
    try {
      await COMMANDS[command](args);
    } catch (err) {
      logger.error(`发生错误 Err : ${err}`);
    }
  } else {
    console.log(chalk.yellow(`未知命令: ${command}。输入 "help" 查看可用命令。`));
  }

  rl.prompt();
});
