import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { SeniorProvider, useSenior } from '../context/SeniorContext';

const TestComponent = () => {
  const { 
    textSize, 
    setTextSize, 
    theme, 
    setTheme, 
    sosActive, 
    triggerEmergencySOS, 
    cancelEmergencySOS,
    activeTab,
    setActiveTab
  } = useSenior();

  return (
    <div>
      <span data-testid="text-size">{textSize}</span>
      <span data-testid="theme">{theme}</span>
      <span data-testid="active-tab">{activeTab}</span>
      <span data-testid="sos-status">{sosActive ? 'ACTIVE' : 'INACTIVE'}</span>
      <button onClick={() => setTextSize('xlarge')}>Set XL</button>
      <button onClick={() => setTheme('contrast')}>Set Contrast</button>
      <button onClick={() => setActiveTab('vision')}>Set Vision</button>
      <button onClick={triggerEmergencySOS}>Trigger SOS</button>
      <button onClick={cancelEmergencySOS}>Cancel SOS</button>
    </div>
  );
};

describe('SeniorContext State Provider', () => {
  it('provides default senior accessibility state values', () => {
    render(
      <SeniorProvider>
        <TestComponent />
      </SeniorProvider>
    );

    expect(screen.getByTestId('text-size')).toHaveTextContent('large');
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('active-tab')).toHaveTextContent('dashboard');
    expect(screen.getByTestId('sos-status')).toHaveTextContent('INACTIVE');
  });

  it('updates text size and theme correctly', () => {
    render(
      <SeniorProvider>
        <TestComponent />
      </SeniorProvider>
    );

    act(() => {
      screen.getByText('Set XL').click();
      screen.getByText('Set Contrast').click();
    });

    expect(screen.getByTestId('text-size')).toHaveTextContent('xlarge');
    expect(screen.getByTestId('theme')).toHaveTextContent('contrast');
  });

  it('handles Emergency SOS triggering and cancellation', () => {
    render(
      <SeniorProvider>
        <TestComponent />
      </SeniorProvider>
    );

    act(() => {
      screen.getByText('Trigger SOS').click();
    });
    expect(screen.getByTestId('sos-status')).toHaveTextContent('ACTIVE');

    act(() => {
      screen.getByText('Cancel SOS').click();
    });
    expect(screen.getByTestId('sos-status')).toHaveTextContent('INACTIVE');
  });
});
