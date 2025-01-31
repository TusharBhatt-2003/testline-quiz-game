import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Option } from '../../types/quizTypes';
import Confetti from 'react-confetti';
import { useQuiz } from '../../context/QuizContext';
import QuizCompletionPopup from './QuizCompletionPopup';
import { motion } from 'motion/react';

interface OptionsProps {
  options: Option[];
  questionId: number;
  correct_answer_marks: number;
  negative_marks: number;
  totalQuestions: number;
}

export default function Options({ options, questionId, correct_answer_marks, negative_marks, totalQuestions }: OptionsProps) {
  const { answers, setAnswer,  } = useQuiz();
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeConfetti, setFadeConfetti] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
//  console.log(Object.keys(answers).length);
//  console.log(totalQuestions);
 
 
  const { selectedOptionId: contextSelectedOptionId, correctOptionId: contextCorrectOptionId } = answers[questionId] || {};

  useEffect(() => {
    if (contextSelectedOptionId !== undefined) {
      setSelectedOptionId(contextSelectedOptionId);
      setIsAnswered(true);

      if (contextSelectedOptionId === contextCorrectOptionId) {
        setShowConfetti(true);
        setTimeout(() => setFadeConfetti(true), 3000);
        setTimeout(() => {
          setShowConfetti(false);
          setFadeConfetti(false);
        }, 4000);
      }
    } else {
      setIsAnswered(false);
    }
  }, [contextSelectedOptionId, contextCorrectOptionId, questionId]);

  const handleOptionClick = (id: number) => {
    if (isAnswered) return;

    setSelectedOptionId(id);
    setIsAnswered(true);

    const selectedOption = options.find((option) => option.id === id);
    const correctOption = options.find((option) => option.is_correct);

    if (selectedOption?.is_correct) {
      setShowConfetti(true);
      setTimeout(() => setFadeConfetti(true), 3000);
      setTimeout(() => {
        setShowConfetti(false);
        setFadeConfetti(false);
      }, 4000);
    }

    setAnswer(questionId, id, correctOption?.id || null, correct_answer_marks, negative_marks);
  };

  const optionLabels = ['a', 'b', 'c', 'd'];
  const isQuestionAnswered = contextSelectedOptionId !== undefined;

  // Check if all questions are answered
  useEffect(() => {
    if (Object.keys(answers).length === totalQuestions) {
      setTimeout(() => setShowPopup(true), 1000); // Delay to show popup smoothly
    }
  }, [answers, totalQuestions]);

  return (
    <div>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          style={{
            opacity: fadeConfetti ? 0 : 1,
            transition: 'opacity 1s ease-out',
          }}
        />
      )}

      {options.map((option, index) => {
        const isSelected = selectedOptionId === option.id;
        const isCorrect = option.is_correct;
        const isIncorrect = isSelected && !isCorrect;

        return (
          <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, scale: 0, y: 100, }}
          animate={{ opacity: 1, scale: 1, y: 0,  }}
          exit={{ opacity: 0, scale: 0, y: 100, }}
          
          transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.8, bounce: 0.3 },
          }}
            key={option.id}
            className={`my-2 md:my-5 p-3 cursor-pointer border-2 border-zinc-500 rounded-xl ${
              isQuestionAnswered
                ? contextSelectedOptionId === option.id
                  ? isCorrect
                    ? 'bg-lime-200 text-black border-lime-950'
                    : 'bg-[#f4aaa7] text-black border-[#510f0d]'
                  : contextCorrectOptionId === option.id
                  ? 'bg-lime-200 text-black border-lime-950'
                  : ''
                : isSelected
                ? 'bg-blue-200 text-black border-blue-950'
                : ''
            } ${isQuestionAnswered ? 'cursor-not-allowed' : ''}`}
            onClick={() => handleOptionClick(option.id)}
          >
            <p className="capitalize text-lg md:text-xl font-normal">
              <strong>{optionLabels[index]}</strong>. {option.description}
            </p>
          </motion.div>
        );
      })}

{isQuestionAnswered && (
        <motion.div 
        initial={{ opacity: 0, scale: 0}}
          animate={{ opacity: 1, scale: 1}}

          
          transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.1 },
          }}
        className="mt-5 p-2 text-lg md:text-xl text-center bg-lime-950 rounded-lg">
          <p className="text-lime-200">
            Correct answer: <strong>{options.find((o) => o.id === contextCorrectOptionId)?.description}</strong>
          </p>
        </motion.div>
      )}

      {/* Render the quiz completion popup */}
      <QuizCompletionPopup showPopup={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}
