import React, { useState } from 'react';
import { loadProgress, resetAllData } from '../../utils/storageManager';

// Sub-component for the Settings Panel modal
function SettingsPanel({ onClose, onResetData }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>設定</h2>
        <div className="settings-actions">
          {/* Button to trigger the data reset confirmation */}
          <button 
            className="btn-danger" // Visually distinct for a destructive action
            onClick={onResetData}
          >
            データをリセット
          </button>
          {/* Button to close the settings panel */}
          <button 
            className="btn-secondary" 
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}

// Sub-component for the Reset Confirmation Dialog modal
function ResetConfirmationDialog({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>本当にすべての進捗をリセットしますか？ この操作は取り消せません。</p>
        <div className="dialog-actions">
          {/* Button to cancel the reset operation */}
          <button 
            className="btn-secondary" 
            onClick={onCancel}
          >
            キャンセル
          </button>
          {/* Button to confirm and perform the reset */}
          <button 
            className="btn-danger" // Visually distinct for a destructive action
            onClick={onConfirm}
          >
            リセットする
          </button>
        </div>
      </div>
    </div>
  );
}

function HomePage({ onNavigate }) {
  const progress = loadProgress();
  const clearedStages = progress.stages.filter(s => s.cleared).length;
  const totalStages = progress.stages.length;

  // State to control the visibility of the settings panel
  const [showSettings, setShowSettings] = useState(false);
  // State to control the visibility of the data reset confirmation dialog
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  /**
   * Handles the confirmed data reset operation.
   * Clears all local storage data and reloads the page to reflect the reset state.
   */
  const handleConfirmReset = () => {
    resetAllData();
    window.location.reload();
  };

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
          {/* New Settings button to open the settings panel */}
          <button 
            className="btn-secondary settings-btn"
            onClick={() => setShowSettings(true)} 
          >
            設定
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

        {/* Conditionally render the Settings Panel if showSettings is true */}
        {showSettings && (
          <SettingsPanel 
            onClose={() => setShowSettings(false)} // Callback to close the panel
            onResetData={() => {
              setShowSettings(false); // Close settings panel before opening confirmation
              setShowResetConfirm(true); // Open the reset confirmation dialog
            }}
          />
        )}

        {/* Conditionally render the Reset Confirmation Dialog if showResetConfirm is true */}
        {showResetConfirm && (
          <ResetConfirmationDialog
            onConfirm={handleConfirmReset} // Callback for confirming the reset
            onCancel={() => setShowResetConfirm(false)} // Callback for canceling the reset
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;