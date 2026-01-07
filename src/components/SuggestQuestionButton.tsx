import type { Difficulty } from '../types/quiz';

interface SuggestQuestionButtonProps {
  mode: Difficulty;
}

const GITHUB_REPO = 'Eikix/zama-quiz';

const modeLabels: Record<Difficulty, string> = {
  beginner: 'Beginner',
  advanced: 'Advanced',
  business: 'Business & Value Proposition'
};

export function SuggestQuestionButton({ mode }: SuggestQuestionButtonProps) {
  const generateIssueUrl = () => {
    const issueTitle = `[Question Suggestion] ${modeLabels[mode]}`;

    const issueBody = `## Suggested Question

**Target Mode:** ${modeLabels[mode]}

**Section:** 
<!-- For Beginner: FHE Fundamentals, TFHE Scheme Basics, fhEVM as Solidity Library, Developer Mental Model, Real Use Cases, Common Misconceptions -->
<!-- For Advanced: Architecture & Components, Data Flow & Encryption, Decryption Mechanisms, Service Interactions, Advanced Concepts -->
<!-- For Business: Business & Value Proposition -->


---

## Question

**Question Text:**
> 


**Options:**
\`\`\`
A. 
B. 
C. 
D. 
\`\`\`

**Correct Answer:** <!-- A, B, C, or D -->


**Explanation:**
> 


---

## Source

<!-- Where did you find this information? Documentation, code, whitepaper, interview, etc. -->

**Source Type:** <!-- docs / code / whitepaper / paper / external -->

**Reference:** <!-- Link or path to source -->


---

## Additional Context

<!-- Why is this question valuable? What does it help learners understand? -->

`;

    const params = new URLSearchParams({
      title: issueTitle,
      body: issueBody,
      labels: 'question-suggestion',
    });

    return `https://github.com/${GITHUB_REPO}/issues/new?${params.toString()}`;
  };

  return (
    <a
      href={generateIssueUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 bg-stone-700/50 text-gray-300 hover:bg-stone-600 hover:text-white border border-stone-600 hover:border-stone-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7.25-3.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z" />
      </svg>
      <span>Suggest a Question</span>
    </a>
  );
}
