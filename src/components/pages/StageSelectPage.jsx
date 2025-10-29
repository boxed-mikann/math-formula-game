import React from 'react';
import { loadProgress } from '../../utils/storageManager';

function StageSelectPage({ onNavigate, stages }) {
  const progress = loadProgress();

  const getStageProgress = (stageId) => {
    return progress.stages.find(s => s.id === stageId) || {
      unlocked: false,
      cleared: false,
      stars: 0
    };
  };

  const renderStars = (count) => {
    return '⭐'.repeat(count);
  };

  return (
    <div className="page stage-select-page">
      <div className="page-header">
        <button className="btn-back" onClick={() => onNavigate('home')}>
          ← 戻る
        </button>
        <h2>ステージ選択</h2>
      </div>
      
      <div className="stage-grid">
        {stages.map((stage) => {
          const stageProgress = getStageProgress(stage.id);
          const isLocked = !stageProgress.unlocked;
          
          return (
            <div 
              key={stage.id}
              className={`stage-card ${isLocked ? 'locked' : ''} ${stageProgress.cleared ? 'cleared' : ''}`}
              onClick={() => !isLocked && onNavigate('game', stage.id)}
            >
              <div className="stage-header">
                <h3>Stage {stage.id}</h3>
                <span className="difficulty">{'★'.repeat(stage.difficulty)}</span>
              </div>
              <p className="stage-title">{stage.title}</p>
              <p className="stage-description">{stage.description}</p>
              
              {isLocked ? (
                <div className="stage-status locked-status">
                  🔒 LOCKED
                </div>
              ) : stageProgress.cleared ? (
                <div className="stage-status cleared-status">
                  <div>✓ クリア</div>
                  <div className="stars">{renderStars(stageProgress.stars)}</div>
                </div>
              ) : (
                <div className="stage-status">
                  プレイ可能
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StageSelectPage;
