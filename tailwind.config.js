/** @type {import('tailwindcss').Config} */

/** Color que cambia según el tema de la sección (.theme-light / .theme-dark), con soporte de opacidad (bg-x/50). */
const themed = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // ---- Colores con tema (ver variables en src/styles.css) ----
        obsidian: themed('obsidian'), // fondo de sección / pozos internos
        charcoal: themed('charcoal'), // fondo alternativo
        graphite: themed('graphite'), // tarjetas
        line: themed('line'), // bordes
        bone: themed('bone'), // texto principal
        muted: themed('muted'), // texto secundario
        accent: themed('accent'), // texto de acento (terracota legible en cada tema)
        hl: themed('hl'), // texto resaltado (crema en oscuro, miel tostada en claro)
        honey: themed('honey'), // dorado de detalles

        // ---- Marca (fijos en ambos temas) ----
        cream: '#F6E8C7',
        terracotta: { DEFAULT: '#CD8651', dark: '#B8703A' },
        ink: '#241A12', // texto sobre botones crema / terracota
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
