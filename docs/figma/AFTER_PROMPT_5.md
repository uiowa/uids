# After Prompt 5: Running the Figma Token Pipeline

This checklist walks you through generating design tokens, building the Figma plugin, and loading it into Figma Desktop.

## Quick Start

Run the automated pipeline:

```bash
npm run figma:pipeline
```

This will:
1. Export design tokens from SCSS → `design-tokens/tokens.json`
2. Build the Figma plugin → `figma-plugin/dist/`
3. Display file paths for manual steps

## Step-by-Step Checklist

### 1. Generate Tokens & Build Plugin

```bash
npm run figma:pipeline
```

Verify outputs exist:
- ✅ `design-tokens/tokens.json`
- ✅ `design-tokens/tokens.raw.json`
- ✅ `figma-plugin/dist/code.js`
- ✅ `figma-plugin/manifest.json`

### 2. Load Plugin in Figma Desktop

1. Open Figma Desktop app
2. Right-click on canvas → **Plugins** → **Development** → **Import plugin from manifest...**
3. Navigate to and select: `figma-plugin/manifest.json`

### 3. Run the Plugin

1. Right-click on canvas → **Plugins** → **Development** → **UIDS Design Token Importer**
2. In the plugin UI, paste the contents of:
   - **Tokens JSON**: Copy contents of `design-tokens/tokens.json`
   - **Component Spec JSON**: Copy contents of `figma/component-spec.json`
3. Click **Import Tokens & Components**

### 4. Validate Output

Check the Figma canvas for:
- ✅ **Color styles** created (uids/color/...)
- ✅ **Text styles** created (uids/typography/...)
- ✅ **Button component set** with variants:
  - Sizes: small, medium, large
  - Types: primary, secondary, tertiary
- ✅ **Label property** on Button component set

## Troubleshooting

### Missing Tokens

**Symptom**: Plugin shows "0 tokens imported" or missing color/text styles

**Fix**:
1. Verify `design-tokens/tokens.json` contains `colors` and `typography` sections
2. Re-run: `npm run tokens:export`
3. Check `design-tokens/tokens.raw.json` for parsing errors

### Reference Resolution Issues

**Symptom**: Tokens like `{color.primary.500}` not resolving

**Fix**:
1. Ensure token references use exact path syntax from `tokens.raw.json`
2. Plugin resolves references automatically—check console for resolution errors
3. Verify no circular references in token definitions

### rem/px Conversion Issues

**Symptom**: Font sizes or spacing values incorrect in Figma

**Fix**:
1. Check base font size assumption (default: 16px = 1rem)
2. Update conversion logic in plugin if needed: `figma-plugin/code.ts`
3. Rebuild plugin: `npm run figma:build`

### Plugin Not Appearing in Figma

**Fix**:
1. Ensure Figma Desktop is running (not browser version)
2. Re-import manifest from `figma-plugin/manifest.json`
3. Check Figma → **Plugins** → **Development** → plugin should be listed
4. Restart Figma Desktop if plugin doesn't appear

### Build Errors

**Symptom**: `npm run figma:pipeline` fails

**Fix**:
1. Check error output from token export or plugin build step
2. Ensure all dependencies installed: `npm install`
3. Run steps individually:
   - `npm run tokens:export`
   - `npm run figma:build`

## File Reference

| File | Purpose |
|------|---------|
| `design-tokens/tokens.json` | Resolved tokens (ready for plugin) |
| `design-tokens/tokens.raw.json` | Raw tokens with references |
| `figma/component-spec.json` | Component definitions (Button, etc.) |
| `figma-plugin/manifest.json` | Figma plugin manifest |
| `figma-plugin/dist/code.js` | Compiled plugin code |

## Next Steps

After successfully importing tokens and components:
1. Document any manual adjustments needed in Figma
2. Update `figma/component-spec.json` for additional components
3. Re-run pipeline and plugin to sync changes
