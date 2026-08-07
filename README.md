# The Register — Office Attendance Tracker

A small React app to log which days you worked from the office, WFH, or took
as holiday. No login, no backend — everything is saved in your browser's
`localStorage`.

**Heads up:** because there's no backend, this is a *personal* tracker, not a
shared one. If you and a friend both use the deployed link, you'll each see
only your own entries in your own browser — your data doesn't sync between
you.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

## Publish to GitHub Pages

1. Create a new GitHub repo and push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. Open `vite.config.js` and set `base` to match your repo name exactly:
   ```js
   base: '/<repo-name>/',
   ```
   (Skip this and the deployed site will load with broken styling — this is
   the one setting that has to match.)

3. In your GitHub repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.

4. Push again (or re-run the workflow from the **Actions** tab). The included
   workflow (`.github/workflows/deploy.yml`) builds and deploys automatically
   on every push to `main`.

5. Your site will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

## How the tracker works

- Click any day in the calendar to open a small picker with three options:
  **Office**, **WFH**, or **Holiday**. Pick one to mark the day, or use
  **Clear mark** to unmark it.
- Use the `‹` / `›` buttons to move between months, or **Today** to jump back
  to the current month.
- All data lives in `localStorage` under the key `attendance-entries`.
  Clearing your browser data will reset the tracker.
# WFH-Tracker
