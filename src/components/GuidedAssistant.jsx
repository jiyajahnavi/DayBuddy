import React, { useState } from 'react';
import { useSenior } from '../context/SeniorContext';
import { 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare, 
  CreditCard, 
  Landmark,
  ShieldCheck,
  Award
} from 'lucide-react';

export const GuidedAssistant = () => {
  const { speak, playGuidance } = useSenior();
  const [selectedWorkflow, setSelectedWorkflow] = useState('call');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const workflows = {
    call: {
      title: "Making a Doctor or Family Video Call",
      category: "Communication",
      icon: PhoneCall,
      color: "#3b82f6",
      steps: [
        {
          stepNum: 1,
          heading: "Open Your Contacts List",
          instruction: "Look for the green Phone icon at the top of your screen or say 'Call Doctor Vance'.",
          audioPrompt: "Step 1: Tap the Contacts button or say Call Doctor Vance.",
          actionText: "Tap to Open Contacts"
        },
        {
          stepNum: 2,
          heading: "Select Contact (Doctor or Family)",
          instruction: "Choose 'Dr. Vance (Cardiologist)' or 'Granddaughter Sarah' from your favorites list.",
          audioPrompt: "Step 2: Select Dr Vance or your family member.",
          actionText: "Select Dr. Vance"
        },
        {
          stepNum: 3,
          heading: "Tap the Green Video Call Button",
          instruction: "Press the camera icon to start high-definition video calling.",
          audioPrompt: "Step 3: Tap the green camera button to start your call.",
          actionText: "Start Video Call 📹"
        },
        {
          stepNum: 4,
          heading: "Verify Microphone & Camera Access",
          instruction: "Check that your camera lens is uncovered and your volume is set to high.",
          audioPrompt: "Step 4: You are connected! Speak directly towards your device.",
          actionText: "Complete Call Demo ✓"
        }
      ]
    },
    message: {
      title: "Sending a Voice Note or SMS",
      category: "Messaging",
      icon: MessageSquare,
      color: "#a855f7",
      steps: [
        {
          stepNum: 1,
          heading: "Tap the Voice Microphone Icon",
          instruction: "No typing required! Tap the purple microphone button to dictate your message.",
          audioPrompt: "Step 1: Tap the microphone button to start recording your voice note.",
          actionText: "Tap Mic to Dictate 🎤"
        },
        {
          stepNum: 2,
          heading: "Speak Your Message Clearly",
          instruction: "Example: 'Hi Sarah, I am bringing homemade apple pie for dinner tonight.'",
          audioPrompt: "Step 2: Speak your message clearly in your regular voice.",
          actionText: "Preview Spoken Text 🔊"
        },
        {
          stepNum: 3,
          heading: "Review Audio & Text Preview",
          instruction: "DayBuddy AI transcribes your words into large clear text so you can double check.",
          audioPrompt: "Step 3: Confirm your message text looks correct.",
          actionText: "Confirm Message"
        },
        {
          stepNum: 4,
          heading: "Tap Send Message",
          instruction: "Press the large Send button. Your family receives your voice and text note instantly.",
          audioPrompt: "Step 4: Message sent successfully!",
          actionText: "Send Message Now 🚀"
        }
      ]
    },
    payment: {
      title: "Safe Digital Payment & Utility Bill Pay",
      category: "Financial Safety",
      icon: CreditCard,
      color: "#10b981",
      steps: [
        {
          stepNum: 1,
          heading: "Verify Official Provider Website",
          instruction: "DayBuddy AI automatically checks SSL certificates and verifies legitimate bill pay portals.",
          audioPrompt: "Step 1: Security seal verified for City Power and Water.",
          actionText: "Verify Security Seal 🛡️"
        },
        {
          stepNum: 2,
          heading: "Review Bill Amount Due",
          instruction: "Confirm total bill amount matches your paper invoice ($54.20).",
          audioPrompt: "Step 2: Verify bill amount of fifty four dollars and twenty cents.",
          actionText: "Confirm Amount ($54.20)"
        },
        {
          stepNum: 3,
          heading: "Select Saved Payment Card",
          instruction: "Choose your encrypted bank card. Never share card PINs or passwords.",
          audioPrompt: "Step 3: Select your saved payment method.",
          actionText: "Select Saved Visa ****-4019"
        },
        {
          stepNum: 4,
          heading: "Voice Confirm & Pay Bill",
          instruction: "Say 'Confirm Payment' or tap the Pay button to authorize transaction safely.",
          audioPrompt: "Step 4: Payment completed safely! Confirmation receipt saved.",
          actionText: "Complete Safe Payment ✓"
        }
      ]
    },
    pension: {
      title: "Accessing Government Senior & Pension Portals",
      category: "Government Services",
      icon: Landmark,
      color: "#f59e0b",
      steps: [
        {
          stepNum: 1,
          heading: "Open Official Senior Portal",
          instruction: "Access Social Security, Medicare, or State Pension portals safely.",
          audioPrompt: "Step 1: Opening official Senior Benefits Portal.",
          actionText: "Open Portal Link 🏛️"
        },
        {
          stepNum: 2,
          heading: "Log In with Passkey or Senior ID",
          instruction: "Use secure facial recognition or one-time passcode verification.",
          audioPrompt: "Step 2: Authenticate with your secure senior ID.",
          actionText: "Authenticate Passkey"
        },
        {
          stepNum: 3,
          heading: "View Monthly Pension Statement",
          instruction: "Review your direct deposit payout dates and healthcare coverage.",
          audioPrompt: "Step 3: Monthly statement loaded. Payout confirmed for October 1st.",
          actionText: "View Statement"
        },
        {
          stepNum: 4,
          heading: "Download PDF or Request Spoken Summary",
          instruction: "Save statement to your device or ask DayBuddy AI to summarize benefits.",
          audioPrompt: "Step 4: Benefit statement saved!",
          actionText: "Download Benefit Statement"
        }
      ]
    }
  };

  const activeFlow = workflows[selectedWorkflow];
  const activeStep = activeFlow.steps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < activeFlow.steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      speak(activeFlow.steps[nextIdx].audioPrompt);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      speak(activeFlow.steps[prevIdx].audioPrompt);
    }
  };

  return (
    <div className="guided-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="glass-card flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="flex-center" style={{ gap: '0.5rem', justifyContent: 'flex-start' }}>
            <HelpCircle className="text-purple" size={32} />
            <h2 style={{ fontSize: 'var(--font-title)', fontWeight: 800, margin: 0 }}>
              Guided Digital Helper Workflows
            </h2>
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Step-by-step voice and visual walkthroughs to help you make video calls, send messages, pay bills, and manage pension accounts with total confidence.
          </p>
        </div>
      </div>

      {/* Workflow Selection Buttons */}
      <div className="grid-2">
        {Object.keys(workflows).map(key => {
          const flow = workflows[key];
          const Icon = flow.icon;
          const isSelected = selectedWorkflow === key;
          return (
            <div
              key={key}
              className="glass-card"
              onClick={() => {
                setSelectedWorkflow(key);
                setCurrentStepIndex(0);
                playGuidance(`Selected ${flow.title}`);
                speak(flow.steps[0].audioPrompt);
              }}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                borderLeft: `6px solid ${flow.color}`,
                background: isSelected ? 'rgba(168, 85, 247, 0.2)' : 'var(--bg-card)'
              }}
            >
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '14px', 
                  background: `${flow.color}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Icon size={32} style={{ color: flow.color }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{flow.title}</h4>
                <span className="badge safe" style={{ marginTop: '0.3rem', fontSize: '0.8rem' }}>{flow.category}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Step Wizard Card */}
      <div className="glass-card" style={{ border: `3px solid ${activeFlow.color}`, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Step Progress Bar */}
        <div className="flex-between">
          <div>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              {activeFlow.title}
            </span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: 'var(--accent-amber)' }}>
              Step {activeStep.stepNum} of {activeFlow.steps.length}: {activeStep.heading}
            </h3>
          </div>

          <button 
            className="btn-senior teal" 
            onClick={() => speak(activeStep.audioPrompt)}
            style={{ minHeight: '44px', padding: '0.4rem 1rem' }}
          >
            <Volume2 size={20} />
            <span>Listen Step Audio</span>
          </button>
        </div>

        {/* Visual Instruction Panel */}
        <div 
          style={{ 
            background: 'rgba(0,0,0,0.3)', 
            padding: '1.75rem', 
            borderRadius: '16px', 
            border: '2px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <p style={{ fontSize: '1.3rem', lineHeight: 1.6, margin: 0 }}>
            {activeStep.instruction}
          </p>

          {/* Practice Simulation Button */}
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
            <button 
              className="btn-senior primary"
              onClick={() => {
                speak(`Action completed: ${activeStep.actionText}`);
                if (currentStepIndex < activeFlow.steps.length - 1) {
                  handleNext();
                }
              }}
              style={{ padding: '1rem 2rem', fontSize: '1.25rem', minHeight: '64px' }}
            >
              <CheckCircle2 size={28} />
              <span>Practice Action: {activeStep.actionText}</span>
            </button>
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex-between" style={{ gap: '1rem' }}>
          <button 
            className="btn-senior"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            style={{ opacity: currentStepIndex === 0 ? 0.4 : 1 }}
          >
            <ChevronLeft size={24} />
            <span>Previous Step</span>
          </button>

          <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>
            {currentStepIndex + 1} / {activeFlow.steps.length}
          </div>

          {currentStepIndex < activeFlow.steps.length - 1 ? (
            <button className="btn-senior primary" onClick={handleNext}>
              <span>Next Step</span>
              <ChevronRight size={24} />
            </button>
          ) : (
            <div className="flex-center" style={{ gap: '0.5rem', color: '#10b981', fontWeight: 800, fontSize: '1.2rem' }}>
              <Award size={28} />
              <span>Workflow Complete! Great Job!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
