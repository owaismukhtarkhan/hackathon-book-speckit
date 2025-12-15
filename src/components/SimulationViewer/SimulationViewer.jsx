import React, { useState, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

const SimulationViewer = ({
  simulationId,
  title,
  description,
  simulationUrl,
  width = '100%',
  height = '600px',
  onSimulationLoad,
  onSimulationError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    if (simulationUrl) {
      const timer = setTimeout(() => {
        if (isLoading) {
          setShowPlaceholder(false);
        }
      }, 5000); // Show placeholder for max 5 seconds

      return () => clearTimeout(timer);
    }
  }, [simulationUrl, isLoading]);

  const handleLoad = () => {
    setIsLoading(false);
    setShowPlaceholder(false);
    if (onSimulationLoad) {
      onSimulationLoad();
    }
  };

  const handleError = () => {
    setError('Failed to load simulation');
    setIsLoading(false);
    if (onSimulationError) {
      onSimulationError();
    }
  };

  return (
    <div className="simulation-container">
      <h3>{title}</h3>
      <p>{description}</p>

      {simulationUrl ? (
        <div className="simulation-wrapper" style={{ position: 'relative' }}>
          {isLoading && showPlaceholder && (
            <div className="simulation-placeholder" style={{
              width,
              height,
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ifm-color-accent)',
              border: '1px solid var(--ifm-color-primary)',
              borderRadius: '8px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div className="neon-text">Loading Simulation...</div>
                <div style={{ fontSize: '0.8em', marginTop: '0.5rem' }}>
                  If simulation does not load, check your browser settings
                </div>
              </div>
            </div>
          )}

          <iframe
            src={simulationUrl}
            width={width}
            height={height}
            title={title}
            style={{
              display: showPlaceholder ? 'none' : 'block',
              border: '1px solid var(--ifm-color-primary)',
              borderRadius: '8px',
              backgroundColor: '#000'
            }}
            onLoad={handleLoad}
            onError={handleError}
            allowFullScreen
          />

          {error && (
            <div style={{
              marginTop: '0.5rem',
              padding: '0.5rem',
              backgroundColor: '#fde8e8',
              border: '1px solid #f44336',
              borderRadius: '4px',
              color: '#d32f2f'
            }}>
              {error}. You may need to run the simulation locally or follow the setup instructions below.
            </div>
          )}
        </div>
      ) : (
        <div className="simulation-info">
          <div className="simulation-viewer">
            <div style={{ textAlign: 'center' }}>
              <h4>Simulation Environment</h4>
              <p>Local setup required for this simulation</p>
              <p>Follow the instructions below to set up your local environment</p>
            </div>
          </div>
        </div>
      )}

      <div className="simulation-instructions" style={{ marginTop: '1rem' }}>
        <h4>Setup Instructions:</h4>
        <ol>
          <li>Install the required simulation software (Gazebo, Unity, or NVIDIA Isaac Sim)</li>
          <li>Set up your development environment according to the documentation</li>
          <li>Download the required robot models and simulation assets</li>
          <li>Run the simulation using the provided launch files or scripts</li>
          <li>Interact with the simulation and complete the exercises</li>
        </ol>
      </div>

      <div className="simulation-links" style={{ marginTop: '1rem' }}>
        <h4>Resources:</h4>
        <ul>
          <li><a href="https://gazebosim.org/" target="_blank" rel="noopener noreferrer">Gazebo Simulation</a></li>
          <li><a href="https://unity.com/" target="_blank" rel="noopener noreferrer">Unity 3D</a></li>
          <li><a href="https://developer.nvidia.com/isaac-sim" target="_blank" rel="noopener noreferrer">NVIDIA Isaac Sim</a></li>
          <li><a href="https://github.com/ROBOTIS-GIT/turtlebot3_simulations" target="_blank" rel="noopener noreferrer">TurtleBot3 Simulations</a></li>
        </ul>
      </div>
    </div>
  );
};

// Wrapper to ensure component only runs in browser
const SimulationViewerWrapper = (props) => {
  return (
    <BrowserOnly>
      {() => <SimulationViewer {...props} />}
    </BrowserOnly>
  );
};

export default SimulationViewerWrapper;