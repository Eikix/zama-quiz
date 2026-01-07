export interface Question {
  id: string;  // 4-letter unique identifier (e.g., "TP8Q")
  section: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
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
