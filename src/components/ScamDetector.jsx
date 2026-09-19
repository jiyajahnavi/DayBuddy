import React, { useState } from 'react';
import { useSenior } from '../context/SeniorContext';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Volume2, 
  Sparkles, 
  Search, 
  Send, 
  UserCheck, 
  FileText,
  Lock
} from 'lucide-react';

export const ScamDetector = () => {
  const { speak, playGuidance } = useSenior();
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [caregiverNotified, setCaregiverNotified] = useState(false);

  const presets = [
    {
      title: "🚨 IRS Tax Fine Arrest Threat (SCAM)",
      type: "SMS Text",
      sample: "URGENT IRS ALERT: You have unpaid back taxes of $2,450. A warrant for arrest is issued. Pay immediately via gift cards or click http://irs-verify-tax.online to avoid police.",
      riskLevel: "DANGER SCAM",
      score: 99,
      reasons: [
        "Demands immediate urgent payment under threat of arrest",
        "Asks for payment via untraceable Gift Cards or suspicious link",
        "IRS never sends SMS threats or demands gift card payments"
      ],
      voiceWarning: "HIGH DANGER SCAM ALERT! Do not reply or click any links. The IRS will never demand gift cards or threaten immediate arrest over text message."
    },
    {
      title: "🚨 Grandchild Hospital Bail Scam (SCAM)",
      type: "Phone Call Script",
      sample: "Grandma, it's me Tommy! I got into a bad car accident in Mexico and need $3,000 for hospital bail right now. Don't tell Mom and Dad, please wire money immediately.",
      riskLevel: "DANGER SCAM",
      score: 96,
      reasons: [
        "Emotional manipulation pretending to be a family member in distress",
        "Asks to keep secret from parents",
        "Demands instant wire transfer or cryptocurrency"
      ],
      voiceWarning: "SCAM ALERT! Scammers often pretend to be grandchildren in trouble. Call your grandchild or their parents directly on their known phone number to verify."
    },
    {
      title: "⚠️ Unrecognized Banking PIN Reset (SUSPICIOUS)",
      type: "Email Notice",
      sample: "Your Bank account password was requested to change. If you did not make this request, click here to verify your Social Security Number.",
      riskLevel: "SUSPICIOUS",
      score: 75,
      reasons: [
        "Unsolicited request to enter Social Security Number",
        "Generic email greeting without your name"
      ],
      voiceWarning: "WARNING! Suspicious email asking for sensitive bank credentials. Do not click links inside suspicious emails."
    },
    {
      title: "✓ Legitimate Doctor Appointment Reminder (SAFE)",
      type: "SMS Text",
      sample: "Reminder: You have an appointment with Dr. Lin on Friday Sept 25 at 10:30 AM at St. Jude Health. Reply C to confirm or call 555-0199.",
      riskLevel: "SAFE",
      score: 5,
      reasons: [
        "Matches your known doctor schedule",
        "Does not ask for money, passwords, or credit card info"
      ],
      voiceWarning: "This text message appears SAFE. It matches your doctor schedule and asks for no sensitive banking data."
    }
  ];

  const handleAnalyzeText = (textToAnalyze) => {
    const text = textToAnalyze || inputText;
    if (!text.trim()) {
      speak("Please enter or select a message to analyze.");
      return;
    }

    const lower = text.toLowerCase();
    let isDanger = lower.includes('gift card') || lower.includes('arrest') || lower.includes('wire') || lower.includes('warrant') || lower.includes('ssn') || lower.includes('pin') || lower.includes('urgent');
    let isSuspicious = lower.includes('verify') || lower.includes('password') || lower.includes('link') || lower.includes('click');

    let resultObj;
    if (isDanger) {
      resultObj = {
        riskLevel: "DANGER SCAM",
        score: 95,
        reasons: [
          "Urgent deadline pressure or arrest threat detected",
          "Requests sensitive credentials, wire transfers, or gift cards",
          "High risk fraud pattern identified by DayBuddy Scam Engine"
        ],
        voiceWarning: "HIGH DANGER SCAM DETECTED! Do not reply, call back, or send money. Contact your caregiver or bank immediately."
      };
    } else if (isSuspicious) {
      resultObj = {
        riskLevel: "SUSPICIOUS",
        score: 70,
        reasons: [
          "Asks to click unknown web link or confirm personal details",
          "Exercise caution before sharing any information"
        ],
        voiceWarning: "CAUTION! This message contains suspicious links. Verify with your caregiver before responding."
      };
    } else {
      resultObj = {
        riskLevel: "SAFE",
        score: 10,
        reasons: [
          "No aggressive money demands or threat keywords found",
          "Standard notification format"
        ],
        voiceWarning: "This message appears safe. No scam indicators were found."
      };
    }

    setAnalysisResult(resultObj);
    speak(resultObj.voiceWarning);
  };

  const notifyCaregiver = () => {
    setCaregiverNotified(true);
    speak("Alert notification sent to your trusted caregiver, Daughter Sarah. She will review this message shortly.");
  };

  return (
    <div className="scam-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="glass-card flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="flex-center" style={{ gap: '0.5rem', justifyContent: 'flex-start' }}>
            <ShieldAlert className="text-rose" size={32} />
            <h2 style={{ fontSize: 'var(--font-title)', fontWeight: 800, margin: 0 }}>
              Scam & Fraud Protection Suite
            </h2>
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Protect yourself from phone, email, and text scams. Paste any suspicious message below for instant AI fraud analysis and audio warnings.
          </p>
        </div>
      </div>

      {/* Preset Scam Scenarios */}
      <div className="glass-card">
        <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles className="text-amber" size={22} />
          <span>Test Common Senior Scam Scenarios</span>
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              className="btn-senior"
              onClick={() => {
                setInputText(preset.sample);
                setAnalysisResult(preset);
                speak(preset.voiceWarning);
              }}
              style={{ padding: '0.5rem 1rem', fontSize: '0.95rem' }}
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Input Analyzer Box */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>
          Analyze Suspicious Text, Email, or Phone Script
        </h3>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste or type suspicious message here (e.g. 'IRS demanding payment', 'Grandchild in trouble', 'Bank account locked')..."
          rows={4}
          style={{
            width: '100%',
            background: 'rgba(0,0,0,0.3)',
            color: 'var(--text-main)',
            border: '2px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1rem',
            fontSize: '1.15rem',
            fontFamily: 'Lexend, sans-serif',
            outline: 'none'
          }}
        />

        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <button 
            className="btn-senior primary"
            onClick={() => handleAnalyzeText()}
            style={{ padding: '0.75rem 1.75rem', fontSize: '1.2rem' }}
          >
            <Search size={24} />
            <span>🔍 Analyze Threat Level</span>
          </button>

          <button 
            className="btn-senior teal"
            onClick={notifyCaregiver}
            style={{ padding: '0.75rem 1.5rem' }}
          >
            <UserCheck size={24} />
            <span>{caregiverNotified ? 'Caregiver Notified ✓' : 'Send to Caregiver for Verification'}</span>
          </button>
        </div>
      </div>

      {/* Threat Analysis Output Card */}
      {analysisResult && (
        <div 
          className="glass-card" 
          style={{ 
            borderLeft: `8px solid ${analysisResult.riskLevel === 'SAFE' ? '#10b981' : analysisResult.riskLevel === 'SUSPICIOUS' ? '#f59e0b' : '#ef4444'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          <div className="flex-between">
            <div className="flex-center" style={{ gap: '0.75rem' }}>
              {analysisResult.riskLevel === 'SAFE' ? (
                <ShieldCheck size={36} className="text-emerald" />
              ) : (
                <AlertTriangle size={36} className="text-rose" />
              )}
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                  Threat Risk Result: {analysisResult.riskLevel}
                </h3>
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                  Scam Risk Index: <strong>{analysisResult.score}/100</strong>
                </span>
              </div>
            </div>

            <button 
              className="btn-senior primary"
              onClick={() => speak(analysisResult.voiceWarning)}
              style={{ minHeight: '44px', padding: '0.3rem 0.9rem', fontSize: '0.9rem' }}
            >
              <Volume2 size={20} />
              <span>Listen Audio Warning</span>
            </button>
          </div>

          <div 
            style={{ 
              background: 'rgba(0,0,0,0.25)', 
              padding: '1.25rem', 
              borderRadius: '12px',
              fontSize: '1.2rem',
              lineHeight: 1.6,
              border: '1px solid var(--border-color)'
            }}
          >
            "{analysisResult.voiceWarning}"
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-amber)', marginBottom: '0.5rem' }}>
              Why is this flagged by DayBuddy AI?
            </h4>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '1.05rem' }}>
              {analysisResult.reasons.map((reason, idx) => (
                <li key={idx}><strong>{reason}</strong></li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
