/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto',
          'Helvetica Neue', 'Arial', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'
        ],
      },
      colors: {
        brand: {
          gold: {
            200: '#EAD99A',
            400: '#D7B656',
            500: '#C9A23A',
            600: '#B68B2D',
          },
        },
        neutral: {
          '050': '#F5F7FA',
          50:  '#F5F7FA',
          100: '#E6EBF2',
          200: '#C3CBD6',
          300: '#8D99A8',
          400: '#6E7A8C',
          500: '#525C6A',
          600: '#3B424D',
          700: '#2A2F37',
          800: '#1A1D22',
          900: '#111317',
          950: '#0B0C0E',
        },
        success: { 600: '#1C7C54' },
        warning: { 600: '#A55A00' },
        error:   { 600: '#B42318' },
        info:    { 600: '#1E6091' },
        accent: {
          silver: '#A7B0BF',
          green:  '#1FA97A',
        },
      },
      borderRadius: {
        DEFAULT: '12px',
        sm: '8px',
        md: '12px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,.06)',
        popover: '0 8px 24px rgba(0,0,0,.12)',
        header: '0 1px 0 rgba(0,0,0,.08)',
      },
    },
  },
  plugins: [],
};

