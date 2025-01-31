// src/types/quizTypes.ts
export interface Option {
  id: number;
  description: string;
  question_id: number;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
  unanswered: boolean;
  photo_url: string | null;
}

export interface Question {
  id: number;
  description: string;
  difficulty_level: string | null;
  topic: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  detailed_solution: string;
  type: string;
  is_mandatory: boolean;
  show_in_feed: boolean;
  options: Option[];
}

export interface QuizData {
  title: string;
  topic: string;
  duration: number; 
  negative_marks: number;
  correct_answer_marks: number;
  questions: Question[];
}
