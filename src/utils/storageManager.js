/**
 * Get default progress data
 */
function getDefaultProgress() {
  return {
    version: '1.0',
    stages: [
      { id: 1, unlocked: true, cleared: false, bestScore: 0, totalProblems: 5, stars: 0, attempts: 0 },
      { id: 2, unlocked: false, cleared: false, bestScore: 0, totalProblems: 5, stars: 0, attempts: 0 },
      { id: 3, unlocked: false, cleared: false, bestScore: 0, totalProblems: 5, stars: 0, attempts: 0 }
    ],
    totalCorrect: 0,
    totalProblems: 0,
    lastPlayedStage: null,
    lastPlayedDate: null
  };
}

/**
 * Save progress to localStorage
 */
export function saveProgress(progress) {
  try {
    localStorage.setItem('mathGameProgress', JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error('Failed to save progress:', error);
    return false;
  }
}

/**
 * Load progress from localStorage
 */
export function loadProgress() {
  try {
    const saved = localStorage.getItem('mathGameProgress');
    return saved ? JSON.parse(saved) : getDefaultProgress();
  } catch (error) {
    console.error('Failed to load progress:', error);
    return getDefaultProgress();
  }
}

/**
 * Update stage progress
 */
export function updateStageProgress(progress, stageId, score, totalProblems) {
  const stageIndex = progress.stages.findIndex(s => s.id === stageId);
  if (stageIndex === -1) return progress;
  
  const newProgress = { ...progress };
  const stage = { ...newProgress.stages[stageIndex] };
  
  stage.attempts += 1;
  stage.bestScore = Math.max(stage.bestScore, score);
  stage.totalProblems = totalProblems;
  
  // Calculate stars based on score
  const percentage = (score / totalProblems) * 100;
  if (percentage >= 90) stage.stars = 3;
  else if (percentage >= 70) stage.stars = 2;
  else if (percentage >= 50) stage.stars = 1;
  else stage.stars = 0;
  
  // Mark as cleared if score > 0
  if (score > 0) {
    stage.cleared = true;
  }
  
  // Unlock next stage if score is >= 50%
  if (percentage >= 50 && stageIndex < newProgress.stages.length - 1) {
    newProgress.stages[stageIndex + 1].unlocked = true;
  }
  
  newProgress.stages[stageIndex] = stage;
  newProgress.lastPlayedStage = stageId;
  newProgress.lastPlayedDate = new Date().toISOString().split('T')[0];
  newProgress.totalCorrect += score;
  newProgress.totalProblems += totalProblems;
  
  return newProgress;
}

/**
 * Reset all progress
 */
export function resetProgress() {
  const defaultProgress = getDefaultProgress();
  saveProgress(defaultProgress);
  return defaultProgress;
}
