const {get_time} = require('./src/get_time');
const {stop_timer} = require('./src/stop');

require('dotenv').config();

const workspace_id = process.env.WORKSPACE_ID;
const user_id = process.env.USER_ID;
const api_key = process.env.API_KEY;

if (process.argv[2] === 'getTime') {
    get_time(workspace_id, user_id, api_key, process.argv[3]);
} else if (process.argv[2] === 'stopTimer') {
    stop_timer(workspace_id, user_id, api_key);
}