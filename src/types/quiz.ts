export type Difficulty = 'beginner' | 'advanced';

export interface QuestionSource {
  type: 'docs' | 'code' | 'whitepaper' | 'paper' | 'external';
  reference: string;
  retrievedAt: string;
}

export interface QuestionCorrection {
  by: string;
  at: string;
  issue: string;
}

export interface Question {
  id: string;
  difficulty: Difficulty;
  section: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  source: QuestionSource;
  volatile?: boolean;
  corrections?: QuestionCorrection[];
}

export interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
  shuffledCorrectAnswer: number;
  optionMapping: number[];
}

export interface QuizState {
  currentQuestion: number;
  answers: (number | null)[];
  showResult: boolean;
  showExplanation: boolean;
}

export interface SectionScore {
  name: string;
  correct: number;
  total: number;
}
