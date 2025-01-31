import Link from 'next/link';
import React from 'react';
import { motion } from "motion/react"
interface BtnProps {
  href: string;
  btnText: string;
}
export default function Btn({ href, btnText }: BtnProps) {
  return (
<motion.button
 whileHover={{ scale: 1.2 }}
 whileTap={{ scale: 0.8 }}
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
      duration: 0.4,
      scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
  }}>
<Link
      href={href}
      className="text-white text-center px-6 py-3 rounded-lg Btn transition"
    >
      {btnText}
    </Link>
</motion.button>
  );
}
