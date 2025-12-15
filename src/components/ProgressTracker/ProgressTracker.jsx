import React, { useState, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Progress tracking service using localStorage
const ProgressService = {
  // Get progress for a specific content ID
  getProgress: (contentId) => {
    const progressData = localStorage.getItem('bookProgress');
    if (!progressData) return null;

    try {
      const progress = JSON.parse(progressData);
      return progress[contentId] || null;
    } catch (error) {
      console.error('Error parsing progress data:', error);
      return null;
    }
  },

  // Save progress for a specific content ID
  saveProgress: (contentId, status, score = null) => {
    const progressData = localStorage.getItem('bookProgress');
    let progress = {};

    if (progressData) {
      try {
        progress = JSON.parse(progressData);
      } catch (error) {
        console.error('Error parsing existing progress data:', error);
      }
    }

    progress[contentId] = {
      status,
      score,
      lastAccessed: new Date().toISOString(),
      completionDate: status === 'Completed' ? new Date().toISOString() : null
    };

    localStorage.setItem('bookProgress', JSON.stringify(progress));
  },

  // Get all progress data
  getAllProgress: () => {
    const progressData = localStorage.getItem('bookProgress');
    if (!progressData) return {};

    try {
      return JSON.parse(progressData);
    } catch (error) {
      console.error('Error parsing progress data:', error);
      return {};
    }
  },

  // Calculate overall progress percentage
  getOverallProgress: () => {
    const progress = ProgressService.getAllProgress();
    const completed = Object.values(progress).filter(item => item.status === 'Completed').length;
    const total = Object.keys(progress).length;

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }
};

// Progress tracker component
const ProgressTracker = ({ contentId, title }) => {
  const [progress, setProgress] = useState(null);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    const currentProgress = ProgressService.getProgress(contentId);
    setProgress(currentProgress);
    setOverallProgress(ProgressService.getOverallProgress());

    // Mark as started when component mounts
    if (!currentProgress) {
      ProgressService.saveProgress(contentId, 'In Progress');
      setProgress({ status: 'In Progress', score: null });
    }
  }, [contentId]);

  const markAsCompleted = () => {
    ProgressService.saveProgress(contentId, 'Completed');
    setProgress({ status: 'Completed', score: null });
    setOverallProgress(ProgressService.getOverallProgress());
  };

  const updateScore = (score) => {
    const status = score >= 70 ? 'Completed' : 'In Progress'; // Assuming 70% as passing score
    ProgressService.saveProgress(contentId, status, score);
    setProgress({ status, score });
    setOverallProgress(ProgressService.getOverallProgress());
  };

  if (!progress) {
    return null; // Or a loading state
  }

  return (
    <div className="progress-container">
      <h3>Progress Tracking</h3>
      <p><strong>Content:</strong> {title}</p>
      <p><strong>Status:</strong> <span className={progress.status === 'Completed' ? 'neon-text' : ''}>{progress.status}</span></p>

      {progress.score !== null && (
        <p><strong>Score:</strong> {progress.score}%</p>
      )}

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${overallProgress}%` }}
        ></div>
      </div>
      <p>Overall Progress: {overallProgress}%</p>

      {progress.status !== 'Completed' && (
        <button
          className="button button--primary button--sm button--neon"
          onClick={markAsCompleted}
        >
          Mark as Completed
        </button>
      )}

      <div style={{ marginTop: '1rem' }}>
        <label htmlFor={`score-${contentId}`}>Update Score: </label>
        <input
          id={`score-${contentId}`}
          type="number"
          min="0"
          max="100"
          placeholder="Enter score (0-100)"
          onChange={(e) => {
            const score = parseInt(e.target.value);
            if (!isNaN(score) && score >= 0 && score <= 100) {
              updateScore(score);
            }
          }}
          style={{ marginRight: '0.5rem', padding: '0.25rem' }}
        />
      </div>
    </div>
  );
};

// Wrapper to ensure component only runs in browser
const ProgressTrackerWrapper = (props) => {
  return (
    <BrowserOnly>
      {() => <ProgressTracker {...props} />}
    </BrowserOnly>
  );
};

export default ProgressTrackerWrapper;
export { ProgressService };