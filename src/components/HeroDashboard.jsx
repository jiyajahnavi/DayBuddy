import React, { useState } from 'react';
import { useSenior } from '../context/SeniorContext';
import { 
  Sun, 
  Pill, 
  Newspaper, 
  Heart, 
  Volume2, 
  Camera, 
  FileText, 
  PhoneCall, 
  ShieldCheck, 
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const HeroDashboard = () => {
  const { setActiveTab, speak, playGuidance } = useSenior();
  const [isPlayingBriefing, setIsPlayingBriefing] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const dailyBriefingText = "Good morning! Today is " + currentDate + ". Weather is seventy-two degrees and sunny. Remember your eye drops at two P M. Today's uplifting thought: Every day brings new light and joy.";

  const playDailyBriefing = () => {
    setIsPlayingBriefing(true);
    speak(dailyBriefingText, {
      onEnd: () => setIsPlayingBriefing(false)
    });
  };

  const voiceActions = [
    { title: "Scan Medicine & Objects", desc: "Hold up pill bottle or items to camera", icon: Camera, color: "#14b8a6", tab: "vision", voiceHint: "Say 'Scan Medicine'" },
    { title: "Read Documents & Mail", desc: "Read newspapers, bills & letters out loud", icon: FileText, color: "#3b82f6", tab: "document", voiceHint: "Say 'Read Document'" },
    { title: "Guided Phone & Payment Help", desc: "Step-by-step assistance for call & bills", icon: PhoneCall, color: "#a855f7", tab: "guided", voiceHint: "Say 'Call Help'" },
    { title: "Check Scam Messages", desc: "Scan suspicious text messages or phone calls", icon: ShieldCheck, color: "#f43f5e", tab: "scam", voiceHint: "Say 'Check Scam'" },
  ];

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Hero Greeting Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(59, 130, 246, 0.15))', border: '2px solid rgba(245, 158, 11, 0.4)' }}>
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="flex-center" style={{ gap: '0.5rem', justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
              <Clock className="text-amber" size={24} />
              <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 600 }}>{currentDate}</span>
            </div>
            <h2 style={{ fontSize: 'var(--font-hero)', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
              Hello, Margaret! 👋
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '0.4rem', maxWidth: '700px' }}>
              DayBuddy AI is active and monitoring your daily health, schedule, and safety. What would you like to do today?
            </p>
          </div>

          <button 
            className="btn-senior primary"
            onClick={playDailyBriefing}
            style={{ padding: '1rem 1.75rem', minHeight: '66px', fontSize: '1.2rem' }}
          >
            <Volume2 size={28} className={isPlayingBriefing ? 'animate-bounce' : ''} />
            <span>{isPlayingBriefing ? 'Playing Briefing...' : '🔊 Play Morning Audio Briefing'}</span>
          </button>
        </div>
      </div>

      {/* Quick Voice Action Cards */}
      <div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles className="text-amber" size={24} />
          <span>Quick Voice Action Cards</span>
          <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 500 }}>(Tap or speak commands)</span>
        </h3>

        <div className="grid-2">
          {voiceActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <div 
                key={idx} 
                className="glass-card" 
                onClick={() => {
                  setActiveTab(action.tab);
                  playGuidance(`Opening ${action.title}.`);
                }}
                style={{ 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  borderLeft: `6px solid ${action.color}`,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div 
                  style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '16px', 
                    background: `${action.color}22`,
                    border: `2px solid ${action.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={36} style={{ color: action.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="flex-between" style={{ gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{action.title}</h4>
                    <span className="badge warning">{action.voiceHint}</span>
                  </div>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', margin: '0.3rem 0 0 0' }}>
                    {action.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Briefing Widgets Grid */}
      <div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>
          Your Daily Briefing & Health Schedule
        </h3>

        <div className="grid-3">
          {/* Weather Widget */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="flex-between">
              <div className="flex-center" style={{ gap: '0.5rem' }}>
                <Sun size={28} className="text-amber" />
                <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>Weather Forecast</span>
              </div>
              <span className="badge safe">Mild & Sunny</span>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
              72°F <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>San Francisco, CA</span>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: 0 }}>
              Low UV index today. Perfect weather for an afternoon stroll or watering your patio plants.
            </p>
          </div>

          {/* Medicine Schedule Alert Widget */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="flex-between">
              <div className="flex-center" style={{ gap: '0.5rem' }}>
                <Pill size={28} className="text-teal" />
                <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>Medicine Schedule</span>
              </div>
              <span className="badge safe">1 Remainder</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
              <div className="flex-between" style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.5rem 0.75rem', borderRadius: '10px', border: '1px solid #10b981' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>8:00 AM - Blood Pressure Pill</span>
                <CheckCircle2 size={20} className="text-emerald" />
              </div>
              <div className="flex-between" style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '0.5rem 0.75rem', borderRadius: '10px', border: '1px solid #f59e0b' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>2:00 PM - Eye Drops (1 drop)</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-amber)' }}>Due in 3h</span>
              </div>
            </div>
          </div>

          {/* News & Gratitude Quote Widget */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="flex-between">
              <div className="flex-center" style={{ gap: '0.5rem' }}>
                <Newspaper size={28} className="text-blue" />
                <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>Senior News & Quote</span>
              </div>
              <Heart size={24} className="text-rose" />
            </div>
            <p style={{ fontSize: '1.05rem', fontStyle: 'italic', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '10px', borderLeft: '4px solid var(--accent-blue)', margin: 0 }}>
              "Kind words can be short and easy to speak, but their echoes are truly endless."
            </p>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              <strong>Today's Highlight:</strong> Local community center hosting afternoon chair yoga & tea social at 3:00 PM.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
