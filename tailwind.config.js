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
        // Chaque teinte pointe vers une variable CSS "R G B" (voir index.css, :root
        // pour le thème sombre par défaut et [data-theme="light"] pour la variante
        // claire) plutôt qu'un hex figé — c'est ce qui permet au bouton de thème de
        // faire basculer tout le site (des centaines de classes bg-x/10, border-x/30…
        // déjà écrites) sans toucher un seul composant. Le format "R G B" (sans
        // virgules) est requis par Tailwind pour que les modificateurs d'opacité
        // (/10, /30…) continuent de fonctionner avec une couleur dynamique.
        ink: {
          DEFAULT: "rgb(var(--color-ink) / <alpha-value>)",
          deep: "rgb(var(--color-ink-deep) / <alpha-value>)",
        },
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        parchment: {
          DEFAULT: "rgb(var(--color-parchment) / <alpha-value>)",
          dim: "rgb(var(--color-parchment-dim) / <alpha-value>)",
        },
        gilt: {
          DEFAULT: "rgb(var(--color-gilt) / <alpha-value>)",
          bright: "rgb(var(--color-gilt-bright) / <alpha-value>)",
        },
        lapis: {
          DEFAULT: "rgb(var(--color-lapis) / <alpha-value>)",
          bright: "rgb(var(--color-lapis-bright) / <alpha-value>)",
        },
        oxblood: {
          DEFAULT: "rgb(var(--color-oxblood) / <alpha-value>)",
          bright: "rgb(var(--color-oxblood-bright) / <alpha-value>)",
        },
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
