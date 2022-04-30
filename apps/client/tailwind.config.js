const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media",

  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          primary: colors.sky["500"],
          secondary: colors.sky["700"],
          dark: colors.sky["900"],
          medium: colors.sky["800"],
          regular: colors.sky["600"],
          light: colors.sky["100"],
          extralight: colors.sky["50"],
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};

