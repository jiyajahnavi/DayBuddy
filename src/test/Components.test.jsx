import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SeniorProvider } from '../context/SeniorContext';
import { Navbar } from '../components/Navbar';
import { HeroDashboard } from '../components/HeroDashboard';
import { ScamDetector } from '../components/ScamDetector';
import { ArchitectureMonitor } from '../components/ArchitectureMonitor';

describe('DayBuddy Component Integration Tests', () => {
  it('renders Navbar brand title and SOS emergency button', () => {
    render(
      <SeniorProvider>
        <Navbar />
      </SeniorProvider>
    );

    expect(screen.getByText('DayBuddy')).toBeInTheDocument();
    expect(screen.getByText('SOS')).toBeInTheDocument();
  });

  it('renders HeroDashboard greeting and action tiles', () => {
    render(
      <SeniorProvider>
        <HeroDashboard />
      </SeniorProvider>
    );

    expect(screen.getByText(/Good morning, Margaret/i)).toBeInTheDocument();
    expect(screen.getByText(/Scan an Object/i)).toBeInTheDocument();
    expect(screen.getByText(/Read Medicine \/ Document/i)).toBeInTheDocument();
    expect(screen.getByText(/Caregiver connected/i)).toBeInTheDocument();
  });

  it('runs threat assessment in ScamDetector component', () => {
    render(
      <SeniorProvider>
        <ScamDetector />
      </SeniorProvider>
    );

    const input = screen.getByPlaceholderText(/Paste or type suspicious message here/i);
    fireEvent.change(input, { target: { value: 'URGENT IRS gift card tax arrest warrant' } });

    const analyzeBtn = screen.getByText(/Analyze Threat Level/i);
    fireEvent.click(analyzeBtn);

    expect(screen.getByText(/Threat Risk Result: DANGER SCAM/i)).toBeInTheDocument();
  });

  it('toggles latency spike and failover in ArchitectureMonitor', () => {
    render(
      <SeniorProvider>
        <ArchitectureMonitor />
      </SeniorProvider>
    );

    expect(screen.getByText('Caregiver & Microservice Architecture Monitor')).toBeInTheDocument();

    const latencyBtn = screen.getByText(/Simulate Vision Latency Spike/i);
    fireEvent.click(latencyBtn);
    expect(screen.getByText(/Reset Latency/i)).toBeInTheDocument();

    const failoverBtn = screen.getByText(/Trigger Failover Node/i);
    fireEvent.click(failoverBtn);
    expect(screen.getByText(/Restore Primary Node/i)).toBeInTheDocument();
  });
});
