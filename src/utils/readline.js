/**
 * @module 全局readline访问点
 */

const readline = require('readline');

let rlInstance;

/**
 * @return {readline} 全局rl访问
 */
function getRlInstance() {
  if (!rlInstance) {
    rlInstance = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /* ctrl + c */
  rlInstance.on('SIGINT', () => {
    rlInstance.close();
  });

  return rlInstance;
}

module.exports = getRlInstance;
