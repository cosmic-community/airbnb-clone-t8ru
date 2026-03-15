/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        airbnb: {
          DEFAULT: '#FF385C',
          dark: '#E31C5F',
          light: '#FF5A7D',
          bg: '#F7F7F7',
          gray: '#717171',
          text: '#222222',
          border: '#DDDDDD',
          star: '#FF385C'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Circular', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      },
      maxWidth: {
        'screen-2xl': '1760px'
      }
    }
  },
  plugins: []
}