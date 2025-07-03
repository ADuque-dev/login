/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'libre-franklin': ['"Libre Franklin"', 'sans-serif'],
      },
      colors: {
        'custom-teal': 'var(--Color-500, #00BBB4)',
        'custom-red': 'var(--Color-500, #F16F63)',
        'custom-dark-blue': 'var(--Color-500, #25215F)',
        'custom-light-gray': 'var(--Color-50, #E9E9EF)',
        'custom-gray-500': 'var(--Gris-gris-500, #8C8C8C)',
        'custom-gray-600': 'var(--Gris-gris-600, #595959)',
      },
    },
  },
  plugins: [],
}