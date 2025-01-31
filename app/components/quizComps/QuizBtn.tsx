import { motion } from "motion/react";
import React from "react";

interface NavButtonProps {
  btnText: string;
  onClick: () => void;
  disabled: boolean;
}

const QuizBtn: React.FC<NavButtonProps> = ({ btnText, onClick, disabled }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md select-none ${disabled ? "text-transparent cursor-not-allowed" : "Btn text-white"}`}
    >
      {btnText}
    </motion.button>
  );
};

export default QuizBtn;
