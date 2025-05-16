module.exports = function clear() {
  const blank = '\n'.repeat(process.stdout.rows);
  console.log(blank);
  process.stdout.write('\x1B[0;0H');
};
