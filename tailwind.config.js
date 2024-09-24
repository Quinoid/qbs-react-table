module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'], // Adjust paths according to your project
  theme: {
    extend: {
      keyframes: {
        // Keyframes for continuous loading animation
        pulseLoader: {
          '0%, 100%': { transform: 'translateX(-100%)', opacity: 0 },
          '50%': { transform: 'translateX(0)', opacity: 1 }
        }
      },
      animation: {
        'pulse-left': 'pulseLoader 1.5s infinite ease-in-out' // Infinite pulse animation
      }
    }
  },
  plugins: []
};
