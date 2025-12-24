/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tjpb: {
          bg: '#F5F5F5',       // Fundo cinza claro exato
          sidebarTop: '#3F6F74',
          sidebarBottom: '#0F99A8',
          cardStart: '#42969F',
          cardEnd: '#00B0C4',
          headerText: '#1E1E1E',
          textDark: '#1E2939',
        }
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'], // O design pede Arial
        segoe: ['"Segoe UI"', 'sans-serif'], // Para o Header
      },
      boxShadow: {
        'header': '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'card': '0px 10px 15px -5px rgba(36, 77, 119, 0.2), 0px 8px 10px -6px rgba(36, 77, 119, 0.2)',
      }
    },
  },
  plugins: [],
}