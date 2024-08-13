import type { Config } from "tailwindcss";

import ExtendedColors from "./color.config";
import plugin from "tailwindcss/plugin";

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, String(val)]),
  );

  Object.entries(flattenColorPalette(ExtendedColors)).forEach(([key, val]) => {
    newVars[`--${key}`] = String(val);
  }),
    addBase({
      ":root": newVars,
    });
}

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xsm: "365px",
      },
      animation: {
        aurora: "aurora 60s linear infinite",

        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },

        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: { ...ExtendedColors },
    },
  },

  plugins: [
    addVariablesForColors,
    plugin(({ matchUtilities, theme }) => {
      matchUtilities({
        // Class name
        "grid-fluid-fit": (value) => {
          return {
            gridTemplateColumns: "repeat(auto-fit, minmax(" + value + ", 1fr))", // Desired CSS properties here
            display: "grid", // Just for example non-dynamic value
          };
        },
        "grid-fluid-fill": (value) => {
          return {
            gridTemplateColumns:
              "repeat(auto-fill, minmax(" + value + ", 1fr))", // Desired CSS properties here
            display: "grid", // Just for example non-dynamic value
          };
        },
      });
    }),
  ],
};
export default config;
