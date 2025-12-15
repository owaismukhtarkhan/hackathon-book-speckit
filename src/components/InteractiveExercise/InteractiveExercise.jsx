import React, { useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { ProgressService } from '../ProgressTracker/ProgressTracker';

const InteractiveExercise = ({
  exerciseId,
  title,
  description,
  initialCode,
  solution,
  language = 'python',
  onRun,
  onComplete
}) => {
  const [code, setCode] = useState(initialCode || '');
  const [result, setResult] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);

  const handleRunCode = async () => {
    // In a real implementation, this would send the code to an execution service
    // For now, we'll simulate execution
    setResult({
      output: `Code executed successfully!\n\n${code.substring(0, 100)}...`,
      success: true,
      message: 'Code executed without errors'
    });

    // Simulate execution time
    setExecutionTime(Math.floor(Math.random() * 1000) + 100);
  };

  const handleReset = () => {
    setCode(initialCode || '');
    setResult(null);
    setIsSubmitted(false);
    setExecutionTime(null);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);

    // Update progress tracking
    ProgressService.saveProgress(exerciseId, 'Completed', 100);

    if (onComplete) {
      onComplete(true);
    }
  };

  return (
    <div className="interactive-exercise">
      <h3>{title}</h3>
      <p>{description}</p>

      <div style={{ marginTop: '1rem' }}>
        <label htmlFor={`code-editor-${exerciseId}`} style={{ display: 'block', marginBottom: '0.5rem' }}>
          <strong>Code Editor:</strong>
        </label>
        <textarea
          id={`code-editor-${exerciseId}`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows="12"
          cols="80"
          style={{
            width: '100%',
            fontFamily: 'monospace',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        />
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={handleRunCode}
          className="button button--primary button--sm button--neon"
        >
          Run Code
        </button>

        <button
          onClick={handleReset}
          className="button button--secondary button--sm"
        >
          Reset
        </button>

        <button
          onClick={handleSubmit}
          className="button button--success button--sm button--neon"
          disabled={!result}
        >
          Submit Exercise
        </button>
      </div>

      {result && (
        <div className={`result ${result.success ? 'success' : 'failure'}`} style={{ marginTop: '1rem' }}>
          <h4>Execution Result:</h4>
          <pre style={{
            backgroundColor: result.success ? '#e8f5e8' : '#fde8e8',
            padding: '0.5rem',
            borderRadius: '4px',
            overflowX: 'auto',
            border: result.success ? '1px solid #4caf50' : '1px solid #f44336'
          }}>
            {result.output}
          </pre>

          {executionTime && (
            <p style={{ marginTop: '0.5rem' }}>
              Execution time: {executionTime}ms
            </p>
          )}
        </div>
      )}

      <details style={{ marginTop: '1rem' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          Need Help? View Example Solution
        </summary>
        <div style={{
          marginTop: '0.5rem',
          padding: '0.5rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}>
          <pre style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            fontFamily: 'monospace',
            fontSize: '0.9em'
          }}>
            {solution || 'Example solution would appear here in a real implementation.'}
          </pre>
        </div>
      </details>
    </div>
  );
};

// Wrapper to ensure component only runs in browser
const InteractiveExerciseWrapper = (props) => {
  return (
    <BrowserOnly>
      {() => <InteractiveExercise {...props} />}
    </BrowserOnly>
  );
};

export default InteractiveExerciseWrapper;