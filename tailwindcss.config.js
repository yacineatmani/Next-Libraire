// tailwind.config.js
module.exports = {
    content: [
      './app/**/*.{html,js,ts,jsx,tsx}', // Ensure this path includes all of your app's files
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'), // You can add additional Tailwind plugins here if needed
      require('@shadcn/tailwind-plugin') // This is the Shadcn UI plugin if you're using it
    ],
  };
  