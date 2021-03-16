module.exports = {
  purge: ["./public/*.html","./src/*.vue"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {},
    screens:{
      xs: '450px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
