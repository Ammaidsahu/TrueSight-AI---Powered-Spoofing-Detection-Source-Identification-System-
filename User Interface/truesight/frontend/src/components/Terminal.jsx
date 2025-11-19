import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Terminal({ logs = [], className = '' }) {
  const terminalRef = useRef(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className={`terminal-window ${className}`} ref={terminalRef}>
      <div className="p-4 space-y-1">
        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-cyber-green font-mono text-sm"
            >
              <span className="text-cyber-blue">[{new Date().toLocaleTimeString()}]</span>
              <span className="ml-2">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {logs.length === 0 && (
          <div className="text-cyber-green/50 font-mono text-sm">
            &gt; System ready. Waiting for commands...
          </div>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-cyber-green">$</span>
          <span className="animate-blink text-cyber-green">▊</span>
        </div>
      </div>
    </div>
  )
}


