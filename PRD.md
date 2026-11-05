# Product Requirements Document (PRD) - TactiCoach

## 1. מטרת האפליקציה
TactiCoach היא אפליקציית Web למאמני כדורגל, שנועדה לסייע בהכנה למשחקים באמצעות ניהול וניתוח סגל, עיון בפרטי שחקנים, בניית הרכב פותח ומעקב אחר קבוצות יריבות בליגה.

## 2. קהל היעד
מאמני כדורגל שזקוקים לכלי פשוט, מהיר ונגיש לניהול סגל וגיבוש טקטיקה.

## 3. עמודים וניתוב

1. **סגל (Squad)** — הכתובת `/`. מציג את סגל הקבוצה בכרטיסי שחקנים עם תמונות ועמדות, ומאפשר לחפש ולסנן לפי עמדה. בחירת כרטיס פותחת את פרופיל השחקן.
2. **פרופיל שחקן (Player Profile)** — הכתובת `/players/:id`. מציג מידע מורחב על השחקן, כולל תמונה, לאום ותיאור, ומאפשר לחזור לעמוד הסגל.
3. **לוח טקטיקה (Tactics)** — הכתובת `/tactics`. מאפשר לבחור בדיוק 11 שחקנים להרכב הפותח, לשמור את הבחירה בדפדפן ולטעון אותה בביקור הבא.
4. **יריבות (Opponents)** — הכתובת `/opponents`. מציג קבוצות מהליגה כדי לסייע למאמן להתכונן ליריבות.

## 4. User Stories ("When I..., I see...")

### סגל (Squad)
- When I open the app, I see the squad list with player photos and positions, and a loading state while data is being fetched.
- When I search by a player's name or select a position, I see the squad filtered to matching players.
- When I click a player card, I see that player's profile.

### פרופיל שחקן (Player Profile)
- When I open a player's profile, I see the player's photo, nationality, and a short description.
- When I click "Back to Squad", I see the squad page again.

### לוח טקטיקה (Tactics)
- When I open the Tactics page, I see available players and can select exactly 11 for my starting lineup.
- When I save my tactics and refresh the page, I see my saved starting 11 restored.

### יריבות (Opponents)
- When I open the Opponents page, I see a list of teams in the league.

## 5. דרישות טכניות

- Framework: React + TypeScript + Vite.
- Routing: React Router DOM (`useParams`).
- API: TheSportsDB (searchplayers.php?t=Maccabi%20Tel%20Aviv, search_all_teams.php?l=Israeli%20Premier%20League).
- State: `useState`, `useEffect`.
- Testing: 5 Unit Tests with Vitest.