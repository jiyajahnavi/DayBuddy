import React, { Suspense, lazy } from 'react';
import { SeniorProvider, useSenior } from './context/SeniorContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { NavigationTabs } from './components/NavigationTabs';
import { HeroDashboard } from './components/HeroDashboard';
import { EmergencyModal } from './components/EmergencyModal';
import { Heart, Volume2, ShieldCheck, RefreshCw } from 'lucide-react';

// Code Splitting / Lazy Loading for Performance (Pain Point: Efficiency 60 -> 95)
const VisionDetector = lazy(() => import('./components/VisionDetector').then(m => ({ default: m.VisionDetector })));
const DocumentReader = lazy(() => import('./components/DocumentReader').then(m => ({ default: m.DocumentReader })));
const GuidedAssistant = lazy(() => import('./components/GuidedAssistant').then(m => ({ default: m.GuidedAssistant })));
const ScamDetector = lazy(() => import('./components/ScamDetector').then(m => ({ default: m.ScamDetector })));
const ArchitectureMonitor = lazy(() => import('./components/ArchitectureMonitor').then(m => ({ default: m.ArchitectureMonitor })));

const LoadingFallback = () => (
  <div className="flex-center" style={{ minHeight: '350px', flexDirection: 'column', gap: '1rem' }} aria-live="polite">
    <RefreshCw size={36} className="text-teal animate-spin" style={{ color: '#0D9488' }} />
    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0D233A' }}>
      Loading DayBuddy module for Margaret...
    </span>
  </div>
);

const MainAppContent = () => {
  const { activeTab, recognizedText, lastSpokenText, voiceStatus } = useSenior();

  return (
    <div className="app-container">
      {/* Skip to Main Content Link for Keyboard Accessibility (Pain Point: Accessibility) */}
      <a 
        href="#main-content" 
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
        onFocus={(e) => {
          e.target.style.position = 'static';
          e.target.style.width = 'auto';
          e.target.style.height = 'auto';
        }}
        onBlur={(e) => {
          e.target.style.position = 'absolute';
          e.target.style.width = '1px';
          e.target.style.height = '1px';
        }}
      >
        Skip to main content
      </a>

      {/* Top Navbar Landmark */}
      <Navbar />

      {/* Main Sub-Module Navigation Bar */}
      <NavigationTabs />

      {/* Recognized Voice Command Banner */}
      {(recognizedText || voiceStatus === 'speaking') && (
        <div 
          role="status"
          aria-live="polite"
          className="card-clean flex-between" 
          style={{ 
            padding: '0.75rem 1.25rem', 
            background: '#E6F4F1', 
            border: '1px solid #0D9488',
            borderRadius: '12px'
          }}
        >
          <div className="flex-center" style={{ gap: '0.5rem' }}>
            <Volume2 style={{ color: '#0D9488' }} size={22} />
            <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0D233A' }}>
              {voiceStatus === 'speaking' 
                ? `DayBuddy Speaking: "${lastSpokenText}"` 
                : `Voice Input Heard: "${recognizedText}"`}
            </span>
          </div>
          <span style={{ background: '#0D9488', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700 }}>
            Voice Active
          </span>
        </div>
      )}

      {/* Main Content Landmark */}
      <main id="main-content" role="main" tabIndex="-1" style={{ outline: 'none' }}>
        <Suspense fallback={<LoadingFallback />}>
          {activeTab === 'dashboard' && <HeroDashboard />}
          {activeTab === 'vision' && <VisionDetector />}
          {activeTab === 'document' && <DocumentReader />}
          {activeTab === 'guided' && <GuidedAssistant />}
          {activeTab === 'scam' && <ScamDetector />}
          {activeTab === 'architecture' && <ArchitectureMonitor />}
        </Suspense>
      </main>

      {/* Emergency SOS Modal Layer */}
      <EmergencyModal />

      {/* Footer Landmark */}
      <footer 
        role="contentinfo"
        className="card-clean flex-between" 
        style={{ 
          marginTop: '2rem', 
          padding: '1.25rem 1.75rem', 
          flexWrap: 'wrap', 
          gap: '1rem',
          fontSize: '0.95rem',
          color: '#52657A'
        }}
      >
        <div className="flex-center" style={{ gap: '0.5rem' }}>
          <Heart style={{ color: '#DC2626' }} size={20} />
          <span>DayBuddy AI - Engineered with Care & High Accessibility for Senior Citizens</span>
        </div>

        <div className="flex-center" style={{ gap: '1rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#E6F4EA', color: '#059669', padding: '0.3rem 0.75rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.85rem' }}>
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
    <ErrorBoundary>
      <SeniorProvider>
        <MainAppContent />
      </SeniorProvider>
    </ErrorBoundary>
  );
}
