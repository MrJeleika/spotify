/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        gray: '#A0A0A0',
        background: '#121212',
        green: '#1ED760',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1' }],
        base: ['1rem', { lineHeight: '1' }],
        lg: ['1.125rem', { lineHeight: '1' }],
        xl: ['1.25rem', { lineHeight: '1' }],
        '2xl': ['1.5rem', { lineHeight: '1' }],
        '3xl': ['1.875rem', { lineHeight: '1' }],
        '4xl': ['2.25rem', { lineHeight: '1' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      screens: {
        lt: '320px',
      },
    },
  },
  plugins: [],
}
