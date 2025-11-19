import { motion } from 'framer-motion'
import CyberCard from './CyberCard'

export default function ModelStatus() {
  const gpuUsage = 45
  const cpuUsage = 23
  const tasksInQueue = 2
  const modelStatus = 'ACTIVE'

  return (
    <CyberCard className="p-6" glowColor="blue">
      <h3 className="text-xl font-bold mb-4 glow-text-blue text-cyber-blue">
        MODEL ENGINE STATUS
      </h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-cyber-green/80 font-mono text-sm">GPU</span>
            <span className="text-cyber-green font-mono font-bold">{gpuUsage}%</span>
          </div>
          <div className="w-full bg-cyber-black h-2 border border-cyber-green/30">
            <motion.div
              className="h-full bg-cyber-blue"
              initial={{ width: 0 }}
              animate={{ width: `${gpuUsage}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-cyber-green/80 font-mono text-sm">CPU</span>
            <span className="text-cyber-green font-mono font-bold">{cpuUsage}%</span>
          </div>
          <div className="w-full bg-cyber-black h-2 border border-cyber-green/30">
            <motion.div
              className="h-full bg-cyber-green"
              initial={{ width: 0 }}
              animate={{ width: `${cpuUsage}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-cyber-green/20">
          <span className="text-cyber-green/80 font-mono text-sm">STATUS</span>
          <motion.span
            className="text-cyber-green font-mono font-bold"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {modelStatus}
          </motion.span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-cyber-green/80 font-mono text-sm">QUEUE</span>
          <span className="text-cyber-blue font-mono font-bold">{tasksInQueue} tasks</span>
        </div>
      </div>
    </CyberCard>
  )
}


