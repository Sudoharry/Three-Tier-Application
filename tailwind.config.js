/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#86868b',
        accent: '#06c',
        background: '#f5f5f7',
        surface: '#ffffff',
        'surface-secondary': '#f2f2f7',
        border: '#d2d2d7',
        error: '#ff3b30',
        success: '#34c759',
        neutral: '#e9e9eb',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 2px 5px -2px rgba(0, 0, 0, 0.1)',
        'apple-hover': '0 4px 12px -4px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};