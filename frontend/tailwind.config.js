/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: '#00FFB3',      // Verde Claro/Menta
        brandDark: '#00CF91',  // Verde Escuro
        darkBg: '#00140C',     // Fundo Dark
        lightBg: '#E6E6E6',    // Fundo Light
      },
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'marquee-fast': 'marquee 45s linear infinite',
        'marquee-slow': 'marquee 65s linear infinite',
      },
    },
  }
}