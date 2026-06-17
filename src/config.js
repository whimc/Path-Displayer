const ENV_KEYS = {
  getAllUsers: ['VITE_GET_ALL_USERS_URL', 'REACT_APP_GET_ALL_USERS_URL'],
  getSessions: ['VITE_GET_SESSIONS_URL', 'REACT_APP_GET_SESSIONS_URL'],
  getRecentSessions: ['VITE_GET_RECENT_SESSIONS_URL', 'REACT_APP_GET_RECENT_SESSIONS_URL'],
  pathGenerator: ['VITE_PATH_GENERATOR_URL', 'REACT_APP_PATH_GENERATOR_URL'],
  useMockData: ['VITE_USE_MOCK_DATA', 'REACT_APP_USE_MOCK_DATA'],
};

function readEnv(keys, fallback = '') {
  for (const key of keys) {
    const value = import.meta.env[key];
    if (value) {
      return value;
    }
  }
  return fallback;
}

export const apiConfig = {
  getAllUsersUrl: readEnv(ENV_KEYS.getAllUsers),
  getSessionsUrl: readEnv(ENV_KEYS.getSessions),
  getRecentSessionsUrl: readEnv(ENV_KEYS.getRecentSessions),
  pathGeneratorUrl: readEnv(ENV_KEYS.pathGenerator),
  useMockData: readEnv(ENV_KEYS.useMockData) === 'true',
};

const CONFIG_LABELS = {
  getAllUsersUrl: 'VITE_GET_ALL_USERS_URL',
  getSessionsUrl: 'VITE_GET_SESSIONS_URL',
  getRecentSessionsUrl: 'VITE_GET_RECENT_SESSIONS_URL',
  pathGeneratorUrl: 'VITE_PATH_GENERATOR_URL',
};

export function getMissingConfigKeys() {
  if (apiConfig.useMockData) {
    return [];
  }

  return Object.entries(CONFIG_LABELS)
    .filter(([configKey]) => !apiConfig[configKey])
    .map(([, label]) => label);
}

export function getConfigErrorMessage() {
  const missing = getMissingConfigKeys();
  if (missing.length === 0) {
    return null;
  }

  return `Missing API configuration: ${missing.join(', ')}. Copy .env-empty to .env and set the required URLs, or set VITE_USE_MOCK_DATA=true for local demo mode.`;
}
