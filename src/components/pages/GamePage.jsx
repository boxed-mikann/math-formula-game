import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { checkAnswer } from '../../utils/latexChecker';
import ProblemDisplay from '../game/ProblemDisplay';
import PreviewDisplay from '../game/PreviewDisplay';
import LatexInput from '../game/LatexInput';
import FeedbackDisplay from '../game/FeedbackDisplay';

function GamePage({ onNavigate, stage }) {
  const {
    currentProblem,
    currentProblemIndex,
    userInput,
    setUserInput,
    correctCount,
    showFeedback,
    isCorrect,
    showHint,
    toggleHint,
    submitAnswer,
    goToNextProblem,
    skipProblem,
    isStageComplete,
    totalProblems
  } = useGameState(stage.id, stage.problems);

  const handleSubmit = () => {
    if (!userInput.trim()) {
      alert('入力してください');
      return;
    }
    
    const result = checkAnswer(
      userInput,
      currentProblem.correctAnswer,
      currentProblem.acceptableAnswers
    );
    
    submitAnswer(result);
  };

  if (isStageComplete) {
    return (
      <div className="page stage-complete-page">
        <div className="complete-container">
          <h1>🎉 ステージ {stage.id} クリア！</h1>
          
          <div className="score-display">
            <p>正解数: {correctCount} / {totalProblems}</p>
            <p>正答率: {Math.round((correctCount / totalProblems) * 100)}%</p>
            
            <div className="stars">
              {correctCount / totalProblems >= 0.9 && '⭐⭐⭐'}
              {correctCount / totalProblems >= 0.7 && correctCount / totalProblems < 0.9 && '⭐⭐'}
              {correctCount / totalProblems >= 0.5 && correctCount / totalProblems < 0.7 && '⭐'}
            </div>
            
            {correctCount / totalProblems >= 0.5 && stage.id < 3 && (
              <p className="unlock-message">🔓 ステージ{stage.id + 1} がアンロック！</p>
            )}
          </div>
          
          <div className="complete-buttons">
            {stage.id < 3 && correctCount / totalProblems >= 0.5 && (
              <button 
                className="btn-primary"
                onClick={() => onNavigate('game', stage.id + 1)}
              >
                次のステージへ
              </button>
            )}
            <button 
              className="btn-secondary"
              onClick={() => onNavigate('stage-select')}
            >
              ステージ選択に戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page game-page">
      <div className="game-header">
        <button className="btn-back" onClick={() => onNavigate('stage-select')}>
          ← 戻る
        </button>
        <h2>Stage {stage.id}: {stage.title}</h2>
        <button className="btn-hint" onClick={toggleHint}>
          💡 ヒント
        </button>
      </div>
      
      <div className="game-progress">
        <p>問題 {currentProblemIndex + 1} / {totalProblems}</p>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentProblemIndex + 1) / totalProblems) * 100}%` }}
          />
        </div>
      </div>

      {showHint && (
        <div className="hint-display">
          <h4>💡 ヒント</h4>
          <p>{currentProblem.hint}</p>
        </div>
      )}
      
      <div className="game-content">
        <p className="instruction">この数式をLaTeX記法で再現してください：</p>
        
        <ProblemDisplay latex={currentProblem.displayLatex} />
        
        <PreviewDisplay latex={userInput} />
        
        <LatexInput 
          value={userInput}
          onChange={setUserInput}
          disabled={showFeedback}
        />
        
        {showFeedback && (
          <FeedbackDisplay
            isCorrect={isCorrect}
            userInput={userInput}
            correctAnswer={currentProblem.correctAnswer}
            explanation={currentProblem.explanation}
          />
        )}
        
        <div className="game-buttons">
          {!showFeedback ? (
            <>
              <button 
                className="btn-primary"
                onClick={handleSubmit}
              >
                回答を確認する
              </button>
              <button 
                className="btn-secondary"
                onClick={skipProblem}
              >
                スキップ
              </button>
            </>
          ) : (
            !isCorrect && (
              <>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setUserInput('');
                    goToNextProblem();
                  }}
                >
                  次の問題へ
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    setUserInput('');
                    goToNextProblem();
                  }}
                >
                  もう一度挑戦
                </button>
              </>
            )
          )}
        </div>
        
        <div className="score-info">
          正解: {correctCount} / {currentProblemIndex + (showFeedback && isCorrect ? 1 : 0)}
        </div>
      </div>
    </div>
  );
}

export default GamePage;
