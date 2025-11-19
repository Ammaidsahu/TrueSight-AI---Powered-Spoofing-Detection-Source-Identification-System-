import { motion } from 'framer-motion'

export default function CyberCard({ children, className = '', glowColor = 'green' }) {
  const glowClasses = {
    green: 'border-cyber-green shadow-[0_0_20px_rgba(0,255,149,0.3)]',
    blue: 'border-cyber-blue shadow-[0_0_20px_rgba(0,200,255,0.3)]',
    purple: 'border-cyber-purple shadow-[0_0_20px_rgba(139,92,246,0.3)]',
  }

  return (
    <motion.div
      className={`cyber-card ${glowClasses[glowColor]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="scan-line relative z-10">
        {children}
      </div>
    </motion.div>
  )
}


