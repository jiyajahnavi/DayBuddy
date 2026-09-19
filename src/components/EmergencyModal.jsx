import React, { useState, useEffect } from 'react';
import { useSenior } from '../context/SeniorContext';
import { AlertTriangle, PhoneCall, XCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const EmergencyModal = () => {
  const { sosActive, cancelEmergencySOS, speak } = useSenior();
  const [countdown, setCountdown] = useState(5);
  const [dispatchStatus, setDispatchStatus] = useState('COUNTDOWN'); // 'COUNTDOWN' | 'DISPATCHED'

  useEffect(() => {
    let timer;
    if (sosActive) {
      setCountdown(5);
      setDispatchStatus('COUNTDOWN');

      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setDispatchStatus('DISPATCHED');
            speak("EMERGENCY DISPATCHED! Dispatching emergency medical services and alerting primary caregiver Daughter Sarah immediately.", { pitch: 1.1 });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setCountdown(5);
      setDispatchStatus('COUNTDOWN');
    }

    return () => clearInterval(timer);
  }, [sosActive, speak]);

  if (!sosActive) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '650px', 
          width: '100%', 
          border: '4px solid #ef4444', 
          background: 'linear-gradient(135deg, #450a0a, #180505)',
          boxShadow: '0 0 50px rgba(239, 68, 68, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.5rem',
          padding: '2.5rem'
        }}
      >
        <div 
          style={{ 
            width: '90px', 
            height: '90px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #ef4444, #991b1b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 1s infinite'
          }}
        >
          <AlertTriangle size={56} color="#ffffff" />
        </div>

        <div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fca5a5', margin: 0 }}>
            EMERGENCY SOS ALERT
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#fecaca', marginTop: '0.5rem' }}>
            DayBuddy AI is contacting Emergency Services (911) & Primary Caregiver.
          </p>
        </div>

        {dispatchStatus === 'COUNTDOWN' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div 
              style={{ 
                fontSize: '4.5rem', 
                fontWeight: 900, 
                color: '#ffffff',
                lineHeight: 1,
                fontFamily: 'Lexend, sans-serif'
              }}
            >
              {countdown}
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
              Seconds until emergency dispatch...
            </span>
          </div>
        ) : (
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '1.25rem', borderRadius: '14px', border: '2px solid #10b981', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <PhoneCall size={36} className="text-emerald" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#34d399' }}>
                Emergency Responders Notified!
              </div>
              <div style={{ fontSize: '1.05rem', color: '#ffffff' }}>
                GPS Location: 124 Park Ave, SF | Caregiver Sarah notified via SMS.
              </div>
            </div>
          </div>
        )}

        <button 
          className="btn-senior primary"
          onClick={cancelEmergencySOS}
          style={{ 
            minHeight: '70px', 
            padding: '1rem 2.5rem', 
            fontSize: '1.4rem', 
            background: '#ffffff', 
            color: '#000000',
            border: 'none',
            fontWeight: 900
          }}
        >
          <XCircle size={32} />
          <span>CANCEL EMERGENCY SOS (I AM SAFE)</span>
        </button>
      </div>
    </div>
  );
};
