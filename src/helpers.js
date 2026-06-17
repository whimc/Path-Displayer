import { apiConfig } from './config';

const MONTHS_SHORT = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.',
  'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
const RECENT_SESSIONS = 20;
const NAME_REGEX = /(\w+)-([0-9]+)-([0-9]+)_(.+)\..*/;

const MOCK_PLAYERS = [
  { userId: 1, username: 'DemoPlayer' },
  { userId: 2, username: 'ExplorerBot' },
];

const MOCK_SESSIONS = [
  {
    sessionId: 101,
    userId: 1,
    username: 'DemoPlayer',
    loginTime: 1700000000,
    logoutTime: 1700003600,
  },
  {
    sessionId: 102,
    userId: 2,
    username: 'ExplorerBot',
    loginTime: 1700100000,
    logoutTime: 1700107200,
  },
];

const MOCK_IMAGES = {
  'DemoPlayer-1700000000-1700003600_overworld.png': 'https://i.imgur.com/placeholder.png',
};

export function IsValidDate(timestamp) {
  if (isNaN(timestamp) || timestamp < 0) {
    return false;
  }

  const millis = parseInt(timestamp, 10) * 1000;
  const date = new Date(millis);

  return !isNaN(date.getTime());
}

export function FormatTimestamp(timestamp) {
  if (!IsValidDate(timestamp)) {
    return 'N/A' + (timestamp ? ` (${timestamp})` : '');
  }

  const millis = parseInt(timestamp, 10) * 1000;
  const date = new Date(millis);

  const day = date.getDate();
  const month = MONTHS_SHORT[date.getMonth()];
  const year = date.getFullYear();
  let hour = date.getHours() % 12;
  if (hour === 0) hour = 12;
  const min = '0' + date.getMinutes();
  const amPm = (date.getHours() >= 12) ? 'PM' : 'AM';

  return `${month} ${day} ${year} ${hour}:${min.substr(-2)} ${amPm}`;
}

export function GetDuration(startTime, endTime, decimal = false) {
  const minutes = (endTime - startTime) / 60;

  if (decimal) {
    return minutes.toFixed(2);
  }
  return parseInt(minutes, 10);
}

export function GetWorldFromImageName(imageName) {
  const match = imageName.match(NAME_REGEX);
  return match ? match[4] : imageName;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWrapper(query, failCallback, successCallback, timeout = 10000) {
  if (!query || query.includes('undefined') || query.includes('null')) {
    failCallback(new Error('API URL is not configured'));
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(query, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    successCallback(data);
  } catch (err) {
    clearTimeout(timeoutId);
    const error = err instanceof Error ? err : new Error(String(err));
    if (error.name === 'AbortError') {
      error.message = `Request timed out after ${timeout / 1000} seconds`;
    }
    console.error('API request failed:', query, error);
    failCallback(error);
  }
}

function mapPlayers(data) {
  const sorted = [...data].sort((a, b) =>
    a.username.toLowerCase().localeCompare(b.username.toLowerCase())
  );

  return sorted.map((elem) => ({
    value: elem.userId,
    label: elem.username,
  }));
}

function mapSessions(data, includeUsername = false) {
  const sessions = data.map((elem) => {
    const duration = GetDuration(elem.loginTime, elem.logoutTime);
    const label = includeUsername
      ? `${elem.username}, ${FormatTimestamp(elem.loginTime)} (${duration} mins)`
      : `${FormatTimestamp(elem.loginTime)} (${duration} mins)`;

    return {
      value: elem.sessionId,
      label,
      userId: elem.userId,
      username: elem.username,
      start_time: elem.loginTime,
      end_time: elem.logoutTime,
    };
  });

  if (!includeUsername) {
    sessions.reverse();
  }

  return sessions;
}

function mapPathImages(data) {
  const links = data?.links;
  if (!links || Array.isArray(links)) {
    return [];
  }

  if (data.success === false) {
    throw new Error(data.message || 'Path generator returned an error');
  }

  return Object.entries(links).map(([title, link]) => ({ title, link }));
}

export function QueryAllPlayers(playersCallback, errorCallback) {
  if (apiConfig.useMockData) {
    delay(300).then(() => playersCallback(mapPlayers(MOCK_PLAYERS)));
    return;
  }

  fetchWrapper(
    apiConfig.getAllUsersUrl,
    errorCallback,
    (data) => playersCallback(mapPlayers(data))
  );
}

export function QueryPlayerSessions(userId, sessionsCallback, errorCallback) {
  if (apiConfig.useMockData) {
    const sessions = MOCK_SESSIONS.filter((session) => session.userId === userId);
    delay(300).then(() => sessionsCallback(mapSessions(sessions)));
    return;
  }

  fetchWrapper(
    `${apiConfig.getSessionsUrl}/${userId}`,
    errorCallback,
    (data) => sessionsCallback(mapSessions(data))
  );
}

export function QueryRecentSessions(sessionsCallback, errorCallback) {
  if (apiConfig.useMockData) {
    delay(300).then(() => sessionsCallback(mapSessions(MOCK_SESSIONS, true)));
    return;
  }

  fetchWrapper(
    `${apiConfig.getRecentSessionsUrl}/${RECENT_SESSIONS}`,
    errorCallback,
    (data) => sessionsCallback(mapSessions(data, true))
  );
}

export function QueryPathGenerator(username, starttime, endtime, imagesCallback, errorCallback) {
  if (apiConfig.useMockData) {
    delay(800).then(() => {
      if (username === 'DemoPlayer') {
        imagesCallback(mapPathImages({ success: true, links: MOCK_IMAGES }));
      } else {
        imagesCallback([]);
      }
    });
    return;
  }

  const query = `${apiConfig.pathGeneratorUrl}?username=${encodeURIComponent(username)}&start_time=${starttime}&end_time=${endtime}`;
  fetchWrapper(
    query,
    errorCallback,
    (data) => {
      try {
        imagesCallback(mapPathImages(data));
      } catch (err) {
        errorCallback(err);
      }
    },
    60000
  );
}
