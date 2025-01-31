"use client";

import React, { useState, useEffect } from "react";
import { fetchQuizData } from "../utils/fetchQuizData";
import Countdown from "../components/Countdown";
import QuizTimer from "../components/QuizTimer";
import QuizContainer from "../components/QuizContainer";
import { QuizData, Question } from "../types/quizTypes";
import QuizBtn from "../components/quizComps/QuizBtn";
import { useQuiz } from "../context/QuizContext";

const Quiz = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // To track the current question
  const [showQuiz, setShowQuiz] = useState<boolean>(false); // Controls visibility of quiz content
  const { answers } = useQuiz();
  //console.log(answers);

  useEffect(() => {
    // Fetch quiz data from API
    const getQuizData = async () => {
      try {
        const data = await fetchQuizData();
        if (data) {
          setQuizData(data); // Set the fetched quiz data
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    getQuizData();
  }, []);

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quizData?.questions.length ?? 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex  h-screen justify-center">
      {!showQuiz ? (
        <Countdown onComplete={() => setShowQuiz(true)} />
      ) : (
        <div className="relative">
          <div className="flex justify-between items-center m-2">
            <h1 className="text-2xl md:text-4xl text-center font-semibold text-[#168E8C]">
              {quizData?.title}
            </h1>
            <QuizTimer duration={quizData?.duration ?? 0} />
          </div>
          {quizData && quizData.questions.length > 0 && (
            <div className="h-[75vh] w-[95vw] md:w-[80vw] flex flex-col md:h-full">
              {/* Render QuizContainer dynamically for each question */}
              <QuizContainer
                quizData={quizData}
                currentQuestion={quizData.questions[currentQuestionIndex]}
                currentQuestionIndex={currentQuestionIndex} // Pass the index here
              />
              <div className="text-white text-center mt-5">
                <p>
                  you have answered {Object.keys(answers).length}/
                  {quizData.questions.length} questions
                </p>
              </div>
              <div className="absolute bottom-10 left-10 right-10 flex justify-between mt-4">
                <QuizBtn
                  btnText="Previous"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                />
                <QuizBtn
                  btnText="Next"
                  onClick={handleNextQuestion}
                  disabled={
                    currentQuestionIndex === quizData.questions.length - 1
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
