import { useState } from 'react'
import { motion } from 'framer-motion'
import CyberCard from '../../components/CyberCard'
import CyberButton from '../../components/CyberButton'

export default function DetectionParameters() {
  const [parameters, setParameters] = useState({
    livenessThreshold: 0.85,
    lipsyncThreshold: 0.90,
    spoofingThreshold: 0.30,
    audioDeepfakeThreshold: 0.75,
    videoDeepfakeThreshold: 0.80,
    confidenceLevel: 0.95,
    maxProcessingTime: 30,
    enableRealTimeAnalysis: true,
    enableAudioAnalysis: true,
    enableVideoAnalysis: true,
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (key, value) => {
    setParameters({ ...parameters, [key]: value })
    setSaved(false)
  }

  const handleSave = () => {
    // In production, this would save to backend
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    setParameters({
      livenessThreshold: 0.85,
      lipsyncThreshold: 0.90,
      spoofingThreshold: 0.30,
      audioDeepfakeThreshold: 0.75,
      videoDeepfakeThreshold: 0.80,
      confidenceLevel: 0.95,
      maxProcessingTime: 30,
      enableRealTimeAnalysis: true,
      enableAudioAnalysis: true,
      enableVideoAnalysis: true,
    })
    setSaved(false)
  }

  return (
    <div className="min-h-screen bg-cyber-black relative pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold mb-4 glow-text-green text-cyber-green font-mono">
            CONFIGURE DETECTION PARAMETERS
          </h1>
          <p className="text-cyber-green/60 font-mono">
            Adjust detection thresholds and system settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Threshold Settings */}
          <CyberCard className="p-6" glowColor="green">
            <h3 className="text-xl font-bold mb-6 glow-text-green text-cyber-green font-mono">
              DETECTION THRESHOLDS
            </h3>
            <div className="space-y-6">
              {[
                { key: 'livenessThreshold', label: 'Liveness Detection', min: 0, max: 1, step: 0.01 },
                { key: 'lipsyncThreshold', label: 'Lip Sync Accuracy', min: 0, max: 1, step: 0.01 },
                { key: 'spoofingThreshold', label: 'Spoofing Detection', min: 0, max: 1, step: 0.01 },
                { key: 'audioDeepfakeThreshold', label: 'Audio Deepfake', min: 0, max: 1, step: 0.01 },
                { key: 'videoDeepfakeThreshold', label: 'Video Deepfake', min: 0, max: 1, step: 0.01 },
                { key: 'confidenceLevel', label: 'Confidence Level', min: 0, max: 1, step: 0.01 },
              ].map((param) => (
                <div key={param.key}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-cyber-green/80 font-mono text-sm">
                      {param.label}
                    </label>
                    <span className="text-cyber-green font-mono font-bold">
                      {(parameters[param.key] * 100).toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={param.min}
                    max={param.max}
                    step={param.step}
                    value={parameters[param.key]}
                    onChange={(e) => handleChange(param.key, parseFloat(e.target.value))}
                    className="w-full h-2 bg-cyber-black rounded-lg appearance-none cursor-pointer accent-cyber-green"
                  />
                </div>
              ))}
            </div>
          </CyberCard>

          {/* System Settings */}
          <CyberCard className="p-6" glowColor="blue">
            <h3 className="text-xl font-bold mb-6 glow-text-blue text-cyber-blue font-mono">
              SYSTEM SETTINGS
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-cyber-green/80 font-mono text-sm mb-2 block">
                  Max Processing Time (seconds)
                </label>
                <input
                  type="number"
                  min="10"
                  max="300"
                  value={parameters.maxProcessingTime}
                  onChange={(e) => handleChange('maxProcessingTime', parseInt(e.target.value))}
                  className="terminal-input w-full"
                />
              </div>

              {[
                { key: 'enableRealTimeAnalysis', label: 'Enable Real-Time Analysis' },
                { key: 'enableAudioAnalysis', label: 'Enable Audio Analysis' },
                { key: 'enableVideoAnalysis', label: 'Enable Video Analysis' },
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <label className="text-cyber-green/80 font-mono text-sm">
                    {setting.label}
                  </label>
                  <button
                    onClick={() => handleChange(setting.key, !parameters[setting.key])}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      parameters[setting.key] ? 'bg-cyber-green' : 'bg-cyber-green/30'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        parameters[setting.key] ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </CyberCard>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex gap-4"
        >
          <CyberButton onClick={handleSave} className="flex-1">
            {saved ? '✓ SAVED' : 'SAVE CONFIGURATION'}
          </CyberButton>
          <CyberButton onClick={handleReset} variant="blue" className="flex-1">
            RESET TO DEFAULTS
          </CyberButton>
        </motion.div>
      </div>
    </div>
  )
}

