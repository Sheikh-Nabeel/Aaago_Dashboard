module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        treeLine: '#D4AF37',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"), // 👈 hide scrollbars
    // Optionally keep scrollbar styling:
    // require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
