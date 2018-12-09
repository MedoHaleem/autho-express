require('dotenv').config();
require('babel-core/register');

module.exports = () => {
    const env = process.env.NODE_ENV;
    if (env) {
        return require(`./config.${env}.js`);
    } else {
        return require('./config.development.js');
    }
};
