'use client';
import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export default function TypingAnimation({
  text,
  className = '',
  speed = 100,
  delay = 500
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Initial delay before starting
    const initialTimeout = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    }, delay);

    return () => clearTimeout(initialTimeout);
  }, [currentIndex, text, speed, delay]);

  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayedText}
      <span
        className="inline-block w-0.5 h-[1em] ml-1 bg-current align-middle"
        style={{
          opacity: currentIndex < text.length ? 1 : (showCursor ? 1 : 0),
          transition: 'opacity 0.1s'
        }}
      />
    </span>
  );
}
