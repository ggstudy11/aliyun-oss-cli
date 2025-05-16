const getRlInstance = require('../utils/readline');
const rl = getRlInstance();
module.exports = function exit() {
  rl.close();
  process.exit();
};
