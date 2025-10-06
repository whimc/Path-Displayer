const MONTHS_SHORT = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.',
    'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
const RECENT_SESSIONS = 20;
const NAME_REGEX = /(\w+)-([0-9]+)-([0-9]+)_(.+)\..*/;

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

export function GetDuration(startTime, endTime, decimal = false) {
    var minutes = (endTime - startTime) / 60

    if (decimal)
        return minutes.toFixed(2);
    return parseInt(minutes, 10);
}

export function GetWorldFromImageName(imageName) {
    return imageName.match(NAME_REGEX)[4];
}

function fetchWrapper(query, failCallback, successCallback, timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort()
        failCallback()
    }, timeout); // Timeout after 10 seconds

    return fetch(query, { signal: controller.signal })
        .then(result => {
            clearTimeout(timeoutId)
            return result.json()
        })
        .then(successCallback)
        .catch(err => {
            controller.abort()
            console.log(err)
            failCallback()
        })
}

export function QueryAllPlayers(playersCallback, errorCallback) {
    var query = process.env.REACT_APP_GET_ALL_USERS_URL;
    fetchWrapper(query, () => {
        playersCallback([])
        errorCallback()
    }, data => {

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
        playersCallback(users)
    })
}

export function QueryPlayerSessions(userId, sessionsCallback, errorCallback) {
    var query = `${process.env.REACT_APP_GET_SESSIONS_URL}/${userId}`;
    fetchWrapper(query, () => {
        sessionsCallback([])
        errorCallback()
    }, data => {
        var sessions = []
        data.forEach(elem => {
            var duration = GetDuration(elem.loginTime, elem.logoutTime)
            sessions.push({
                value: elem.sessionId,
                label: `${FormatTimestamp(elem.loginTime)} (${duration} mins)`,
                userId: elem.userId,
                // username: elem.username, // There is no username included!
                start_time: elem.loginTime,
                end_time: elem.logoutTime,
            })

        });
        sessions.reverse()
        sessionsCallback(sessions)
    })
}

export function QueryRecentSessions(sessionsCallback, errorCallback) {
    var query = `${process.env.REACT_APP_GET_RECENT_SESSIONS_URL}/${RECENT_SESSIONS}`;
    fetchWrapper(query, () => {
        sessionsCallback([]);
        errorCallback();
    }, data => {
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
        // sessions.reverse()
        sessionsCallback(sessions)
    })
}

export function QueryPathGenerator(username, starttime, endtime, imagesCallback, errorCallback) {
    var query = `${process.env.REACT_APP_PATH_GENERATOR_URL}?username=${username}&start_time=${starttime}&end_time=${endtime}`;
    fetchWrapper(query, () => {
        imagesCallback([]);
        errorCallback();
    }, data => {
        var images = []
        Object.keys(data.links).forEach(elem => {
            images.push({
                title: elem,
                link: data.links[elem],
            })
        })
        imagesCallback(images)
    }, 60000 /* 1 minute timeout */).catch(err => {
        console.log(err)
        imagesCallback([])
    })
}
