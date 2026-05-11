/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0B1F4D',
        'royal': '#123C73',
        'gold': '#C9A13B',
        'gold-soft': '#D8B45A',
        'forest': '#123524',
        'emerald': '#1E5631',
        'cream': '#F7F3E8',
        'beige': '#EFE7D2',
        'warm-white': '#FFFDF8',
        'border-light': '#E5E0D2',
        'soft-gray': '#6B7280',
        'dark-text': '#1E1E1E',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
