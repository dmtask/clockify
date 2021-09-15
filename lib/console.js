const chalk = require('chalk');

const log = console.log;

function consoleInfo(message) {
    log(chalk.white(message));
}

function consoleSuccess(message) {
    log(chalk.green(message));
}

function consoleError(message) {
    log(chalk.red(message));
}

function consoleRunning(message = '') {
    log(chalk.blue(message));
}

module.exports = {
    consoleInfo,
    consoleSuccess,
    consoleError,
    consoleRunning
};