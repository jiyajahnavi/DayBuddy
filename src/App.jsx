import React from 'react';
import { SeniorProvider, useSenior } from './context/SeniorContext';
import { Navbar } from './components/Navbar';
import { NavigationTabs } from './components/NavigationTabs';
import { HeroDashboard } from './components/HeroDashboard';
import { VisionDetector } from './components/VisionDetector';
import { DocumentReader } from './components/DocumentReader';
import { GuidedAssistant } from './components/GuidedAssistant';
import { ScamDetector } from './components/ScamDetector';
import { ArchitectureMonitor } from './components/ArchitectureMonitor';
import { EmergencyModal } from './components/EmergencyModal';
import { Heart, Volume2, ShieldCheck, Sparkles } from 'lucide-react';

const MainAppContent = () => {
  const { activeTab, recognizedText, lastSpokenText, voiceStatus } = useSenior();

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Navigation Tabs */}
      <NavigationTabs />

      {/* Recognized Voice Command Banner */}
      {(recognizedText || voiceStatus === 'speaking') && (
        <div 
          className="glass-card flex-between" 
          style={{ 
            padding: '0.75rem 1.25rem', 
            background: 'rgba(56, 189, 248, 0.12)', 
            border: '1px solid var(--accent-blue)',
            borderRadius: '12px'
          }}
        >
          <div className="flex-center" style={{ gap: '0.5rem' }}>
            <Volume2 className="text-teal" size={22} />
            <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>
              {voiceStatus === 'speaking' 
                ? `DayBuddy Speaking: "${lastSpokenText}"` 
                : `Voice Input Heard: "${recognizedText}"`}
            </span>
          </div>
          <span className="badge safe">Voice Active</span>
        </div>
      )}

      {/* Active Tab View */}
      <main className="main-content">
        {activeTab === 'dashboard' && <HeroDashboard />}
        {activeTab === 'vision' && <VisionDetector />}
        {activeTab === 'document' && <DocumentReader />}
        {activeTab === 'guided' && <GuidedAssistant />}
        {activeTab === 'scam' && <ScamDetector />}
        {activeTab === 'architecture' && <ArchitectureMonitor />}
      </main>

      {/* Emergency SOS Modal Layer */}
      <EmergencyModal />

      {/* Footer */}
      <footer 
        className="glass-card flex-between" 
        style={{ 
          marginTop: '2rem', 
          padding: '1.25rem 1.75rem', 
          flexWrap: 'wrap', 
          gap: '1rem',
          fontSize: '0.95rem',
          color: 'var(--text-muted)'
        }}
      >
        <div className="flex-center" style={{ gap: '0.5rem' }}>
          <Heart className="text-rose" size={20} />
          <span>DayBuddy AI - Engineered with Care & High Accessibility for Senior Citizens</span>
        </div>

        <div className="flex-center" style={{ gap: '1rem' }}>
          <span className="badge safe">
            <ShieldCheck size={16} /> AAA Contrast Compliant
          </span>
          <span>Voice First GenAI Engine</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <SeniorProvider>
      <MainAppContent />
    </SeniorProvider>
  );
}
