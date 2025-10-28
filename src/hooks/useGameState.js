import { useState, useEffect } from 'react';
import { loadProgress, saveProgress, updateStageProgress } from '../utils/storageManager';

export function useGameState(stageId, problems) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [progress, setProgress] = useState(loadProgress());
  const [isStageComplete, setIsStageComplete] = useState(false);

  const currentProblem = problems[currentProblemIndex];

  // Reset state when moving to next problem
  const goToNextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setUserInput('');
      setShowFeedback(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      // Stage complete
      const newProgress = updateStageProgress(
        progress,
        stageId,
        correctCount,
        problems.length
      );
      saveProgress(newProgress);
      setProgress(newProgress);
      setIsStageComplete(true);
    }
  };

  const submitAnswer = (result) => {
    setAttemptCount(attemptCount + 1);
    setIsCorrect(result.correct);
    setShowFeedback(true);
    
    if (result.correct) {
      setCorrectCount(correctCount + 1);
      // Auto-advance after 2 seconds
      setTimeout(() => {
        goToNextProblem();
      }, 2000);
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const skipProblem = () => {
    goToNextProblem();
  };

  return {
    currentProblem,
    currentProblemIndex,
    userInput,
    setUserInput,
    correctCount,
    attemptCount,
    showFeedback,
    isCorrect,
    showHint,
    toggleHint,
    submitAnswer,
    goToNextProblem,
    skipProblem,
    progress,
    isStageComplete,
    totalProblems: problems.length
  };
}
