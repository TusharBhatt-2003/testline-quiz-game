"use client";

import Link from "next/link";
import Btn from "./components/Btn";
import { useEffect, useState } from "react";
import { fetchQuizData } from "./utils/fetchQuizData";
import { QuizData } from "./types/quizTypes";
import { motion } from "motion/react";

const Skeleton = () => (
  <div className="space-y-9 bg-neutral-900 flex flex-col text-white rounded-lg p-8 shadow-xl  md:w-2/3">
    <div className="bg-gray-700 h-6 w-32 rounded-md animate-pulse"></div>
    <div className="bg-gray-700 h-4 w-64  rounded-md animate-pulse"></div>
    <div className="bg-gray-700 h-4 w-56 rounded-md animate-pulse"></div>
    <div className="bg-gray-700 h-4 w-56 rounded-md animate-pulse"></div>
    <div className="Btn opacity-20 h-8 w-36 rounded-md animate-pulse"></div>
  </div>
);

export default function Page() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);

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

  if (!quizData) {
    return (
      <div className="flex flex-col  justify-center h-screen bg-gradient-to-b text-white p-6">
        <div className="bg-gray-200/20 mb-10 h-12 w-32 rounded-md animate-pulse"></div>
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b  text-white p-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0, x: -100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.8, bounce: 0.2 },
        }}
        className="text-4xl font-bold mb-8"
      >
        {quizData.title}
      </motion.h1>

      <motion.div
        initial={{ opacity: 1, scale: 0.5, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.8, bounce: 0.2 },
        }}
        className="bg-neutral-900 flex flex-col text-white rounded-lg p-8 shadow-xl  md:w-2/3"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Quiz Details</h2>
          <p className="text-lg mb-2">
            Topic: <span className="text-teal-400">{quizData.topic}</span>
          </p>
          <p className="text-lg mb-2">
            Number of Questions:{" "}
            <span className="text-teal-400">{quizData.questions.length}</span>
          </p>
          <p className="text-lg mb-2">
            Duration:{" "}
            <span className="text-teal-400">{quizData.duration} minutes</span>
          </p>
          <p className="text-lg mb-2">Marking System:</p>
          <ul className="list-inside list-disc pl-4 text-lg">
            <li>
              Correct Answer:{" "}
              <span className="text-teal-400">
                {quizData.correct_answer_marks} marks
              </span>
            </li>
            <li>
              Incorrect Answer:{" "}
              <span className="text-teal-400">
                -{quizData.negative_marks} marks
              </span>
            </li>
          </ul>
        </div>

        <Btn btnText="Start The Quiz" href="/quiz" />
      </motion.div>
    </div>
  );
}
