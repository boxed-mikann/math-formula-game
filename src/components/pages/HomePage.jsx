import React from 'react';
import { loadProgress } from '../../utils/storageManager';

function HomePage({ onNavigate }) {
  const progress = loadProgress();
  const clearedStages = progress.stages.filter(s => s.cleared).length;
  const totalStages = progress.stages.length;

  return (
    <div className="page home-page">
      <div className="home-container">
        <h1>📐 Math Formula Game 📐</h1>
        <p className="subtitle">LaTeX記法を楽しく学ぼう！</p>
        
        <div className="home-buttons">
          <button 
            className="btn-primary btn-large"
            onClick={() => onNavigate('stage-select')}
          >
            ゲームスタート
          </button>
        </div>
        
        {clearedStages > 0 && (
          <div className="progress-info">
            <p>進捗: ステージ {clearedStages}/{totalStages} クリア</p>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${(clearedStages / totalStages) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
