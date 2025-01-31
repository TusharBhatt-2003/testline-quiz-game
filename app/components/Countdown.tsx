"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CountdownProps {
  onComplete: () => void; // Function that triggers when animation completes
}

const Countdown: React.FC<CountdownProps> = ({ onComplete }) => {
  const numbersRef = useRef<HTMLDivElement[]>([]);
  const startRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete, // Calls the passed function when animation finishes
    });

    // Ensure numbers are added in sequence without repeating
    [0, 1, 2].forEach((index) => {
      tl.fromTo(
        numbersRef.current[index],
        { opacity: 0, scale: 0, x: 150, y: 50,  },
        { opacity: 1, scale: 2, x: 0, y: 0,duration: 0.6, ease: "elastic.out" }
      )
        .to(numbersRef.current[index], { opacity: 0, duration: 0.3 }, "+=0.3");
    });

    // Animate "Start!"
    tl.fromTo(
      startRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 2, duration: 0.8, ease: "elastic.out(1, 0.5)" }
    );

  }, []);

  return (
    <div className="flex w-full items-center text-[#168E8C] justify-center h-screen flex-col font-bold overflow-hidden">
      <div className="flex gap-4 justify-center items-center">
        {[1, 2, 3].map((num, index) => (
          <div
            key={num}
            ref={(el) => {
              if (el) numbersRef.current[index] = el;
            }}
            className="opacity-0"
          >
           <p className="text-7xl">{num}</p>
          </div>
        ))}
      </div>
      <div ref={startRef} className="opacity-0 ">
        <h1 className="text-8xl font-bold">Go!</h1>
      </div>
    </div>
  );
};

export default Countdown;
