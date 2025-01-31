"use client";

import { useEffect, useState } from "react";
import { useQuiz } from "../context/QuizContext";
import Link from "next/link";
import { motion } from "motion/react";
import { fetchQuizData } from "../utils/fetchQuizData";

export default function Result() {
  const { answers, scores } = useQuiz();
  const [totalScore, setTotalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [quizData, setQuizData] = useState<any | null>(null);
  const [quote, setQuote] = useState("");
  const [clearCache, setClearCache] = useState(false); // State to trigger localStorage clearing

  // Fetch the quiz data when the component mounts
  useEffect(() => {
    const loadQuizData = async () => {
      const data = await fetchQuizData();
      if (data) {
        setQuizData(data);
      }
    };
    loadQuizData();
  }, []);

  // Calculate the total score and total number of questions
  useEffect(() => {
    let calculatedScore = 0;
    let totalQuestionsCount = 0;

    for (const questionId in scores) {
      calculatedScore += Number(scores[questionId]); // Ensure proper numeric conversion
    }

    setTotalScore(calculatedScore);
    setTotalQuestions(Object.keys(answers).length);

    // Set motivational quote based on the score
    if (calculatedScore >= totalQuestions * 0.8) {
      setQuote("Outstanding! You've nailed it!");
    } else if (calculatedScore >= totalQuestions * 0.5) {
      setQuote("Great job! Keep up the good work!");
    } else {
      setQuote("Good try! Keep going, you'll get better!");
    }
  }, [scores, answers]);

  // Trigger localStorage clearing when button is clicked
  useEffect(() => {
    if (clearCache) {
      localStorage.clear(); // Clear local storage
      sessionStorage.clear(); // Optionally clear session storage too
    }
  }, [clearCache]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg p-4 overflow-y-hidden">
      <h2 className="text-4xl text-[#168E8C] font-semibold mb-4">
        Quiz Results
      </h2>

      <motion.div
        initial={{ opacity: 0, scale: 0, y: 200 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.2 },
        }}
        className="bg-neutral-900 w-full max-w-2xl text-white flex justify-around items-center py-5 rounded-lg"
      >
        <p className="md:text-2xl">
          You scored: <strong>{totalScore}</strong> points
        </p>
        <p className="md:text-2xl">
          Out of <strong>{totalQuestions}</strong> questions
        </p>
      </motion.div>
      {/* Display motivational quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 200 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.8, bounce: 0.2 },
        }}
        className="mt-4"
      >
        <p className="text-xl font-semibold text-center text-[#F1A77A]">
          {quote}
        </p>
      </motion.div>

      {/* Display all questions with selected and correct answers */}
      <div className="mt-8 w-full max-w-2xl overflow-auto container">
        {quizData ? (
          quizData.questions.map((question: any, index: number) => {
            const questionId = question.id;
            const { selectedOptionId } = answers[questionId] || {};

            // Find the correct answer
            const correctOption = question.options.find(
              (option: any) => option.is_correct,
            );

            // Find the selected option
            const selectedOption = question.options.find(
              (option: any) => option.id === selectedOptionId,
            );

            // Individual score for each question
            const questionScore = scores[questionId] || 0;

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 200 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  scale: { type: "spring", visualDuration: 0.4, bounce: 0.2 },
                }}
                key={questionId}
                className="mb-6 p-6 bg-neutral-900 text-white rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4">
                  Question {index + 1}: {question.description}
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-lg">
                      <span className="font-medium">Your Answer:</span>{" "}
                      <span
                        className={
                          selectedOption && selectedOption.is_correct
                            ? "text-lime-300 font-bold"
                            : selectedOption
                              ? "text-red-500 font-bold"
                              : "text-gray-600"
                        }
                      >
                        {selectedOption
                          ? selectedOption.description
                          : "Not answered"}
                      </span>
                    </p>
                    <p className="text-lg">
                      <span className="font-medium">Correct Answer:</span>{" "}
                      <span className="text-lime-300 font-bold">
                        {correctOption
                          ? correctOption.description
                          : "Not available"}
                      </span>
                    </p>
                    <p className="text-lg">
                      <span className="font-medium">Marks :</span>{" "}
                      <span className="text-[#F1A77A] font-semibold">
                        {questionScore}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 200 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.2 },
            }}
            className="space-y-4"
          >
            <div className="bg-neutral-800 w-full h-40 rounded-lg animate-pulse" />
            <div className="bg-neutral-800 w-full h-40 rounded-lg animate-pulse" />
            <div className="bg-neutral-800 w-full h-40 rounded-lg animate-pulse" />
          </motion.div>
        )}
      </div>

      <motion.p
        initial={{ opacity: 0, scale: 0, y: 200 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.2 },
        }}
        className="mt-8 text-lg text-center text-gray-300"
      >
        Great job! Keep going!
      </motion.p>

      {/* Button to take the quiz again */}
      <div className="mt-8">
        <Link
          href="/"
          onClick={() => setClearCache(true)} // Trigger clearing of cache on click
        >
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            className="px-6 py-3 bg-[#168E8C] text-white rounded-md text-xl font-semibold"
          >
            Take Quiz Again
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
