const winston = require('winston')
const path = require('path')
const NODE_ENV = process.env['NODE_ENV']

module.exports = function () {
  if (NODE_ENV === 'test') {
    return winston.createLogger({
      transports: [
        new winston.transports.File({ filename: path.join('log', 'test.log'), level: 'warn' })
      ]
    })
  }

  let logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),

    transports: [
      new winston.transports.File({ filename: path.join('log', 'error.log'), level: 'error' }),
      new winston.transports.File({ filename: path.join('log', 'combined.log') })
    ]
  })

  if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }))
  }

  return logger
}
