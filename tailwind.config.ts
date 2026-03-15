import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        airbnb: {
          DEFAULT: '#FF385C',
          dark: '#D70466',
          light: '#FF385C1A',
          text: '#222222',
          gray: '#717171',
          border: '#DDDDDD',
          hover: '#F7F7F7',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config