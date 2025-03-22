/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        myriad: ["Myriad Pro", "sans-serif"],
      },
      colors: {
        secondary: "#B0B0B0", // This is the correct way to define a color
      },
      fontWeight: {
        normal: "400",
        semibold: "600",
        bold: "700",
        "bold-cond": "800",
      },
    },
  },
  plugins: [],
};
