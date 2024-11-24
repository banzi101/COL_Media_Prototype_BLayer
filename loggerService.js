const { createLogger, format, transports } = require('winston');
const { combine, timestamp, align, printf } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'DD-MM-YYYY hh:mm:ss.SSS A' }),
    align(),
    printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'log/api.log' }),
    new transports.Console()
  ],
});

module.exports = logger;