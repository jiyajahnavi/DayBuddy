import React from 'react';
import { useSenior } from '../context/SeniorContext';
import { 
  Home, 
  Camera, 
  FileText, 
  HelpCircle, 
  ShieldAlert, 
  Activity 
} from 'lucide-react';

export const NavigationTabs = () => {
  const { activeTab, setActiveTab, playGuidance } = useSenior();

  const tabs = [
    { id: 'dashboard', label: 'Home Dashboard', icon: Home, color: 'var(--accent-amber)', voice: "Say 'Home'" },
    { id: 'vision', label: 'Object Scanner', icon: Camera, color: 'var(--accent-teal)', voice: "Say 'Scan Object'" },
    { id: 'document', label: 'Medicine & Bill Reader', icon: FileText, color: 'var(--accent-blue)', voice: "Say 'Read Document'" },
    { id: 'guided', label: 'Guided Assistant', icon: HelpCircle, color: 'var(--accent-purple)', voice: "Say 'Guided Assistant'" },
    { id: 'scam', label: 'Scam & Scam Protection', icon: ShieldAlert, color: 'var(--accent-rose)', voice: "Say 'Check Scam'" },
    { id: 'architecture', label: 'Caregiver & System Health', icon: Activity, color: 'var(--accent-emerald)', voice: "Say 'System Health'" }
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    playGuidance(`Opened ${tab.label}. ${tab.voice}`);
  };

  return (
    <nav className="glass-card" style={{ padding: '0.75rem 1rem' }}>
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '0.75rem' 
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              className={`btn-senior ${isActive ? 'primary' : ''}`}
              onClick={() => handleTabClick(tab)}
              style={{
                flexDirection: 'column',
                gap: '0.4rem',
                minHeight: '74px',
                padding: '0.6rem',
                justifyContent: 'center',
                border: isActive ? `3px solid ${tab.color}` : '2px solid var(--border-color)',
                boxShadow: isActive ? `0 8px 24px rgba(0,0,0,0.3)` : 'none'
              }}
            >
              <div className="flex-center" style={{ gap: '0.5rem' }}>
                <Icon size={24} style={{ color: isActive ? '#000' : tab.color }} />
                <span style={{ fontSize: '1.05rem', fontWeight: 800 }}>{tab.label}</span>
              </div>
              <span style={{ fontSize: '0.75rem', opacity: 0.8, fontStyle: 'italic', fontWeight: 500 }}>
                {tab.voice}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
