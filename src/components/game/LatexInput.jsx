import React from 'react';

function LatexInput({ value, onChange, disabled }) {
  return (
    <div className="latex-input">
      <h3>【入力欄】</h3>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="LaTeX記法を入力してください..."
        className="input-field"
      />
    </div>
  );
}

export default LatexInput;
