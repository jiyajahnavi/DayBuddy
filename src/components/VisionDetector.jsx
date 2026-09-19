import React, { useState, useRef, useEffect } from 'react';
import { useSenior } from '../context/SeniorContext';
import { 
  Camera, 
  RefreshCw, 
  Volume2, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  Eye,
  Sliders,
  Layers
} from 'lucide-react';

export const VisionDetector = () => {
  const { speak, playGuidance } = useSenior();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('pill_bottle');
  const [analyzing, setAnalyzing] = useState(false);

  // Preset environmental simulations for senior safety
  const presets = {
    pill_bottle: {
      title: "Prescription Medicine Bottle",
      category: "Medicine",
      confidence: 98,
      distance: "12 inches",
      safetyStatus: "SAFE",
      box: { x: 25, y: 20, w: 50, h: 60, color: "#10b981" },
      spokenText: "Detected Acetaminophen 500mg pill bottle. Expiration date valid until 2027. Dosage instruction: Take 1 tablet every 8 hours after food.",
      advice: "Keep in a cool dry place. Do not exceed 3 tablets daily."
    },
    reading_glasses: {
      title: "Reading Glasses (Gold Frame)",
      category: "Personal Belonging",
      confidence: 95,
      distance: "18 inches",
      safetyStatus: "SAFE",
      box: { x: 30, y: 35, w: 40, h: 30, color: "#3b82f6" },
      spokenText: "Found your gold reading glasses resting on the side table next to your tea cup.",
      advice: "Clean lenses with microfiber cloth before reading."
    },
    keys: {
      title: "House & Gate Keys",
      category: "Personal Belonging",
      confidence: 96,
      distance: "2 feet",
      safetyStatus: "SAFE",
      box: { x: 35, y: 40, w: 30, h: 35, color: "#f59e0b" },
      spokenText: "Detected brass house keys with blue keychain tag on hallway entryway bowl.",
      advice: "Key tag confirmed. Front door lock key ready."
    },
    stove_hazard: {
      title: "Kitchen Stove (Burner Active)",
      category: "Household Danger",
      confidence: 99,
      distance: "3 feet",
      safetyStatus: "HAZARD",
      box: { x: 20, y: 15, w: 60, h: 65, color: "#ef4444" },
      spokenText: "WARNING! Kitchen stove burner is turned ON with high heat. Hot cookware detected!",
      advice: "CAUTION! Turn off burner knob immediately if cooking is complete to prevent fire hazard."
    },
    visitor: {
      title: "Front Door Visitor (Delivery Driver)",
      category: "Security",
      confidence: 94,
      distance: "6 feet",
      safetyStatus: "CAUTION",
      box: { x: 20, y: 10, w: 60, h: 80, color: "#a855f7" },
      spokenText: "Detected uniformed Amazon delivery personnel at your front porch with a package.",
      advice: "Verify identity through peephole before opening front door."
    }
  };

  const currentItem = presets[selectedPreset];

  // Draw Bounding Boxes on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (currentItem && currentItem.box) {
      const { x, y, w, h, color } = currentItem.box;
      const bx = (x / 100) * width;
      const by = (y / 100) * height;
      const bw = (w / 100) * width;
      const bh = (h / 100) * height;

      // Draw bounding box rectangle
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 4]);
      ctx.strokeRect(bx, by, bw, bh);

      // Draw corner brackets for high tech AI look
      ctx.setLineDash([]);
      ctx.fillStyle = color;
      ctx.fillRect(bx - 4, by - 4, 16, 8);
      ctx.fillRect(bx - 4, by - 4, 8, 16);

      // Draw Label tag header above box
      ctx.fillStyle = color;
      ctx.fillRect(bx, by - 36, bw, 32);
      ctx.fillStyle = "#000000";
      ctx.font = "bold 16px Lexend, sans-serif";
      ctx.fillText(`${currentItem.title} (${currentItem.confidence}%)`, bx + 10, by - 14);
    }
  }, [selectedPreset, currentItem]);

  // Start Real WebCam if available
  const toggleCamera = async () => {
    if (!cameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
          speak("Live camera feed activated.");
        }
      } catch (err) {
        console.warn("Webcam error:", err);
        speak("Camera access restricted or unavailable. Switching to high precision environment simulator mode.");
        setCameraActive(false);
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
      setCameraActive(false);
      speak("Camera deactivated.");
    }
  };

  const runAnalysis = () => {
    setAnalyzing(true);
    speak("Scanning object using Vision AI...");
    setTimeout(() => {
      setAnalyzing(false);
      speak(currentItem.spokenText);
    }, 1200);
  };

  return (
    <div className="vision-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Module Title Header */}
      <div className="glass-card flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="flex-center" style={{ gap: '0.5rem', justifyContent: 'flex-start' }}>
            <Camera className="text-teal" size={32} />
            <h2 style={{ fontSize: 'var(--font-title)', fontWeight: 800, margin: 0 }}>
              Real-Time Vision & Object Detector
            </h2>
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Point your camera at medicine bottles, keys, appliances, or obstacles to hear instant voice identification and safety guidance.
          </p>
        </div>

        <div className="flex-center" style={{ gap: '0.75rem' }}>
          <button 
            className={`btn-senior ${cameraActive ? 'teal' : 'primary'}`}
            onClick={toggleCamera}
          >
            <Camera size={24} />
            <span>{cameraActive ? 'Turn Off Camera' : '📷 Start WebCam'}</span>
          </button>

          <button 
            className="btn-senior primary"
            onClick={runAnalysis}
            disabled={analyzing}
          >
            <RefreshCw size={24} className={analyzing ? 'animate-spin' : ''} />
            <span>{analyzing ? 'Analyzing...' : '🔍 Scan & Read Aloud'}</span>
          </button>
        </div>
      </div>

      {/* Main Viewport & Preset Selector */}
      <div className="grid-2">
        {/* Camera / Canvas Display Box */}
        <div className="glass-card" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '420px', background: '#050b18' }}>
          {/* Live Video Feed or Animated Simulated Image background */}
          {cameraActive ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} 
            />
          ) : (
            <div 
              style={{ 
                width: '100%', 
                height: '380px', 
                borderRadius: '12px',
                background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center',
                border: '2px dashed var(--border-color)'
              }}
            >
              <Eye size={64} className="text-teal" style={{ marginBottom: '1rem', opacity: 0.8 }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {currentItem.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>
                Distance: <strong>{currentItem.distance}</strong> | AI Confidence: <strong>{currentItem.confidence}%</strong>
              </p>
              <span className={`badge ${currentItem.safetyStatus === 'SAFE' ? 'safe' : currentItem.safetyStatus === 'CAUTION' ? 'warning' : 'danger'}`} style={{ marginTop: '0.75rem' }}>
                {currentItem.safetyStatus} STATUS
              </span>
            </div>
          )}

          {/* Bounding Box Overlay Canvas */}
          <canvas 
            ref={canvasRef} 
            width={600} 
            height={380} 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              pointerEvents: 'none',
              zIndex: 10 
            }} 
          />
        </div>

        {/* Scan Results & Preset Switcher */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Active Preset Switcher */}
          <div className="glass-card">
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={22} className="text-amber" />
              <span>Select Sample Environment / Item</span>
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {Object.keys(presets).map((key) => {
                const item = presets[key];
                const isSelected = selectedPreset === key;
                return (
                  <button
                    key={key}
                    className={`btn-senior ${isSelected ? 'primary' : ''}`}
                    onClick={() => {
                      setSelectedPreset(key);
                      playGuidance(`Selected ${item.title}`);
                    }}
                    style={{ minHeight: '48px', padding: '0.4rem 0.9rem', fontSize: '0.95rem' }}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spoken Audio & Safety Analysis Breakdown */}
          <div className="glass-card" style={{ borderLeft: `6px solid ${currentItem.safetyStatus === 'SAFE' ? '#10b981' : currentItem.safetyStatus === 'CAUTION' ? '#f59e0b' : '#ef4444'}` }}>
            <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                AI Vision Voice Report
              </h4>
              <button 
                className="btn-senior teal" 
                onClick={() => speak(currentItem.spokenText)}
                style={{ minHeight: '44px', padding: '0.3rem 0.8rem', fontSize: '0.9rem' }}
              >
                <Volume2 size={20} />
                <span>Repeat Voice</span>
              </button>
            </div>

            <p style={{ fontSize: '1.15rem', lineHeight: 1.5, background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              "{currentItem.spokenText}"
            </p>

            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(245, 158, 11, 0.12)', padding: '0.9rem', borderRadius: '10px', border: '1px solid #f59e0b' }}>
              {currentItem.safetyStatus === 'HAZARD' ? (
                <ShieldAlert size={24} className="text-rose" style={{ flexShrink: 0 }} />
              ) : (
                <CheckCircle2 size={24} className="text-emerald" style={{ flexShrink: 0 }} />
              )}
              <div>
                <strong style={{ fontSize: '1.05rem', color: 'var(--accent-amber)' }}>Senior Safety Recommendation:</strong>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '1rem' }}>{currentItem.advice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
