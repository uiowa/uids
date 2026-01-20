# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIDS (University of Iowa Design System) - Vue 3 component library with SCSS and Storybook docs.
- **Main branch**: `4.x` | **Package manager**: Yarn 3.7.0 | **Docs**: https://uids.brand.uiowa.edu

## Essential Commands

- `yarn storybook` - Start dev server (port 6006)
- `yarn build` - Compile SCSS to `dist/` (run before PRs!)
- `yarn lint` - ESLint with auto-fix
- `yarn test:unit` - Vitest tests

## Component Structure

Each component in `src/components/`:
```
component-name/
├── ComponentName.vue       # Vue 3 with <script setup lang="ts">
├── ComponentName.stories.js # Storybook stories
└── index.ts                # Export for barrel
```

**Key patterns**:
- Import SCSS directly: `import '../../scss/components/component.scss';`
- Props use validators for constrained values
- BEM CSS naming (block--modifier, block__element)
- ARIA attributes required for accessibility

## SCSS Architecture

- `uids.scss` - Main entry (imports all components)
- `uids-core.scss` - Core styles, CSS variables, reset, base HTML
- `abstracts/` - Mixins, variables, utilities
- `components/` - Component-specific styles
- Use `@use` instead of `@import`

**CSS Variables** (in `uids-core.scss`): `--uiowa-gold`, `--uiowa-black`, `--brand-primary`, `--uids-gray-*`, `--link-color`

## Shared Logic

`src/components/shared/` - Reusable utilities like `borderless.ts`:
- Exports `{ props, argTypes, addBorderlessClass }`
- Use via spread: `...Borderless.props`

`src/assets/js/` - ES6 classes for interactivity (accordion, tabs, slider, video)

## Creating New Components

1. Create `src/components/component-name/ComponentName.vue` with `<script setup lang="ts">`
2. Create `ComponentName.stories.js` with Storybook config
3. Create `index.ts`: `export { default } from './ComponentName.vue'`
4. Add to `src/components/index.ts` barrel export
5. Create `src/scss/components/_component-name.scss`
6. Import in `src/scss/uids.scss`: `@use 'components/component-name';`
7. Run `yarn storybook` to test, then `yarn build` before PR

## Git Workflow

- Work on feature branches from `4.x`
- PRs auto-deploy to GitHub Pages for preview at `/branches/{branch-name}`
- Releases use semantic versioning via `npm version [major|minor|patch]`

## Code Style

- Vue: Composition API with `<script setup lang="ts">`
- SCSS: Namespaced BEM - modifiers use `--`, elements use `__`, single hyphen for namespace
- Stories: `tags: ['autodocs']`, bind shared argTypes
- Editor: 2 spaces, single quotes, semicolons
