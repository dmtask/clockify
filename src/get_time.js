const fetch = require('node-fetch');
const moment = require('moment');
const clipboardy = require('clipboardy');

const {consoleInfo, consoleSuccess, consoleError} = require('../lib/console');

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
            let resultForCopy = '',
                completeTime = 0,
                timerIsRunning = false;

            if (json.length > 0) {
                json.reverse().forEach(entry => {
                    resultForCopy += 'Start: ' + moment(entry['timeInterval'].start).format('DD.MM.YYYY HH:mm:ss') + ' Uhr\n';
                    if (entry['timeInterval'].end !== null) {
                        resultForCopy += 'Ende: ' + moment(entry['timeInterval'].end).format('DD.MM.YYYY HH:mm:ss') + ' Uhr\n\n';
                    } else {
                        resultForCopy += 'Ende: -\n\n';
                    }

                    completeTime += moment.duration(entry['timeInterval'].duration)._milliseconds;
                    if (entry['timeInterval'].duration === null) {
                        // Die aktuelle Gesamtzeit ausrechnen
                        completeTime += moment().diff(moment(entry['timeInterval'].start));
                        timerIsRunning = true;
                    }
                });

                consoleInfo(resultForCopy);
                consoleInfo('Gesamt' + (timerIsRunning ? ' (Aktuell)' : '') + ': ' + moment(completeTime).subtract(1, 'hours').format('HH:mm:ss') + ' Std.');

                if (!timerIsRunning) {
                    clipboardy.writeSync(resultForCopy);
                    consoleSuccess('\nZeiten in Zwischenablage kopiert!');
                } else {
                    consoleError('ACHTUNG: Die Zeiten wurden nicht in die Zwischenablage kopiert, da der Timer noch läuft!');
                }
            } else {
                consoleError('Keine Zeiten gefunden!');
            }
        });
}

module.exports = {
    get_time
};
