module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      transparent: '#00000000',
      white: '#FFFFFF',
      black: '#000000',
      midnight: { 100: '#070A14', 800: '#AFCBF5' },
      red: { 600: '#E74444', submissions: '#FF6868' },
      green: { running: '#68FF80' },
      orange: { finished: '#FFB054' },
      cardbg: '#56659C40',
    },
  },
  plugins: [],
};
