/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        headerColor: "#242530",
        textColor: "#ffffff",
        btnColor: "#0172F4",
        noteColor: "#FFCF7C",
        customRed: "rgba(172, 30, 35, 1)",
        testimonialCard: "#F9F9F9",
      },
      fontWeight: {
        customWeight: 500,
      },
      height: {
        headerHeight: "74px",
      },
      maxHeight: {
        navbarHeight: "420px",
      },
      minHeight: {
        customHeight: "530px",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
        dancingScript: ["Dancing Script"],
      },
      fontSize: {
        logoText: "30px",
        customText: "15px",
        tablehHeaderText: "16px",
        headerText: ["50px", "60px"],
        tableHeader: ["15px", "25px"],
      },

      boxShadow: {
        custom: "0 0 15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
