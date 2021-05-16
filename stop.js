const fetch = require('node-fetch');
const moment = require('moment');

require('dotenv').config();

const workspace_id = process.env.WORKSPACE_ID;
const user_id = process.env.USER_ID;

fetch('https://api.clockify.me/api/v1/workspaces/' + workspace_id + '/user/' + user_id + '/time-entries', {
    method: 'PATCH',
    headers: {
        'X-Api-Key': process.env.API_KEY,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"end": moment().format('YYYY-MM-DDTHH:mm:ssZ')})
})
    .then(res => res.json())
    .then(json => {
        console.log(json);
    });