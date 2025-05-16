const logger = require('./logger.js');
const fs = require('fs');
const path = require('path');
const getRlInstance = require('./readline');

const rl = getRlInstance();

/* for debug */
logger.debug(__dirname);
logger.debug(path.join(__dirname, '..', '..'));

const confPath = path.join(__dirname, '..', '..', 'conf.json');

async function checkConfig() {
  try {
    logger.info('检查密钥配置...');
    await fs.promises.access(confPath, fs.constants.F_OK);
    logger.info('已存在密钥配置');
  } catch (err) {
    logger.info('密钥配置不存在');
    return false;
  }
  return true;
}

const questions = ['your accessKeyId: ', 'your accessKeySecret: '];

async function getConfig() {
  const answers = [];

  /* 重构代码为promise形式 */
  const askQuestion = (question) => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => resolve(answer.trim()));
    });
  };

  for (const question of questions) {
    const answer = await askQuestion(question);
    answers.push(answer);
  }

  return answers;
}

async function writeConfig(answers) {
  /* for debug */
  logger.debug(`answers: ${answers}`);

  const config = {
    accessKeyId: answers[0],
    accessKeySecret: answers[1],
  };

  try {
    logger.info('保存密钥配置...');
    await fs.promises.writeFile(confPath, JSON.stringify(config, null, 2));
    logger.info('保存成功');
    return config;
  } catch (err) {
    logger.error('保存失败');
  }
}

async function setConfig() {
  const isConfigExist = await checkConfig();
  logger.debug(`config exists : ${isConfigExist}`);

  if (!isConfigExist) {
    logger.info('你需要创建你的密钥配置文件');
    const answers = await getConfig();
    await writeConfig(answers);
  } else {
    const promptUser = () => {
      return new Promise((resolve, reject) => {
        rl.question('是否重写你的配置文件？(y/n)', (answer) => {
          resolve(answer.trim().toLowerCase());
        });
      });
    };

    while (true) {
      const userInput = await promptUser();

      if (userInput === 'y') {
        const answers = await getConfig();
        await writeConfig(answers);
        break;
      } else if (userInput === 'n') {
        break;
      } else {
        logger.info('非法输入请重新输入');
      }
    }
  }
}

async function readConfig() {
  try {
    logger.info('读取配置...');
    const data = await fs.promises.readFile(confPath, 'utf8');
    const config = JSON.parse(data);
    return config;
  } catch (err) {
    logger.error('读取配置失败');
  }
}

module.exports = { setConfig, readConfig };
