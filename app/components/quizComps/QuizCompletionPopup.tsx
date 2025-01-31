import React from "react";
import Link from "next/link";
import Btn from "../Btn";

interface QuizCompletionPopupProps {
  showPopup: boolean;
  onClose: () => void;
}

const QuizCompletionPopup: React.FC<QuizCompletionPopupProps> = ({
  showPopup,
  onClose,
}) => {
  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg mb-6">Do you want to see your results?</p>
        <div className="flex justify-around">
          <Btn btnText="See Result" href="/result" />
          <button
            className="bg-neutral-700 text-neutral-500 px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizCompletionPopup;
