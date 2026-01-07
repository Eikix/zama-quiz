# Agent Context for Zama Quiz App

This file provides context for LLM agents continuing work on this project.

## Project Overview

**Zama Protocol Quiz App** - An interactive quiz testing knowledge of Zama's FHE blockchain stack (fhEVM, TKMS, Coprocessors, Gateway, TFHE-rs).

- **Tech Stack**: React + TypeScript + Vite + Tailwind CSS
- **Deployed on**: Netlify (auto-deploys from GitHub on push to main)
- **GitHub**: https://github.com/Eikix/zama-quiz

## Key Files

| File | Purpose |
|------|---------|
| `src/data/questions.ts` | All quiz questions - this is where you add/edit questions |
| `src/App.tsx` | Main app logic, state management, shuffle logic |
| `src/components/QuestionCard.tsx` | Renders individual questions with shuffled options |
| `src/components/Results.tsx` | End-of-quiz results and section breakdown |
| `src/types/quiz.ts` | TypeScript types including `ShuffledQuestion` |

## Quiz Mechanics

- **Questions and answers are randomized** on each Start/Reset
- **Forward-only progression** - once answered, can't go back (unless in review mode)
- **No "Check Answer" button** - clicking an answer immediately commits and shows result
- **LocalStorage persistence** - quiz state persists across page refreshes
- **Review mode** - after finishing, users can navigate freely to review all answers

## Zama Documentation Sources

When creating or verifying questions, reference these repositories in `/Users/eliastazartes/code/zama/`:

| Repo | Contains |
|------|----------|
| `fhevm/` | Core fhEVM implementation |
| `fhevm/fhevm-whitepaper.pdf` | Protocol whitepaper - key states, benchmarks, architecture |
| `fhevm/host-contracts/` | Host Chain Solidity contracts (ACL, FHEVMExecutor, InputVerifier) |
| `fhevm/gateway-contracts/` | Gateway Solidity contracts (Decryption, MultichainACL) |
| `fhevm/coprocessor/` | Coprocessor implementation in Rust |
| `fhevm/coprocessor/fhevm-engine/tfhe-worker/` | TFHE worker - DFG construction, scheduling |
| `fhevm/coprocessor/fhevm-engine/scheduler/` | DFG scheduler, partition strategies |
| `fhevm/coprocessor/fhevm-engine/host-listener/` | Host Chain event listener |
| `fhevm/sdk/` | SDK implementations (Rust, TypeScript) |
| `tech-spec/` | Technical specifications |
| `tfhe-rs/` | Core TFHE cryptographic library |

## Question Guidelines

When crafting questions:

1. **Avoid obvious correct answers** - don't make the correct answer more detailed/technical than others
2. **All options should be plausible** - wrong answers should sound like reasonable alternatives
3. **Test understanding, not memorization** - focus on "why" and architectural relationships
4. **Verify accuracy** - check the source repos before adding technical details
5. **Keep explanations educational** - explain why the answer is correct and why others aren't

## Color Palette

- **Accent**: `orange-500` (#fb923c), `amber-500` (#f59e0b)
- **Backgrounds**: `stone-900`, `stone-800`, `stone-700`
- **Text**: `gray-300`, `gray-400`, `white`

## Commands

```bash
npm run dev      # Local development server
npm run build    # Build for production
git push         # Auto-deploys to Netlify
```

## Current State (as of January 2026)

- **36 questions** across 5 sections
- Sections: Architecture & Components, Data Flow & Encryption, Decryption Mechanisms, Service Interactions, Advanced Concepts
- Recent additions focused on DFG (Data Flow Graph), tfhe-worker internals, and symbolic execution
