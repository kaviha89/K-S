# Kavidu & Sanji Wedding Invitation

**Date:** 20 January 2027 · **Time:** 9:30 AM
**Venue:** Saffron Beach Hotel, Wadduwa, Sri Lanka

## Features
- Mobile-first invitation with off-white, blush pink, light blue, sage green and gray theme
- Floral background, modern layered gradients and falling flower petals after opening
- Opening music and separate memories music controls
- Guest-specific names and table numbers using `?guest=001` links
- Admin guest manager: add, edit, delete, generate links, download updated guest data
- Countdown, Google Calendar, Maps and directions

## Add photos
Replace these files with your own JPG photos (keep names): `assets/photos/hero.jpg`, `memory-1.jpg`, `memory-2.jpg`, `memory-3.jpg`, `memory-4.jpg`. If not provided, the page will show a designed pastel placeholder background.

## Add music
Place MP3 files named `opening-music.mp3` and `memories-music.mp3` in `assets/audio/`. Opening music starts when a guest taps Open Invitation; memories music starts when they tap Play memories music. Use music you own or are licensed to use. Mobile browsers require a user tap before audio can play.

## Admin portal
Visit `admin.html`. Password: `KaviSanji2027`. The admin stores edits in the current browser and downloads a new `guests.js`. GitHub Pages is static, so to publish changes for everyone: download `guests.js`, replace the existing file in your GitHub repository, and commit. The password is visible in client-side code and is not secure server-side authentication.

## Publish
Upload all files and folders to your `KaviSanji` repository, then go to GitHub **Settings → Pages**, choose deployment from `main` branch and `/ (root)`. Keep the folder structure intact.

## Guest data format
`const GUESTS = { "001": { "name": "Guest Name", "table": "1" } };`
