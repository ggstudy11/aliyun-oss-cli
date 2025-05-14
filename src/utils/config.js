const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/* for debug */
console.log(__dirname);
console.log(path.join(__dirname, '..', '..'));

const configFile = path.join(__dirname, '..', '..', 'info.json');

async function checkIfInfoExist() {
  let res;
  try {
    console.log('INFO: check if there is your info already...');
    res = await fs.promises.access(configFile, fs.constants.F_OK);
    console.log('Already have your info');
  } catch (err) {
    console.log('Have not your info');
  }
  return res;
}

const questions = ['your accessKeyId: ', 'your accessKeySecret: '];

function recordInfo(done) {
  const answers = [];

  function getInfo(answer) {
    if (answer) {
      answers.push(answer.trim());
    }
    if (answers.length >= questions.length) {
      return done(answers);
    }
    const nextQuestion = questions[answers.length];
    rl.question(nextQuestion, getInfo);
  }

  rl.question(questions[0], getInfo);
}

function done(answers) {
  /* for debug */
  console.log(answers);
  const config = {
    accessKeyId: answers[0],
    accessKeySecret: answers[1],
  };
  fs.promises.writeFile(configFile, JSON.stringify(config, null, 2), (err) => {
    if (err) {
      console.log('save config failed!');
      console.log(`Err : ${err}`);
    } else {
      console.log('save config successfully!');
    }
  });
  rl.close();
}

recordInfo(done);
