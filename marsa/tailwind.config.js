/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // MARSA Custom Colors
        marsa: {
          ink: '#142a2b',
          deep: '#0d2a2d',
          'deep-soft': '#173a3c',
          field: '#173234',
          'surface-muted': '#ece7dc',
          line: '#d4cec0',
          sea: '#1e5c5d',
          'sea-bright': '#367f79',
          'sea-soft': '#dce9e3',
          sand: '#e8d39c',
          'sand-deep': '#c6aa6c',
          pearl: '#f7f3ea',
          warm: '#e8e3d8',
          muted: '#718083',
          accent: '#c37960',

          // ── Semantic layer tokens ──────────────────────────────────────
          // Layer 0: page canvas (body background)
          canvas: '#f0ece2',
          // Layer 1: dark section panels (= marsa-deep, aliased for clarity)
          panel: '#071417',
          // Layer 2: cards/inputs that sit INSIDE dark panels
          card: '#0f1e21',
          // Layer 3: elevated cards that sit on the LIGHT canvas body
          surface: '#f5f2eb',
        },
        // Dark mode colors
        'marsa-dark': {
          ink: '#f4f1e7',
          deep: '#040d0f',
          'deep-soft': '#0b1d20',
          field: '#0a171a',
          surface: '#0a181b',
          'surface-muted': '#0f2528',
          line: '#1b3b3e',
          sea: '#87c7ba',
          'sea-bright': '#b0e0cf',
          'sea-soft': '#183637',
          pearl: '#0d2224',
          warm: '#112b2d',
          muted: '#a2b0ab',
          sand: '#ead7a8',
          'sand-deep': '#dcc58f',

          // ── Semantic layer tokens (dark mode) ─────────────────────────
          // Layer 0: page canvas dark
          canvas: '#07121a',
          // Layer 1: dark section panels
          panel: '#061114',
          // Layer 2: cards/inputs inside dark panels
          card: '#0c1a1d',
          // Layer 3: elevated cards on the dark canvas
          surface: '#0d2224',
        },
      },
      fontFamily: {
        'marsa': ['Manrope', 'Cairo', 'sans-serif'],
        'mono': ['DM Mono', 'monospace'],
      },
      borderRadius: {
        'marsa-sm': '10px',
        'marsa-md': '18px',
        'marsa-lg': '28px',
        'marsa-pill': '9999px',
      },
      container: {
        center: true,
        padding: '48px',
        maxWidth: '1280px',
      },
      spacing: {
        'marsa': '1280px',
        '4.5': '1.125rem',
        '18': '4.5rem',
      },
      opacity: {
        '8': '0.08',
        '14': '0.14',
      },
      animation: {
        rise: 'rise 0.9s cubic-bezier(0.22, 0.75, 0.18, 1) both',
        fade: 'fade 0.6s ease both',
        'bounce-slow': 'bounce-slow 2.4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fade: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '4px',
      },
      boxShadow: {
        'marsa': '0 4px 32px rgba(7, 20, 23, 0.24), 0 1px 0 rgba(255,255,255,0.05) inset',
        'marsa-lg': '0 12px 48px rgba(7, 20, 23, 0.32)',
        'marsa-glow': '0 0 24px rgba(47, 119, 114, 0.3)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
