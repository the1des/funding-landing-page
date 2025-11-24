/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./scripts.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Rajdhani", "ui-sans-serif", "system-ui"],
      },
      colors: {
        teal1: "#00A7A7",
        navy: "#0B1C24",
        aqua: "#14B8A6",
        steel: "#8CA3AF",
        ivory: "#F8FAFB",
        charcoal: "#1C1F23",
        amber1: "#ECA72C",
        white: "#FFFFFF",
      },
      boxShadow: {
        soft: "0 0 0 1px rgba(255,255,255,.06), 0 10px 30px rgba(0,0,0,.25)",
      },
    },
  },
};
