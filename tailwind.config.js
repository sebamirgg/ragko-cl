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
        cream: { DEFAULT: '#F6E8C7', light: '#FCF6E9', deep: '#EEDCB3' }, // crema natural
        amber: { DEFAULT: '#B8722C', deep: '#9A5B1E', light: '#E3A857' }, // miel ámbar profundo
        terracotta: { DEFAULT: '#CD8651', dark: '#B8703A' }, // acento histórico de la marca
        gold: '#B89A5E', // dorado apagado
        sage: { DEFAULT: '#7C8A6A', deep: '#4F5B43' }, // verde botánico
        ink: { DEFAULT: '#1E1A16', soft: '#2B2520' }, // carbón suave: texto sobre crema / botones
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
