// /** @type {import('postcss-load-config').Config} */
// const config = {
//   plugins: {
//     tailwindcss: {},
//   },
// };

// export default config;
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        "last 2 versions", // Obsługuje ostatnie 2 wersje przeglądarek
        "> 0.2%", // Obsługuje przeglądarki z udziałem rynkowym > 0.2%
        "not dead", // Wyklucza przeglądarki, które nie są już wspierane
        "not op_mini all", // Wyklucza Opera Mini
      ],
    },
  },
};

export default config;
