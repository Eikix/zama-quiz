# Agent Context for Zama Quiz App

This file provides context for LLM agents continuing work on this project.

## Startup Tasks

On every session start, check for open issues:

```bash
gh issue list --repo Eikix/zama-quiz --state open
```

Address any user-reported question errors or feature requests before other work.

## Project Overview

**Zama Protocol Quiz App** - An interactive quiz testing knowledge of Zama's FHE blockchain stack (fhEVM, TKMS, Coprocessors, Gateway, TFHE-rs).

- **Tech Stack**: React + TypeScript + Vite + Tailwind CSS
- **Deployed on**: Netlify (auto-deploys from GitHub on push to main)
- **GitHub**: https://github.com/Eikix/zama-quiz

## Key Concepts (IMPORTANT)

### What is fhEVM?
fhEVM is a **Solidity library and toolset** that enables developers to use Fully Homomorphic Encryption (FHE) directly from their smart contracts. It is NOT a separate EVM or blockchain - it's a developer SDK that integrates with existing EVM chains.

- **For external developers**: A Solidity library (`TFHE.sol`) providing encrypted types (`euint8`, `euint32`, etc.) and operations
- **On GitHub**: A monorepo containing the library, coprocessor, gateway, and SDK implementations

### What is FHE?
Fully Homomorphic Encryption allows computation on encrypted data without decrypting it. The result, when decrypted, matches what you'd get from computing on plaintext.

### Primary Use Cases (NOT gaming)
- Confidential DeFi (hidden balances, MEV protection)
- Private voting (encrypted votes, verifiable tallies)
- Sealed-bid auctions
- Confidential ERC-20 tokens

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

- **35 advanced questions** across 5 sections (Architecture & Components, Data Flow & Encryption, Decryption Mechanisms, Service Interactions, Advanced Concepts)
- **18 beginner questions** (DISABLED - need revision)
- Recent additions focused on DFG (Data Flow Graph), tfhe-worker internals, and symbolic execution

## Difficulty Modes

### Advanced Mode (currently active)
Internal architecture, implementation details, benchmarks. For Zama engineers and power users.

### Beginner Mode (disabled, needs revision)
Target audience: developers new to FHE/fhEVM who want to learn.

**Beginner Question Categories:**
1. FHE Fundamentals - What FHE is and why it matters
2. TFHE Scheme Basics - High-level understanding of Zama's chosen scheme  
3. fhEVM as Solidity Library - Correct framing of what fhEVM is
4. Developer Mental Model - How to think about building with fhEVM
5. Real Use Cases - Confidential DeFi, voting, auctions (NOT gaming)
6. Common Misconceptions - Correct wrong assumptions

**Question Design Rules:**
- All answer options must be similar in length and detail level
- Distractors must be plausible (things someone might actually believe)
- Test understanding ("why") over trivia ("what")
- No trick questions
