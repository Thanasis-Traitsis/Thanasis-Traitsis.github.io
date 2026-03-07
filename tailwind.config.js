/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mulish', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#3B82F6', // Modern blue
          hover: '#2563EB', // Darker blue for hover
        },
      },
    },
  },
  plugins: [],
}

