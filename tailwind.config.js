/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF4D6D",
        "primary-dark": "#E63956",
        "accent-orange": "#FF9F1C",
        "accent-purple": "#7B61FF",
        "accent-blue": "#2563EB",
        background: "#FFF7F8",
        card: "#FFFFFF",
        "text-dark": "#1F2937",
        "text-secondary": "#64748B",
        success: "#16A34A",
        warning: "#F59E0B",
        danger: "#DC2626",
      },
      borderRadius: {
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
}
