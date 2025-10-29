import React from 'react';
import { InlineMath } from 'react-katex';

function PreviewDisplay({ latex }) {
  return (
    <div className="preview-display">
      <h3>【あなたの入力のプレビュー】</h3>
      <div className="math-container">
        {latex ? (
          <InlineMath math={latex} />
        ) : (
          <span className="placeholder">入力すると表示されます</span>
        )}
      </div>
    </div>
  );
}

export default PreviewDisplay;
