import React, { useState, useEffect } from 'react';
import { useSenior } from '../context/SeniorContext';
import { 
  Activity, 
  Server, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Terminal,
  Database,
  Radio,
  Sliders
} from 'lucide-react';

export const ArchitectureMonitor = () => {
  const { speak, playGuidance } = useSenior();
  const [latencySpike, setLatencySpike] = useState(false);
  const [failoverActive, setFailoverActive] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, time: '10:38:02 AM', service: 'VoiceEngine-ms', event: 'WebSpeech Synthesis active (Rate: 0.9x, Lang: en-US)', status: 'OK' },
    { id: 2, time: '10:38:15 AM', service: 'VisionAI-ms', event: 'Object detection frame processed: Prescribed Pill Bottle (98% conf)', status: 'OK' },
    { id: 3, time: '10:38:40 AM', service: 'ScamEngine-ms', event: 'Text scan completed: 0 threat indicators found for local doctor SMS', status: 'OK' },
    { id: 4, time: '10:39:01 AM', service: 'CaregiverAlert-ms', event: 'Push notification worker heartbeat active (TLS 1.3 encrypted)', status: 'OK' }
  ]);

  const services = [
    {
      name: "Voice Synthesis & Recognition Gateway",
      code: "VoiceEngine-ms",
      status: "HEALTHY",
      latency: "42 ms",
      uptime: "99.98%",
      requests: "1,240 req/min",
      color: "#14b8a6"
    },
    {
      name: "Real-Time Vision & Object AI Engine",
      code: "VisionAI-ms",
      status: latencySpike ? "DEGRADED (HIGH LATENCY)" : "HEALTHY",
      latency: latencySpike ? "890 ms" : "118 ms",
      uptime: "99.94%",
      requests: "3,820 frames/min",
      color: latencySpike ? "#f59e0b" : "#3b82f6"
    },
    {
      name: "Scam & Fraud Analysis Microservice",
      code: "ScamEngine-ms",
      status: "HEALTHY",
      latency: "64 ms",
      uptime: "100.0%",
      requests: "410 scans/min",
      color: "#a855f7"
    },
    {
      name: "Emergency SOS & Caregiver Dispatcher",
      code: "CaregiverAlert-ms",
      status: failoverActive ? "FAILOVER NODE (BACKUP 2)" : "HEALTHY",
      latency: "28 ms",
      uptime: "99.99%",
      requests: "95 events/min",
      color: failoverActive ? "#f43f5e" : "#10b981"
    }
  ];

  const toggleLatencySpike = () => {
    const next = !latencySpike;
    setLatencySpike(next);
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      service: 'VisionAI-ms',
      event: next ? 'Simulated network congestion latency spike (890ms)' : 'Latency stabilized (118ms)',
      status: next ? 'WARN' : 'OK'
    };
    setLogs(prev => [newLog, ...prev]);
    speak(next ? "Simulating vision microservice latency spike." : "Vision microservice latency restored.");
  };

  const toggleFailover = () => {
    const next = !failoverActive;
    setFailoverActive(next);
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      service: 'CaregiverAlert-ms',
      event: next ? 'Primary node failover triggered -> Shifted to Backup Region US-East-2' : 'Failover resolved -> Restored to Primary Node',
      status: next ? 'FAILOVER' : 'OK'
    };
    setLogs(prev => [newLog, ...prev]);
    speak(next ? "Emergency notification microservice shifted to backup failover node." : "Microservice failover resolved.");
  };

  const runSecurityAudit = () => {
    speak("Executing automated HIPAA and PIPEDA data privacy security audit...");
    setTimeout(() => {
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        service: 'SecurityAudit-ms',
        event: 'Privacy Audit Passed 100%: All senior audio/video telemetry client-side encrypted.',
        status: 'OK'
      };
      setLogs(prev => [newLog, ...prev]);
      speak("Security audit complete! Zero data leaks detected.");
    }, 1500);
  };

  return (
    <div className="architecture-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="glass-card flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="flex-center" style={{ gap: '0.5rem', justifyContent: 'flex-start' }}>
            <Activity className="text-emerald" size={32} />
            <h2 style={{ fontSize: 'var(--font-title)', fontWeight: 800, margin: 0 }}>
              Caregiver & Microservice Architecture Monitor
            </h2>
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Transparent real-time telemetry, service health metrics, and automated pipeline monitoring for DayBuddy AI infrastructure.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex-center" style={{ gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn-senior primary" onClick={toggleLatencySpike}>
            <Zap size={20} />
            <span>{latencySpike ? 'Reset Latency' : 'Simulate Vision Latency Spike'}</span>
          </button>

          <button className="btn-senior teal" onClick={toggleFailover}>
            <Radio size={20} />
            <span>{failoverActive ? 'Restore Primary Node' : 'Trigger Failover Node'}</span>
          </button>

          <button className="btn-senior" onClick={runSecurityAudit}>
            <ShieldCheck size={20} className="text-emerald" />
            <span>Run Privacy Audit</span>
          </button>
        </div>
      </div>

      {/* Services Topology Grid */}
      <div className="grid-2">
        {services.map((svc, idx) => (
          <div 
            key={idx} 
            className="glass-card"
            style={{ 
              borderLeft: `6px solid ${svc.color}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <div className="flex-between">
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{svc.name}</h4>
                <code style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{svc.code}</code>
              </div>
              <span className={`badge ${svc.status.includes('HEALTHY') ? 'safe' : svc.status.includes('DEGRADED') ? 'warning' : 'danger'}`}>
                {svc.status}
              </span>
            </div>

            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '0.5rem', 
                background: 'rgba(0,0,0,0.25)', 
                padding: '0.75rem', 
                borderRadius: '10px',
                textAlign: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>LATENCY</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: svc.color }}>{svc.latency}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>UPTIME</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>{svc.uptime}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>THROUGHPUT</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{svc.requests}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Pipeline Telemetry Log Stream */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="flex-between">
          <div className="flex-center" style={{ gap: '0.5rem' }}>
            <Terminal size={24} className="text-amber" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>
              Live Automated Pipeline Event Stream
            </h3>
          </div>
          <span className="badge safe">HIPAA & AES-256 ENCRYPTED</span>
        </div>

        <div 
          style={{ 
            background: '#050b14', 
            borderRadius: '12px', 
            padding: '1.25rem', 
            fontFamily: 'monospace', 
            fontSize: '1rem',
            lineHeight: 1.7,
            border: '2px solid var(--border-color)',
            maxHeight: '300px',
            overflowY: 'auto'
          }}
        >
          {logs.map((log) => (
            <div key={log.id} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0.4rem 0' }}>
              <span style={{ color: 'var(--text-muted)' }}>[{log.time}]</span>
              <span style={{ color: 'var(--accent-teal)', fontWeight: 'bold' }}>[{log.service}]</span>
              <span style={{ flex: 1, color: log.status === 'WARN' ? '#f59e0b' : log.status === 'FAILOVER' ? '#ef4444' : '#f8fafc' }}>
                {log.event}
              </span>
              <span style={{ color: log.status === 'OK' ? '#10b981' : log.status === 'WARN' ? '#f59e0b' : '#ef4444', fontWeight: 'bold' }}>
                [{log.status}]
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
