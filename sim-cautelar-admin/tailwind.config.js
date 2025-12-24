/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1d2939',      // Fundo do Menu (Carvão Profundo)
          primary: '#2A9D8F',   // O Teal (Verde-Água da Logo)
          secondary: '#264653', // Azul Petróleo (Complementar)
          accent: '#E76F51',    // Laranja (Alertas/Destaques)
          surface: '#f3f4f6',   // Fundo da Tela (Cinza Claro)
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}