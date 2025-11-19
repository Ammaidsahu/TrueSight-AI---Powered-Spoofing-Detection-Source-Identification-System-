import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import CyberCard from '../../components/CyberCard'
import CyberButton from '../../components/CyberButton'

const adminMenuItems = [
  { path: '/admin/users', label: 'MANAGE USER ACCOUNTS', icon: '👥', description: 'Create, edit, and manage user accounts' },
  { path: '/admin/parameters', label: 'CONFIGURE DETECTION PARAMETERS', icon: '⚙️', description: 'Adjust detection thresholds and settings' },
  { path: '/admin/dashboard', label: 'MONITOR REALTIME DASHBOARD', icon: '📊', description: 'View real-time system metrics and activity' },
  { path: '/admin/forensics', label: 'REVIEW FORENSICS LOGS', icon: '🔍', description: 'Analyze forensic evidence and logs' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-cyber-black relative pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold mb-4 glow-text-green text-cyber-green font-mono">
            ADMIN DASHBOARD
          </h1>
          <p className="text-cyber-green/60 font-mono">
            Welcome, {user?.username} | System Administration Panel
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminMenuItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CyberCard className="p-6" glowColor={index % 2 === 0 ? 'green' : 'blue'}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 glow-text-green text-cyber-green font-mono">
                      {item.label}
                    </h3>
                    <p className="text-cyber-green/60 font-mono text-sm mb-4">
                      {item.description}
                    </p>
                    <CyberButton
                      onClick={() => navigate(item.path)}
                      variant={index % 2 === 0 ? 'green' : 'blue'}
                      className="w-full"
                    >
                      ACCESS
                    </CyberButton>
                  </div>
                </div>
              </CyberCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <CyberCard className="p-6" glowColor="green">
            <h3 className="text-lg font-bold mb-4 glow-text-green text-cyber-green font-mono">
              QUICK STATS
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyber-green font-mono">24</div>
                <div className="text-cyber-green/60 font-mono text-xs mt-1">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyber-blue font-mono">1,234</div>
                <div className="text-cyber-green/60 font-mono text-xs mt-1">Total Scans</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyber-purple font-mono">98.5%</div>
                <div className="text-cyber-green/60 font-mono text-xs mt-1">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyber-green font-mono">12</div>
                <div className="text-cyber-green/60 font-mono text-xs mt-1">Alerts</div>
              </div>
            </div>
          </CyberCard>
        </motion.div>
      </div>
    </div>
  )
}

