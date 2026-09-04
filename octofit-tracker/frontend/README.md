# Octofit Tracker frontend

The React 19 presentation tier uses Vite, Bootstrap, and `react-router-dom`.

## API configuration

For a GitHub Codespace, define `VITE_CODESPACE_NAME` in `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then requests API data from:

```text
https://your-codespace-name-8000.app.github.dev/api/<component>
```

When `VITE_CODESPACE_NAME` is not defined, the API helper safely falls back to `http://localhost:8000/api` for local development.

## Routes

- `/` - Overview
- `/activities` - Activity history
- `/leaderboard` - Team leaderboard
- `/teams` - Teams
- `/users` - Members
- `/workouts` - Workout suggestions

Run the development server with `npm run dev` from this directory.
