import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CyberButton from '../components/CyberButton'
import CyberCard from '../components/CyberCard'

function LiveDetect() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const intervalRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [scores, setScores] = useState({
    liveness: 0.85,
    lipsync: 0.92,
    spoofing: 0.15
  })
  const [isDetecting, setIsDetecting] = useState(false)

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [stream])

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: true
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setIsDetecting(true)
      
      // Simulate score updates
      intervalRef.current = setInterval(() => {
        setScores(prev => ({
          liveness: Math.max(0.7, Math.min(0.99, prev.liveness + (Math.random() - 0.5) * 0.05)),
          lipsync: Math.max(0.8, Math.min(0.99, prev.lipsync + (Math.random() - 0.5) * 0.03)),
          spoofing: Math.max(0.1, Math.min(0.4, prev.spoofing + (Math.random() - 0.5) * 0.05))
        }))
      }, 2000)
    } catch (error) {
      console.error('Error accessing webcam:', error)
      alert('Error accessing webcam. Please check permissions.')
    }
  }

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsDetecting(false)
  }

  const getVerdictColor = () => {
    return scores.spoofing < 0.3 ? 'cyber-green' : 'red-500'
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
            LIVE DETECTION
          </h1>
          <p className="text-cyber-green/60 font-mono">
            Real-time deepfake and spoofing detection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <CyberCard className="p-6" glowColor="green">
              <div className="mb-4 flex gap-4 flex-wrap">
                <CyberButton
                  onClick={startWebcam}
                  disabled={isDetecting}
                >
                  ▶ START DETECTION
                </CyberButton>
                <CyberButton
                  onClick={stopWebcam}
                  disabled={!isDetecting}
                  variant="blue"
                >
                  ⏹ STOP
                </CyberButton>
                <CyberButton
                  onClick={() => navigate('/')}
                  variant="blue"
                >
                  ← BACK
                </CyberButton>
              </div>

              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded border-2 border-cyber-green/30 bg-black"
                  style={{ display: stream ? 'block' : 'none', minHeight: '480px' }}
                />
                {!stream && (
                  <div className="w-full h-[480px] rounded border-2 border-cyber-green/30 bg-cyber-black flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📹</div>
                      <p className="text-cyber-green/60 font-mono">
                        Webcam preview will appear here
                      </p>
                    </div>
                  </div>
                )}
                {isDetecting && (
                  <motion.div
                    className="absolute top-4 right-4 px-3 py-1 bg-cyber-green/20 border border-cyber-green rounded"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-cyber-green font-mono text-sm font-bold">
                      ● LIVE
                    </span>
                  </motion.div>
                )}
              </div>
            </CyberCard>
          </div>

          <div>
            <CyberCard className="p-6" glowColor="blue">
              <h3 className="text-lg font-bold mb-4 glow-text-blue text-cyber-blue font-mono">
                DETECTION STATUS
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-cyber-green/80 font-mono text-sm">LIVENESS</span>
                    <span className="text-cyber-green font-mono font-bold">
                      {(scores.liveness * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-cyber-black h-2 border border-cyber-green/30">
                    <motion.div
                      className="h-full bg-cyber-green"
                      initial={{ width: 0 }}
                      animate={{ width: `${scores.liveness * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-cyber-blue/80 font-mono text-sm">LIP SYNC</span>
                    <span className="text-cyber-blue font-mono font-bold">
                      {(scores.lipsync * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-cyber-black h-2 border border-cyber-blue/30">
                    <motion.div
                      className="h-full bg-cyber-blue"
                      initial={{ width: 0 }}
                      animate={{ width: `${scores.lipsync * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-red-400/80 font-mono text-sm">SPOOFING RISK</span>
                    <span className="text-red-400 font-mono font-bold">
                      {(scores.spoofing * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-cyber-black h-2 border border-red-400/30">
                    <motion.div
                      className="h-full bg-red-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${scores.spoofing * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </CyberCard>
          </div>
        </div>

        {isDetecting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CyberCard className="p-6 text-center" glowColor={scores.spoofing < 0.3 ? 'green' : 'purple'}>
              <motion.div
                className={`text-3xl font-bold font-mono ${
                  scores.spoofing < 0.3
                    ? 'glow-text-green text-cyber-green'
                    : 'text-red-400'
                }`}
                animate={{
                  textShadow: scores.spoofing < 0.3
                    ? ['0 0 20px #00ff95', '0 0 40px #00ff95', '0 0 20px #00ff95']
                    : ['0 0 20px #ef4444', '0 0 40px #ef4444', '0 0 20px #ef4444']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {scores.spoofing < 0.3 ? '✓ AUTHENTIC' : '⚠ POTENTIALLY SPOOFED'}
              </motion.div>
            </CyberCard>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default LiveDetect
