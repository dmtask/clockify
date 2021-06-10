const fetch = require('node-fetch');
const moment = require('moment');
const clipboardy = require('clipboardy');

function get_time(workspace_id, user_id, api_key, user_time) {
    let userDate = moment().format('YYYY-MM-DD');
    let url = 'https://api.clockify.me/api/v1/workspaces/' + workspace_id + '/user/' + user_id + '/time-entries?start=' + userDate + 'T07:00:00Z';

    if (user_time !== undefined && moment(user_time, 'DD.MM.YYYY').isValid()) {
        userDate = moment(user_time, 'DD.MM.YYYY').format('YYYY-MM-DD');
        url = 'https://api.clockify.me/api/v1/workspaces/' + workspace_id + '/user/' + user_id + '/time-entries?start=' + userDate + 'T07:00:00Z&end=' + userDate + 'T23:00:00Z';
    }

    fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': api_key
        }
    })
        .then(res => res.json())
        .then(json => {
            let result = '';

            if (json.length > 0) {
                json.reverse().forEach(entry => {
                    result += 'Start: ' + moment(entry['timeInterval'].start).format('DD.MM.YYYY HH:mm:ss') + ' Uhr\n';
                    result += 'Ende: ' + moment(entry['timeInterval'].end).format('DD.MM.YYYY HH:mm:ss') + ' Uhr\n\n';
                });

                console.log(result);
                console.log('Copied to clipboard!');

                clipboardy.writeSync(result);
            } else {
                console.log('Keine Zeiten gefunden!');
            }
        });
}

module.exports = {
    get_time
};
