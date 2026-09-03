/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
  "root": true,
  "extends": ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/eslint-config-typescript/recommended", "@vue/eslint-config-prettier", "plugin:storybook/recommended"],
  "env": {
    "vue/setup-compiler-macros": true
  },
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  // Not a module: this file is a payload executed inside the Figma Plugin API's
  // implicit async wrapper (top-level await and `return` are how it reports results),
  // so module parsing rejects it. See its header for how it is run.
  "ignorePatterns": ["scripts/figma-readback.js"],
  "rules": {
    // UIDS component names are single-word by design (Card, Logo, Menu) —
    // they mirror the registered custom-element names (uids-card, uids-logo).
    "vue/multi-word-component-names": "off",
    // Legacy debt, downgraded so CI can enforce errors-only (eslint --quiet).
    // Ratchet these back to "error" as components get cleaned up.
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-this-alias": "warn",
    "no-unreachable": "warn"
  },
  "overrides": [{
    "files": ["scripts/**", "*.config.{js,ts,mjs,cjs}", ".storybook/**", "*.cjs"],
    "env": { "node": true }
  }]
};