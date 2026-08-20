# GENDER / CATEGORY SUPPORT FOR SPOTY

## Current Architecture

The platform now natively supports true category-based rankings for Sportsmen and Sportswomen.

The `Student` model in Prisma contains the `gender` field:

```prisma
model Student {
  ...
  gender String? // "MALE" | "FEMALE" | "OTHER"
  ...
}
```

## Central Ranking Engine

The `src/lib/rankings.ts` file exports a centralized ranking engine:
- `getRankings()` - Calculates Global Rankings
- `getMaleRankings()` - Calculates Sportsmen Rankings (Starts at #1)
- `getFemaleRankings()` - Calculates Sportswomen Rankings (Starts at #1)
- `getSportRankings(sportId)` - Calculates Rankings within a specific sport

**Important:** Category rankings are independently calculated. The #1 Sportsman is NOT just the first male found in the global ranking. The ranking engine filters the dataset *before* sorting and assigning ranks (1, 2, 3...) so that category leaders correctly receive Rank #1 in their respective categories.

## SPOTY Page Resolution

`src/pages/spoty.tsx` dynamically resolves the true winners:
```ts
const maleRankings = await getMaleRankings();
const femaleRankings = await getFemaleRankings();

const topAthlete = maleRankings[0] || null;
const secondAthlete = femaleRankings[0] || null;
```

This ensures that the "Sportsman of the Year" is genuinely the #1 ranked male, and the "Sportswoman of the Year" is genuinely the #1 ranked female. The temporary mapping of Rank 1/Rank 2 has been permanently removed.

## Athlete Directory

The `/athletes` directory uses `getServerSideProps` to pre-fetch all three leaderboards (Global, Male, Female). When a user filters the directory, it switches between these pre-calculated arrays to ensure that rank numbers displayed on the cards are accurate to the selected context.
