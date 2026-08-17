/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Palette "cabinet de curiosités" — huile ancienne, feuille d'or, lapis-lazuli.
        // Le lapis en particulier est le pigment réellement utilisé pour les ciels/robes
        // dans les toiles reproduites sur ce site (Vermeer, Cellarius) — pas une couleur
        // décorative arbitraire.
        ink: {
          DEFAULT: "#0d0e12",
          deep: "#07080a",
        },
        canvas: "#17140f",
        parchment: {
          DEFAULT: "#ece3cf",
          dim: "#a89f8c",
        },
        gilt: {
          DEFAULT: "#b8934f",
          bright: "#d9b46a",
        },
        lapis: "#3f5066",
        oxblood: "#7a2f24",
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['"EB Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
