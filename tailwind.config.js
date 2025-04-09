/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["'Nunito Sans'", "sans-serif"],
      },
      screens: {
        '3xl': '1920px', // Extra large screens
        '2xl': '1536px', // Tailwind default
        'xl': '1280px',  // Tailwind default
        'lg': '1024px',  // Tailwind default
        'md': '768px',   // Tailwind default
        'sm': '640px',   // Tailwind default
        'xs': '480px',   // Custom extra small breakpoint
        // For Header
        'Header':'1050px'
      },
    },
  },
  plugins: [],
}