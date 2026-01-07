# Easy Mode Implementation Plan

## Overview
Add a "Beginner" difficulty mode for external users (developers, crypto enthusiasts) who aren't Zama employees with deep internal knowledge.

---

## 1. Question Type Changes

### Updated Question Interface
```typescript
interface Question {
  id: string;                    // 4-letter hash (existing)
  difficulty: 'beginner' | 'advanced';
  section: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  
  // NEW: Source tracking
  source: {
    type: 'docs' | 'code' | 'whitepaper' | 'paper' | 'external';
    reference: string;           // URL or file path
    retrievedAt: string;         // ISO date (YYYY-MM-DD)
  };
  
  // NEW: Optional metadata
  volatile?: boolean;            // Subject to change (benchmarks, versions, impl details)
  
  corrections?: Array<{
    by: string;                  // GitHub username from issue
    at: string;                  // ISO date
    issue: string;               // GitHub issue URL
  }>;
}
```

### Migration
- Add `difficulty: 'advanced'` to all existing 35 questions
- Add `source` field to existing questions (backfill from known sources)
- Mark benchmark/implementation questions as `volatile: true`

---

## 2. Database Changes (Supabase)

### Update leaderboard table
```sql
ALTER TABLE leaderboard 
ADD COLUMN mode TEXT NOT NULL DEFAULT 'advanced';

-- Update RLS policies if needed
CREATE INDEX idx_leaderboard_mode ON leaderboard(mode);
```

### Update queries
- `submitScore(username, score, total, mode)`
- `getLeaderboard(limit, offset, mode)`

---

## 3. UI Changes

### Welcome Screen
- Add mode selector (toggle or two buttons)
- Brief description of each mode:
  - **Beginner**: "FHE concepts, high-level architecture, developer basics"
  - **Advanced**: "Internal architecture, implementation details, benchmarks"

### Quiz Flow
- Filter questions by selected difficulty
- Show difficulty badge in header during quiz

### Leaderboard
- Add tabs: "Beginner" | "Advanced"
- Default to current mode's leaderboard
- Both accessible from navbar modal

### Results Screen
- Show which mode was played
- Submit to correct leaderboard

---

## 4. Beginner Question Guidelines

### Allowed Sources (stable, public)
| Source Type | Examples |
|-------------|----------|
| `docs` | docs.zama.ai/fhevm, docs.zama.ai/tfhe-rs |
| `whitepaper` | High-level architecture sections |
| `paper` | TFHE academic papers, FHE fundamentals |
| `external` | Established crypto/FHE educational content |

### Forbidden for Beginner Mode
- Internal implementation details
- Exact benchmark numbers (volatile)
- Service-to-service interactions
- Database/queue specifics
- Code-level details (DFG, workers, listeners)

### Topic Areas for Beginner Questions
1. **FHE Fundamentals**
   - What is FHE? What problem does it solve?
   - Encryption vs homomorphic encryption
   - Why noise? Why bootstrapping?

2. **Zama High-Level Architecture**
   - What is fhEVM?
   - Role of Coprocessor (compute), KMS (keys), Gateway (coordinate)
   - On-chain vs off-chain split

3. **Developer Basics**
   - Encrypted types (euint8, euint64, ebool, eaddress)
   - Basic operations (add, mul, compare)
   - How to encrypt user input
   - Access control basics (who can decrypt)

4. **Trust Model & Security**
   - Who holds the keys?
   - What is threshold decryption?
   - Public vs private decryption

---

## 5. Question Quality Process

### Creating New Questions
1. Start with source (find the doc/paper first)
2. Draft question that source explicitly answers
3. Set confidence:
   - Source explicitly states answer → ready
   - Reasonable interpretation → flag for review
4. Tag `volatile: true` if subject to change

### Fixing Questions (via GitHub Issues)
When a question is corrected:
1. Fix the question content
2. Add to `corrections` array:
   ```typescript
   corrections: [{
     by: "github-username",
     at: "2026-01-07",
     issue: "https://github.com/Eikix/zama-quiz/issues/123"
   }]
   ```

### Staleness Review
Periodic check for:
- Questions with `volatile: true` older than 3 months
- Questions with `source.retrievedAt` older than 6 months
- Sources that return 404

---

## 6. Implementation Order

### Phase 1: Schema & Infrastructure
- [ ] Update Question type in `types/quiz.ts`
- [ ] Add `source` and `difficulty` fields to existing questions
- [ ] Mark volatile questions
- [ ] Update Supabase table with `mode` column

### Phase 2: UI - Mode Selection
- [ ] Add mode selector to Welcome screen
- [ ] Pass mode through quiz flow
- [ ] Filter questions by difficulty
- [ ] Show mode badge during quiz

### Phase 3: Leaderboard Split
- [ ] Update `submitScore` to include mode
- [ ] Update `getLeaderboard` to filter by mode
- [ ] Add tabs to Leaderboard component
- [ ] Update navbar modal with tabbed view

### Phase 4: Beginner Content
- [ ] Draft 15-20 beginner questions with sources
- [ ] Review against public docs for accuracy
- [ ] Add to questions.ts

### Phase 5: Report Button Update
- [ ] Update GitHub issue template to capture source info
- [ ] Add correction tracking when issues are resolved

---

## 7. Open Questions

1. Should beginner mode have fewer questions? (e.g., 15 vs 35)
2. Should sections be the same or simplified for beginners?
3. Time limit per mode? (beginners might need more time to think)
4. Allow switching modes mid-quiz or lock at start?

---

## 8. Files to Modify

| File | Changes |
|------|---------|
| `src/types/quiz.ts` | Add source, volatile, corrections, difficulty |
| `src/data/questions.ts` | Add metadata to all questions |
| `src/lib/supabase.ts` | Update functions with mode param |
| `src/components/WelcomeScreen.tsx` | Add mode selector |
| `src/components/Leaderboard.tsx` | Add tabs for modes |
| `src/components/Results.tsx` | Pass mode to submit |
| `src/App.tsx` | Mode state, filtering, pass through |
| Supabase | ALTER TABLE, new index |
