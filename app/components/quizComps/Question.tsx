// src/components/quizComps/Question.tsx
import React from 'react';
import { Question as QuestionType } from '../../types/quizTypes';

interface QuestionProps {
  question: QuestionType;
  questionNumber: number; 
}

export default function Question({ question, questionNumber }: QuestionProps) {
  return (
    <div className='p-2 md:p-5'>
      <p className='text-sm font-normal'>Topic: <span>{question.topic}</span></p>
      <p className='text-lg md:text-xl font-medium'><strong className='text-2xl font-medium'>{questionNumber}.</strong> {question.description}</p>
    </div>
  );
}
