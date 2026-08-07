import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: change 'attendance-tracker' below to your actual GitHub repo name.
// If your repo is github.com/yourname/wfh-tracker, this should be '/wfh-tracker/'.
export default defineConfig({
  plugins: [react()],
  base: '/WFH-Tracker/',
})
