/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        "paper-deep": "rgb(var(--paper-deep) / <alpha-value>)",
        sand: "rgb(var(--sand) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--ink-soft) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        stage: "rgb(var(--stage) / <alpha-value>)",
        "stage-2": "rgb(var(--stage-2) / <alpha-value>)",
        curtain: "rgb(var(--curtain) / <alpha-value>)",
        "curtain-hot": "rgb(var(--curtain-hot) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
        line: "var(--line)",
      },
      fontFamily: {
        display: "var(--display)",
        sans: "var(--sans)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
