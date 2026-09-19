import React from 'react';
import { useSenior } from '../context/SeniorContext';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  Sun, 
  Moon, 
  Contrast, 
  Globe, 
  Sparkles,
  Type
} from 'lucide-react';

export const Navbar = () => {
  const {
    textSize,
    setTextSize,
    theme,
    setTheme,
    audioGuidance,
    setAudioGuidance,
    language,
    setLanguage,
    voiceStatus,
    startListening,
    triggerEmergencySOS,
    playGuidance,
    speak
  } = useSenior();

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    speak(`Language changed to ${e.target.options[e.target.selectedIndex].text}`);
  };

  return (
    <header className="glass-card flex-between" style={{ padding: '1.25rem 1.75rem', gap: '1rem', flexWrap: 'wrap' }}>
      {/* Brand Identity */}
      <div className="flex-center" style={{ gap: '1rem' }}>
        <div 
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #f59e0b, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)'
          }}
        >
          <Sparkles size={32} color="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: 'var(--font-title)', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            DayBuddy <span className="text-amber">AI</span>
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>
            Senior Voice & Vision Companion
          </p>
        </div>
      </div>

      {/* Voice Assistant Controls & Wave Status */}
      <div className="flex-center" style={{ gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
        <button 
          className={`btn-senior ${voiceStatus === 'listening' ? 'teal' : 'primary'}`}
          onClick={startListening}
          aria-label="Tap to speak voice command"
          title="Voice Assistant - Click or Say commands"
          style={{ minWidth: '160px' }}
        >
          {voiceStatus === 'listening' ? (
            <>
              <Mic size={24} className="animate-pulse" />
              <span>Listening...</span>
            </>
          ) : voiceStatus === 'speaking' ? (
            <>
              <Volume2 size={24} />
              <span>Speaking...</span>
            </>
          ) : (
            <>
              <Mic size={24} />
              <span>Tap to Speak</span>
            </>
          )}
        </button>

        {/* Animated Wave visual indicator when active */}
        {voiceStatus !== 'idle' && (
          <div className="voice-wave" aria-label="Voice Activity Waveform">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      {/* Senior Accessibility Toolbar */}
      <div className="flex-center" style={{ gap: '0.75rem', flexWrap: 'wrap' }}>
        {/* Spoken Guidance Toggle */}
        <button 
          className="btn-senior"
          onClick={() => {
            const next = !audioGuidance;
            setAudioGuidance(next);
            if (next) speak("Audio spoken guidance enabled");
          }}
          title="Toggle Spoken Audio Guidance"
          style={{ padding: '0.5rem 1rem', minHeight: '50px' }}
        >
          {audioGuidance ? <Volume2 size={22} className="text-teal" /> : <VolumeX size={22} className="text-muted" />}
          <span style={{ fontSize: '0.9rem' }}>{audioGuidance ? 'Audio ON' : 'Audio OFF'}</span>
        </button>

        {/* Font Size Switcher */}
        <div className="flex-center" style={{ gap: '4px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <button 
            className={`btn-senior ${textSize === 'normal' ? 'primary' : ''}`}
            onClick={() => { setTextSize('normal'); playGuidance("Normal text size selected"); }}
            style={{ minHeight: '44px', padding: '0.3rem 0.75rem', fontSize: '0.9rem' }}
            title="Normal Font Size"
          >
            Aa
          </button>
          <button 
            className={`btn-senior ${textSize === 'large' ? 'primary' : ''}`}
            onClick={() => { setTextSize('large'); playGuidance("Large text size selected"); }}
            style={{ minHeight: '44px', padding: '0.3rem 0.75rem', fontSize: '1.1rem', fontWeight: 800 }}
            title="Large Font Size (Recommended)"
          >
            A+
          </button>
          <button 
            className={`btn-senior ${textSize === 'xlarge' ? 'primary' : ''}`}
            onClick={() => { setTextSize('xlarge'); playGuidance("Extra Large text size selected"); }}
            style={{ minHeight: '44px', padding: '0.3rem 0.75rem', fontSize: '1.3rem', fontWeight: 900 }}
            title="Extra Large Font Size"
          >
            A++
          </button>
        </div>

        {/* Contrast Theme Switcher */}
        <div className="flex-center" style={{ gap: '4px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <button 
            className={`btn-senior ${theme === 'dark' ? 'primary' : ''}`}
            onClick={() => { setTheme('dark'); playGuidance("Dark Glass theme active"); }}
            style={{ minHeight: '44px', padding: '0.3rem 0.6rem' }}
            title="Dark Glass Mode"
          >
            <Moon size={18} />
          </button>
          <button 
            className={`btn-senior ${theme === 'warm' ? 'primary' : ''}`}
            onClick={() => { setTheme('warm'); playGuidance("Warm Amber theme active"); }}
            style={{ minHeight: '44px', padding: '0.3rem 0.6rem' }}
            title="Warm Soothing Amber Mode"
          >
            <Sun size={18} />
          </button>
          <button 
            className={`btn-senior ${theme === 'contrast' ? 'primary' : ''}`}
            onClick={() => { setTheme('contrast'); playGuidance("High Contrast Mode active"); }}
            style={{ minHeight: '44px', padding: '0.3rem 0.6rem' }}
            title="High Contrast Yellow & Black Mode"
          >
            <Contrast size={18} />
          </button>
        </div>

        {/* Spoken Language Dropdown */}
        <div className="flex-center" style={{ gap: '0.4rem', background: 'var(--bg-secondary)', padding: '0.4rem 0.75rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <Globe size={20} className="text-amber" />
          <select 
            value={language}
            onChange={handleLanguageChange}
            style={{ 
              background: 'transparent', 
              color: 'var(--text-main)', 
              border: 'none', 
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              outline: 'none'
            }}
            aria-label="Select voice spoken language"
          >
            <option value="en-US" style={{ background: '#1e293b' }}>English (US)</option>
            <option value="es-ES" style={{ background: '#1e293b' }}>Español (Spanish)</option>
            <option value="hi-IN" style={{ background: '#1e293b' }}>Hindi (हिंदी)</option>
            <option value="fr-FR" style={{ background: '#1e293b' }}>Français (French)</option>
            <option value="de-DE" style={{ background: '#1e293b' }}>Deutsch (German)</option>
          </select>
        </div>

        {/* Emergency SOS Button */}
        <button 
          className="btn-senior danger"
          onClick={triggerEmergencySOS}
          style={{ minHeight: '52px', padding: '0.5rem 1.25rem', animation: 'pulse 2s infinite' }}
          title="Click for Emergency Help"
        >
          <AlertTriangle size={24} />
          <span>SOS HELP</span>
        </button>
      </div>
    </header>
  );
};
