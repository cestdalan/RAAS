/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gallery: {
          dark: '#0a0a0a',
          darker: '#050505',
          card: '#121212',
          surface: '#171615',
          gold: '#c5a059',
          goldLight: '#e4c483',
          goldDark: '#8e6c2e',
          amber: '#b36b2c',
          rust: '#873e23',
          muted: '#8a857e',
          border: 'rgba(197, 160, 89, 0.2)'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive', 'serif'],
      },
      letterSpacing: {
        widestExtra: '0.25em',
        ultra: '0.35em',
      }
    },
  },
  plugins: [],
}
