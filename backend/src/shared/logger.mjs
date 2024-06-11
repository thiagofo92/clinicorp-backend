import Winston, { format, transports } from 'winston'

const transportsOptions = [
  new transports.Console()
]

const options = {
  format: format.combine(format.json(), format.timestamp(), format.colorize({ all: true })),
  transports: transportsOptions,
  exceptionHandlers: [new transports.Console({ level: 'alert' })],
  rejectionHandlers: [new transports.Console({ level: 'alert' })]
}

export const Logger = Winston.createLogger(options)
