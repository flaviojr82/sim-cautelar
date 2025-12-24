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
          dark: '#0f172a',      // Fundo do Menu (Slate 900 - Muito profissional)
          primary: '#2A9D8F',   // Teal (Identidade Principal)
          secondary: '#264653', // Azul Petróleo
          accent: '#E76F51',    // Laranja (Alertas)
          surface: '#f8fafc',   // Fundo da Tela (Slate 50)
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}