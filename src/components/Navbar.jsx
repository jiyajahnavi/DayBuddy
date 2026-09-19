import React, { useState } from 'react';
import { useSenior } from '../context/SeniorContext';
import { HeartHandshake, PhoneCall, Sun, Globe, Volume2, VolumeX, Mic, Play, Settings } from 'lucide-react';

export const Navbar = () => {
  const {
    textSize,
    setTextSize,
    audioGuidance,
    setAudioGuidance,
    language,
    setLanguage,
    availableVoices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    testVoiceSample,
    triggerEmergencySOS,
    speak,
    playGuidance,
    activeTab,
    setActiveTab,
    startListening,
    voiceStatus
  } = useSenior();

  const [showVoiceSettings, setShowVoiceSettings] = useState(false);

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleLangChange = (e) => {
    setLanguage(e.target.value);
    speak(`Language changed to ${e.target.options[e.target.selectedIndex].text}`);
  };

  const handleVoiceChange = (e) => {
    const uri = e.target.value;
    setSelectedVoiceURI(uri);
    testVoiceSample(uri);
  };

  return (
    <header className="flex-between" style={{ padding: '0.25rem 0 1rem 0', gap: '1rem', flexWrap: 'wrap' }}>
      {/* Brand & Tagline */}
      <div 
        className="flex-center" 
        style={{ gap: '0.75rem', cursor: 'pointer' }}
        onClick={() => {
          setActiveTab('dashboard');
          playGuidance("Returned to home dashboard");
        }}
      >
        <div 
          style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            background: '#0D9488',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(13, 148, 136, 0.25)'
          }}
        >
          <HeartHandshake size={26} color="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0D233A', margin: 0, lineHeight: 1.1 }}>
            DayBuddy
          </h1>
        </div>
        <span style={{ color: '#CBD5E1', fontSize: '1.4rem', fontWeight: 300, margin: '0 0.25rem' }}>|</span>
        <span style={{ fontSize: '0.95rem', color: '#52657A', fontWeight: 500 }}>
          Your daily support, always <span style={{ color: '#0D9488' }}>💚</span>
        </span>
      </div>

      {/* Right Header Tools */}
      <div className="flex-center" style={{ gap: '1rem', flexWrap: 'wrap' }}>
        {/* Date & Weather */}
        <div className="flex-center" style={{ gap: '0.4rem', fontSize: '0.95rem', color: '#52657A', fontWeight: 600 }}>
          <Sun size={20} style={{ color: '#F59E0B' }} />
          <span>{currentDateStr}</span>
        </div>

        <span style={{ color: '#E2E8E4' }}>|</span>

        {/* Mic Speech Button */}
        <button 
          className="btn-pill"
          onClick={startListening}
          style={{ background: voiceStatus === 'listening' ? '#CCFBF1' : '#FFFFFF', borderColor: '#0D9488' }}
          title="Tap to Speak Voice Command"
        >
          <Mic size={18} style={{ color: '#0D9488' }} />
          <span style={{ fontSize: '0.9rem', color: '#0D233A' }}>
            {voiceStatus === 'listening' ? 'Listening...' : 'Voice Command'}
          </span>
        </button>

        {/* AI Voice Persona Selector */}
        <div className="flex-center" style={{ gap: '0.4rem' }}>
          <button 
            className="btn-pill"
            onClick={() => setShowVoiceSettings(!showVoiceSettings)}
            style={{ 
              borderColor: '#0D9488', 
              background: showVoiceSettings ? '#E6F4F1' : '#FFFFFF',
              color: '#0D9488',
              fontWeight: 700,
              fontSize: '0.9rem'
            }}
            title="Change AI Voice Persona"
          >
            <Volume2 size={18} />
            <span>AI Voice</span>
          </button>
        </div>

        {/* Voice Selector Dropdown (when toggled or visible) */}
        {showVoiceSettings && (
          <div 
            className="card-clean" 
            style={{ 
              position: 'absolute', 
              top: '70px', 
              right: '180px', 
              zIndex: 100, 
              width: '320px', 
              background: '#FFFFFF',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              padding: '1rem'
            }}
          >
            <div className="flex-between">
              <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0D233A' }}>Select AI Voice</span>
              <button 
                onClick={() => testVoiceSample(selectedVoiceURI)}
                className="btn-pill"
                style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem', background: '#E6F4F1', color: '#0D9488' }}
              >
                <Play size={14} /> Test
              </button>
            </div>

            <select 
              value={selectedVoiceURI} 
              onChange={handleVoiceChange}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                borderRadius: '8px', 
                border: '1px solid #CBD5E1',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#0D233A'
              }}
            >
              {availableVoices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Select your favorite clear, natural sounding human voice.
            </span>
          </div>
        )}

        {/* Language Selector */}
        <div className="flex-center" style={{ position: 'relative' }}>
          <select 
            value={language}
            onChange={handleLangChange}
            className="btn-pill"
            style={{ 
              paddingRight: '1.75rem', 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#0D233A',
              appearance: 'auto'
            }}
          >
            <option value="en-US">🌐 English</option>
            <option value="es-ES">🌐 Español</option>
            <option value="hi-IN">🌐 Hindi (हिंदी)</option>
            <option value="fr-FR">🌐 Français</option>
            <option value="de-DE">🌐 Deutsch</option>
          </select>
        </div>

        {/* Font Size Selector */}
        <div className="flex-center" style={{ gap: '0.4rem' }}>
          <button 
            className="btn-pill" 
            onClick={() => { setTextSize('normal'); playGuidance("Normal text size selected"); }}
            style={{ 
              minHeight: '38px', 
              padding: '0.2rem 0.6rem', 
              fontSize: '0.9rem',
              fontWeight: textSize === 'normal' ? 800 : 500,
              background: textSize === 'normal' ? '#E6F4F1' : '#FFFFFF',
              borderColor: textSize === 'normal' ? '#0D9488' : '#E2E8E4'
            }}
          >
            A
          </button>
          <button 
            className="btn-pill" 
            onClick={() => { setTextSize('large'); playGuidance("Large text size selected"); }}
            style={{ 
              minHeight: '38px', 
              padding: '0.2rem 0.6rem', 
              fontSize: '1rem',
              fontWeight: textSize === 'large' ? 800 : 600,
              background: textSize === 'large' ? '#E6F4F1' : '#FFFFFF',
              borderColor: textSize === 'large' ? '#0D9488' : '#E2E8E4'
            }}
          >
            A+
          </button>
        </div>

        {/* Emergency SOS Pill Button */}
        <button 
          className="btn-pill sos"
          onClick={triggerEmergencySOS}
          style={{ minHeight: '44px', padding: '0.5rem 1.25rem' }}
        >
          <PhoneCall size={18} />
          <span>SOS</span>
        </button>
      </div>
    </header>
  );
};
