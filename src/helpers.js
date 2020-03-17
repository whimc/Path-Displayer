const MONTHS_SHORT = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 
    'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
const RECENT_SESSIONS = 20;
const NAME_REGEX = /(\w+)-([0-9]+)-([0-9]+)_(\w+)\..*/;

export function IsValidDate(timestamp) {
    if (isNaN(timestamp) || timestamp < 0) {
        return false;
    }

    timestamp = parseInt(timestamp) * 1000
    var date = new Date(timestamp);

    if (isNaN(date.getTime())) {
        return false;
    }

    return true;
}

export function FormatTimestamp(timestamp) {
    if (!IsValidDate(timestamp)) {
        return "N/A" + (timestamp ? ` (${timestamp})` : "");
    }

    timestamp = parseInt(timestamp) * 1000
    var date = new Date(timestamp);

    var day = date.getDate();
    var month = MONTHS_SHORT[date.getMonth()];
    var year = date.getFullYear();
    var hour = date.getHours() % 12;
    if (hour === 0) hour = 12;
    var min = "0" + date.getMinutes();
    var am_pm = (date.getHours() >= 12) ? "PM" : "AM";

    return month + ' ' + day + ' ' + year + ' ' + hour + ':' + min.substr(-2) + ' ' + am_pm;
}

export function GetDuration(startTime, endTime, decimal=false) {
    var minutes = (endTime - startTime) / 60

    if (decimal)
        return minutes.toFixed(2);
    return parseInt(minutes, 10);
}

export function GetWorldFromImageName(imageName) {
    return imageName.match(NAME_REGEX)[4];
}

export function QueryAllPlayers(callback) {
    var query = 'https://rpaowv6m75.execute-api.us-east-2.amazonaws.com/beta/getallusers/';
    fetch(query).then(result => result.json()).then(data => {

        // Sort the names first
        data.sort(function (a, b) {
            var nameA = a.username.toLowerCase(), nameB = b.username.toLowerCase();
            return nameA.localeCompare(nameB);
        });

        // Store the entries in an array
        var users = []
        data.forEach(elem => {
            users.push({
                value: elem.userId,
                label: elem.username,
            })
        });
        callback(users)
    })
}

export function QueryPlayerSessions(userId, callback) {
    var query = `https://rpaowv6m75.execute-api.us-east-2.amazonaws.com/beta/getsessions/${userId}`;
    fetch(query).then(result => result.json()).then(data => {
        var sessions = []
        data.forEach(elem => {
            
            var duration = GetDuration(elem.loginTime, elem.logoutTime)
            sessions.push({
                value: elem.sessionId,
                label: `${FormatTimestamp(elem.loginTime)} (${duration} mins)`,
                userId: elem.userId,
                username: elem.username,
                start_time: elem.loginTime,
                end_time: elem.logoutTime,
            })

        });
        sessions.reverse()
        callback(sessions)
    })
}

export function QueryRecentSessions(callback) {
    var query = `https://rpaowv6m75.execute-api.us-east-2.amazonaws.com/beta/getrecentsessions/${RECENT_SESSIONS}`;
    fetch(query).then(result => result.json()).then(data => {

        var sessions = []
        data.forEach(elem => {
            
            var duration = GetDuration(elem.loginTime, elem.logoutTime)
            sessions.push({
                value: elem.sessionId,
                label: `${elem.username}, ${FormatTimestamp(elem.loginTime)} (${duration} mins)`,
                userId: elem.userId,
                username: elem.username,
                start_time: elem.loginTime,
                end_time: elem.logoutTime,
            })

        });
        sessions.reverse()
        callback(sessions)
    })
}

export function GetPathGeneratorQuery(username, starttime, endtime) {
    return `api.henhapl.me/pathgenerator?username=${username}&start_time=${starttime}&end_time=${endtime}`;
}