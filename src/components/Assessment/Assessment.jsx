import React, { useState, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { ProgressService } from '../ProgressTracker/ProgressTracker';

const Assessment = ({
  assessmentId,
  title,
  questions,
  passingScore = 70,
  timeLimit = null,
  onCompletion
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Timer effect if time limit is set
  useEffect(() => {
    let timer = null;
    if (timeLimit && timeLeft > 0 && !isSubmitted) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isSubmitted, timeLimit]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (isSubmitted) return;

    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      const selectedAnswerIndex = selectedAnswers[index];
      if (selectedAnswerIndex !== undefined && question.answers[selectedAnswerIndex].correct) {
        correctAnswers++;
      }
    });

    const calculatedScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);
    setShowResults(true);

    // Update progress tracking
    const status = calculatedScore >= passingScore ? 'Completed' : 'In Progress';
    ProgressService.saveProgress(assessmentId, status, calculatedScore);

    if (onCompletion) {
      onCompletion(calculatedScore, status);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft(timeLimit);
    setIsSubmitted(false);
    setScore(null);
    setShowResults(false);
  };

  if (questions.length === 0) {
    return (
      <div className="assessment-container">
        <h3>{title}</h3>
        <p>No questions available for this assessment.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswerIndex = selectedAnswers[currentQuestionIndex];

  return (
    <div className="assessment-container">
      <h3>{title}</h3>

      {timeLimit && (
        <div className="timer" style={{ marginBottom: '1rem', fontSize: '1.2em', fontWeight: 'bold' }}>
          Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      )}

      {!isSubmitted ? (
        <div className="assessment-question">
          <h4>
            Question {currentQuestionIndex + 1} of {questions.length}
          </h4>
          <p><strong>{currentQuestion.question}</strong></p>

          {currentQuestion.type === 'multiple-choice' && (
            <div className="assessment-options">
              {currentQuestion.answers.map((answer, answerIndex) => (
                <div
                  key={answerIndex}
                  className={`assessment-option ${selectedAnswerIndex === answerIndex ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(currentQuestionIndex, answerIndex)}
                  style={{
                    cursor: 'pointer',
                    border: selectedAnswerIndex === answerIndex ? '2px solid var(--ifm-color-primary)' : '1px solid #ddd',
                    margin: '0.25rem 0',
                    padding: '0.5rem',
                    borderRadius: '4px'
                  }}
                >
                  <input
                    type="radio"
                    id={`answer-${currentQuestionIndex}-${answerIndex}`}
                    name={`question-${currentQuestionIndex}`}
                    checked={selectedAnswerIndex === answerIndex}
                    onChange={() => handleAnswerSelect(currentQuestionIndex, answerIndex)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <label htmlFor={`answer-${currentQuestionIndex}-${answerIndex}`}>
                    {answer.text}
                  </label>
                </div>
              ))}
            </div>
          )}

          {currentQuestion.type === 'true-false' && (
            <div className="assessment-options">
              {currentQuestion.answers.map((answer, answerIndex) => (
                <div
                  key={answerIndex}
                  className={`assessment-option ${selectedAnswerIndex === answerIndex ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(currentQuestionIndex, answerIndex)}
                  style={{
                    cursor: 'pointer',
                    border: selectedAnswerIndex === answerIndex ? '2px solid var(--ifm-color-primary)' : '1px solid #ddd',
                    margin: '0.25rem 0',
                    padding: '0.5rem',
                    borderRadius: '4px'
                  }}
                >
                  <input
                    type="radio"
                    id={`answer-${currentQuestionIndex}-${answerIndex}`}
                    name={`question-${currentQuestionIndex}`}
                    checked={selectedAnswerIndex === answerIndex}
                    onChange={() => handleAnswerSelect(currentQuestionIndex, answerIndex)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <label htmlFor={`answer-${currentQuestionIndex}-${answerIndex}`}>
                    {answer.text}
                  </label>
                </div>
              ))}
            </div>
          )}

          {currentQuestion.type === 'multiple-select' && (
            <div className="assessment-options">
              {currentQuestion.answers.map((answer, answerIndex) => {
                const isSelected = selectedAnswers[currentQuestionIndex]?.includes(answerIndex);
                return (
                  <div
                    key={answerIndex}
                    className={`assessment-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      const currentSelections = selectedAnswers[currentQuestionIndex] || [];
                      let newSelections;

                      if (isSelected) {
                        newSelections = currentSelections.filter(index => index !== answerIndex);
                      } else {
                        newSelections = [...currentSelections, answerIndex];
                      }

                      setSelectedAnswers({
                        ...selectedAnswers,
                        [currentQuestionIndex]: newSelections
                      });
                    }}
                    style={{
                      cursor: 'pointer',
                      border: isSelected ? '2px solid var(--ifm-color-primary)' : '1px solid #ddd',
                      margin: '0.25rem 0',
                      padding: '0.5rem',
                      borderRadius: '4px'
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`answer-${currentQuestionIndex}-${answerIndex}`}
                      checked={isSelected}
                      onChange={() => {}}
                      style={{ marginRight: '0.5rem' }}
                    />
                    <label htmlFor={`answer-${currentQuestionIndex}-${answerIndex}`}>
                      {answer.text}
                    </label>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="button button--secondary button--sm"
            >
              Previous
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="button button--primary button--sm"
                disabled={selectedAnswerIndex === undefined}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="button button--primary button--sm button--neon"
                disabled={selectedAnswerIndex === undefined}
              >
                Submit Assessment
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="assessment-results">
          <h4>Assessment Results</h4>
          <p><strong>Score: {score}%</strong></p>
          <p className={score >= passingScore ? 'neon-text' : ''}>
            Status: {score >= passingScore ? 'PASSED' : 'NEEDS IMPROVEMENT'}
          </p>
          <p>Passing score: {passingScore}%</p>

          {showResults && (
            <div style={{ marginTop: '1rem' }}>
              <h5>Detailed Results:</h5>
              {questions.map((question, qIndex) => {
                const userAnswerIndex = selectedAnswers[qIndex];
                const isCorrect = question.answers[userAnswerIndex]?.correct;

                return (
                  <div key={qIndex} style={{
                    padding: '0.5rem',
                    margin: '0.5rem 0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: isCorrect ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 57, 57, 0.1)'
                  }}>
                    <p><strong>Question {qIndex + 1}:</strong> {question.question}</p>
                    <p>Your answer: {question.answers[userAnswerIndex]?.text || 'No answer selected'}</p>
                    <p style={{ color: isCorrect ? 'green' : 'red' }}>
                      {isCorrect ? '✓ Correct' : `✗ Incorrect. Correct answer: ${question.answers.find(a => a.correct)?.text}`}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={resetAssessment}
              className="button button--secondary button--sm"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrapper to ensure component only runs in browser
const AssessmentWrapper = (props) => {
  return (
    <BrowserOnly>
      {() => <Assessment {...props} />}
    </BrowserOnly>
  );
};

export default AssessmentWrapper;