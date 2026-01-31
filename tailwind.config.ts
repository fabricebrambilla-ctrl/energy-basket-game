import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
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
        basket: {
          low: "hsl(var(--basket-low))",
          "low-glow": "hsl(var(--basket-low-glow))",
          high: "hsl(var(--basket-high))",
          "high-glow": "hsl(var(--basket-high-glow))",
        },
        food: {
          bg: "hsl(var(--food-bg))",
          shadow: "hsl(var(--food-shadow))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
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
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "score-pop": {
          "0%": { transform: "scale(0) translateY(0)", opacity: "0" },
          "50%": { transform: "scale(1.2) translateY(-10px)", opacity: "1" },
          "100%": { transform: "scale(1) translateY(-20px)", opacity: "0" },
        },
        "fall-slow": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "5%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(280px)", opacity: "0" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0) scale(1)" },
          "10%": { transform: "translateX(-8px) scale(1.05)" },
          "20%": { transform: "translateX(8px) scale(1.05)" },
          "30%": { transform: "translateX(-6px) scale(1.03)" },
          "40%": { transform: "translateX(6px) scale(1.03)" },
          "50%": { transform: "translateX(-4px) scale(1.02)" },
          "60%": { transform: "translateX(4px) scale(1.02)" },
          "70%": { transform: "translateX(-2px) scale(1.01)" },
          "80%": { transform: "translateX(2px) scale(1.01)" },
          "90%": { transform: "translateX(-1px) scale(1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
        "pulse-big": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.15)", opacity: "0.9" },
        },
        "celebrate": {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "25%": { transform: "scale(1.1) rotate(-5deg)" },
          "50%": { transform: "scale(1.2) rotate(5deg)" },
          "75%": { transform: "scale(1.1) rotate(-3deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        "bounce-in": "bounce-in 0.5s ease-out",
        "score-pop": "score-pop 0.6s ease-out forwards",
        "fall-slow": "fall-slow 12s linear forwards",
        shake: "shake 0.6s ease-in-out",
        wiggle: "wiggle 0.5s ease-in-out infinite",
        "pulse-big": "pulse-big 0.5s ease-in-out",
        "celebrate": "celebrate 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
