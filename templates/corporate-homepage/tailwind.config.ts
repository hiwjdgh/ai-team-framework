import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#f7f4ef",
        foreground: "#17201a",
        muted: "#5f675f",
        line: "#d8d1c6",
        panel: "#fffaf2",
        accent: "#1f6b5c",
        "accent-strong": "#13483f",
        gold: "#b7832f"
      },
      maxWidth: {
        shell: "1180px"
      }
    }
  },
  plugins: []
};

export default config;

