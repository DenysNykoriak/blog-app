import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["night"],
    logs: false,
  },
  plugins: [require("daisyui")],
};

export default config;
