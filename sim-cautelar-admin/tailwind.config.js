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
          primary: '#1a3b5c', // Azul Institucional
          secondary: '#2A9D8F', // Verde Teal (Identidade Visual)
          accent: '#E76F51', // Laranja (Alertas)
          light: '#f8f9fa',
        }
      }
    },
  },
  plugins: [],
}