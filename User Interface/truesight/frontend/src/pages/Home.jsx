import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CyberButton from '../components/CyberButton'
import CyberCard from '../components/CyberCard'
import ModelStatus from '../components/ModelStatus'
import LoadingScreen from '../components/LoadingScreen'

function Home() {
  const navigate = useNavigate()
  const [showLoading, setShowLoading] = useState(true)
  const [terminalLogs, setTerminalLogs] = useState([
    'System initialized',
    'Neural networks loaded',
    'Ready for analysis'
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const newLogs = [
        'GPU: 45% utilization',
        'Model: Active',
        'Queue: 2 tasks pending',
        'Last scan: 12:34:56'
      ]
      const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)]
      setTerminalLogs(prev => [...prev.slice(-4), randomLog])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleButtonClick = (path) => {
    // Optional: Add sound effect here
    navigate(path)
  }

  return (
    <>
      {showLoading && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}
      
      <div className="min-h-screen bg-cyber-black relative pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Hologram Panel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center mb-12"
          >
            <motion.h1
              className="text-7xl font-bold mb-4 glow-text-green text-cyber-green font-mono"
              animate={{ 
                textShadow: [
                  '0 0 20px #00ff95, 0 0 40px #00ff95',
                  '0 0 30px #00ff95, 0 0 60px #00ff95, 0 0 80px #00ff95',
                  '0 0 20px #00ff95, 0 0 40px #00ff95'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              TRUESIGHT
            </motion.h1>
            
            <div className="flex justify-center gap-4 flex-wrap mb-8">
              <motion.span
                className="px-4 py-2 bg-cyber-green/10 border border-cyber-green/30 text-cyber-green font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                SOURCE IDENTIFICATION
              </motion.span>
              <motion.span
                className="px-4 py-2 bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                DEEPFAKE DETECTION
              </motion.span>
              <motion.span
                className="px-4 py-2 bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                AUDIO/VIDEO ANALYSIS
              </motion.span>
            </div>
          </motion.div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CyberCard className="p-6 text-center" glowColor="green">
                <div className="text-4xl mb-4">📹</div>
                <h3 className="text-xl font-bold mb-4 glow-text-green text-cyber-green">
                  ANALYZE VIDEO
                </h3>
                <CyberButton
                  onClick={() => handleButtonClick('/live-detect')}
                  className="w-full"
                >
                  START DETECTION
                </CyberButton>
              </CyberCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <CyberCard className="p-6 text-center" glowColor="blue">
                <div className="text-4xl mb-4">🎵</div>
                <h3 className="text-xl font-bold mb-4 glow-text-blue text-cyber-blue">
                  ANALYZE AUDIO
                </h3>
                <CyberButton
                  onClick={() => handleButtonClick('/upload-analyze')}
                  variant="blue"
                  className="w-full"
                >
                  UPLOAD FILE
                </CyberButton>
              </CyberCard>
            </motion.div>
          </div>

          {/* Bottom Section: Model Status and Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="lg:col-span-2"
            >
              <CyberCard className="p-6" glowColor="green">
                <h3 className="text-xl font-bold mb-4 glow-text-green text-cyber-green">
                  QUICK ACTIONS
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <CyberButton
                    onClick={() => handleButtonClick('/source-identification')}
                    className="w-full"
                  >
                    🔍 SOURCE ID
                  </CyberButton>
                  <CyberButton
                    onClick={() => handleButtonClick('/upload-analyze')}
                    variant="blue"
                    className="w-full"
                  >
                    🚀 RUN MODEL
                  </CyberButton>
                  <CyberButton
                    onClick={() => handleButtonClick('/logs')}
                    className="w-full"
                  >
                    📋 VIEW LOGS
                  </CyberButton>
                  <CyberButton
                    onClick={() => handleButtonClick('/live-detect')}
                    variant="blue"
                    className="w-full"
                  >
                    ⚡ LIVE SCAN
                  </CyberButton>
                </div>
              </CyberCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <ModelStatus />
            </motion.div>
          </div>

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-6"
          >
            <CyberCard className="p-0" glowColor="green">
              <div className="p-4 border-b border-cyber-green/30">
                <h3 className="text-sm font-bold glow-text-green text-cyber-green font-mono">
                  SYSTEM TERMINAL
                </h3>
              </div>
              <div className="h-48 overflow-y-auto">
                {terminalLogs.map((log, index) => (
                  <div
                    key={index}
                    className="p-2 border-b border-cyber-green/10 font-mono text-xs text-cyber-green"
                  >
                    <span className="text-cyber-blue">[{new Date().toLocaleTimeString()}]</span>
                    <span className="ml-2">{log}</span>
                  </div>
                ))}
                <div className="p-2 flex items-center gap-2">
                  <span className="text-cyber-green">$</span>
                  <span className="animate-blink text-cyber-green">▊</span>
                </div>
              </div>
            </CyberCard>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Home
