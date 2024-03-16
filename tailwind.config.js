/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins_400Regular",
        "poppins-medium": "Poppins_500Medium",
        "poppins-semibold": "Poppins_600SemiBold",
        "roboto-medium": "Roboto_500Medium",
        "montserrat-semibold": "Montserrat_600SemiBold",
      },
    },
  },
  plugins: [],
};
