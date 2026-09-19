import '@testing-library/jest-dom';

// Mock SpeechSynthesis API for Vitest environment
if (typeof window !== 'undefined') {
  window.speechSynthesis = {
    speak: () => {},
    cancel: () => {},
    pause: () => {},
    resume: () => {},
    getVoices: () => [
      { name: 'Google US English', lang: 'en-US', voiceURI: 'google-us-en' },
      { name: 'Samantha', lang: 'en-US', voiceURI: 'samantha' }
    ],
    onvoiceschanged: null
  };

  window.SpeechSynthesisUtterance = function (text) {
    this.text = text;
    this.rate = 1;
    this.pitch = 1;
    this.lang = 'en-US';
  };
}
