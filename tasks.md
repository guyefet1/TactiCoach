# Tasks for TactiCoach

1. **Routing**

- Configure React Router for Squad (`/`), Player Profile (`/players/:id`), Tactics (`/tactics`), and Opponents (`/opponents`).
- Add a navigation bar for the main pages.
- **Done when:** Selecting each main page from the navigation bar opens the correct URL and renders that page.

2. **API Fetch & Fallback**

- Fetch the Maccabi Tel Aviv squad from TheSportsDB and define TypeScript interfaces for the API data without using `any`.
- Display player cards with a photo, name, and position, including loading and error handling.
- Provide fallback squad data when the API request fails or returns no players.
- **Done when:** The squad displays fetched players when available and usable fallback players when the API is unavailable, without breaking the page.

3. **Search & Filter**

- Add a case-insensitive player-name search and a position filter to the Squad page.
- Allow the search and position filter to work together.
- **Done when:** Changing either filter immediately displays only players matching both the name query and selected position, or a clear empty state if none match.

4. **Player Profile**

- Use the dynamic `/players/:id` route and `useParams` to identify the selected player.
- Show the player's photo, nationality, and a short description, with fallback profile data if live data is unavailable.
- Add a “Back to Squad” link.
- **Done when:** Selecting a player card opens that player's profile with the correct details, and “Back to Squad” returns to `/`.

5. **Tactics Board & LocalStorage**

- Let the user select exactly 11 players for the starting lineup.
- Save the selected players to `localStorage` under `tacticCoach_squad` and restore the saved lineup when the page loads.
- **Done when:** Saving is only possible with exactly 11 selected players, and the saved starting 11 is restored after refreshing the Tactics page.

6. **Opponents Page**

- Fetch and display teams from the Israeli Premier League.
- Show fallback teams if the API request fails or returns no teams.
- **Done when:** The Opponents page displays league teams when available and fallback teams when the API is unavailable.

7. **Unit Tests**

- Configure Vitest with React and a DOM test environment.
- Write at least five unit tests for core app behavior.
- **Done when:** `npm run test` completes successfully with at least five passing tests.

8. **404 Error Page**

- Add a not-found page for URLs that do not match an application route.
- Include a clear message and a way to return to the Squad page.
- **Done when:** Opening an unknown URL displays the 404 page, and its return link navigates to `/`.
