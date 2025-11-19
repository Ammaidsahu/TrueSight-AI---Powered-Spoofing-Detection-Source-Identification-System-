import { motion } from 'framer-motion'

export default function CyberButton({ 
  children, 
  onClick, 
  variant = 'green', 
  disabled = false,
  className = '',
  icon = null 
}) {
  const baseClasses = 'cyber-button relative overflow-hidden'
  const variantClasses = variant === 'blue' ? 'cyber-button-blue' : ''
  
  return (
    <motion.button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {children}
      </span>
    </motion.button>
  )
}


