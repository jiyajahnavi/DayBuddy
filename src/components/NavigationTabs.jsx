import React from 'react';
import { useSenior } from '../context/SeniorContext';
import { 
  ArrowLeft,
  Home, 
  Camera, 
  FileText, 
  HelpCircle, 
  ShieldCheck, 
  Activity 
} from 'lucide-react';

export const NavigationTabs = () => {
  const { activeTab, setActiveTab, playGuidance } = useSenior();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: '#0D9488' },
    { id: 'vision', label: 'Object Scanner', icon: Camera, color: '#0D9488' },
    { id: 'document', label: 'Medicine & Bill Reader', icon: FileText, color: '#2563EB' },
    { id: 'guided', label: 'Guided Assistant', icon: HelpCircle, color: '#7C3AED' },
    { id: 'scam', label: 'Scam Protection', icon: ShieldCheck, color: '#DC2626' },
    { id: 'architecture', label: 'Caregiver & System Health', icon: Activity, color: '#059669' }
  ];

  if (activeTab === 'dashboard') {
    return null; // The Hero Dashboard contains all quick action tiles visually matching the mockup!
  }

  const activeTabObj = tabs.find(t => t.id === activeTab);

  return (
    <div 
      className="card-clean flex-between" 
      style={{ 
        padding: '0.85rem 1.25rem', 
        background: '#FFFFFF', 
        borderRadius: '16px',
        marginBottom: '0.5rem',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}
    >
      {/* Back to Dashboard Button */}
      <button
        className="btn-pill"
        onClick={() => {
          setActiveTab('dashboard');
          playGuidance("Returned to main dashboard");
        }}
        style={{ borderColor: '#0D9488', color: '#0D233A', fontWeight: 700 }}
      >
        <ArrowLeft size={20} style={{ color: '#0D9488' }} />
        <span>← Back to Dashboard</span>
      </button>

      {/* Sub-module Navigation Pills */}
      <div className="flex-center" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              className="btn-pill"
              onClick={() => {
                setActiveTab(tab.id);
                playGuidance(`Opened ${tab.label}`);
              }}
              style={{
                fontSize: '0.88rem',
                minHeight: '40px',
                padding: '0.35rem 0.85rem',
                background: isActive ? '#E6F4F1' : '#FFFFFF',
                borderColor: isActive ? '#0D9488' : '#E2E8E4',
                color: isActive ? '#0D9488' : '#52657A',
                fontWeight: isActive ? 800 : 500
              }}
            >
              <Icon size={16} style={{ color: isActive ? '#0D9488' : tab.color }} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
