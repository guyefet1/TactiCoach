# Tasks for TactiCoach

1. **Setup Basic Routing:**

- Create placeholder components for `Home` (Squad), `PlayerProfile`, `Tactics`, and `Opponents`.
- Setup `React Router` with a navigation bar.
- **Done when:** I can click the menu and see the URL and placeholder text change for all 4 pages.

2. **Fetch and Display Squad (Home Page):**

- Fetch players from TheSportsDB.
- Define TypeScript interfaces (no `any`).
- Display a grid of player cards with Loading and Error states.
- **Done when:** The home page shows the list of players retrieved from the API.

3. **Search and Filter (Home Page):**

- Add a text input to search players by name and filter by position.
- **Done when:** Typing in the search bar instantly filters the displayed players.

4. **Player Profile Page (Detail):**

- Setup routing to `/players/:id`.
- Use `useParams` to get the ID and show extended details.
- **Done when:** Clicking a player on the home page navigates to their profile page.

5. **Tactics Board (LocalStorage):**

- Allow selecting exactly 11 players.
- Save the selection to LocalStorage and load it on mount.
- **Done when:** I can select 11 players, refresh the page, and still see them.

6. **Opponents Page:**

- Fetch and display league teams from the API.
- **Done when:** The page displays a list of league teams.

7. **Unit Tests (Vitest):**

- Setup Vitest and write at least 5 unit tests for core logic.
- **Done when:** Running `npm run test` passes all 5 tests successfully.