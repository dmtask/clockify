const fetch = require('node-fetch');
const moment = require('moment');
const clipboardy = require('clipboardy');

require('dotenv').config();

const workspace_id = process.env.WORKSPACE_ID;
const user_id = process.env.USER_ID;

let userDate = moment().format('YYYY-MM-DD');
let url = 'https://api.clockify.me/api/v1/workspaces/' + workspace_id + '/user/' + user_id + '/time-entries?start=' + userDate + 'T07:00:00Z';

if (process.argv[2] !== undefined && moment(process.argv[2], 'DD.MM.YYYY').isValid()) {
    userDate = moment(process.argv[2], 'DD.MM.YYYY').format('YYYY-MM-DD');
    url = 'https://api.clockify.me/api/v1/workspaces/' + workspace_id + '/user/' + user_id + '/time-entries?start=' + userDate + 'T07:00:00Z&end=' + userDate + 'T23:00:00Z';
}

fetch(url, {
    method: 'GET',
    headers: {
        'X-Api-Key': process.env.API_KEY
    }
})
    .then(res => res.json())
    .then(json => {
        let result = '';

        if (json.length > 0) {
            json.reverse().forEach(entry => {
                //console.log(entry);

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