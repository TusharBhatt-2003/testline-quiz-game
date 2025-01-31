// src/components/QuizContainer.tsx
import React from 'react';
import Question from './quizComps/Question';
import Options from './quizComps/Options';
import { Question as QuestionType, Option, QuizData } from '../types/quizTypes';

interface QuizContainerProps {
  currentQuestion: QuestionType;
  quizData: QuizData;
  currentQuestionIndex: number;
}

export default function QuizContainer({ currentQuestionIndex, quizData ,currentQuestion }: QuizContainerProps) {
  return (
    <div className='bg-neutral-900 rounded-lg p-5 text-white'>
      <Question questionNumber={currentQuestionIndex + 1} question={currentQuestion} />
      <Options totalQuestions={quizData.questions.length} negative_marks={quizData.negative_marks} correct_answer_marks={quizData.correct_answer_marks} questionId={currentQuestion.id} options={currentQuestion.options} />
    </div>
  );
}
