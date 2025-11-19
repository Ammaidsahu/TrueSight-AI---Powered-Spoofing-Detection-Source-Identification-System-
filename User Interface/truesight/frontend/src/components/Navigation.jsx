import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import CyberButton from './CyberButton'

const navItems = [
  { path: '/', label: 'HOME', icon: '⌂' },
  { path: '/live-detect', label: 'LIVE DETECT', icon: '📹' },
  { path: '/upload-analyze', label: 'UPLOAD', icon: '📤' },
  { path: '/source-identification', label: 'SOURCE ID', icon: '🔍' },
  { path: '/logs', label: 'LOGS', icon: '📋' },
]

export default function Navigation() {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-cyber-black/80 backdrop-blur-md border-b border-cyber-green/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <motion.span
              className="text-2xl font-bold glow-text-green text-cyber-green"
              whileHover={{ scale: 1.1 }}
            >
              TRUESIGHT
            </motion.span>
            <span className="text-cyber-green/50 font-mono text-xs">v2.0</span>
          </Link>

          <div className="flex items-center gap-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`px-4 py-2 font-mono text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-cyber-green glow-text-green border-b-2 border-cyber-green'
                        : 'text-cyber-green/60 hover:text-cyber-green'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon} {item.label}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}


