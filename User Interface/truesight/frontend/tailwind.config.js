/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#0a0a0a',
          dark: '#0f0f0f',
          green: '#00ff95',
          blue: '#00c8ff',
          purple: '#8b5cf6',
          'green-glow': 'rgba(0, 255, 149, 0.5)',
          'blue-glow': 'rgba(0, 200, 255, 0.5)',
          'purple-glow': 'rgba(139, 92, 246, 0.5)',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'glow-pulse-fast': 'glow-pulse 1s ease-in-out infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'typing': 'typing 3s steps(40, end)',
        'blink': 'blink 1s step-end infinite',
        'rotate-ring': 'rotate-ring 2s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 20px rgba(0, 255, 149, 0.5), 0 0 40px rgba(0, 255, 149, 0.3)',
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 30px rgba(0, 255, 149, 0.8), 0 0 60px rgba(0, 255, 149, 0.5)',
          },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'typing': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'rotate-ring': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}


