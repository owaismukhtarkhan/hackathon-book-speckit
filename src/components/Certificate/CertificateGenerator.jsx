import React, { useState, useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { ProgressService } from '../ProgressTracker/ProgressTracker';

// Certificate generation component
const CertificateGenerator = ({
  userId = 'Anonymous Learner',
  courseTitle = 'Physical AI & Humanoid Robotics',
  completionDate = new Date().toLocaleDateString(),
  certificateId = null
}) => {
  const [certificateData, setCertificateData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef(null);

  // Generate certificate data based on progress
  useEffect(() => {
    const progress = ProgressService.getAllProgress();
    const completedItems = Object.values(progress).filter(item => item.status === 'Completed').length;
    const totalItems = Object.keys(progress).length;
    const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    setCertificateData({
      userId,
      courseTitle,
      completionDate,
      certificateId: certificateId || `CERT-${Date.now()}`,
      completionPercentage,
      completedItems,
      totalItems
    });
  }, [userId, courseTitle, completionDate, certificateId]);

  const generateCertificate = () => {
    setIsGenerating(true);

    // Simulate certificate generation process
    setTimeout(() => {
      setIsGenerating(false);
      setShowCertificate(true);
    }, 1500);
  };

  const downloadCertificate = () => {
    // In a real implementation, this would generate a PDF
    // For now, we'll create a simple download simulation
    alert('In a real implementation, this would download a PDF certificate.');
  };

  const shareCertificate = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Certificate of Completion',
        text: `I completed the ${courseTitle} course!`,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Certificate link copied to clipboard!');
    }
  };

  if (!certificateData) {
    return (
      <div className="certificate-container" style={{ padding: '1rem', textAlign: 'center' }}>
        <p>Loading certificate information...</p>
      </div>
    );
  }

  return (
    <div className="certificate-container" style={{
      padding: '2rem',
      textAlign: 'center',
      border: '1px solid var(--ifm-color-primary)',
      borderRadius: '8px',
      margin: '1rem 0',
      backgroundColor: 'rgba(138, 43, 226, 0.05)'
    }}>
      <h3>Certificate of Completion</h3>

      {!showCertificate ? (
        <div>
          <p>Congratulations on your progress! You have completed {certificateData.completedItems} out of {certificateData.totalItems} items ({certificateData.completionPercentage}%).</p>
          <button
            className="button button--primary button--sm button--neon"
            onClick={generateCertificate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating Certificate...' : 'Generate Certificate'}
          </button>
        </div>
      ) : (
        <div style={{ padding: '1rem' }}>
          <div
            ref={certificateRef}
            style={{
              border: '5px solid var(--ifm-color-primary)',
              padding: '2rem',
              margin: '1rem auto',
              maxWidth: '800px',
              backgroundColor: 'white',
              fontFamily: 'Georgia, serif',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontSize: '0.8rem',
              color: '#888'
            }}>
              ID: {certificateData.certificateId}
            </div>

            <h1 style={{
              fontSize: '2.5rem',
              color: 'var(--ifm-color-primary)',
              margin: '1rem 0',
              textTransform: 'uppercase',
              letterSpacing: '0.1rem'
            }}>
              Certificate of Completion
            </h1>

            <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
              This is to certify that
            </p>

            <h2 style={{
              fontSize: '2rem',
              color: 'var(--ifm-color-accent)',
              margin: '1rem 0',
              textShadow: '0 0 5px var(--ifm-color-accent)'
            }}>
              {certificateData.userId}
            </h2>

            <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
              has successfully completed the course
            </p>

            <h3 style={{
              fontSize: '1.5rem',
              margin: '1rem 0',
              color: 'var(--ifm-color-primary)'
            }}>
              {certificateData.courseTitle}
            </h3>

            <p style={{ margin: '1rem 0' }}>
              with a completion rate of <strong>{certificateData.completionPercentage}%</strong>
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '2rem 0', flexWrap: 'wrap' }}>
              <div>
                <p style={{ margin: 0 }}>Date of Completion</p>
                <p style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'var(--ifm-color-primary)',
                  borderBottom: '1px solid #000',
                  paddingBottom: '0.25rem'
                }}>
                  {certificateData.completionDate}
                </p>
              </div>

              <div>
                <p style={{ margin: 0 }}>Verification ID</p>
                <p style={{
                  fontSize: '1rem',
                  color: '#666'
                }}>
                  {certificateData.certificateId}
                </p>
              </div>
            </div>

            <div style={{
              margin: '2rem 0',
              fontSize: '0.9rem',
              color: '#666',
              fontStyle: 'italic'
            }}>
              This certificate verifies the successful completion of the above-mentioned course.
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button
              className="button button--primary button--sm button--neon"
              onClick={downloadCertificate}
              style={{ marginRight: '0.5rem' }}
            >
              Download PDF
            </button>

            <button
              className="button button--secondary button--sm"
              onClick={shareCertificate}
            >
              Share Certificate
            </button>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
            <p>Verify this certificate at: {window.location.href}</p>
            <p>QR code for verification would appear here in a real implementation</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrapper to ensure component only runs in browser
const CertificateGeneratorWrapper = (props) => {
  return (
    <BrowserOnly>
      {() => <CertificateGenerator {...props} />}
    </BrowserOnly>
  );
};

export default CertificateGeneratorWrapper;