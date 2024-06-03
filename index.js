const debug = require('debug')('index');
const Config = require('./config');
const LogReader = require('./log_reader');
const cron = require('node-cron')

const config = new Config({});
debug(config.getConfig());

const log_reader = new LogReader(config);


cron.schedule('*/20 * * * * *', () => {
    log_reader.readLogs();
})
