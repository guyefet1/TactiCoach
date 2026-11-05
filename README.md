# TactiCoach

TactiCoach is a web app for football coaches preparing for matches. It provides:

- A Maccabi Tel Aviv squad list with player search and position filters.
- Player profiles with photos and player details.
- A tactics board for selecting and saving a starting eleven.
- An opponents page for Israeli Premier League teams.

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Unit tests

Run the Vitest UI:

```bash
npm run test:ui
```

## Player data

The app uses the [TheSportsDB API](https://www.thesportsdb.com/) to request squad and league data. API requests may be blocked by CORS or other network errors, so TactiCoach includes independent Maccabi Tel Aviv fallback squad data to keep the Squad and Tactics pages usable when live data is unavailable.
