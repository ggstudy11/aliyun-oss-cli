const isProduction = process.env.NODE_ENV === 'production';

const logger = {
  debug(...args) {
    if (!isProduction) console.debug('[DEBUG]', new Date().toISOString(), ...args);
  },
  info(...args) {
    console.info('[INFO]', new Date().toISOString(), ...args);
  },
  warn(...args) {
    console.warn('[WARN]', new Date().toISOString(), ...args);
  },
  error(...args) {
    console.error('[ERROR]', new Date().toISOString(), ...args);
  },
  fatal(...args) {
    console.error('[FATAL]', new Date().toISOString(), ...args);
  },
};

module.exports = logger;
