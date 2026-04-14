const config = {
  content: [
    "./src/pages/**/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F2937", // A vibrant coral color for primary elements
        primaryHover: "#373f4a", // A vibrant coral color for primary elements
        secondary: "#FFD700", // A warm gold for accents
        accent: "#40E0D0", // A turquoise for highlights
        neutral: "#F5F5F5", // A soft white for backgrounds
        dark: "#333333", // A dark gray for text and contrasting elements
      },
    },
  },
  plugins: [],
};

module.exports = config;
