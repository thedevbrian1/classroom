/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#E55210',
        'brand-gray': '#3B3C36',
        'brand-blue': '#2E65D6',
      }
    },
  },
  plugins: [],
}

