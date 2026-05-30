export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFDF8",
        "soft-pink": "#F9E4E8",
        "pink-deep": "#FADADD",
        champagne: "#D8B47A",
        "champagne-dk": "#C9A96E",
        "champagne-lt": "#EDD9A3",
        "text-dark": "#3B2D2D",
        "text-mid": "#6B5050",
        "text-light": "#9A7B7B",
      },
      fontFamily: {
        script: ["Great Vibes", "cursive"],
        serif: ["Playfair Display", "serif"],
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
