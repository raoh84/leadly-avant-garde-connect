// Update the tailwind.config.ts colors section to include leadly-soft-purple and leadly-soft-blue

import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        leadly: {
          purple: "#6366F1",
          blue: "#3B82F6",
          gray: "#F3F4F6",
          dark: "#1F2937",
          // Added missing colors for the gradient stops
          "soft-purple": "#E5DEFF",
          "soft-blue": "#DCEEFF",
          "dark-purple": "#4B3F9B",
          // Feel free to add any other supplementary variants here
        },
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "even-sm": "0 0 2px rgba(0, 0, 0, 0.1)",
        even: "0 0 4px rgba(0, 0, 0, 0.1)",
        "even-md": "0 0 6px rgba(0, 0, 0, 0.1)",
        "even-lg": "0 0 8px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        serif: ['Playfair Display', 'serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".bg-blur": {
          "@apply bg-white/80 backdrop-blur-md backdrop-saturate-150 backdrop-filter": {},
        },
      });
    }),
    require("tailwindcss-animate"),
  ],
};
