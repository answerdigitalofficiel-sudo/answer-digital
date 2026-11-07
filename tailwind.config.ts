import type { Config } from "tailwindcss";

/**
 * Palette extraite du logo officiel ANSWER DIGITAL.
 * Ne pas modifier ces valeurs sans autorisation.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0b1f3a", // fond du logo
          950: "#071427",
          900: "#0b1f3a",
          800: "#102a4c",
          700: "#173560",
          600: "#244574",
        },
        brand: {
          cyan: "#21d3ed",
          teal: "#2dd4c0",
          green: "#4ade80",
          lime: "#a3e636",
          "lime-light": "#bef164",
        },
        ink: {
          DEFAULT: "#e6edf7",
          muted: "#9db0c9", // couleur de la signature du logo
          faint: "#6f84a3",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #21d3ed 0%, #4ade80 55%, #a3e636 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(33,211,237,0.16) 0%, rgba(74,222,128,0.12) 55%, rgba(163,230,54,0.10) 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(74,222,128,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
