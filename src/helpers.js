const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
    
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
    var month = MONTHS[date.getMonth()];
    var year = date.getFullYear();
    var hour = date.getHours() % 12;
    if (hour === 0) hour = 12;
    var min = "0" + date.getMinutes();
    var am_pm = (date.getHours() >= 12) ? "PM" : "AM";

    return month + ' ' + day + ' ' + year + ' ' + hour + ':' + min.substr(-2) + ' ' + am_pm;
}

export function GetTimeColorClass(timestamp) {
    if (!IsValidDate(timestamp)) {
        return 'text-danger'
    }

    return ''
}