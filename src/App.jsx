import React, { useState, useEffect } from 'react';
import HomePage from './components/pages/HomePage';
import StageSelectPage from './components/pages/StageSelectPage';
import GamePage from './components/pages/GamePage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedStageId, setSelectedStageId] = useState(null);
  const [stages, setStages] = useState([]);

  useEffect(() => {
    // Load stages data
    fetch('/stages.json')
      .then(response => response.json())
      .then(data => setStages(data.stages))
      .catch(error => console.error('Failed to load stages:', error));
  }, []);

  const navigate = (page, stageId = null) => {
    setCurrentPage(page);
    if (stageId) {
      setSelectedStageId(stageId);
    }
  };

  const selectedStage = stages.find(s => s.id === selectedStageId);

  return (
    <div className="App">
      {currentPage === 'home' && (
        <HomePage onNavigate={navigate} />
      )}
      
      {currentPage === 'stage-select' && (
        <StageSelectPage 
          onNavigate={navigate}
          stages={stages}
        />
      )}
      
      {currentPage === 'game' && selectedStage && (
        <GamePage 
          onNavigate={navigate}
          stage={selectedStage}
        />
      )}
    </div>
  );
}

export default App;
