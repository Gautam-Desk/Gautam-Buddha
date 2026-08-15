/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm, sacred palette
        saffron: {
          50: "#fff8ec",
          100: "#fdecce",
          200: "#fbd88d",
          300: "#f7b94a",
          400: "#f19a26",
          500: "#e07a14",
          600: "#b85a0e",
          700: "#8e3f0c",
          800: "#5e2a08",
          900: "#3a1905",
        },
        temple: {
          50: "#fbf6f0",
          100: "#f1e4cf",
          200: "#e0c79a",
          900: "#2a1a0c",
          950: "#150d05",
        },
        gold: {
          400: "#d9a441",
          500: "#b8862a",
          600: "#8c6320",
        },
      },
      fontFamily: {
        heading: ['"Cinzel"', "serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        quote: ['"Cormorant Garamond"', "serif"],
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "rise": "rise 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        rise: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
