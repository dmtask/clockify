const fetch = require('node-fetch');
const moment = require('moment');

const {consoleSuccess} = require('../lib/console');

function stop_timer(workspace_id, user_id, api_key) {
    fetch('https://api.clockify.me/api/v1/workspaces/' + workspace_id + '/user/' + user_id + '/time-entries', {
        method: 'PATCH',
        headers: {
            'X-Api-Key': api_key,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"end": moment().utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z'})
    })
        .then(res => res.json())
        .then(() => {
            consoleSuccess('\nTimer stopped!');
        });
}

module.exports = {
    stop_timer
};
