
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:"#373737",
        secondary:{
          DEFAULT:"#232023",
          100:"#333333",
          200:"#A7A6BA",
          300:"#160D08",
          400:"#020403",
          500:"#808080",
          600:"#D3D3D3"
        }
      },
    },
  },
  plugins: [],
};
