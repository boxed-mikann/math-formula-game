import React from 'react';
import { InlineMath } from 'react-katex';

function FeedbackDisplay({ isCorrect, userInput, correctAnswer, explanation }) {
  if (isCorrect) {
    return (
      <div className="feedback-display feedback-correct">
        <h3>✅ 正解！素晴らしい！</h3>
        <p>あなたの入力: <code>{userInput}</code></p>
        <p>{explanation}</p>
      </div>
    );
  } else {
    return (
      <div className="feedback-display feedback-incorrect">
        <h3>❌ 惜しい！比較してみましょう</h3>
        <div className="comparison">
          <div className="comparison-item">
            <p>あなたの入力: <code>{userInput}</code></p>
            <div className="math-preview">
              → レンダリング: <InlineMath math={userInput} />
            </div>
          </div>
          <div className="comparison-item">
            <p>正解例: <code>{correctAnswer}</code></p>
            <div className="math-preview">
              → レンダリング: <InlineMath math={correctAnswer} />
            </div>
          </div>
        </div>
        <p className="hint-text">💡 {explanation}</p>
      </div>
    );
  }
}

export default FeedbackDisplay;
