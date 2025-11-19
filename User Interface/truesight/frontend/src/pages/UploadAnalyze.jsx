import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import CyberButton from '../components/CyberButton'
import CyberCard from '../components/CyberCard'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

function UploadAnalyze() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResults(null)
      setError(null)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setResults(null)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first')
      return
    }

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const isVideo = file.type.startsWith('video/')
      const endpoint = isVideo ? '/analyze/video' : '/analyze/audio'
      
      const response = await axios.post(`${API_BASE}${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setResults(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Upload failed')
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
          <h1 className="text-5xl font-bold mb-4 glow-text-green text-cyber-green font-mono">
            UPLOAD & ANALYZE
          </h1>
          <p className="text-cyber-green/60 font-mono">
            Upload audio or video files for deepfake detection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CyberCard className="p-6" glowColor="green">
            <div className="mb-4">
              <CyberButton
                onClick={() => navigate('/')}
                variant="blue"
                className="mb-4"
              >
                ← BACK
              </CyberButton>
            </div>

            <div
              className={`terminal-input border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-cyber-green bg-cyber-green/10'
                  : 'border-cyber-green/30 hover:border-cyber-green/60'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <input
                type="file"
                id="file-upload"
                accept="audio/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="text-6xl mb-4">📁</div>
              {file ? (
                <div>
                  <p className="text-cyber-green font-mono font-bold mb-2">{file.name}</p>
                  <p className="text-cyber-green/60 font-mono text-sm">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-cyber-green/80 font-mono mb-2">
                    Click or drag to select file
                  </p>
                  <p className="text-cyber-green/50 font-mono text-sm">
                    Supports: Audio, Video files
                  </p>
                </div>
              )}
            </div>

            {file && (
              <div className="mt-4 p-4 bg-cyber-black/50 border border-cyber-green/20 rounded">
                <div className="font-mono text-sm space-y-2 text-cyber-green/80">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="text-cyber-green">{file.type || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="text-cyber-green">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
              </div>
            )}

            <CyberButton
              onClick={handleUpload}
              disabled={!file || loading}
              className="w-full mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading-ring w-4 h-4 border-2"></span>
                  ANALYZING...
                </span>
              ) : (
                '🚀 ANALYZE MEDIA'
              )}
            </CyberButton>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded"
              >
                <p className="text-red-400 font-mono text-sm">⚠ {error}</p>
              </motion.div>
            )}
          </CyberCard>

          <div>
            {results && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <CyberCard className="p-6 mb-6" glowColor="blue">
                  <h3 className="text-xl font-bold mb-4 glow-text-blue text-cyber-blue font-mono">
                    ANALYSIS RESULTS
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries(results.scores || {}).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between mb-2">
                          <span className="text-cyber-green/80 font-mono text-sm uppercase">
                            {key.replace(/_/g, ' ')}
                          </span>
                          <span className="text-cyber-green font-mono font-bold">
                            {(value * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-cyber-black h-2 border border-cyber-green/30">
                          <motion.div
                            className="h-full bg-cyber-green"
                            initial={{ width: 0 }}
                            animate={{ width: `${value * 100}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CyberCard>

                {results.verdict && (
                  <CyberCard
                    className="p-6 text-center"
                    glowColor={results.verdict === 'authentic' ? 'green' : 'purple'}
                  >
                    <motion.div
                      className={`text-3xl font-bold font-mono ${
                        results.verdict === 'authentic'
                          ? 'glow-text-green text-cyber-green'
                          : 'text-red-400'
                      }`}
                      animate={{
                        textShadow: results.verdict === 'authentic'
                          ? ['0 0 20px #00ff95', '0 0 40px #00ff95', '0 0 20px #00ff95']
                          : ['0 0 20px #ef4444', '0 0 40px #ef4444', '0 0 20px #ef4444']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {results.verdict === 'authentic' ? '✓ AUTHENTIC' : '⚠ POTENTIALLY SPOOFED'}
                    </motion.div>
                  </CyberCard>
                )}
              </motion.div>
            )}

            {!results && (
              <CyberCard className="p-6" glowColor="blue">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-50">📊</div>
                  <p className="text-cyber-green/50 font-mono">
                    Analysis results will appear here
                  </p>
                </div>
              </CyberCard>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadAnalyze
