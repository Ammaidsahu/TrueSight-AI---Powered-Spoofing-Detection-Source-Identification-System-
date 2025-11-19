import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import CyberButton from '../components/CyberButton'
import CyberCard from '../components/CyberCard'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

function Logs() {
  const navigate = useNavigate()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${API_BASE}/logs`)
      setLogs(response.data.logs || [])
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to fetch logs')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cyber-black relative pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-5xl font-bold mb-2 glow-text-green text-cyber-green font-mono">
                BLOCKCHAIN LOGS
              </h1>
              <p className="text-cyber-green/60 font-mono">
                Immutable audit trail of all system operations
              </p>
            </div>
            <div className="flex gap-4">
              <CyberButton onClick={() => navigate('/')} variant="blue">
                ← BACK
              </CyberButton>
              <CyberButton onClick={fetchLogs} disabled={loading}>
                {loading ? '⟳' : '↻'} REFRESH
              </CyberButton>
            </div>
          </div>
        </motion.div>

        <CyberCard className="p-6" glowColor="green">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold glow-text-green text-cyber-green font-mono">
              LOG ENTRIES ({logs.length})
            </h2>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-cyber-green rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-cyber-green/60 font-mono text-sm">LIVE</span>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="loading-ring"></div>
              <span className="ml-4 text-cyber-green font-mono">Loading logs...</span>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/30 rounded mb-4"
            >
              <p className="text-red-400 font-mono">⚠ {error}</p>
            </motion.div>
          )}

          {!loading && !error && (
            <div className="space-y-4">
              {logs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-50">📋</div>
                  <p className="text-cyber-green/50 font-mono">No logs available</p>
                </div>
              ) : (
                <AnimatePresence>
                  {logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CyberCard className="p-6" glowColor="blue">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-cyber-green/60 font-mono text-sm">TIMESTAMP</span>
                            <span className="text-cyber-green font-mono font-bold">
                              {log.timestamp}
                            </span>
                          </div>

                          <div className="border-t border-cyber-green/20 pt-3">
                            <div className="mb-2">
                              <span className="text-cyber-blue/60 font-mono text-sm">HASH:</span>
                            </div>
                            <div className="terminal-window p-3 bg-cyber-black/50">
                              <code className="text-cyber-green font-mono text-xs break-all">
                                {log.hash}
                              </code>
                            </div>
                          </div>

                          <div className="border-t border-cyber-green/20 pt-3">
                            <div className="mb-2">
                              <span className="text-cyber-blue/60 font-mono text-sm">PREVIOUS HASH:</span>
                            </div>
                            <div className="terminal-window p-3 bg-cyber-black/50">
                              <code className="text-cyber-green/60 font-mono text-xs break-all">
                                {log.previous_hash || 'Genesis Block'}
                              </code>
                            </div>
                          </div>

                          <div className="border-t border-cyber-green/20 pt-3">
                            <div className="mb-2">
                              <span className="text-cyber-blue/60 font-mono text-sm">DATA:</span>
                            </div>
                            <div className="terminal-window p-3 bg-cyber-black/50 max-h-48 overflow-y-auto">
                              <pre className="text-cyber-green font-mono text-xs">
                                {JSON.stringify(log.data, null, 2)}
                              </pre>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-cyber-green/20">
                            <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
                            <span className="text-cyber-green/60 font-mono text-xs">
                              Block #{index + 1} • Verified
                            </span>
                          </div>
                        </div>
                      </CyberCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          )}
        </CyberCard>
      </div>
    </div>
  )
}

export default Logs
