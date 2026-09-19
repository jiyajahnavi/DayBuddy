import React, { useState } from 'react';
import { useSenior } from '../context/SeniorContext';
import { 
  Sun, 
  Mic, 
  Pill, 
  Stethoscope, 
  Users, 
  FileText, 
  Camera, 
  PhoneCall, 
  CreditCard, 
  MessageSquare, 
  PlusCircle, 
  ShieldCheck, 
  AlertCircle, 
  ChevronRight,
  Heart,
  Calendar
} from 'lucide-react';

export const HeroDashboard = () => {
  const { setActiveTab, speak, playGuidance, startListening } = useSenior();
  const [isPlayingBriefing, setIsPlayingBriefing] = useState(false);

  const dailyBriefingText = "Good morning Margaret! Today is Saturday, September 19. Weather is 22 degrees and mostly sunny. You have a doctor appointment with Doctor Sharma at 4:30 PM. Your next medicine Paracetamol is due after lunch.";

  const playDailyBriefing = () => {
    setIsPlayingBriefing(true);
    speak(dailyBriefingText, {
      onEnd: () => setIsPlayingBriefing(false)
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* 1. Hero Greeting Banner */}
      <div className="flex-between" style={{ gap: '1.25rem', flexWrap: 'wrap' }}>
        {/* Left: Avatar & Greeting */}
        <div className="flex-center" style={{ gap: '1.25rem', flex: '1 1 380px' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img 
              src="/senior_avatar_margaret.jpg" 
              alt="Margaret" 
              style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '4px solid #FFFFFF',
                boxShadow: '0 6px 16px rgba(0,0,0,0.08)'
              }} 
            />
            {/* Decorative leaf badge */}
            <div 
              style={{
                position: 'absolute',
                bottom: '2px',
                right: '-4px',
                background: '#E6F4EA',
                borderRadius: '50%',
                padding: '4px',
                border: '2px solid #FFFFFF'
              }}
            >
              <span style={{ fontSize: '14px' }}>🌿</span>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0D233A', margin: 0, lineHeight: 1.15 }}>
              Good morning, Margaret
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#52657A', marginTop: '0.35rem', margin: 0 }}>
              Here's what you need today.
            </p>
          </div>
        </div>

        {/* Middle: Weather Widget */}
        <div 
          className="card-clean flex-center" 
          style={{ 
            background: '#EBF5FB', 
            border: '1px solid #D4E6F1',
            padding: '1rem 1.4rem', 
            gap: '1rem',
            flex: '0 1 240px'
          }}
        >
          <Sun size={40} style={{ color: '#F59E0B', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0D233A', lineHeight: 1 }}>
              22°C
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0D233A', marginTop: '2px' }}>
              Mostly sunny
            </div>
            <div style={{ fontSize: '0.85rem', color: '#52657A' }}>
              Greater Noida
            </div>
          </div>
        </div>

        {/* Right: Tap to Speak Button */}
        <div style={{ flex: '1 1 280px' }}>
          <button 
            className="btn-pill speak-hero" 
            onClick={startListening}
          >
            <div 
              style={{ 
                width: '52px', 
                height: '52px', 
                borderRadius: '50%', 
                background: '#0D233A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Mic size={26} color="#FFFFFF" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0D233A', lineHeight: 1.1 }}>
                Tap to Speak
              </div>
              <div style={{ fontSize: '0.95rem', color: 'rgba(13, 35, 58, 0.8)', marginTop: '2px', fontWeight: 500 }}>
                Talk to DayBuddy
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* 2. "Today" Section */}
      <div>
        <h3 className="section-title">
          <Calendar size={22} style={{ color: '#0D9488' }} />
          <span>Today</span>
        </h3>

        <div className="grid-4">
          {/* Card 1: Next Medicine */}
          <div 
            className="card-clean interactive flex-between" 
            style={{ background: '#E8F5E9', borderColor: '#C8E6C9', cursor: 'pointer' }}
            onClick={() => {
              setActiveTab('document');
              playGuidance("Opening Medicine Prescription details");
            }}
          >
            <div className="flex-center" style={{ gap: '0.9rem', justifyContent: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#A5D6A7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Pill size={24} style={{ color: '#1B5E20' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0D233A' }}>Next medicine</div>
                <div style={{ fontSize: '0.88rem', color: '#43A047', fontWeight: 600 }}>After lunch · 1 tablet</div>
                <div style={{ fontSize: '0.82rem', color: '#52657A' }}>Paracetamol 500 mg</div>
              </div>
            </div>
            <ChevronRight size={20} className="chevron-arrow" />
          </div>

          {/* Card 2: Doctor Appointment */}
          <div 
            className="card-clean interactive flex-between" 
            style={{ background: '#E3F2FD', borderColor: '#BBDEFB', cursor: 'pointer' }}
            onClick={() => {
              setActiveTab('guided');
              playGuidance("Opening Doctor appointment walkthrough");
            }}
          >
            <div className="flex-center" style={{ gap: '0.9rem', justifyContent: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#90CAF9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Stethoscope size={24} style={{ color: '#0D47A1' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0D233A' }}>Doctor appointment</div>
                <div style={{ fontSize: '0.88rem', color: '#1E88E5', fontWeight: 600 }}>Today · 4:30 PM</div>
                <div style={{ fontSize: '0.82rem', color: '#52657A' }}>Dr. Sharma (General Physician)</div>
              </div>
            </div>
            <ChevronRight size={20} className="chevron-arrow" />
          </div>

          {/* Card 3: Messages from Family */}
          <div 
            className="card-clean interactive flex-between" 
            style={{ background: '#F3E5F5', borderColor: '#E1BEE7', cursor: 'pointer' }}
            onClick={() => {
              setActiveTab('guided');
              playGuidance("Opening family messages");
            }}
          >
            <div className="flex-center" style={{ gap: '0.9rem', justifyContent: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#CE93D8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Users size={24} style={{ color: '#4A148C' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0D233A' }}>Messages from Family</div>
                <div style={{ fontSize: '0.88rem', color: '#8E24AA', fontWeight: 600 }}>2 new messages</div>
                <div style={{ fontSize: '0.82rem', color: '#52657A', fontStyle: 'italic' }}>Ritika: "How are you today?"</div>
              </div>
            </div>
            <ChevronRight size={20} className="chevron-arrow" />
          </div>

          {/* Card 4: Daily Briefing */}
          <div 
            className="card-clean interactive flex-between" 
            style={{ background: '#FFF8E1', borderColor: '#FFE082', cursor: 'pointer' }}
            onClick={playDailyBriefing}
          >
            <div className="flex-center" style={{ gap: '0.9rem', justifyContent: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFE082', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={24} style={{ color: '#F57F17' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0D233A' }}>Daily Briefing</div>
                <div style={{ fontSize: '0.88rem', color: '#F57C00', fontWeight: 600 }}>Weather, news, reminders</div>
                <div style={{ fontSize: '0.82rem', color: '#52657A' }}>
                  {isPlayingBriefing ? '🔊 Playing audio...' : 'Tap to see your daily update'}
                </div>
              </div>
            </div>
            <ChevronRight size={20} className="chevron-arrow" />
          </div>
        </div>
      </div>

      {/* 3. "What would you like to do?" Section (3x2 Grid) */}
      <div>
        <h3 className="section-title">
          <span style={{ fontSize: '1.2rem' }}>⠿</span>
          <span>What would you like to do?</span>
        </h3>

        <div className="grid-3">
          {/* Tile 1: Scan an Object */}
          <div 
            className="action-tile"
            onClick={() => {
              setActiveTab('vision');
              playGuidance("Opening Object Scanner");
            }}
          >
            <div className="flex-center" style={{ gap: '1rem' }}>
              <div className="icon-circle" style={{ background: '#E6F4F1' }}>
                <Camera size={24} style={{ color: '#0D9488' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0D233A' }}>Scan an Object</div>
                <div style={{ fontSize: '0.9rem', color: '#52657A', marginTop: '2px' }}>Identify things around you</div>
              </div>
            </div>
            <ChevronRight size={22} className="chevron-arrow" />
          </div>

          {/* Tile 2: Read Medicine / Document */}
          <div 
            className="action-tile"
            onClick={() => {
              setActiveTab('document');
              playGuidance("Opening Medicine and Document Reader");
            }}
          >
            <div className="flex-center" style={{ gap: '1rem' }}>
              <div className="icon-circle" style={{ background: '#EBF3FE' }}>
                <FileText size={24} style={{ color: '#2563EB' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0D233A' }}>Read Medicine / Document</div>
                <div style={{ fontSize: '0.9rem', color: '#52657A', marginTop: '2px' }}>Read labels, letters, and more</div>
              </div>
            </div>
            <ChevronRight size={22} className="chevron-arrow" />
          </div>

          {/* Tile 3: Call Someone */}
          <div 
            className="action-tile"
            onClick={() => {
              setActiveTab('guided');
              playGuidance("Opening phone call guide");
            }}
          >
            <div className="flex-center" style={{ gap: '1rem' }}>
              <div className="icon-circle" style={{ background: '#E6F4EA' }}>
                <PhoneCall size={24} style={{ color: '#059669' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0D233A' }}>Call Someone</div>
                <div style={{ fontSize: '0.9rem', color: '#52657A', marginTop: '2px' }}>Family, doctor or caregiver</div>
              </div>
            </div>
            <ChevronRight size={22} className="chevron-arrow" />
          </div>

          {/* Tile 4: Pay a Bill */}
          <div 
            className="action-tile"
            onClick={() => {
              setActiveTab('guided');
              playGuidance("Opening bill payment guide");
            }}
          >
            <div className="flex-center" style={{ gap: '1rem' }}>
              <div className="icon-circle" style={{ background: '#F3E8FF' }}>
                <CreditCard size={24} style={{ color: '#7C3AED' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0D233A' }}>Pay a Bill</div>
                <div style={{ fontSize: '0.9rem', color: '#52657A', marginTop: '2px' }}>Utilities, mobile, other bills</div>
              </div>
            </div>
            <ChevronRight size={22} className="chevron-arrow" />
          </div>

          {/* Tile 5: Check a Message */}
          <div 
            className="action-tile"
            onClick={() => {
              setActiveTab('guided');
              playGuidance("Opening voice note message guide");
            }}
          >
            <div className="flex-center" style={{ gap: '1rem' }}>
              <div className="icon-circle" style={{ background: '#E0F2FE' }}>
                <MessageSquare size={24} style={{ color: '#0284C7' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0D233A' }}>Check a Message</div>
                <div style={{ fontSize: '0.9rem', color: '#52657A', marginTop: '2px' }}>Read your messages</div>
              </div>
            </div>
            <ChevronRight size={22} className="chevron-arrow" />
          </div>

          {/* Tile 6: Get Help */}
          <div 
            className="action-tile"
            onClick={() => {
              setActiveTab('guided');
              playGuidance("Opening guided help");
            }}
          >
            <div className="flex-center" style={{ gap: '1rem' }}>
              <div className="icon-circle" style={{ background: '#FEF3C7' }}>
                <PlusCircle size={24} style={{ color: '#D97706' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0D233A' }}>Get Help</div>
                <div style={{ fontSize: '0.9rem', color: '#52657A', marginTop: '2px' }}>Emergency or general support</div>
              </div>
            </div>
            <ChevronRight size={22} className="chevron-arrow" />
          </div>
        </div>
      </div>

      {/* 4. "Stay Safe" Section (Row of 2) */}
      <div>
        <h3 className="section-title">
          <ShieldCheck size={22} style={{ color: '#0D9488' }} />
          <span>Stay Safe</span>
        </h3>

        <div className="grid-2">
          {/* Card 1: Scam Check */}
          <div 
            className="card-clean interactive flex-between"
            style={{ background: '#E0F2F1', borderColor: '#B2DFDB', cursor: 'pointer' }}
            onClick={() => {
              setActiveTab('scam');
              playGuidance("Opening Scam Protection");
            }}
          >
            <div className="flex-center" style={{ gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#80CBD4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={26} style={{ color: '#004D40' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0D233A' }}>Scam Check</div>
                <div style={{ fontSize: '0.9rem', color: '#00695C', marginTop: '2px' }}>Verify calls, messages and requests</div>
              </div>
            </div>
            <ChevronRight size={22} className="chevron-arrow" />
          </div>

          {/* Card 2: Emergency Help */}
          <div 
            className="card-clean interactive flex-between"
            style={{ background: '#FFEBEE', borderColor: '#FFCDD2', cursor: 'pointer' }}
            onClick={() => {
              setActiveTab('guided');
              playGuidance("Opening emergency assistance");
            }}
          >
            <div className="flex-center" style={{ gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EF9A9A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertCircle size={26} style={{ color: '#B71C1C' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0D233A' }}>Emergency Help</div>
                <div style={{ fontSize: '0.9rem', color: '#C62828', marginTop: '2px' }}>Police, ambulance, fire and more</div>
              </div>
            </div>
            <ChevronRight size={22} className="chevron-arrow" />
          </div>
        </div>
      </div>

      {/* 5. Bottom Caregiver Connected Status Bar */}
      <div 
        className="card-clean flex-between"
        style={{ 
          background: '#E8F5E9', 
          borderColor: '#C8E6C9', 
          padding: '0.85rem 1.4rem',
          flexWrap: 'wrap',
          gap: '1rem',
          cursor: 'pointer'
        }}
        onClick={() => {
          setActiveTab('architecture');
          playGuidance("Opening Caregiver System Monitor");
        }}
      >
        <div className="flex-center" style={{ gap: '0.6rem', fontSize: '0.95rem', fontWeight: 600, color: '#1B5E20' }}>
          <span style={{ color: '#10B981', fontSize: '1.2rem' }}>●</span>
          <span style={{ fontWeight: 800 }}>Caregiver connected</span>
          <span style={{ color: '#81C784' }}>|</span>
          <span style={{ color: '#52657A', fontWeight: 500 }}>Last check-in 9:15 AM</span>
        </div>

        <div className="flex-center" style={{ gap: '0.5rem', fontSize: '0.92rem', color: '#52657A', fontWeight: 500 }}>
          <Users size={18} style={{ color: '#0D9488' }} />
          <span>Your family and caregiver are here for you</span>
          <Heart size={16} style={{ color: '#0D9488', fill: '#0D9488' }} />
        </div>
      </div>
    </div>
  );
};
