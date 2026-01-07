interface ReportButtonProps {
  questionId: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  section: string;
  explanation: string;
}

const GITHUB_REPO = 'Eikix/zama-quiz';

export function ReportButton({
  questionId,
  questionText,
  options,
  correctAnswerIndex,
  section,
  explanation,
}: ReportButtonProps) {
  const generateIssueUrl = () => {
    const optionsList = options
      .map((opt, i) => `${i === correctAnswerIndex ? '✓' : ' '} ${String.fromCharCode(65 + i)}. ${opt}`)
      .join('\n');

    const issueTitle = `[${questionId}] Content Issue Report`;

    const issueBody = `## Question Details

**Question ID:** ${questionId}
**Section:** ${section}

**Question Text:**
> ${questionText}

**Current Options:**
\`\`\`
${optionsList}
\`\`\`
(✓ = currently marked as correct)

**Current Explanation:**
> ${explanation}

---

## What's the issue?

<!-- Please select one by replacing [ ] with [x] -->

- [ ] The correct answer is wrong
- [ ] The question is unclear or ambiguous
- [ ] The explanation is incorrect or misleading
- [ ] One or more options are incorrect
- [ ] Other (please describe)

---

## Suggested Correction

<!-- Please describe what should be changed -->

**What should the correct answer be?**


**Why is the current answer wrong?**


**Suggested new explanation (optional):**


---

## Additional Context

<!-- Any references, documentation links, or other context that supports your correction -->

`;

    const params = new URLSearchParams({
      title: issueTitle,
      body: issueBody,
      labels: 'content-correction',
    });

    return `https://github.com/${GITHUB_REPO}/issues/new?${params.toString()}`;
  };

  return (
    <a
      href={generateIssueUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-orange-400 transition-colors"
      title="Report an issue with this question"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-3.5 h-3.5"
      >
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM7.25 4.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5ZM8 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
      </svg>
      <span>Report issue</span>
    </a>
  );
}
