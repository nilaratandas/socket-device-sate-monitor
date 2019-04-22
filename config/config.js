const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    LOG_FILE_PATH: __dirname + '/public/logs/log-20-march-2019.txt',
    OFF_MESSAGE: 'Device is OFF',
    ON_MESSAGE: 'Device is ON'
};