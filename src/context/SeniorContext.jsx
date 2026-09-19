import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SeniorContext = createContext();

export const SeniorProvider = ({ children }) => {
  // Accessibility state
  const [textSize, setTextSize] = useState('large'); // Default to Large font size for seniors!
  const [theme, setTheme] = useState('dark'); // 'dark' | 'warm' | 'contrast'
  const [audioGuidance, setAudioGuidance] = useState(true);
  const [language, setLanguage] = useState('en-US');

  // Navigation state
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'vision' | 'document' | 'guided' | 'scam' | 'architecture'

  // Voice Interaction state
  const [voiceStatus, setVoiceStatus] = useState('idle'); // 'idle' | 'listening' | 'speaking'
  const [lastSpokenText, setLastSpokenText] = useState('');
  const [recognizedText, setRecognizedText] = useState('');
  const [voiceTranscriptLog, setVoiceTranscriptLog] = useState([]);

  // Emergency SOS state
  const [sosActive, setSosActive] = useState(false);

  // Sync Body Classes for Theme & Font Size
  useEffect(() => {
    document.body.className = `theme-${theme} size-${textSize}`;
  }, [theme, textSize]);

  // Speech Synthesis (Text-to-Speech)
  const speak = useCallback((text, options = {}) => {
    if (!text || typeof window === 'undefined') return;

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Stop any active speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate || 0.92; // Slightly slower speed for senior clarity
      utterance.pitch = options.pitch || 1.0;
      utterance.lang = options.lang || language;

      utterance.onstart = () => {
        setVoiceStatus('speaking');
        setLastSpokenText(text);
      };

      utterance.onend = () => {
        setVoiceStatus('idle');
        if (options.onEnd) options.onEnd();
      };

      utterance.onerror = (err) => {
        console.warn('Speech synthesis error:', err);
        setVoiceStatus('idle');
      };

      window.speechSynthesis.speak(utterance);
    }
  }, [language]);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setVoiceStatus('idle');
    }
  }, []);

  // Audio Guidance for UI Clicks
  const playGuidance = useCallback((text) => {
    if (audioGuidance) {
      speak(text);
    }
  }, [audioGuidance, speak]);

  // Voice Recognition (Speech-to-Text)
  const [recognitionInstance, setRecognitionInstance] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language;

      recognition.onstart = () => {
        setVoiceStatus('listening');
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(res => res[0].transcript)
          .join('');
        setRecognizedText(transcript);
        
        if (event.results[0].isFinal) {
          handleVoiceCommand(transcript);
        }
      };

      recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err);
        setVoiceStatus('idle');
      };

      recognition.onend = () => {
        setVoiceStatus('idle');
      };

      setRecognitionInstance(recognition);
    }
  }, [language]);

  // Voice Command Routing Logic
  const handleVoiceCommand = (commandText) => {
    const text = commandText.toLowerCase().trim();
    setVoiceTranscriptLog(prev => [{ text: commandText, timestamp: new Date().toLocaleTimeString() }, ...prev.slice(0, 9)]);

    if (text.includes('sos') || text.includes('emergency') || text.includes('help me') || text.includes('doctor now')) {
      triggerEmergencySOS();
      return;
    }

    if (text.includes('home') || text.includes('dashboard') || text.includes('main')) {
      setActiveTab('dashboard');
      speak("Opened main dashboard.");
      return;
    }

    if (text.includes('vision') || text.includes('camera') || text.includes('scan') || text.includes('look') || text.includes('object')) {
      setActiveTab('vision');
      speak("Opened Camera and Object Scanner.");
      return;
    }

    if (text.includes('document') || text.includes('medicine') || text.includes('label') || text.includes('read newspaper') || text.includes('bill')) {
      setActiveTab('document');
      speak("Opened Document and Medicine Label Reader.");
      return;
    }

    if (text.includes('guide') || text.includes('assistant') || text.includes('how to') || text.includes('call') || text.includes('pension')) {
      setActiveTab('guided');
      speak("Opened Guided Digital Assistant.");
      return;
    }

    if (text.includes('scam') || text.includes('fraud') || text.includes('sms') || text.includes('security') || text.includes('check text')) {
      setActiveTab('scam');
      speak("Opened Scam and Fraud Protection Suite.");
      return;
    }

    if (text.includes('system') || text.includes('architecture') || text.includes('admin') || text.includes('caregiver')) {
      setActiveTab('architecture');
      speak("Opened Caregiver System Monitor.");
      return;
    }

    if (text.includes('large') || text.includes('bigger text')) {
      setTextSize('xlarge');
      speak("Set text size to extra large.");
      return;
    }

    if (text.includes('contrast') || text.includes('yellow')) {
      setTheme('contrast');
      speak("Switched to High Contrast Yellow theme.");
      return;
    }

    // Default response if command not recognized
    speak(`Received command: ${commandText}. Say 'home', 'scan object', 'read document', 'guided help', or 'scam check'.`);
  };

  const startListening = () => {
    if (recognitionInstance) {
      try {
        setRecognizedText('');
        recognitionInstance.start();
        speak("Listening for your command.");
      } catch (err) {
        console.warn("Recognition already active", err);
      }
    } else {
      speak("Speech recognition is simulated on this device. Say 'Scan object' or click the buttons below.");
      // Provide simulated command entry
      setTimeout(() => {
        const sampleCommands = ["Scan object", "Read document", "Check scam message", "Open guided assistant"];
        const randomCmd = sampleCommands[Math.floor(Math.random() * sampleCommands.length)];
        setRecognizedText(randomCmd);
        handleVoiceCommand(randomCmd);
      }, 1500);
    }
  };

  const triggerEmergencySOS = () => {
    setSosActive(true);
    speak("EMERGENCY SOS TRIGGERED! Calling emergency contact and primary caregiver in 5 seconds.", { rate: 1.0, pitch: 1.1 });
  };

  const cancelEmergencySOS = () => {
    setSosActive(false);
    speak("Emergency SOS cancelled. You are safe.");
  };

  return (
    <SeniorContext.Provider
      value={{
        textSize,
        setTextSize,
        theme,
        setTheme,
        audioGuidance,
        setAudioGuidance,
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        voiceStatus,
        lastSpokenText,
        recognizedText,
        voiceTranscriptLog,
        speak,
        stopSpeaking,
        playGuidance,
        startListening,
        sosActive,
        triggerEmergencySOS,
        cancelEmergencySOS
      }}
    >
      {children}
    </SeniorContext.Provider>
  );
};

export const useSenior = () => {
  const context = useContext(SeniorContext);
  if (!context) {
    throw new Error('useSenior must be used within a SeniorProvider');
  }
  return context;
};
