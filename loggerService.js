const winston = require('winston');
require('winston-mongodb');

const mongoose = require('mongoose');

const options = {
    db: mongoose.connect.useDb('test'),
    options: {useUnifiedTopology: true},
    collection: 'logs',
    capped: false,
    expireAfterSeconds: 2592000,
    leaveConnectionOpen: false,
    storeHost: false,
    metaKey: 'additionalInfo',
}

const log = winston.createLogger({
    transports: [
        new winston.transports.MongoDB(options),
    ],
});

async function logger({messageString = '', additionalInfo = {error: null, request: null}, type = 'error'}) {
    try {
      log[type]({ // log variable from Logger instance
        message: messageString,
        additionalInfo: {
          error: additionalInfo?.error,
          request: additionalInfo?.request 
          ? {
            user: additionalInfo?.request?.user,
            rawHeaders: additionalInfo?.request?.rawHeaders,
            reqheader: additionalInfo?.request?.headers,
            reqBody: additionalInfo?.request?.body,
            reqParam: additionalInfo?.request?.params,
            reqQuery: additionalInfo?.request?.query,
          } 
          : null
        },
    });
    } catch (err) {
      log.error({
        message: services.loggerService,
        additionalInfo : {
          error: err,
          request: additionalInfo?.request 
          ? {
            rawHeaders: additionalInfo?.request?.rawHeaders,
            reqheader: additionalInfo?.request?.headers,
            reqBody: additionalInfo?.request?.body,
            reqParam: additionalInfo?.request?.params,
            reqQuery: additionalInfo?.request?.query,
          } 
          : null
        }
      })
    }
  }
  
  module.exports = { logger };