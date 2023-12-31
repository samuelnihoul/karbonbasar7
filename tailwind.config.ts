import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "accent": "var(--accent)",
        "accent-bg": "var(--accent-bg)"
      }
    },
    fontSize: {
      'sm': '0.8vh',
      'base': '1vh',
      'm': '2vh',
      'l': '3vh',
      'xl': '5.25vh',
      '2xl': '9.563vh',
      '3xl': '10.953vh',
      '4xl': '20.441vh',
      '5xl': '40.052vh'
    },
  },
  plugins: []
}
export default config
