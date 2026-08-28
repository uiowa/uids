# UIDS Design Tokens Export Report

**Generated:** 2026-02-13T20:17:21.010Z

## Summary

- **Total Tokens:** 76
- **Token References:** 18
- **Warnings:** 0

## Top-Level Groups

- `brand`
- `button`
- `color`
- `link`
- `radius`
- `space`
- `transparent`
- `type`
- `uids`
- `uiowa`

## Token Type Distribution

- **color:** 20
- **fontFamily:** 2
- **fontWeight:** 2
- **dimension:** 24
- **number:** 3
- **reference:** 18
- **string:** 7

## Token References

- `--button-radius` → `{radius.md}`
- `--button-primary-bg-default` → `{color.brand.gold}`
- `--button-primary-text-default` → `{color.brand.black}`
- `--button-primary-border-default` → `{color.brand.gold}`
- `--button-secondary-bg-default` → `{color.brand.black}`
- `--button-secondary-border-default` → `{color.brand.black}`
- `--button-tertiary-text-default` → `{color.brand.black}`
- `--uiowa-gold` → `{color.brand.gold}`
- `--uiowa-black` → `{color.brand.black}`
- `--brand-primary` → `{color.brand.gold}`
- `--brand-secondary` → `{color.brand.black}`
- `--uids-gray-cool` → `{color.neutral.600}`
- `--link-color` → `{color.link}`
- `--uids-light` → `{color.neutral.100}`
- `--uids-gray-mid` → `{color.neutral.400}`
- `--uids-gray` → `{color.neutral.500}`
- `--uids-gray-light` → `{color.neutral.300}`
- `--transparent-border` → `{color.border.subtle}`

## Warnings

✓ No warnings

## Output Files

- **CSS Export:** `design-tokens/tokens.export.css`
- **Raw JSON:** `design-tokens/tokens.raw.json` (flat structure)
- **Nested JSON:** `design-tokens/tokens.json` (token format with types)

## Usage

The `tokens.json` file can be imported into:
- Figma (via Tokens Studio plugin or similar)
- Style Dictionary
- Design token tooling that supports the token reference format

### Token Reference Syntax

Tokens using `var(--other-token)` in CSS are converted to the reference format:

```json
{
  "button": {
    "primary": {
      "bg": {
        "default": {
          "value": "{color.brand.gold}",
          "$type": "color"
        }
      }
    }
  }
}
```

This allows Figma plugins to resolve token references correctly.
