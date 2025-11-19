import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import CyberButton from '../components/CyberButton'
import CyberCard from '../components/CyberCard'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const result = login(username, password)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.error || 'Login failed')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-cyber-black relative pt-24 pb-20 flex items-center justify-center">
      <div className="max-w-md w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CyberCard className="p-8" glowColor="green">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 glow-text-green text-cyber-green font-mono">
                TRUESIGHT
              </h1>
              <p className="text-cyber-green/60 font-mono">Authentication Required</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-cyber-green font-mono text-sm mb-2">
                  USERNAME
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full terminal-input"
                  placeholder="Enter username"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-cyber-green font-mono text-sm mb-2">
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full terminal-input"
                  placeholder="Enter password"
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-500/20 border border-red-500/50 rounded text-red-400 font-mono text-sm"
                >
                  {error}
                </motion.div>
              )}

              <CyberButton
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'AUTHENTICATING...' : 'LOGIN'}
              </CyberButton>
            </form>

            <div className="mt-6 pt-6 border-t border-cyber-green/20">
              <p className="text-cyber-green/50 font-mono text-xs text-center">
                Demo Mode: Any username/password will work
              </p>
            </div>
          </CyberCard>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
