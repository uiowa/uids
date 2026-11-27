# Figma Specs

**SOURCE of Configuration**

This folder contains the **inputs and specifications (Source)**.
*   `component-spec.json`: Defines the component variants.
*   `token-map.json` (optional): Maps tokens.

---

# UIDS Figma Component Specification

This directory contains the component specification and tooling for generating UIDS components in Figma.

## Overview

The UIDS Figma workflow uses a **spec-driven approach**:

1. **Design tokens** are defined in SCSS ([src/scss/base/_tokens.scss](../src/scss/base/_tokens.scss))
2. **Tokens are exported** to JSON via `npm run tokens:export`
3. **Component specs** ([component-spec.json](./component-spec.json)) define how tokens map to component variants
4. **Figma plugin** reads both files and generates components

This ensures Figma components stay in sync with the design system's source of truth.

---

## File Structure

```
figma/
├── component-spec.json   # Component definitions (variants, properties, token mappings)
└── README.md            # This file
```

---

## Component Specification Format

### Schema Version

```json
{
  "$schema": "uids-figma-component-spec-v1",
  "version": "1.0.0"
}
```

### Component Structure

Each component has:

- **`description`** - Human-readable component description
- **`variants`** - Variant axes (e.g., color, size, state)
- **`defaults`** - Default values for each variant axis
- **`tokenMappings`** - Maps style properties to design tokens using template syntax
- **`properties`** - Component properties (text, boolean, etc.)

### Example: Button Component

```json
{
  "button": {
    "description": "UIDS button component",
    "variants": {
      "color": ["primary", "secondary", "tertiary"],
      "size": ["sm", "md", "lg"],
      "state": ["default", "hover", "disabled"]
    },
    "defaults": {
      "color": "primary",
      "size": "md",
      "state": "default"
    },
    "tokenMappings": {
      "background": "button.{color}.bg.{state}",
      "text": "button.{color}.text.{state}",
      "paddingX": "button.padding.x.{size}",
      "paddingY": "button.padding.y.{size}"
    },
    "properties": {
      "label": {
        "type": "text",
        "default": "Button"
      }
    }
  }
}
```

---

## Variants vs Properties

### Variants

**Variants** define different visual states or configurations of a component. They:
- Create separate Figma component variants
- Use token mappings to apply different styles
- Are represented as variant properties in Figma

**Example:** Button has `color=primary/secondary/tertiary`, `size=sm/md/lg`, and `state=default/hover/disabled`

### Properties

**Properties** are dynamic content or settings that don't create new variants. They:
- Allow users to customize instances
- Don't affect the underlying component structure
- Are represented as component properties in Figma

**Example:** Button `label` is a text property that can be changed on each instance

---

## Token Mapping Template Syntax

Token mappings use **placeholder syntax** to reference variant values:

```json
"tokenMappings": {
  "background": "button.{color}.bg.{state}",
  "paddingX": "button.padding.x.{size}"
}
```

**How it works:**
- `{color}` is replaced with the current variant value (e.g., `primary`)
- `{state}` is replaced with the current state value (e.g., `hover`)
- Result: `button.primary.bg.hover` → looks up this token in `tokens.json`

**Static references** (no placeholders) always use the same token:
```json
"borderRadius": "button.radius"  // Always uses button.radius
```

---

## Token Naming Conventions

### Colors
- **Brand:** `color.brand.{name}` (e.g., `color.brand.gold`)
- **Neutral:** `color.neutral.{scale}` (e.g., `color.neutral.500`)
- **Semantic:** `color.link`, `color.border.subtle`

### Typography
- **Font family:** `type.font.family.{name}` (e.g., `type.font.family.base`)
- **Font weight:** `type.weight.{name}` (e.g., `type.weight.semibold`)
- **Font size:** `type.size.{scale}` (e.g., `type.size.md`)
- **Line height:** `type.line.{scale}` (e.g., `type.line.md`)

### Spacing
- **Scale:** `space.{number}` (e.g., `space.4` = 1rem)
- **Gutters:** `space.{size}.width.gutter` (e.g., `space.md.width.gutter`)

### Components
- **Pattern:** `{component}.{variant}.{property}.{state}`
- **Example:** `button.primary.bg.hover`

---

## Workflow

### 1. Export Tokens

Run the token export script to generate `design-tokens/tokens.json`:

```bash
npm run tokens:export
```

**Output files:**
- `design-tokens/tokens.export.css` - Compiled CSS
- `design-tokens/tokens.raw.json` - Flat token structure
- `design-tokens/tokens.json` - Nested tokens (use this in Figma)
- `design-tokens/EXPORT_REPORT.md` - Export statistics

### 2. Update Component Spec (if needed)

Edit [component-spec.json](./component-spec.json) to:
- Add new components
- Add variant axes
- Update token mappings
- Adjust default values

### 3. Generate Components in Figma

Use the Figma plugin (when built) to:
1. Import `design-tokens/tokens.json`
2. Import `figma/component-spec.json`
3. Generate component variants

---

## Component Status

### ✅ Fully Specified
- **Button** - All variants, properties, and token mappings defined

### 🚧 Stubbed (Basic Structure Only)
- **Stat** - Needs token mappings refinement
- **Card** - Needs token mappings refinement

---

## Token References

Tokens can reference other tokens using `{path}` syntax:

```json
{
  "button": {
    "primary": {
      "bg": {
        "default": {
          "value": "{color.brand.gold}"
        }
      }
    }
  }
}
```

The Figma plugin will resolve these references automatically.

---

## Next Steps

1. **Build Figma plugin** - Read spec + tokens, generate components
2. **Validate Button** - Ensure all variants generate correctly
3. **Expand Stat/Card specs** - Add complete token mappings
4. **Add more components** - Follow the same pattern

---

## Questions?

Refer to:
- [Base tokens](../src/scss/base/_tokens.scss) - Token definitions
- [Token export script](../scripts/exportTokensFromScss.mjs) - Export logic
- [Export report](../design-tokens/EXPORT_REPORT.md) - Token statistics
