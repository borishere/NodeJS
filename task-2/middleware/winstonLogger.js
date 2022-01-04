import pkg from 'winston';
const { createLogger, format, transports } = pkg;

export const createWinstonLogger = () => {
  return createLogger({
    level: 'error',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: 'nodejs' },
    transports: [],
    exceptionHandlers: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.simple()
        )
      })
    ],
    rejectionHandlers: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.simple()
        )
      })
    ]
  });
};
