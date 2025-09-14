# Calendar Frontend

## Overview
Frontend of the interview project
Built with React + Vite, Redux, and TailwindCSS.

## Architecture Decisions
- **React:** Component-based architecture for reusable UI elements.
- **State Management:** Redux used for global state (events, exceptions, filters).
A few states used locally or used by just a few components were not  registered in Redux. 
- **Styling:** TailwindCSS for over 90% styles.
- **Date Handling:** `date-fns` and `date-fns-tz` for timezone-aware date operations.
I might overcomplicate the time transfer. I did time management in backend already, but again in frontend.
As I don't have eough time, and the time transfer is working as expected. I'll keep it as what it is.

## Assumptions, Trade-offs, Known Limitations
- Shortcut accessibility is not supported; I finished and tested all core function first and then check better to have. Don't have enought time for redo and undo. Need to store and handle too much extra data and take time. 
Simple keyboard nav is okay, as it's built in with most regular HTML elements.
- Only supports a single user scenario (no login/auth). As it's a interview project I think it's okay. For production line can just add access limit on backend, encybered account and password with generated token will be the first option I would use.
- Some mobile responsiveness is not well designed, but still it's there.

## What I’d Do Next With More Time
- Full keyboard navigation and accessibility improvements. I still don't think it's a good idea. For a project
deeply rely on a online data base, the price of unlimited undo/repo is too expensive. Maybe there is a easy way for Django to redo/undo the newest command, but I'm not sure for now.
- More time on the UI desing, it's clean now, just clean XD.
- Performance optimization for large numbers of events.
- Orgnise the code! Sometimes when I write something, I thought it won'be be resused and didn't write it in a resuable way. And when I found I need to reuse it I have to copy paste for the dependences and nested structure.If I have enough time I de\finetly will organize the code better.


## Before you run it
- Before you run it, the defaultApiUrl is "http://127.0.0.1:8000/api/events/" under store/api/eventsApi;
If you changed in backend, make sure you change it here too.

## Setup
```bash
cd frontend
npm install
npm run dev