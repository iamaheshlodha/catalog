// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C4AD69',  
        secondary: '#E7DFC0', 
        darkBg: '#1e1e1e',
        lightBg: '#f4f6f8',
        buttonBgPrimary: '#C4AD69',
        buttonBgSecondary: '#E7DFC0',
        textPrimary: '#C4AD69',
        textSecondary: '#555555',
        ringPrimary: '#C4AD69',
        ringSecondary: '#10b981',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
