# Product Requirements Document (PRD) - TactiCoach

## 1. מה אנחנו בונים (Overview)
אפליקציית Web שנועדה לעזור למאמני כדורגל להתכונן למשחקים. האפליקציה מאפשרת למאמן לנתח את סגל השחקנים, לצפות בפרופיל שחקן, להרכיב ולשמור מערך טקטי, ולנתח את היריבות בליגה.
מבוססת על תבנית Master-Detail, API חינמי (TheSportsDB), ושמירה ב-LocalStorage.

## 2. קהל היעד
מאמני כדורגל שזקוקים לכלי פשוט, מהיר וחינמי לניהול סגל וגיבוש טקטיקה.

## 3. עמודים וניתוב

1. עמוד סגל (Master): הכתובת `/`. רשימת שחקנים (מה-API), חיפוש וסינון.
2. פרופיל שחקן (Detail): הכתובת `/players/:id`. מידע מורחב על שחקן.
3. לוח טקטיקה: הכתובת `/tactics`. בחירת 11 פותחים ושמירה ל-LocalStorage.
4. יריבות: הכתובת `/opponents`. רשימת קבוצות הליגה (מה-API).

## 4. User Stories ("When I..., I see...")

- When I enter the app, I see the squad list with photos, and a loading state while fetching data.
- When I type a name, I see the roster filter instantly.
- When I click on a player card, I see the app navigate to their profile page.
- When I navigate to Tactics, I see an option to select 11 players and save them.
- When I refresh the Tactics page, I see my saved starting 11 loaded from LocalStorage.
- When I go to the Opponents page, I see a list of league teams.

## 5. דרישות טכניות

- Framework: React + TypeScript + Vite.
- Routing: React Router DOM (`useParams`).
- API: TheSportsDB (searchplayers.php?t=Maccabi%20Tel%20Aviv, search_all_teams.php?l=Israeli%20Premier%20League).
- State: `useState`, `useEffect`.
- Testing: 5 Unit Tests with Vitest.