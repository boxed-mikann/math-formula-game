import React from 'react';
import { InlineMath } from 'react-katex';

function ProblemDisplay({ latex }) {
  return (
    <div className="problem-display">
      <h3>【問題】</h3>
      <div className="math-container">
        <InlineMath math={latex} />
      </div>
    </div>
  );
}

export default ProblemDisplay;
