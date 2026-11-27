// UIDS Component Generator Plugin
// Generates Figma components from token and spec JSON files

figma.showUI(__html__, { width: 600, height: 700 });

interface TokenValue {
  value: string;
  $type?: string;
}

type Tokens = Record<string, TokenValue | Tokens>;

interface ComponentSpec {
  $schema: string;
  version: string;
  description?: string;
  components: Record<string, ComponentDefinition>;
}

interface ComponentDefinition {
  description: string;
  variants: Record<string, string[]>;
  defaults: Record<string, string>;
  tokenMappings: Record<string, string>;
  properties: Record<string, PropertyDefinition>;
}

interface PropertyDefinition {
  type: string;
  default: string;
  description: string;
}

interface ColorWithOpacity {
  color: RGB;
  opacity: number;
}

let tokensData: Tokens | null = null;
let specData: ComponentSpec | null = null;

// Token resolution with circular reference detection
function getToken(path: string, visitedPaths = new Set<string>()): string | null {
  if (!tokensData) return null;

  // Check for circular references
  if (visitedPaths.has(path)) {
    console.error(`Circular reference detected: ${Array.from(visitedPaths).join(' -> ')} -> ${path}`);
    return null;
  }

  visitedPaths.add(path);

  const parts = path.split('.');
  let current: any = tokensData;

  for (const part of parts) {
    if (current[part] === undefined) {
      return null;
    }
    current = current[part];
  }

  // If it's a token object with a value
  if (current && typeof current === 'object' && 'value' in current) {
    const value = current.value;

    // Handle token references like "{color.brand.gold}"
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      const refPath = value.slice(1, -1);
      return getToken(refPath, visitedPaths);
    }

    return value;
  }

  return null;
}

// Substitute variant placeholders in token path
function substituteTokenPath(template: string, variantValues: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(variantValues)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return result;
}

// Parse color string to RGB with opacity
function parseColor(colorStr: string): ColorWithOpacity {
  // Handle hex colors
  if (colorStr.startsWith('#')) {
    const hex = colorStr.slice(1);

    // Handle 8-digit hex with alpha (e.g., #RRGGBBAA)
    if (hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16) / 255;
      const g = parseInt(hex.slice(2, 4), 16) / 255;
      const b = parseInt(hex.slice(4, 6), 16) / 255;
      const opacity = parseInt(hex.slice(6, 8), 16) / 255;
      return { color: { r, g, b }, opacity };
    }

    // Handle 6-digit hex (e.g., #RRGGBB)
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    return { color: { r, g, b }, opacity: 1 };
  }

  // Handle rgba/rgb colors
  if (colorStr.startsWith('rgba') || colorStr.startsWith('rgb')) {
    const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
    if (match) {
      return {
        color: {
          r: parseInt(match[1]) / 255,
          g: parseInt(match[2]) / 255,
          b: parseInt(match[3]) / 255,
        },
        opacity: match[4] ? parseFloat(match[4]) : 1
      };
    }
  }

  // Fallback to black
  return { color: { r: 0, g: 0, b: 0 }, opacity: 1 };
}

// Parse dimension string to pixels
function parseDimension(dimStr: string): number {
  if (dimStr.endsWith('rem')) {
    return parseFloat(dimStr) * 16; // 1rem = 16px
  }
  if (dimStr.endsWith('px')) {
    return parseFloat(dimStr);
  }
  return parseFloat(dimStr);
}

// Load font with fallback to Inter (Figma's default)
async function loadFont(fontFamily: string, weight: number): Promise<{ family: string; style: string }> {
  const style = weight >= 600 ? 'Semi Bold' : 'Regular';

  try {
    await figma.loadFontAsync({ family: fontFamily, style });
    return { family: fontFamily, style };
  } catch (error) {
    // Try with 'Regular' style as fallback
    try {
      await figma.loadFontAsync({ family: fontFamily, style: 'Regular' });
      return { family: fontFamily, style: 'Regular' };
    } catch {
      // Font not available, fall back to Inter (Figma's default font)
      console.warn(`Font "${fontFamily}" not available, falling back to Inter`);
      try {
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        return { family: 'Inter', style: 'Regular' };
      } catch {
        // If even Inter fails, try Roboto as last resort
        await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
        return { family: 'Roboto', style: 'Regular' };
      }
    }
  }
}

// Generate button component
async function generateButtonComponent(spec: ComponentDefinition, updateExisting: boolean): Promise<void> {
  figma.ui.postMessage({ type: 'progress', message: 'Parsing tokens...' });

  // Get variant axes
  const variantAxes = spec.variants;
  const variantKeys = Object.keys(variantAxes);

  // Generate all variant combinations
  const allVariants: Record<string, string>[] = [];

  function generateCombinations(axes: string[], index: number, current: Record<string, string>) {
    if (index === axes.length) {
      allVariants.push({ ...current });
      return;
    }

    const axisName = axes[index];
    const axisValues = variantAxes[axisName];

    for (const value of axisValues) {
      current[axisName] = value;
      generateCombinations(axes, index + 1, current);
    }
  }

  generateCombinations(variantKeys, 0, {});

  // Sort variants so modifier groups are contiguous (default first, then light-font)
  // This ensures the Figma grid shows grouped sections with clear visual separation
  allVariants.sort((a, b) => {
    if (a.modifier === b.modifier) return 0;
    if (a.modifier === 'default') return -1;
    return 1;
  });

  // Filter out small/large sizes for light-font — CSS .bttn--light-font uses fixed
  // padding and font-size that don't vary by size, so only medium is generated
  const filteredVariants = allVariants.filter(v => {
    if (v.modifier === 'light-font' && v.size !== 'medium') return false;
    return true;
  });
  // Replace allVariants reference for subsequent phases
  allVariants.length = 0;
  allVariants.push(...filteredVariants);

  figma.ui.postMessage({ type: 'progress', message: `Generating ${allVariants.length} button variants...` });

  // Load font
  const fontFamilyPath = spec.tokenMappings.fontFamily;
  const fontFamilyValue = getToken(fontFamilyPath);
  if (!fontFamilyValue) {
    throw new Error(`Font family token "${fontFamilyPath}" not found`);
  }

  // Extract font family name (strip quotes)
  const requestedFontFamily = fontFamilyValue.replace(/['"]/g, '').split(',')[0].trim();
  const fontWeightPath = spec.tokenMappings.fontWeight;
  const fontWeightValue = getToken(fontWeightPath);
  const fontWeight = fontWeightValue ? parseInt(fontWeightValue) : 400;

  figma.ui.postMessage({ type: 'progress', message: `Loading font: ${requestedFontFamily}...` });
  const loadedFont = await loadFont(requestedFontFamily, fontWeight);

  // Notify user if fallback font was used
  if (loadedFont.family !== requestedFontFamily) {
    figma.ui.postMessage({
      type: 'log',
      message: `⚠️  Font "${requestedFontFamily}" not available. Using "${loadedFont.family}" as fallback.`
    });
  }

  // Load Roboto for light-font modifier variants
  // CSS: .bttn--light-font { font-family: 'Roboto', sans-serif; font-weight: 400; }
  figma.ui.postMessage({ type: 'progress', message: 'Loading font: Roboto (for light-font)...' });
  const lightFontLoaded = await loadFont('Roboto', 400);
  figma.ui.postMessage({
    type: 'log',
    message: `✓ Loaded light-font: ${lightFontLoaded.family} (${lightFontLoaded.style})`
  });

  // Load Font Awesome for arrow icons (editable as text in Figma)
  let faFont: FontName | null = null;
  const faFontCandidates: FontName[] = [
    { family: 'Font Awesome 6 Free', style: 'Solid' },
    { family: 'Font Awesome 6 Free Solid', style: 'Regular' },
    { family: 'Font Awesome 6 Free', style: 'Regular' },
    { family: 'Font Awesome 5 Free', style: 'Solid' },
    { family: 'Font Awesome 5 Free Solid', style: 'Regular' },
  ];

  for (const candidate of faFontCandidates) {
    try {
      await figma.loadFontAsync(candidate);
      faFont = candidate;
      figma.ui.postMessage({ type: 'log', message: `✓ Loaded icon font: ${candidate.family} (${candidate.style})` });
      break;
    } catch {
      // Try next candidate
    }
  }

  if (!faFont) {
    figma.ui.postMessage({
      type: 'log',
      message: '⚠️  Font Awesome not found. Install "Font Awesome 6 Free" to see arrow icons. Falling back to text arrow.'
    });
  }

  // Find Library page (will be used later)
  let libraryPage = figma.root.findOne(node => node.type === 'PAGE' && node.name === 'Library') as PageNode;
  if (!libraryPage) {
    libraryPage = figma.createPage();
    libraryPage.name = 'Library';
  }

  // Check for existing component set if update mode is enabled
  let existingComponentSet: ComponentSetNode | null = null;
  let existingPosition = { x: 0, y: 0 };

  if (updateExisting) {
    figma.ui.postMessage({ type: 'progress', message: 'Checking for existing Button component...' });

    existingComponentSet = libraryPage.findOne(
      node => node.type === 'COMPONENT_SET' && node.name === 'Button'
    ) as ComponentSetNode | null;

    if (existingComponentSet) {
      figma.ui.postMessage({ type: 'progress', message: 'Found existing Button component, will replace it...' });
      existingPosition = { x: existingComponentSet.x, y: existingComponentSet.y };
    } else {
      figma.ui.postMessage({ type: 'log', message: 'No existing Button component found, will create new one' });
    }
  }

  // Phase 1: Resolve all tokens and store styling data per variant
  interface VariantStyle {
    bgColor: string;
    textColor: string;
    borderColor: string;
    borderWidth: string | null;
    borderRadius: string | null;
    paddingX: string;
    paddingTop: string;
    paddingBottom: string;
    fontSize: string;
    lineHeight: string;
    iconSpacing: string;
  }
  const variantStyles = new Map<string, VariantStyle>();

  for (let i = 0; i < allVariants.length; i++) {
    const variantCombo = allVariants[i];
    const variantName = Object.entries(variantCombo).map(([k, v]) => `${k}=${v}`).join(', ');

    // Resolve tokens for this variant
    const backgroundPath = substituteTokenPath(spec.tokenMappings.background, variantCombo);
    const textPath = substituteTokenPath(spec.tokenMappings.text, variantCombo);
    const borderColorPath = substituteTokenPath(spec.tokenMappings.borderColor, variantCombo);
    const borderWidthPath = spec.tokenMappings.borderWidth;
    const paddingXPath = substituteTokenPath(spec.tokenMappings.paddingX, variantCombo);
    const paddingTopPath = substituteTokenPath(spec.tokenMappings.paddingTop, variantCombo);
    const paddingBottomPath = substituteTokenPath(spec.tokenMappings.paddingBottom, variantCombo);
    const borderRadiusPath = spec.tokenMappings.borderRadius;
    const fontSizePath = substituteTokenPath(spec.tokenMappings.fontSize, variantCombo);
    const lineHeightPath = substituteTokenPath(spec.tokenMappings.lineHeight, variantCombo);
    const iconSpacingPath = spec.tokenMappings.iconSpacing;

    const backgroundColor = getToken(backgroundPath);
    let textColor = getToken(textPath);
    const borderColor = getToken(borderColorPath);
    const borderWidth = getToken(borderWidthPath);
    const paddingX = getToken(paddingXPath);
    const paddingTop = getToken(paddingTopPath);
    const paddingBottom = getToken(paddingBottomPath);
    const borderRadius = getToken(borderRadiusPath);
    const fontSize = getToken(fontSizePath);
    const lineHeight = getToken(lineHeightPath) || '1.4';
    const iconSpacing = getToken(iconSpacingPath) || '0.5rem'; // Default fallback

    // Log every token resolution to the plugin UI
    figma.ui.postMessage({
      type: 'log',
      message: `[${variantName}] bg: ${backgroundPath} → ${backgroundColor}`
    });
    figma.ui.postMessage({
      type: 'log',
      message: `[${variantName}] text: ${textPath} → ${textColor}`
    });

    // Fallback for missing text color (use default)
    if (!textColor) {
      const defaultTextPath = substituteTokenPath(spec.tokenMappings.text, { ...variantCombo, state: 'default' });
      textColor = getToken(defaultTextPath);
      if (!textColor) {
        throw new Error(`Text color token "${textPath}" not found and no default fallback available`);
      }
      figma.ui.postMessage({
        type: 'log',
        message: `⚠️  [${variantName}] text fallback: ${defaultTextPath} → ${textColor}`
      });
    }

    if (!backgroundColor || !textColor || !borderColor || !paddingX || !paddingTop || !paddingBottom || !fontSize) {
      const missing = [];
      if (!backgroundColor) missing.push(`background: ${backgroundPath}`);
      if (!textColor) missing.push(`text: ${textPath}`);
      if (!borderColor) missing.push(`borderColor: ${borderColorPath}`);
      if (!paddingX) missing.push(`paddingX: ${paddingXPath}`);
      if (!paddingTop) missing.push(`paddingTop: ${paddingTopPath}`);
      if (!paddingBottom) missing.push(`paddingBottom: ${paddingBottomPath}`);
      if (!fontSize) missing.push(`fontSize: ${fontSizePath}`);
      throw new Error(`Missing tokens for variant:\n${missing.join('\n')}`);
    }

    variantStyles.set(variantName, {
      bgColor: backgroundColor,
      textColor,
      borderColor,
      borderWidth,
      borderRadius,
      paddingX,
      paddingTop,
      paddingBottom,
      fontSize,
      lineHeight,
      iconSpacing
    });
  }

  // Phase 2: Create bare component structures (NO fills yet)
  const componentNodes: ComponentNode[] = [];

  for (let i = 0; i < allVariants.length; i++) {
    const variantCombo = allVariants[i];
    const variantName = Object.entries(variantCombo).map(([k, v]) => `${k}=${v}`).join(', ');
    const style = variantStyles.get(variantName)!;

    figma.ui.postMessage({
      type: 'progress',
      message: `Creating structure [${i + 1}/${allVariants.length}]: ${variantName}`
    });

    const component = figma.createComponent();
    component.name = variantName;

    // Determine modifier for this variant
    const modifier = variantCombo.modifier || 'default';
    const isLightFont = modifier === 'light-font';

    // Light-font modifier overrides: CSS .bttn--light-font {
    //   font-family: 'Roboto'; font-weight: 400; font-size: 0.9rem;
    //   letter-spacing: 0.04rem; padding: 1rem 2rem 1rem;
    // }
    const effectiveFontSizePx = isLightFont ? 14.4 : parseDimension(style.fontSize);  // 0.9rem = 14.4px
    const effectiveLineHeightPx = effectiveFontSizePx * parseFloat(style.lineHeight);
    const effectivePaddingX = isLightFont ? 32 : parseDimension(style.paddingX);       // 2rem = 32px
    const effectivePaddingTop = isLightFont ? 16 : parseDimension(style.paddingTop);   // 1rem = 16px
    const effectivePaddingBottom = isLightFont ? 16 : parseDimension(style.paddingBottom); // 1rem = 16px
    const effectiveFont = isLightFont ? lightFontLoaded : loadedFont;

    // Layout
    component.layoutMode = 'HORIZONTAL';
    component.primaryAxisAlignItems = 'MIN';
    component.counterAxisAlignItems = 'CENTER';
    component.paddingLeft = effectivePaddingX;
    component.paddingRight = effectivePaddingX;
    component.paddingTop = effectivePaddingTop;
    component.paddingBottom = effectivePaddingBottom;
    component.itemSpacing = parseDimension(style.iconSpacing);
    component.primaryAxisSizingMode = 'AUTO';
    component.counterAxisSizingMode = 'AUTO';

    // Border radius
    if (style.borderRadius) {
      component.cornerRadius = parseDimension(style.borderRadius);
    }

    // Text node
    const textNode = figma.createText();
    textNode.fontName = effectiveFont;
    textNode.fontSize = effectiveFontSizePx;
    textNode.lineHeight = { value: effectiveLineHeightPx, unit: 'PIXELS' };
    textNode.textCase = 'UPPER';
    textNode.characters = spec.defaults.label || 'Button';

    // Light-font: add letter spacing (CSS: letter-spacing: 0.04rem = 0.64px)
    if (isLightFont) {
      textNode.letterSpacing = { value: 0.64, unit: 'PIXELS' };
    }

    component.appendChild(textNode);
    const textAutoHeight = textNode.height;

    // Arrow icon - FontAwesome glyph (editable in Figma to swap icons)
    let iconAutoHeight = 0;
    if (faFont) {
      const iconNode = figma.createText();
      iconNode.name = 'arrow-icon';
      iconNode.fontName = faFont;
      iconNode.fontSize = effectiveFontSizePx;
      iconNode.lineHeight = { value: effectiveLineHeightPx, unit: 'PIXELS' };
      iconNode.characters = '\uF061'; // fa-arrow-right (U+F061)
      iconNode.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1 }];
      component.appendChild(iconNode);

      // Log icon node natural/auto height
      iconAutoHeight = iconNode.height;

      // Constrain icon height: FA font metrics produce bounding boxes much
      // taller than the line-height setting. Since the auto-layout frame
      // hugs the tallest child, an oversized icon inflates the whole button.
      // Fix: set icon to FILL the cross-axis so it follows the text height.
      iconNode.layoutSizingVertical = 'FILL';
    }

    // Add hover underline bar for hover state variants
    // Mirrors the CSS bttn--focus mixin's ::after pseudo-element:
    //   - 4px tall bar at the bottom of the button, full width
    //   - CSS uses scaleX(0) → scaleX(1) transition on hover
    //   - In Figma we show it in its "revealed" state for hover variants
    //   - Color: primary buttons → $secondary (black), others → $primary (gold)
    if (variantCombo.state === 'hover') {
      const underlineBar = figma.createRectangle();
      underlineBar.name = 'hover-underline';
      component.appendChild(underlineBar);

      // Remove from auto-layout flow (equivalent to CSS position: absolute)
      underlineBar.layoutPositioning = 'ABSOLUTE';

      // Set size: full width of component, 4px height (matches CSS height: 4px)
      underlineBar.resize(component.width, 4);

      // Position at bottom of component (matches CSS bottom: 0)
      underlineBar.x = 0;
      underlineBar.y = component.height - 4;

      // Pin to bottom and stretch horizontally (responsive to resizing)
      underlineBar.constraints = { horizontal: 'STRETCH', vertical: 'MAX' };

      // Determine underline color based on button color variant:
      // CSS: .bttn--primary &:after { background-color: variables.$secondary; } → black
      // CSS: .bttn--secondary, .bttn--tertiary use $primary (gold) from bttn--focus mixin
      let underlineColorStr: string;
      if (variantCombo.color === 'primary') {
        underlineColorStr = getToken('color.brand.black') || '#000000';
      } else {
        underlineColorStr = getToken('color.brand.gold') || '#FFCD00';
      }

      const underlineParsed = parseColor(underlineColorStr);
      underlineBar.fills = [{ type: 'SOLID', color: underlineParsed.color, opacity: underlineParsed.opacity }];

      figma.ui.postMessage({
        type: 'log',
        message: `  ✓ Added hover underline (${variantCombo.color} → ${underlineColorStr})`
      });
    }

    // Log computed dimensions for debugging parity with CSS
    figma.ui.postMessage({
      type: 'log',
      message: `📐 [${variantName}] frame: ${component.width.toFixed(1)}x${component.height.toFixed(1)}px | text-h: ${textAutoHeight.toFixed(1)} | icon-h: ${iconAutoHeight.toFixed(1)} | target-lh: ${effectiveLineHeightPx}px | pad: T${component.paddingTop}/B${component.paddingBottom} | mod: ${modifier}`
    });

    componentNodes.push(component);
  }

  // Phase 3: Combine as variants
  figma.ui.postMessage({ type: 'progress', message: 'Combining as component set...' });
  const componentSet = figma.combineAsVariants(componentNodes, figma.currentPage);
  componentSet.name = 'Button';

  // Arrange variants in a grid (combineAsVariants stacks them at 0,0)
  // Adds extra vertical gap between modifier groups (default vs light-font)
  const gridGap = 20;
  const groupGap = 60; // Extra gap between modifier sections
  const columns = variantAxes.state ? variantAxes.state.length : 3;
  let col = 0;
  let rowHeight = 0;
  let xOffset = gridGap;
  let yOffset = gridGap;
  let lastModifier: string | null = null;

  for (const child of componentSet.children) {
    if (child.type !== 'COMPONENT') continue;

    // Parse modifier from variant name to detect group boundaries
    const childProps: Record<string, string> = {};
    child.name.split(',').forEach(pair => {
      const [key, val] = pair.trim().split('=');
      if (key && val) childProps[key.trim()] = val.trim();
    });
    const currentModifier = childProps.modifier || 'default';

    // Insert extra gap when transitioning between modifier groups
    if (lastModifier !== null && currentModifier !== lastModifier) {
      if (col > 0) {
        col = 0;
        xOffset = gridGap;
        yOffset += rowHeight + gridGap;
        rowHeight = 0;
      }
      yOffset += groupGap;
    }
    lastModifier = currentModifier;

    child.x = xOffset;
    child.y = yOffset;

    xOffset += child.width + gridGap;
    rowHeight = Math.max(rowHeight, child.height);
    col++;

    if (col >= columns) {
      col = 0;
      xOffset = gridGap;
      yOffset += rowHeight + gridGap;
      rowHeight = 0;
    }
  }

  // Resize the component set to fit the grid
  const lastChild = componentSet.children[componentSet.children.length - 1];
  if (lastChild) {
    componentSet.resize(
      lastChild.x + lastChild.width + gridGap,
      lastChild.y + lastChild.height + gridGap
    );
  }

  componentSet.clipsContent = false;

  figma.ui.postMessage({
    type: 'log',
    message: `Component set grid: ${componentSet.width}x${componentSet.height}, ${componentSet.children.length} children arranged`
  });

  // Phase 4: Add label component property
  try {
    const labelPropertyKey = componentSet.addComponentProperty('label', 'TEXT', spec.properties.label.default);
    for (const child of componentSet.children) {
      if (child.type === 'COMPONENT') {
        const textNode = child.findOne(node => node.type === 'TEXT') as TextNode;
        if (textNode) {
          textNode.componentPropertyReferences = { characters: labelPropertyKey };
        }
      }
    }
    figma.ui.postMessage({
      type: 'log',
      message: '✓ Added "label" component property'
    });
  } catch (error) {
    figma.ui.postMessage({
      type: 'log',
      message: '⚠️  Could not bind label property. This is a known Figma API limitation.'
    });
  }

  // Phase 5: Delete old component set if updating
  if (existingComponentSet) {
    figma.ui.postMessage({ type: 'progress', message: 'Removing old Button component...' });
    existingComponentSet.remove();
  }

  // Phase 6: Move to Library page
  libraryPage.appendChild(componentSet);
  figma.currentPage = libraryPage;

  if (updateExisting && existingComponentSet) {
    componentSet.x = existingPosition.x;
    componentSet.y = existingPosition.y;
  }

  // Phase 7: Apply ALL fills LAST (after combining, binding, moving — nothing can override these)
  // Instead of name-based Map lookup, parse each child's variant properties directly from its name.
  // This avoids issues if combineAsVariants reformats names.
  figma.ui.postMessage({ type: 'progress', message: 'Applying colors (final pass)...' });

  let appliedCount = 0;

  for (const child of componentSet.children) {
    if (child.type !== 'COMPONENT') continue;

    // Parse variant values from Figma's name format: "color=primary, size=medium, state=default"
    const variantValues: Record<string, string> = {};
    child.name.split(',').forEach(pair => {
      const [key, val] = pair.trim().split('=');
      if (key && val) variantValues[key.trim()] = val.trim();
    });

    figma.ui.postMessage({
      type: 'log',
      message: `Parsing "${child.name}" → ${JSON.stringify(variantValues)}`
    });

    // Resolve tokens directly from parsed variant values
    // For hover state: CSS does NOT change background or border on hover —
    // only the ::after underline appears. Override to use default-state bg/border.
    const bgVariantValues = variantValues.state === 'hover'
      ? { ...variantValues, state: 'default' }
      : variantValues;
    const backgroundPath = substituteTokenPath(spec.tokenMappings.background, bgVariantValues);
    const textPath = substituteTokenPath(spec.tokenMappings.text, variantValues);
    const borderColorPath = substituteTokenPath(spec.tokenMappings.borderColor, bgVariantValues);
    const borderWidthPath = spec.tokenMappings.borderWidth;

    const bgColor = getToken(backgroundPath);
    let textColor = getToken(textPath);
    const borderColor = getToken(borderColorPath);
    const borderWidth = getToken(borderWidthPath);

    // Fallback for missing text color
    if (!textColor) {
      const fallbackValues = { ...variantValues, state: 'default' };
      const fallbackPath = substituteTokenPath(spec.tokenMappings.text, fallbackValues);
      textColor = getToken(fallbackPath);
    }

    figma.ui.postMessage({
      type: 'log',
      message: `  bg: ${backgroundPath} → ${bgColor}`
    });
    figma.ui.postMessage({
      type: 'log',
      message: `  text: ${textPath} → ${textColor}`
    });

    if (!bgColor || !textColor) {
      figma.ui.postMessage({
        type: 'log',
        message: `  SKIPPED (missing token values)`
      });
      continue;
    }

    // Ensure node is visible and fully opaque
    child.visible = true;
    child.opacity = 1;

    // Apply background fill
    const bgParsed = parseColor(bgColor);
    child.fills = [{ type: 'SOLID', color: bgParsed.color, opacity: bgParsed.opacity }];

    // Apply border (INSIDE to match CSS box model where border is inside the element)
    if (borderWidth && borderColor && parseFloat(borderWidth) > 0) {
      const borderParsed = parseColor(borderColor);
      child.strokes = [{ type: 'SOLID', color: borderParsed.color, opacity: borderParsed.opacity }];
      child.strokeWeight = parseDimension(borderWidth);
      child.strokeAlign = 'INSIDE';
    }

    // Apply text color
    const textNode = child.findOne(node => node.type === 'TEXT') as TextNode;
    if (textNode) {
      const textParsed = parseColor(textColor);
      textNode.fills = [{ type: 'SOLID', color: textParsed.color, opacity: textParsed.opacity }];
    }

    // Apply arrow icon color (same as text color)
    const arrowNode = child.findOne(node => node.name === 'arrow-icon');
    if (arrowNode && (arrowNode.type === 'TEXT' || arrowNode.type === 'VECTOR')) {
      const textParsed = parseColor(textColor);
      (arrowNode as TextNode | VectorNode).fills = [{ type: 'SOLID', color: textParsed.color, opacity: textParsed.opacity }];
    }

    // Force re-render by nudging position
    child.x += 0.01;
    child.x -= 0.01;

    // Read back and verify
    const readBack = JSON.stringify((child.fills as Paint[])[0]);
    figma.ui.postMessage({
      type: 'log',
      message: `  APPLIED (${child.width}x${child.height}) → ${readBack}`
    });

    appliedCount++;
  }

  figma.ui.postMessage({
    type: 'log',
    message: `\nApplied colors to ${appliedCount}/${componentSet.children.length} variants`
  });

  // Center and zoom
  figma.viewport.scrollAndZoomIntoView([componentSet]);

  const actionVerb = (updateExisting && existingComponentSet) ? 'Updated' : 'Created';
  figma.ui.postMessage({
    type: 'success',
    message: `Complete! ${actionVerb} Button component with ${allVariants.length} variants.`
  });
}

// Generate stat component
async function generateStatComponent(spec: ComponentDefinition, updateExisting: boolean): Promise<void> {
  figma.ui.postMessage({ type: 'progress', message: 'Generating Stat component...' });

  // Get variant axes
  const variantAxes = spec.variants;
  const variantKeys = Object.keys(variantAxes);

  // Generate all variant combinations
  const allVariants: Record<string, string>[] = [];

  function generateCombinations(axes: string[], index: number, current: Record<string, string>) {
    if (index === axes.length) {
      allVariants.push({ ...current });
      return;
    }
    const axisName = axes[index];
    const axisValues = variantAxes[axisName];
    for (const value of axisValues) {
      current[axisName] = value;
      generateCombinations(axes, index + 1, current);
    }
  }

  generateCombinations(variantKeys, 0, {});

  figma.ui.postMessage({ type: 'progress', message: `Generating ${allVariants.length} stat variants...` });

  // Load fonts
  // Title + Description use Antonio (caps-bold), Content uses Roboto (base)
  const capsFontFamily = getToken(spec.tokenMappings.fontFamilyCaps);
  const baseFontFamily = getToken(spec.tokenMappings.fontFamilyBase);

  if (!capsFontFamily || !baseFontFamily) {
    throw new Error('Missing font family tokens for stat component');
  }

  const capsFamily = capsFontFamily.replace(/['"]/g, '').split(',')[0].trim();
  const baseFamily = baseFontFamily.replace(/['"]/g, '').split(',')[0].trim();

  figma.ui.postMessage({ type: 'progress', message: `Loading fonts: ${capsFamily}, ${baseFamily}...` });

  // Load Antonio Bold for title/description
  let capsFont: { family: string; style: string };
  try {
    await figma.loadFontAsync({ family: capsFamily, style: 'Bold' });
    capsFont = { family: capsFamily, style: 'Bold' };
  } catch {
    try {
      await figma.loadFontAsync({ family: capsFamily, style: 'Semi Bold' });
      capsFont = { family: capsFamily, style: 'Semi Bold' };
    } catch {
      try {
        await figma.loadFontAsync({ family: capsFamily, style: 'Regular' });
        capsFont = { family: capsFamily, style: 'Regular' };
      } catch {
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        capsFont = { family: 'Inter', style: 'Regular' };
        figma.ui.postMessage({ type: 'log', message: `⚠️  Font "${capsFamily}" not available, using Inter fallback` });
      }
    }
  }

  figma.ui.postMessage({ type: 'log', message: `✓ Loaded caps font: ${capsFont.family} (${capsFont.style})` });

  // Load Roboto Regular for content text
  const baseFont = await loadFont(baseFamily, 400);
  figma.ui.postMessage({ type: 'log', message: `✓ Loaded base font: ${baseFont.family} (${baseFont.style})` });

  // Resolve common dimension tokens
  const titleFontSizePx = parseDimension(getToken(spec.tokenMappings.titleFontSize) || '5rem');
  const titleLineHeight = parseFloat(getToken(spec.tokenMappings.titleLineHeight) || '1');
  const titleBorderWidth = parseDimension(getToken(spec.tokenMappings.titleBorderWidth) || '8px');
  const descFontSizePx = parseDimension(getToken(spec.tokenMappings.descriptionFontSize) || '1.5rem');
  const descLineHeight = parseFloat(getToken(spec.tokenMappings.descriptionLineHeight) || '1.2');
  const contentFontSizePx = parseDimension(getToken(spec.tokenMappings.contentFontSize) || '1rem');
  const contentLineHeight = parseFloat(getToken(spec.tokenMappings.contentLineHeight) || '1.4');
  const prefixFontSizePx = parseDimension(getToken(spec.tokenMappings.prefixFontSize) || '3.5rem');
  const paddingTop = parseDimension(getToken(spec.tokenMappings.paddingTop) || '0');
  const paddingRight = parseDimension(getToken(spec.tokenMappings.paddingRight) || '1.875rem');
  const paddingBottom = parseDimension(getToken(spec.tokenMappings.paddingBottom) || '0.625rem');
  const paddingLeft = parseDimension(getToken(spec.tokenMappings.paddingLeft) || '0');
  const descMargin = parseDimension(getToken(spec.tokenMappings.descriptionMargin) || '0.625rem');

  // Horizontal display overrides
  const hTitleFontSizePx = parseDimension(getToken(spec.tokenMappings.horizontalTitleFontSize) || '3.1rem');
  const hContentFontSizePx = parseDimension(getToken(spec.tokenMappings.horizontalContentFontSize) || '1.1rem');
  const hDescFontSizePx = parseDimension(getToken(spec.tokenMappings.horizontalDescriptionFontSize) || '1.3rem');
  const hPrefixFontSizePx = parseDimension(getToken(spec.tokenMappings.horizontalPrefixFontSize) || '2.1rem');

  figma.ui.postMessage({
    type: 'log',
    message: `📐 Stat tokens: title=${titleFontSizePx}px, desc=${descFontSizePx}px, content=${contentFontSizePx}px, prefix=${prefixFontSizePx}px`
  });

  // Find Library page
  let libraryPage = figma.root.findOne(node => node.type === 'PAGE' && node.name === 'Library') as PageNode;
  if (!libraryPage) {
    libraryPage = figma.createPage();
    libraryPage.name = 'Library';
  }

  // Check for existing component set
  let existingComponentSet: ComponentSetNode | null = null;
  let existingPosition = { x: 0, y: 0 };

  if (updateExisting) {
    existingComponentSet = libraryPage.findOne(
      node => node.type === 'COMPONENT_SET' && node.name === 'Stat'
    ) as ComponentSetNode | null;

    if (existingComponentSet) {
      figma.ui.postMessage({ type: 'progress', message: 'Found existing Stat component, will replace it...' });
      existingPosition = { x: existingComponentSet.x, y: existingComponentSet.y };
    }
  }

  // Phase 1: Create component structures
  const componentNodes: ComponentNode[] = [];

  // Fixed component widths to ensure proper text wrapping
  const STACKED_WIDTH = 350;
  const HORIZONTAL_WIDTH = 450;

  for (let i = 0; i < allVariants.length; i++) {
    const variantCombo = allVariants[i];
    const variantName = Object.entries(variantCombo).map(([k, v]) => `${k}=${v}`).join(', ');
    const displayMode = variantCombo.display; // 'default', 'centered', 'horizontal'

    figma.ui.postMessage({
      type: 'progress',
      message: `Creating structure [${i + 1}/${allVariants.length}]: ${variantName}`
    });

    const component = figma.createComponent();
    component.name = variantName;

    // Choose font sizes based on display mode
    const isHorizontal = displayMode === 'horizontal';
    const isCentered = displayMode === 'centered';
    const effectiveTitleFontSize = isHorizontal ? hTitleFontSizePx : titleFontSizePx;
    const effectiveContentFontSize = isHorizontal ? hContentFontSizePx : contentFontSizePx;
    const effectiveDescFontSize = isHorizontal ? hDescFontSizePx : descFontSizePx;
    const effectivePrefixFontSize = isHorizontal ? hPrefixFontSizePx : prefixFontSizePx;
    const textAlign: 'LEFT' | 'CENTER' = isCentered ? 'CENTER' : 'LEFT';

    if (isHorizontal) {
      // ──────────────────────────────────────────────────────
      // HORIZONTAL layout (Screenshot 3)
      // Title on LEFT, description on RIGHT (same row)
      // Gold bar full-width below the row
      // Content text below the gold bar
      // ──────────────────────────────────────────────────────
      component.layoutMode = 'VERTICAL';
      component.primaryAxisAlignItems = 'MIN';
      component.counterAxisAlignItems = 'MIN';
      component.paddingLeft = 0;
      component.paddingRight = 0;
      component.paddingTop = 0;
      component.paddingBottom = 0;
      component.itemSpacing = 0;
      component.primaryAxisSizingMode = 'AUTO';
      component.counterAxisSizingMode = 'FIXED';
      component.resize(HORIZONTAL_WIDTH, 10);

      // Row: Title + Description side-by-side
      const topRow = figma.createFrame();
      topRow.name = 'title-row';
      topRow.layoutMode = 'HORIZONTAL';
      topRow.primaryAxisAlignItems = 'MIN';
      topRow.counterAxisAlignItems = 'CENTER';
      topRow.paddingTop = 0;
      topRow.paddingBottom = paddingBottom;
      topRow.paddingLeft = 0;
      topRow.paddingRight = 0;
      topRow.itemSpacing = paddingRight; // gap between title and description
      topRow.fills = [];

      // Title wrapper (prefix + title + suffix)
      const titleFrame = figma.createFrame();
      titleFrame.name = 'title-wrapper';
      titleFrame.layoutMode = 'HORIZONTAL';
      titleFrame.primaryAxisAlignItems = 'MIN';
      titleFrame.counterAxisAlignItems = 'MAX';  // baseline align
      titleFrame.paddingTop = 0;
      titleFrame.paddingBottom = 0;
      titleFrame.paddingLeft = 0;
      titleFrame.paddingRight = 0;
      titleFrame.itemSpacing = 0;
      titleFrame.fills = [];

      const prefixNode = figma.createText();
      prefixNode.name = 'prefix';
      prefixNode.fontName = capsFont;
      prefixNode.fontSize = effectivePrefixFontSize;
      prefixNode.lineHeight = { value: effectiveTitleFontSize * titleLineHeight, unit: 'PIXELS' };
      prefixNode.textCase = 'UPPER';
      prefixNode.textAutoResize = 'WIDTH_AND_HEIGHT';
      prefixNode.characters = spec.defaults.prefix || '';
      titleFrame.appendChild(prefixNode);

      const titleNode = figma.createText();
      titleNode.name = 'title';
      titleNode.fontName = capsFont;
      titleNode.fontSize = effectiveTitleFontSize;
      titleNode.lineHeight = { value: effectiveTitleFontSize * titleLineHeight, unit: 'PIXELS' };
      titleNode.textCase = 'UPPER';
      titleNode.textAutoResize = 'WIDTH_AND_HEIGHT';
      titleNode.characters = spec.defaults.title || '15:1';
      titleFrame.appendChild(titleNode);

      const suffixNode = figma.createText();
      suffixNode.name = 'suffix';
      suffixNode.fontName = capsFont;
      suffixNode.fontSize = effectivePrefixFontSize;
      suffixNode.lineHeight = { value: effectiveTitleFontSize * titleLineHeight, unit: 'PIXELS' };
      suffixNode.textCase = 'UPPER';
      suffixNode.textAutoResize = 'WIDTH_AND_HEIGHT';
      suffixNode.characters = spec.defaults.suffix || '+';
      titleFrame.appendChild(suffixNode);

      // Append Top Row to component FIRST to establish width context
      component.appendChild(topRow);
      topRow.layoutSizingHorizontal = 'FILL';

      // Now append children
      topRow.appendChild(titleFrame);

      // Description (right side of title)
      const descNode = figma.createText();
      descNode.name = 'description';
      descNode.fontName = capsFont;
      descNode.fontSize = effectiveDescFontSize;
      descNode.lineHeight = { value: effectiveDescFontSize * descLineHeight, unit: 'PIXELS' };
      descNode.textCase = 'UPPER';
      descNode.textAlignHorizontal = 'LEFT';
      descNode.textAutoResize = 'WIDTH_AND_HEIGHT'; // Start with natural size to prevent stacking
      descNode.characters = spec.defaults.summary || 'student-to-faculty ratio';

      topRow.appendChild(descNode);

      // Now that it has content and is in a frame, switch to Fill
      descNode.layoutSizingHorizontal = 'FILL';
      descNode.textAutoResize = 'HEIGHT';

      // Gold bar separator (full width rectangle)
      const goldBar = figma.createRectangle();
      goldBar.name = 'divider-bar';
      goldBar.resize(HORIZONTAL_WIDTH, titleBorderWidth);
      component.appendChild(goldBar);
      goldBar.layoutSizingHorizontal = 'FILL'; // Must be set AFTER appendChild

      // Content (below the bar)
      const contentNode = figma.createText();
      contentNode.name = 'content';
      contentNode.fontName = baseFont;
      contentNode.fontSize = effectiveContentFontSize;
      contentNode.lineHeight = { value: effectiveContentFontSize * contentLineHeight, unit: 'PIXELS' };
      // Start with Hug/Natural size
      contentNode.textAutoResize = 'WIDTH_AND_HEIGHT';
      contentNode.characters = spec.defaults.content || 'Among the top 2% of universities worldwide.';

      // Small top padding above content
      const contentWrapper = figma.createFrame();
      contentWrapper.name = 'content-wrapper';
      contentWrapper.layoutMode = 'VERTICAL';
      contentWrapper.paddingTop = 8; // 0.5rem
      contentWrapper.paddingBottom = 0;
      contentWrapper.paddingLeft = 0;
      contentWrapper.paddingRight = 0;
      contentWrapper.fills = [];

      // Append wrapper to component FIRST
      component.appendChild(contentWrapper);
      contentWrapper.layoutSizingHorizontal = 'FILL';

      // Then append content node
      contentWrapper.appendChild(contentNode);

      // Switch to Fill AFTER appending
      contentNode.layoutSizingHorizontal = 'FILL';
      contentNode.textAutoResize = 'HEIGHT';

    } else {
      // ──────────────────────────────────────────────────────
      // DEFAULT (left-aligned, Screenshot 2) or CENTERED (Screenshot 4)
      // Title with prefix/suffix → gold bar → description → content
      // Difference: text alignment and component alignment
      // ──────────────────────────────────────────────────────
      const alignItems: 'CENTER' | 'MIN' = isCentered ? 'CENTER' : 'MIN';

      component.layoutMode = 'VERTICAL';
      component.primaryAxisAlignItems = alignItems;
      component.counterAxisAlignItems = isCentered ? 'CENTER' : 'MIN';
      component.paddingLeft = paddingRight; // $lg
      component.paddingRight = paddingRight;
      component.paddingTop = paddingTop;
      component.paddingBottom = paddingBottom;
      component.itemSpacing = 0;
      component.primaryAxisSizingMode = 'AUTO';
      component.counterAxisSizingMode = 'FIXED';
      component.resize(STACKED_WIDTH, 10);

      // Title wrapper (holds prefix + title + suffix in a row)
      const titleFrame = figma.createFrame();
      titleFrame.name = 'title-wrapper';
      titleFrame.layoutMode = 'HORIZONTAL';
      titleFrame.primaryAxisAlignItems = isCentered ? 'CENTER' : 'MIN';
      titleFrame.counterAxisAlignItems = 'MAX'; // baseline align prefix/suffix
      titleFrame.paddingTop = 0;
      titleFrame.paddingBottom = paddingBottom; // $sm space below title text, above bar
      titleFrame.paddingLeft = 0;
      titleFrame.paddingRight = 0;
      titleFrame.itemSpacing = 0;
      titleFrame.fills = [];

      const prefixNode = figma.createText();
      prefixNode.name = 'prefix';
      prefixNode.fontName = capsFont;
      prefixNode.fontSize = effectivePrefixFontSize;
      prefixNode.lineHeight = { value: effectiveTitleFontSize * titleLineHeight, unit: 'PIXELS' };
      prefixNode.textCase = 'UPPER';
      prefixNode.textAutoResize = 'WIDTH_AND_HEIGHT';
      prefixNode.characters = spec.defaults.prefix || '';
      titleFrame.appendChild(prefixNode);

      const titleNode = figma.createText();
      titleNode.name = 'title';
      titleNode.fontName = capsFont;
      titleNode.fontSize = effectiveTitleFontSize;
      titleNode.lineHeight = { value: effectiveTitleFontSize * titleLineHeight, unit: 'PIXELS' };
      titleNode.textCase = 'UPPER';
      titleNode.textAutoResize = 'WIDTH_AND_HEIGHT';
      titleNode.characters = spec.defaults.title || '15:1';
      titleFrame.appendChild(titleNode);

      const suffixNode = figma.createText();
      suffixNode.name = 'suffix';
      suffixNode.fontName = capsFont;
      suffixNode.fontSize = effectivePrefixFontSize;
      suffixNode.lineHeight = { value: effectiveTitleFontSize * titleLineHeight, unit: 'PIXELS' };
      suffixNode.textCase = 'UPPER';
      suffixNode.textAutoResize = 'WIDTH_AND_HEIGHT';
      suffixNode.characters = spec.defaults.suffix || '+';
      titleFrame.appendChild(suffixNode);

      component.appendChild(titleFrame);

      // Gold divider bar (explicit rectangle, not a stroke)
      const goldBar = figma.createRectangle();
      goldBar.name = 'divider-bar';
      goldBar.resize(isCentered ? titleFrame.width : STACKED_WIDTH, titleBorderWidth);
      component.appendChild(goldBar);
      if (!isCentered) {
        goldBar.layoutSizingHorizontal = 'FILL'; // Must be set AFTER appendChild
      }

      // Description
      const descFrame = figma.createFrame();
      descFrame.name = 'description-wrapper';
      descFrame.layoutMode = 'VERTICAL';
      descFrame.paddingTop = descMargin;
      descFrame.paddingBottom = descMargin;
      descFrame.paddingLeft = 0;
      descFrame.paddingRight = 0;
      descFrame.fills = [];

      const descNode = figma.createText();
      descNode.name = 'description';
      descNode.fontName = capsFont;
      descNode.fontSize = effectiveDescFontSize;
      descNode.lineHeight = { value: effectiveDescFontSize * descLineHeight, unit: 'PIXELS' };
      descNode.textCase = 'UPPER';
      descNode.textAlignHorizontal = textAlign;

      // Start HUG to establish width
      descNode.textAutoResize = 'WIDTH_AND_HEIGHT';
      descNode.characters = spec.defaults.summary || 'student-to-faculty ratio';


      // Append wrapper to component FIRST
      component.appendChild(descFrame);
      descFrame.layoutSizingHorizontal = 'FILL';

      descFrame.appendChild(descNode);

      // Set FILL sizing AFTER nodes are in the auto-layout tree and parent has width
      descNode.layoutSizingHorizontal = 'FILL';
      descNode.textAutoResize = 'HEIGHT';

      // Content
      const contentNode = figma.createText();
      contentNode.name = 'content';
      contentNode.fontName = baseFont;
      contentNode.fontSize = effectiveContentFontSize;
      contentNode.lineHeight = { value: effectiveContentFontSize * contentLineHeight, unit: 'PIXELS' };
      contentNode.textAlignHorizontal = textAlign;

      // Start HUG
      contentNode.textAutoResize = 'WIDTH_AND_HEIGHT';
      contentNode.characters = spec.defaults.content || 'Among the top 2% of universities worldwide.';

      component.appendChild(contentNode);
      contentNode.layoutSizingHorizontal = 'FILL'; // Must be set AFTER appendChild
      contentNode.textAutoResize = 'HEIGHT';
    }

    figma.ui.postMessage({
      type: 'log',
      message: `📐 [${variantName}] frame: ${component.width.toFixed(1)}x${component.height.toFixed(1)}px`
    });

    componentNodes.push(component);
  }

  // Phase 2: Combine as component set
  figma.ui.postMessage({ type: 'progress', message: 'Combining as component set...' });
  const componentSet = figma.combineAsVariants(componentNodes, figma.currentPage);
  componentSet.name = 'Stat';

  // Arrange variants in a grid — group by display mode
  const gridGap = 100; // Increased to prevent overlap
  const groupGap = 150;
  const bgCount = variantAxes.background ? variantAxes.background.length : 5;
  let col = 0;
  let rowHeight = 0;
  let xOffset = gridGap;
  let yOffset = gridGap;
  let lastDisplay: string | null = null;

  for (const child of componentSet.children) {
    if (child.type !== 'COMPONENT') continue;

    const childProps: Record<string, string> = {};
    child.name.split(',').forEach(pair => {
      const [key, val] = pair.trim().split('=');
      if (key && val) childProps[key.trim()] = val.trim();
    });
    const currentDisplay = childProps.display || 'default';

    // Insert group gap when switching display modes
    if (lastDisplay !== null && currentDisplay !== lastDisplay) {
      if (col > 0) {
        col = 0;
        xOffset = gridGap;
        yOffset += rowHeight + gridGap;
        rowHeight = 0;
      }
      yOffset += groupGap;
    }
    lastDisplay = currentDisplay;

    child.x = xOffset;
    child.y = yOffset;

    xOffset += child.width + gridGap;
    rowHeight = Math.max(rowHeight, child.height);
    col++;

    if (col >= bgCount) {
      col = 0;
      xOffset = gridGap;
      yOffset += rowHeight + gridGap;
      rowHeight = 0;
    }
  }

  // Resize component set to fit grid
  const lastChild = componentSet.children[componentSet.children.length - 1];
  if (lastChild) {
    componentSet.resize(
      lastChild.x + lastChild.width + gridGap,
      lastChild.y + lastChild.height + gridGap
    );
  }
  componentSet.clipsContent = false;

  // Phase 3: Add component properties
  try {
    const titlePropKey = componentSet.addComponentProperty('title', 'TEXT', spec.properties.title.default);
    const summaryPropKey = componentSet.addComponentProperty('summary', 'TEXT', spec.properties.summary.default);
    const contentPropKey = componentSet.addComponentProperty('content', 'TEXT', spec.properties.content.default);

    for (const child of componentSet.children) {
      if (child.type !== 'COMPONENT') continue;

      const titleNode = child.findOne(node => node.type === 'TEXT' && node.name === 'title') as TextNode;
      if (titleNode) {
        titleNode.componentPropertyReferences = { characters: titlePropKey };
      }

      const descNode = child.findOne(node => node.type === 'TEXT' && node.name === 'description') as TextNode;
      if (descNode) {
        descNode.componentPropertyReferences = { characters: summaryPropKey };
      }

      const contentNode = child.findOne(node => node.type === 'TEXT' && node.name === 'content') as TextNode;
      if (contentNode) {
        contentNode.componentPropertyReferences = { characters: contentPropKey };
      }
    }

    figma.ui.postMessage({ type: 'log', message: '✓ Added title, summary, content component properties' });
  } catch (error) {
    figma.ui.postMessage({ type: 'log', message: '⚠️  Could not bind text properties.' });
  }

  // Phase 4: Delete old component set if updating
  if (existingComponentSet) {
    figma.ui.postMessage({ type: 'progress', message: 'Removing old Stat component...' });
    existingComponentSet.remove();
  }

  // Phase 5: Move to Library page
  libraryPage.appendChild(componentSet);
  figma.currentPage = libraryPage;

  if (updateExisting && existingComponentSet) {
    componentSet.x = existingPosition.x;
    componentSet.y = existingPosition.y;
  }

  // Phase 6: Apply ALL fills/colors LAST
  figma.ui.postMessage({ type: 'progress', message: 'Applying colors (final pass)...' });

  let appliedCount = 0;

  for (const child of componentSet.children) {
    if (child.type !== 'COMPONENT') continue;

    // Parse variant values
    const variantValues: Record<string, string> = {};
    child.name.split(',').forEach(pair => {
      const [key, val] = pair.trim().split('=');
      if (key && val) variantValues[key.trim()] = val.trim();
    });

    // Resolve color tokens for this background variant
    const bgPath = substituteTokenPath(spec.tokenMappings.background, variantValues);
    const titleColorPath = substituteTokenPath(spec.tokenMappings.titleColor, variantValues);
    const titleBorderPath = substituteTokenPath(spec.tokenMappings.titleBorderColor, variantValues);
    const descColorPath = substituteTokenPath(spec.tokenMappings.descriptionColor, variantValues);
    const contentColorPath = substituteTokenPath(spec.tokenMappings.contentColor, variantValues);

    const bgColor = getToken(bgPath);
    const titleColor = getToken(titleColorPath);
    const titleBorderColor = getToken(titleBorderPath);
    const descColor = getToken(descColorPath);
    const contentColor = getToken(contentColorPath);

    figma.ui.postMessage({
      type: 'log',
      message: `[${child.name}] bg: ${bgPath} → ${bgColor} | title: ${titleColor} | border: ${titleBorderColor}`
    });

    if (!bgColor || !titleColor || !titleBorderColor || !descColor || !contentColor) {
      figma.ui.postMessage({ type: 'log', message: `  SKIPPED (missing tokens)` });
      continue;
    }

    // Component background
    const bgParsed = parseColor(bgColor);
    child.fills = [{ type: 'SOLID', color: bgParsed.color, opacity: bgParsed.opacity }];

    // Divider bar color (the gold/yellow separator)
    const borderParsed = parseColor(titleBorderColor);
    const dividerBar = child.findOne(node => node.name === 'divider-bar') as RectangleNode;
    if (dividerBar) {
      dividerBar.fills = [{ type: 'SOLID', color: borderParsed.color, opacity: borderParsed.opacity }];
    }

    // Title color (applies to title, prefix, suffix)
    const titleParsed = parseColor(titleColor);
    const titleTextNode = child.findOne(node => node.type === 'TEXT' && node.name === 'title') as TextNode;
    if (titleTextNode) {
      titleTextNode.fills = [{ type: 'SOLID', color: titleParsed.color, opacity: titleParsed.opacity }];
    }
    const prefixNode = child.findOne(node => node.type === 'TEXT' && node.name === 'prefix') as TextNode;
    if (prefixNode) {
      prefixNode.fills = [{ type: 'SOLID', color: titleParsed.color, opacity: titleParsed.opacity }];
    }
    const suffixNode = child.findOne(node => node.type === 'TEXT' && node.name === 'suffix') as TextNode;
    if (suffixNode) {
      suffixNode.fills = [{ type: 'SOLID', color: titleParsed.color, opacity: titleParsed.opacity }];
    }

    // Description color
    const descParsed = parseColor(descColor);
    const descNode = child.findOne(node => node.type === 'TEXT' && node.name === 'description') as TextNode;
    if (descNode) {
      descNode.fills = [{ type: 'SOLID', color: descParsed.color, opacity: descParsed.opacity }];
    }

    // Content color
    const contentParsed = parseColor(contentColor);
    const contentNode = child.findOne(node => node.type === 'TEXT' && node.name === 'content') as TextNode;
    if (contentNode) {
      contentNode.fills = [{ type: 'SOLID', color: contentParsed.color, opacity: contentParsed.opacity }];
    }

    // Force re-render
    child.x += 0.01;
    child.x -= 0.01;

    appliedCount++;
  }

  figma.ui.postMessage({
    type: 'log',
    message: `\nApplied colors to ${appliedCount}/${componentSet.children.length} stat variants`
  });

  // Center and zoom
  figma.viewport.scrollAndZoomIntoView([componentSet]);

  const actionVerb = (updateExisting && existingComponentSet) ? 'Updated' : 'Created';
  figma.ui.postMessage({
    type: 'success',
    message: `Complete! ${actionVerb} Stat component with ${allVariants.length} variants.`
  });
}

// Handle messages from UI
figma.ui.onmessage = async (msg) => {
  try {
    if (msg.type === 'generate') {
      // Parse tokens
      try {
        tokensData = JSON.parse(msg.tokensJson);
        figma.ui.postMessage({ type: 'log', message: 'Tokens parsed successfully' });
      } catch (error) {
        throw new Error(`Failed to parse tokens JSON: ${error instanceof Error ? error.message : String(error)}`);
      }

      // Parse spec
      try {
        specData = JSON.parse(msg.specJson);
        figma.ui.postMessage({ type: 'log', message: 'Component spec parsed successfully' });
      } catch (error) {
        throw new Error(`Failed to parse component spec JSON: ${error instanceof Error ? error.message : String(error)}`);
      }

      const updateExisting = msg.updateExisting ?? true;
      const selectedComponent = msg.component || 'button'; // Default to 'button' for backward compat

      if (!specData || !specData.components) {
        throw new Error('Component spec is missing or has no "components" section');
      }

      if (selectedComponent === 'button' || selectedComponent === 'all') {
        if (!specData.components.button) {
          throw new Error('Component spec must include a "button" component');
        }
        await generateButtonComponent(specData.components.button, updateExisting);
      }

      if (selectedComponent === 'stat' || selectedComponent === 'all') {
        if (!specData.components.stat) {
          throw new Error('Component spec must include a "stat" component');
        }
        await generateStatComponent(specData.components.stat, updateExisting);
      }

    } else if (msg.type === 'cancel') {
      figma.closePlugin();
    }
  } catch (error) {
    figma.ui.postMessage({
      type: 'error',
      message: error instanceof Error ? error.message : String(error)
    });
  }
};