import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ASCII_INTRO = `
╔═══════════════════════════════════════╗
║                                       ║
║         ████████╗██████╗ ██╗   ██╗   ║
║         ╚══██╔══╝██╔══██╗██║   ██║   ║
║            ██║   ██████╔╝██║   ██║   ║
║            ██║   ██╔══██╗██║   ██║   ║
║            ██║   ██║  ██║╚██████╔╝   ║
║            ╚═╝   ╚═╝  ╚═╝ ╚═════╝    ║
║                                       ║
║    DEEPFAKE DETECTION SYSTEM v2.0    ║
║                                       ║
╚═══════════════════════════════════════╝
`

export default function LoadingScreen({ onComplete }) {
  const [showIntro, setShowIntro] = useState(true)
  const [loadingText, setLoadingText] = useState('')
  const [dots, setDots] = useState('')

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(false)
    }, 3000)

    return () => clearTimeout(introTimer)
  }, [])

  useEffect(() => {
    if (!showIntro) {
      const loadingMessages = [
        'Loading neural networks...',
        'Initializing deepfake detection...',
        'Calibrating audio analysis...',
        'Preparing source identification...',
        'System ready...'
      ]

      let messageIndex = 0
      let charIndex = 0

      const typeInterval = setInterval(() => {
        if (messageIndex < loadingMessages.length) {
          const message = loadingMessages[messageIndex]
          if (charIndex < message.length) {
            setLoadingText(message.substring(0, charIndex + 1))
            charIndex++
          } else {
            setTimeout(() => {
              messageIndex++
              charIndex = 0
              setLoadingText('')
              if (messageIndex >= loadingMessages.length) {
                clearInterval(typeInterval)
                setTimeout(() => {
                  if (onComplete) onComplete()
                }, 500)
              }
            }, 1000)
          }
        }
      }, 50)

      return () => clearInterval(typeInterval)
    }
  }, [showIntro, onComplete])

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return ''
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(dotsInterval)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-cyber-black z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {showIntro ? (
          <motion.pre
            className="ascii-art text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {ASCII_INTRO}
          </motion.pre>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="loading-ring"></div>
            <div className="text-center">
              <motion.div
                className="text-cyber-green font-mono text-lg mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {loadingText}
                <span className="animate-blink">{dots}</span>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}


