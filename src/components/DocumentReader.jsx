import React, { useState, useEffect, useRef } from 'react';
import { useSenior } from '../context/SeniorContext';
import { 
  FileText, 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  CheckSquare, 
  Upload, 
  BookOpen,
  Calendar,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export const DocumentReader = () => {
  const { speak, stopSpeaking, playGuidance, language } = useSenior();
  const [selectedDocKey, setSelectedDocKey] = useState('prescription');
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.85); // Slower default rate for senior listening

  const sampleDocuments = {
    prescription: {
      title: "Rx Medicine Label: Lisinopril 10mg",
      category: "Prescription Label",
      summary: [
        { label: "Medication Name", val: "Lisinopril 10 mg (Blood Pressure)" },
        { label: "Dosage Instruction", val: "Take 1 pill by mouth every morning with water" },
        { label: "Refills Remaining", val: "3 Refills before Dec 31, 2026" },
        { label: "Warning", val: "Do not take with potassium supplements without doctor advice" }
      ],
      fullText: "Prescription Number 489102. Patient: Margaret Smith. Doctor: Dr. Robert Vance. Lisinopril ten milligrams tablet. Take one tablet by mouth daily in the morning with a full glass of water. Refills left: three. Store at room temperature away from moisture."
    },
    utility_bill: {
      title: "City Power & Gas Electric Utility Bill",
      category: "Monthly Utility Bill",
      summary: [
        { label: "Total Amount Due", val: "$54.20" },
        { label: "Payment Due Date", val: "September 28, 2026" },
        { label: "Account Number", val: "****-9821" },
        { label: "Status", val: "Autopay Disabled - Action Required" }
      ],
      fullText: "City Power and Water statement for August. Total amount due is fifty-four dollars and twenty cents. Payment due date is September 28. Please pay promptly to avoid late fee. Automatic bill pay is available."
    },
    doctor_letter: {
      title: "Cardiology Clinic Appointment Confirmation",
      category: "Medical Appointment",
      summary: [
        { label: "Doctor Name", val: "Dr. Sarah Lin, MD (Cardiology)" },
        { label: "Appointment Time", val: "Friday, Sept 25th at 10:30 AM" },
        { label: "Location", val: "St. Jude Health Plaza, Suite 402" },
        { label: "Preparation", val: "Fast 2 hours prior to lab blood test" }
      ],
      fullText: "Dear Margaret, this confirms your upcoming checkup with Doctor Sarah Lin on Friday, September 25 at ten thirty AM. Please bring your current medication list and arrive fifteen minutes early."
    },
    newspaper: {
      title: "Senior Daily Gazette - Community News",
      category: "Newspaper Clipping",
      summary: [
        { label: "Main Story", val: "New Golden Gate Park Senior Garden opens this weekend" },
        { label: "Community Event", val: "Free Hearing & Vision Screening on Saturday 1 PM" }
      ],
      fullText: "Golden Gate Park is launching a brand new accessible garden featuring raised flower beds and wide smooth walking paths designed specially for seniors. Free admission for all residents this weekend."
    }
  };

  const currentDoc = sampleDocuments[selectedDocKey];
  const words = currentDoc.fullText.split(' ');

  // Handle synchronized speech with word highlighting simulation
  const handleReadAloud = () => {
    stopSpeaking();
    setIsPlaying(true);
    setActiveWordIndex(0);

    const totalWords = words.length;
    let index = 0;

    // Word highlight interval based on speech rate
    const msPerWord = Math.round((350 / speechRate));
    
    const interval = setInterval(() => {
      index++;
      if (index < totalWords) {
        setActiveWordIndex(index);
      } else {
        clearInterval(interval);
        setActiveWordIndex(-1);
        setIsPlaying(false);
      }
    }, msPerWord);

    speak(currentDoc.fullText, {
      rate: speechRate,
      lang: language,
      onEnd: () => {
        clearInterval(interval);
        setActiveWordIndex(-1);
        setIsPlaying(false);
      }
    });
  };

  const handleStop = () => {
    stopSpeaking();
    setIsPlaying(false);
    setActiveWordIndex(-1);
  };

  return (
    <div className="document-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="glass-card flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="flex-center" style={{ gap: '0.5rem', justifyContent: 'flex-start' }}>
            <FileText className="text-blue" size={32} />
            <h2 style={{ fontSize: 'var(--font-title)', fontWeight: 800, margin: 0 }}>
              Document & Medicine Label Reader
            </h2>
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Scan or select documents, prescription bottles, or bills to listen to clear word-by-word highlighted reading and AI summaries.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex-center" style={{ gap: '0.75rem' }}>
          {isPlaying ? (
            <button className="btn-senior danger" onClick={handleStop}>
              <Pause size={24} />
              <span>Pause Reading</span>
            </button>
          ) : (
            <button className="btn-senior primary" onClick={handleReadAloud}>
              <Play size={24} />
              <span>🔊 Read Aloud with Highlights</span>
            </button>
          )}

          <div className="flex-center" style={{ gap: '0.4rem', background: 'var(--bg-secondary)', padding: '0.4rem 0.75rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Speed:</span>
            <button 
              className={`btn-senior ${speechRate === 0.75 ? 'primary' : ''}`}
              onClick={() => setSpeechRate(0.75)}
              style={{ minHeight: '38px', padding: '0.2rem 0.5rem', fontSize: '0.85rem' }}
            >
              0.75x
            </button>
            <button 
              className={`btn-senior ${speechRate === 0.9 ? 'primary' : ''}`}
              onClick={() => setSpeechRate(0.9)}
              style={{ minHeight: '38px', padding: '0.2rem 0.5rem', fontSize: '0.85rem' }}
            >
              0.9x
            </button>
            <button 
              className={`btn-senior ${speechRate === 1.1 ? 'primary' : ''}`}
              onClick={() => setSpeechRate(1.1)}
              style={{ minHeight: '38px', padding: '0.2rem 0.5rem', fontSize: '0.85rem' }}
            >
              1.1x
            </button>
          </div>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="glass-card" style={{ padding: '1rem 1.5rem' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={20} className="text-amber" />
          <span>Select Document to Read</span>
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {Object.keys(sampleDocuments).map(key => {
            const doc = sampleDocuments[key];
            const isSelected = selectedDocKey === key;
            return (
              <button
                key={key}
                className={`btn-senior ${isSelected ? 'primary' : ''}`}
                onClick={() => {
                  handleStop();
                  setSelectedDocKey(key);
                  playGuidance(`Selected ${doc.title}`);
                }}
                style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
              >
                {doc.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Highlight Reader + AI Summary */}
      <div className="grid-2">
        {/* Synchronized Highlight Text Box */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="flex-between">
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>
              Synchronized Spoken Text
            </h3>
            <span className="badge safe">{currentDoc.category}</span>
          </div>

          <div 
            style={{ 
              background: 'rgba(0,0,0,0.3)', 
              padding: '1.5rem', 
              borderRadius: '14px', 
              border: '2px solid var(--border-color)',
              minHeight: '260px',
              fontSize: '1.35rem',
              lineHeight: 1.8,
              fontFamily: 'Lexend, sans-serif'
            }}
          >
            {words.map((word, idx) => (
              <span 
                key={idx} 
                className={idx === activeWordIndex ? 'word-highlight' : ''}
                style={{ 
                  marginRight: '0.35rem',
                  transition: 'background-color 0.15s ease'
                }}
              >
                {word}
              </span>
            ))}
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0, fontStyle: 'italic' }}>
            💡 Tip: Words highlight in real-time as the spoken voice reads them aloud.
          </p>
        </div>

        {/* AI Key Action Item Summary */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '6px solid var(--accent-blue)' }}>
          <div className="flex-between">
            <div className="flex-center" style={{ gap: '0.5rem' }}>
              <Sparkles className="text-amber" size={26} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>
                AI Executive Summary
              </h3>
            </div>
            <button 
              className="btn-senior teal"
              onClick={() => {
                const summaryText = currentDoc.summary.map(s => `${s.label}: ${s.val}`).join('. ');
                speak(`Document summary: ${summaryText}`);
              }}
              style={{ minHeight: '40px', padding: '0.2rem 0.75rem', fontSize: '0.85rem' }}
            >
              <Volume2 size={18} />
              <span>Read Summary</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentDoc.summary.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: 'rgba(59, 130, 246, 0.1)', 
                  padding: '1rem', 
                  borderRadius: '12px',
                  border: '1px solid rgba(59, 130, 246, 0.3)'
                }}
              >
                <div style={{ fontSize: '0.9rem', color: 'var(--accent-amber)', fontWeight: 800, textTransform: 'uppercase' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '0.2rem' }}>
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
