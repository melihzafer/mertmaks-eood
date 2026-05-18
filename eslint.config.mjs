import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [
      ".agents/**",
      ".claude/**",
      ".wolf/**",
      ".playwright-mcp/**",
      "design/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  {
    rules: {
      "react-hooks/purity": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
