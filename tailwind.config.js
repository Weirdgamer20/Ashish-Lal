/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        quantum: {
          bg: "#05070e",
          card: "#090d1a",
          border: "#18233c",
          glow: "#38bdf8",
          neon: "#818cf8",
          accent: "#22d3ee",
          emerald: "#10b981",
          purple: "#a855f7",
          amber: "#f59e0b",
          rose: "#f43f5e"
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace', 'ui-monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'quantum-spin': 'spin 12s linear infinite',
        'telemetry-scan': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
