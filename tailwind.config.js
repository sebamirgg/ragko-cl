/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Superficies (de más oscura a más clara)
        obsidian: '#0E1012',
        charcoal: '#14171A',
        graphite: '#1A1D21',
        line: '#272B31',
        // Marca Ragko
        terracotta: '#E08244',
        cream: '#FCE8C3',
        honey: '#F2B544',
        // Texto
        bone: '#F8F9FA',
        muted: '#A3A8B0',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
