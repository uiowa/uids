# Figma Plugin

**SOURCE of Tooling**

This folder contains the **source code** for the Figma Plugin tool.
It is built and used to generate component variants in Figma.

---

# UIDS Figma Plugin

Spec-driven component generator for the University of Iowa Design System.

## Overview

This plugin generates Figma components from design tokens and component specifications. It reads:
- **design-tokens/tokens.json** - Design tokens exported from SCSS
- **figma/component-spec.json** - Component specifications with variant definitions

## Features

- Spec-driven generation (no hardcoded values)
- Token reference resolution (handles `{color.brand.gold}` syntax)
- Circular reference detection
- **Update mode** - replaces existing components instead of creating duplicates
- URL loading - fetch tokens/specs from GitHub or other URLs
- Progress feedback during generation
- Error handling with clear messages

## Requirements

- Node.js 18+
- Figma Desktop App (for plugin development)
- **Roboto font** (recommended but optional - will fall back to Inter if unavailable)

## Installation

### 1. Install Dependencies

```bash
cd figma-plugin
npm install
```

### 2. Build Plugin

```bash
npm run build
```

Or from the project root:

```bash
npm run figma:build
```

### 3. Load Plugin in Figma

1. Open Figma Desktop
2. Go to **Plugins > Development > Import plugin from manifest**
3. Select `figma-plugin/manifest.json`
4. The plugin will appear in **Plugins > Development > UIDS Component Generator**

## Usage

### 1. Export Tokens

From the project root:

```bash
npm run tokens:export
```

This generates `design-tokens/tokens.json`.

### 2. Load JSON Files

You have two options for loading the required JSON files:

#### Option A: Load from URL (Recommended)

1. In Figma, go to **Plugins > Development > UIDS Component Generator**
2. Enter URLs for the JSON files (see examples below)
3. Click the **Load** button next to each URL field
4. Click **Generate**

**Example URLs:**

GitHub raw URLs (if files are committed to a public repo):
```
https://raw.githubusercontent.com/uiowa/uids/main/design-tokens/tokens.json
https://raw.githubusercontent.com/uiowa/uids/main/figma/component-spec.json
```

Local dev server (if you're running a static file server):
```
http://localhost:8080/design-tokens/tokens.json
http://localhost:8080/figma/component-spec.json
```

**Note:** URLs must be publicly accessible or CORS-enabled. GitHub raw URLs work reliably for public repos.

#### Option B: Paste JSON Manually

1. Open these files and copy their contents:
   - `design-tokens/tokens.json`
   - `figma/component-spec.json`
2. In Figma, go to **Plugins > Development > UIDS Component Generator**
3. Paste the tokens JSON into the first textarea
4. Paste the component spec JSON into the second textarea
5. Click **Generate**

### 3. Configure Options

The plugin UI includes an "Update existing components (if found)" checkbox (checked by default):

- **Checked (default)**: If a Button component set already exists on the Library page, it will be replaced with the newly generated one. The new component set will be positioned at the same location as the old one.
- **Unchecked**: Always creates a new Button component set, even if one already exists (may result in duplicates).

**Update Mode Behavior:**
- Preserves the position of the existing component set
- Replaces all variants with freshly generated ones
- **Important**: Component set node ID changes (Figma API limitation), but this rarely affects consumers since components are typically referenced by name

### 4. Result

The plugin will:
- Create/find a page named "Library"
- Generate or update the Button component set with all variants
- Add a "label" property (bound to button text)
- Zoom to the generated components

## Generated Components

### Button

**Variants:**
- **color**: primary, secondary, tertiary
- **size**: sm, md, lg
- **state**: default, hover, disabled

**Total combinations:** 27 variants (3 × 3 × 3)

**Component properties:**
- **label** (text) - Button text content

**Figma structure:**
- Component set named "Button"
- Each variant is an auto layout frame with:
  - Horizontal direction
  - Center-aligned text
  - Padding from tokens
  - Background/text/border colors from tokens
  - Border radius from tokens

## Update Mode

The plugin includes an "update mode" feature to prevent duplicate components during iteration.

### How It Works

When "Update existing components (if found)" is checked (default):

1. The plugin searches the Library page for an existing component set named "Button"
2. If found:
   - Stores the component set's position (x, y coordinates)
   - Deletes the existing component set
   - Generates a new component set with updated variants
   - Places the new component set at the original position
3. If not found:
   - Creates a new component set as usual

### What Gets Preserved

- **Position**: The new component set appears at the same location as the old one
- **Name**: Component set remains named "Button"
- **Page**: Always placed on the "Library" page

### What Changes

- **Component set node ID**: The node ID changes because Figma's API requires creating a new component set (via `combineAsVariants`)
- **Variant node IDs**: All individual variant component IDs are regenerated

### Important Notes

- **Consumers**: Most Figma consumers reference components by name, not ID, so the ID change rarely causes issues
- **Instances**: Existing instances of the old component set in other files may break. Re-sync instances after updating.
- **Version control**: If using Figma's version history, the old component set remains accessible in previous versions

### Use Cases

**Enable update mode when:**
- Iterating on token values (colors, spacing, etc.)
- Tweaking component specs (adding/removing variants)
- Refining the design system

**Disable update mode when:**
- Creating a separate version of the component
- Experimenting without affecting the primary component
- Comparing old vs new side-by-side

## Token Mappings

The plugin uses template syntax to map tokens to variants:

```json
{
  "background": "button.{color}.bg.{state}",
  "text": "button.{color}.text.{state}",
  "paddingX": "button.padding.x.{size}"
}
```

Placeholders like `{color}` and `{size}` are substituted with actual variant values:
- `{color}` → `primary` → `button.primary.bg.default`

## Error Handling

### Common Errors

**"Missing tokens for variant"**
- Run `npm run tokens:export` to regenerate tokens
- Verify the token path exists in `tokens.json`

**"Failed to parse tokens JSON"**
- Check JSON syntax (use a JSON validator)
- Ensure you copied the entire file contents

**"Circular reference detected"**
- Check `design-tokens/tokens.json` for tokens that reference each other in a loop
- Example: A → B → C → A

**"Failed to load from URL" / CORS errors**
- Ensure the URL is publicly accessible (test it in your browser)
- GitHub raw URLs work reliably: `https://raw.githubusercontent.com/owner/repo/branch/path/file.json`
- If using a local dev server, ensure CORS is enabled
- Fallback: Use manual paste instead of URL loading

## Development

### Watch Mode

For development, use watch mode to rebuild on changes:

```bash
cd figma-plugin
npm run watch
```

Then in Figma, reload the plugin after each build.

### Project Structure

```
figma-plugin/
├── manifest.json        # Plugin manifest
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── build.mjs            # Build script (esbuild)
├── src/
│   ├── code.ts          # Plugin logic (runs in Figma sandbox)
│   └── ui.html          # Plugin UI
└── dist/                # Build output
    ├── code.js          # Compiled plugin code
    └── ui.html          # Copied UI file
```

### Build Process

The build script (`build.mjs`) uses esbuild to:
1. Bundle `src/code.ts` → `dist/code.js`
2. Copy `src/ui.html` → `dist/ui.html`

## Extending

To add new components:

1. Add tokens to `src/scss/base/_tokens.scss`
2. Run `npm run tokens:export`
3. Add component spec to `figma/component-spec.json`
4. Update `src/code.ts` to add generation logic for the new component

## Troubleshooting

**Plugin doesn't appear in Figma**
- Make sure you built the plugin first (`npm run build`)
- Check that `dist/code.js` and `dist/ui.html` exist
- Try reimporting the manifest in Figma

**Components generate in wrong location**
- The plugin creates/uses a page named "Library"
- You can rename or move components after generation

**Colors look wrong**
- Verify token values in `design-tokens/tokens.json`
- Check that color format is supported (hex, rgba)

**Spacing/sizing is off**
- Token values should use rem or px units
- The plugin converts rem to px (1rem = 16px)

## Font Requirements

The plugin attempts to use fonts specified in your design tokens (typically **Roboto**). If the requested font is not available in Figma, it will automatically fall back to:

1. **Inter** (Figma's default font)
2. **Roboto** (if Inter is unavailable)

This means you can generate components without installing custom fonts. A warning message will appear in the plugin UI if a fallback font is used.

**For best results:**
- Install the fonts specified in your tokens (`type.font.family.base`)
- The plugin will use the exact font weights and styles from your design system

To customize font fallback behavior, update the `loadFont()` function in `src/code.ts`.

## Figma API Reference

- [Figma Plugin API](https://www.figma.com/plugin-docs/)
- [Component Sets](https://www.figma.com/plugin-docs/api/ComponentSetNode/)
- [Auto Layout](https://www.figma.com/plugin-docs/api/properties/nodes-layoutmode/)
