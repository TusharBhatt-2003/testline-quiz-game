"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
export const dynamic = "force-dynamic";
interface QuizContextType {
  answers: Record<
    number,
    { selectedOptionId: number | null; correctOptionId: number | null }
  >;
  scores: Record<number, number>; // Individual scores for each question
  setAnswer: (
    questionId: number,
    selectedOptionId: number | null,
    correctOptionId: number | null,
    correct_answer_marks: number,
    negative_marks: number,
  ) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [answers, setAnswers] = useState<
    Record<
      number,
      { selectedOptionId: number | null; correctOptionId: number | null }
    >
  >(() => {
    // Retrieve the answers from localStorage if available
    if (typeof window !== "undefined") {
      const savedAnswers = localStorage.getItem("answers");
      return savedAnswers ? JSON.parse(savedAnswers) : {};
    }
    return {};
  });

  const [scores, setScores] = useState<Record<number, number>>(() => {
    // Retrieve the scores from localStorage if available
    if (typeof window !== "undefined") {
      const savedScores = localStorage.getItem("scores");
      return savedScores ? JSON.parse(savedScores) : {};
    }
    return {};
  });

  const setAnswer = (
    questionId: number,
    selectedOptionId: number | null,
    correctOptionId: number | null,
    correct_answer_marks: number,
    negative_marks: number,
  ) => {
    // Update the selected and correct option IDs for the question
    setAnswers((prevAnswers) => {
      const updatedAnswers = {
        ...prevAnswers,
        [questionId]: { selectedOptionId, correctOptionId },
      };

      // Persist answers in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("answers", JSON.stringify(updatedAnswers));
      }

      return updatedAnswers;
    });

    // Calculate the individual score for the question
    let questionScore = 0;
    if (selectedOptionId === correctOptionId) {
      questionScore = correct_answer_marks; // Add marks for correct answer
    } else if (selectedOptionId !== null) {
      questionScore = -negative_marks; // Deduct marks for incorrect answer
    }

    // Update the individual score for the question
    setScores((prevScores) => {
      const updatedScores = { ...prevScores, [questionId]: questionScore };

      // Persist scores in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("scores", JSON.stringify(updatedScores));
      }

      return updatedScores;
    });
  };

  return (
    <QuizContext.Provider value={{ answers, scores, setAnswer }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
