
export enum View {
  DASHBOARD = 'DASHBOARD',
  LIBRARY = 'LIBRARY',
  CONFIG = 'CONFIG',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS',
  PROFILE = 'PROFILE',
  STATISTICS = 'STATISTICS'
}

export interface PDFMaterial {
  id: string;
  name: string;
  date: string;
  size: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface QuizQuestion {
  id: number;
  type: 'multiple_choice' | 'fill_in_the_blank' | 'true_false';
  text: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  translation: string;
}

export interface QuizConfig {
  materialId: string;
  materialName: string;
  type: 'multiple_choice' | 'fill_in_the_blank' | 'true_false' | 'mixed';
  quantity: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  includeChineseAnalysis: boolean;
  focusGrammar: boolean;
}

export interface QuizSession {
  config: QuizConfig;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  userAnswers: Record<number, string>;
  startTime: number;
  endTime?: number;
}
