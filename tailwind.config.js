/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      animation: {
        'float-down': 'floatDown 6s ease-in-out infinite',
        'float-down-delay': 'floatDown 8s ease-in-out infinite',
        'float-down-alt': 'floatDown 7s ease-in-out infinite'
      },
      keyframes: {
        floatDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(15px)' }
        }
      }
    }
  },
  plugins: []
};
