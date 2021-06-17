const moment = require('moment');

const {get_time} = require('./src/get_time');
const {stop_timer} = require('./src/stop');

require('dotenv').config();

const workspace_id = process.env.WORKSPACE_ID;
const user_id = process.env.USER_ID;
const api_key = process.env.API_KEY;

const commandList = '- node index.js getTime [DATUMSANGABE] (DD.MM.YYYY)\n- node index.js getTime yesterday\n' +
    '- node index.js getTime today\n- node index.js stopTimer\n\n';

if (process.argv[2] === 'getTime') {
    if (process.argv[3] === 'yesterday') {
        let yesterday = moment().subtract(1, 'days').format('DD.MM.YYYY');

        get_time(workspace_id, user_id, api_key, yesterday);
    } else if (process.argv[3] === 'today') {
        let today = moment().format('DD.MM.YYYY');

        get_time(workspace_id, user_id, api_key, today);
    } else {
        get_time(workspace_id, user_id, api_key, process.argv[3]);
    }
} else if (process.argv[2] === 'stopTimer') {
    stop_timer(workspace_id, user_id, api_key);
} else if (process.argv[2] === 'help') {
    console.info('DM - Task clockify Scripts. Folgende Befehle gibt es aktuell:\n\n' + commandList);
} else {
    console.error('Befehl nicht gefunden! Folgende Befehle gibt es aktuell:\n\n' + commandList);
}