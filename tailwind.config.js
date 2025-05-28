/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          950: '#1E1B4B',
        },
        secondary: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        accent: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
          950: '#500724',
        },
        background: {
          dark: '#030712',
          light: '#0F172A',
          card: '#1E293B',
        },
        neon: {
          blue: '#4361EE',
          purple: '#7209B7',
          teal: '#4CC9F0',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Audiowide"', 'cursive'],
      },
      boxShadow: {
        'neon-blue': '0 0 5px theme("colors.neon.blue"), 0 0 20px theme("colors.neon.blue")',
        'neon-purple': '0 0 5px theme("colors.neon.purple"), 0 0 20px theme("colors.neon.purple")',
        'neon-teal': '0 0 5px theme("colors.neon.teal"), 0 0 20px theme("colors.neon.teal")',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 5px rgba(67, 97, 238, 0.7), 0 0 10px rgba(67, 97, 238, 0.5)'
          },
          '100%': { 
            boxShadow: '0 0 10px rgba(67, 97, 238, 0.9), 0 0 20px rgba(67, 97, 238, 0.7), 0 0 30px rgba(67, 97, 238, 0.5)'
          },
        },
      },
    },
  },
  plugins: [],
};