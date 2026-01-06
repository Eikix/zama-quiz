export interface Question {
  id: number;
  section: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
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
