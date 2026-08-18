# FUTURE — Gender / Category Support for SPOTY

## Current behaviour (demonstration logic)

Today the `/spoty` page maps:

- **Rank #1** → `sportsman` (Sportsman of the Year)
- **Rank #2** → `sportswoman` (Sportswoman of the Year)

This is explicitly **temporary**. It exists only so the frontend can be
designed, tested and shown before real category data is available.

## Where the mapping lives

`src/pages/spoty.tsx` (`getStaticProps`) passes `rankings[0]` and
`rankings[1]` into `SpotyPage`. `src/components/spoty/data.ts` →
`buildAthleteProfile(category, athlete)` then decorates the row with the
category label, atmosphere colour and placeholder sport text.

## Required Prisma schema change (when ready)

Add a gender/category field to the `Student` model. Example:

```prisma
model Student {
  id         String   @id @default(uuid())
  rollNumber String   @unique
  name       String
  className  String
  house      String?
  photoUrl   String?
  gender     String?  // "MALE" | "FEMALE" — nullable, additive, non-breaking
  pointEntries PointEntry[]
}
```

Notes:

- `gender` is **nullable and additive** — existing rows keep working, and the
  current production database is untouched by the migration.
- Run `npx prisma migrate dev --name add_student_gender` when adopting it.

## How the frontend should resolve categories afterwards

In `getStaticProps`, query students per gender and rank each group:

```ts
// conceptual — once `gender` exists
const males = await getRankings({ gender: 'MALE' });
const females = await getRankings({ gender: 'FEMALE' });
const topAthlete = males[0] ?? null;     // Sportsman of the Year
const secondAthlete = females[0] ?? null; // Sportswoman of the Year
```

The rest of the UI (`WinnerCard`, `AchievementStats`, …) already receives
category-aware profiles and requires **no changes**. `buildAthleteProfile`
should then read `gender` directly instead of trusting rank order.

## Champion honours

- `championships` currently defaults to `0` in the UI because the
  `Student`/`PointEntry` schema has no championship concept yet. When a
  `Championship`/`Tournament` model is introduced, wire it through the
  rankings aggregation in `src/lib/rankings.ts` and surface it in
  `AchievementStats` — do **not** hardcode values.
