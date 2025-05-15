const logger = require('./logger.js');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const config = {};

/* for debug */
logger.debug(__dirname);
logger.debug(path.join(__dirname, '..', '..'));

const configPath = path.join(__dirname, '..', '..', 'info.json');

async function checkConfig() {
  try {
    logger.info('checking config...');
    await fs.promises.access(configPath, fs.constants.F_OK);
    console.log('config exists');
  } catch (err) {
    console.log('no config');
    return false;
  }
  return true;
}

const questions = ['your accessKeyId: ', 'your accessKeySecret: '];

function getConfig(writeConfig) {
  const answers = [];

  function getInfo(answer) {
    if (answer) {
      answers.push(answer.trim());
    }
    if (answers.length >= questions.length) {
      return writeConfig(answers);
    }
    const nextQuestion = questions[answers.length];
    rl.question(nextQuestion, getInfo);
  }

  rl.question(questions[0], getInfo);
}

function writeConfig(answers) {
  /* for debug */
  logger.debug(`answers: ${answers}`);
  config.accessKeyId = answers[0];
  config.accessKeySecret = answers[1];
  fs.writeFile(configPath, JSON.stringify(config, null, 2), (err) => {
    if (err) {
      logger.fatal('saving config failed...');
      logger.log(`Err : ${err}`);
      console.log(config);
    } else {
      logger.info('save config successfully!');
    }
  });
}

async function setConfig() {
  let res = await checkConfig();
  logger.debug(`check : ${res}`);
  if (res === false) {
    console.log('you should set your config first!');
    getConfig(writeConfig);
  } else {
    rl.question('want to overwrite your config?(y/n) ', (data) => {
      let ans = data.trim();
      if (ans === 'y') {
        getConfig(writeConfig);
      } else {
        readConfig();
      }
    });
  }
}

async function readConfig() {
  try {
    const data = await fs.promises.readFile(configPath, 'utf8');
    const obj = JSON.parse(data);
    config.accessKeyId = obj.accessKeyId;
    config.accessKeySecret = obj.accessKeySecret;
    console.log('reading config successfully :', config);
    return config;
  } catch (err) {
    console.error('reading config failed... :', err);
    throw err;
  }
}

module.exports = setConfig;
