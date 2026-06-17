# Path-Displayer

Web app for the [WHIMC](https://whimc.education.illinois.edu/) project that visualizes Minecraft session path maps. It connects to WHIMC backend APIs for player/session data and the [Path Generator API](https://github.com/whimc/Path-Generator) to render exploration maps.

**Live site:** https://whimc.github.io/Path-Displayer/

## Architecture

Path-Displayer is a **frontend-only** React application. It calls four HTTP APIs:

| Variable | Method | Purpose |
|----------|--------|---------|
| `VITE_GET_ALL_USERS_URL` | GET | List all players (`[{ userId, username }]`) |
| `VITE_GET_SESSIONS_URL` | GET `/{userId}` | Sessions for one player |
| `VITE_GET_RECENT_SESSIONS_URL` | GET `/20` | 20 most recent sessions (includes `username`) |
| `VITE_PATH_GENERATOR_URL` | GET `?username=&start_time=&end_time=` | Generate path map images |

The Path Generator returns `{ success: true, links: { "image-name.png": "https://..." } }`. See the [Path-Generator repo](https://github.com/whimc/Path-Generator) for backend setup.

User/session APIs were previously hosted as AWS Lambda functions. The path generator was served at `whimc-api.education.illinois.edu`. Those endpoints may need to be reconfigured when infrastructure is restored.

## Quick start (local demo)

Run the UI with mock data — no backend required:

```bash
cp .env-empty .env
# Set VITE_USE_MOCK_DATA=true in .env
npm install
npm start
```

Open http://localhost:5173/Path-Displayer/, select **DemoPlayer**, and click **Generate Images**.

## Configuration (real APIs)

```bash
cp .env-empty .env
```

Fill in all four `VITE_*` URLs in `.env`. Environment variables are embedded at **build time** (Vite does not read `.env` at runtime in production).

Example values from the last known production deployment:

```
VITE_GET_ALL_USERS_URL=https://pz712697b9.execute-api.us-east-2.amazonaws.com/default/getallusers
VITE_GET_SESSIONS_URL=https://pz712697b9.execute-api.us-east-2.amazonaws.com/default/getsessions
VITE_GET_RECENT_SESSIONS_URL=https://pz712697b9.execute-api.us-east-2.amazonaws.com/default/getrecentsessions
VITE_PATH_GENERATOR_URL=https://whimc-api.education.illinois.edu/path-generator/api
```

Legacy `REACT_APP_*` variable names from Create React App are still supported.

## Development

```bash
npm install
npm start          # dev server at http://localhost:5173/Path-Displayer/
npm test           # run unit tests
npm run build      # production build to dist/
npm run preview    # preview production build locally
```

## Deployment

### GitHub Actions (recommended)

Pushes to `master` run tests, build with repository secrets, and deploy to GitHub Pages.

**Required repository secrets** (Settings → Secrets and variables → Actions):

- `VITE_GET_ALL_USERS_URL`
- `VITE_GET_SESSIONS_URL`
- `VITE_GET_RECENT_SESSIONS_URL`
- `VITE_PATH_GENERATOR_URL`

Ensure GitHub Pages is configured to publish from the `gh-pages` branch (Settings → Pages).

### Manual deploy

```bash
# Set API URLs in .env first
npm run deploy
```

This builds and pushes `dist/` to the `gh-pages` branch via the `gh-pages` package.

## Tech stack

- React 18 + Vite 6
- Bootstrap 5 / react-bootstrap 2
- react-select 5
- Vitest + Testing Library

Previously built with Create React App; migrated to Vite for a smaller dependency tree and easier security maintenance.

## Troubleshooting

| Symptom | Likely cause |
|---------|--------------|
| "Missing API configuration" on load | `.env` not created or URLs not set; use mock mode or configure all four URLs |
| "HTTP 500" when loading players | User/session Lambda API is down or misconfigured |
| "Request timed out" on Generate | Path Generator backend unreachable or slow |
| Blank page on GitHub Pages | Ensure `base` in `vite.config.js` matches repo name (`/Path-Displayer/`) |
| CORS errors in browser console | Backend must allow `https://whimc.github.io` origin |

## License

Part of the WHIMC project at the University of Illinois.
