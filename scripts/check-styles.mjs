#!/usr/bin/env node
/**
 * Computed-style regression harness.
 *
 * Renders Storybook stories headlessly at the three verification viewports
 * (375 / 980 / 1350 — the same widths used to byte-verify migrated components
 * against production) and compares computed styles for the selectors declared
 * in regression/config.json against committed baselines in regression/baselines/.
 *
 * This automates the "Storybook computed-style regression" step of the
 * component-migration pipeline (contracts/README.md): a token or SCSS change
 * that alters a migrated component's rendering fails here with a property-level
 * diff instead of relying on eyeballing screenshots.
 *
 * Usage:
 *   node scripts/check-styles.mjs                     # compare against baselines (exit 1 on drift)
 *   node scripts/check-styles.mjs --update            # rewrite baselines from the target
 *   node scripts/check-styles.mjs --component logo    # limit to one component
 *   node scripts/check-styles.mjs --url <storybook>   # target (default http://localhost:6006);
 *                                                     #   point at https://uids.brand.uiowa.edu to
 *                                                     #   capture/compare the published build
 *   node scripts/check-styles.mjs --tolerance 1       # px tolerance for numeric values (default 0.5)
 *
 * Migration workflow (new component): capture the published build as the baseline
 * (--url https://uids.brand.uiowa.edu --update), then run against local Storybook —
 * an empty diff proves the migration didn't change rendering.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};
const UPDATE = args.includes('--update');
const URL = flag('--url') ?? 'http://localhost:6006';
const ONLY = flag('--component');
const TOLERANCE = parseFloat(flag('--tolerance') ?? '0.5');
const VIEWPORTS = [375, 980, 1350];

const config = JSON.parse(readFileSync(join(root, 'regression/config.json'), 'utf8'));
const components = config.components.filter((c) => !ONLY || c.name === ONLY);
if (!components.length) {
  console.error(`no component named "${ONLY}" in regression/config.json`);
  process.exit(2);
}

// Numeric-aware comparison: "48px" vs "48.3px" passes at tolerance 0.5.
function valuesMatch(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  const nums = (s) => [...String(s).matchAll(/-?\d+(?:\.\d+)?/g)].map((m) => parseFloat(m[0]));
  const shape = (s) => String(s).replace(/-?\d+(?:\.\d+)?/g, '#');
  if (shape(a) !== shape(b)) return false;
  const na = nums(a), nb = nums(b);
  return na.length === nb.length && na.every((n, i) => Math.abs(n - nb[i]) <= TOLERANCE);
}

async function captureComponent(browser, component) {
  const page = await browser.newPage();
  const captured = {};
  for (const check of component.checks) {
    for (const width of VIEWPORTS) {
      await page.setViewport({ width, height: 900 });
      await page.goto(`${URL}/iframe.html?id=${check.story}&viewMode=story`, {
        waitUntil: 'domcontentloaded', timeout: 60000,
      });
      await page.waitForSelector(check.selector, { timeout: 30000 }).catch(() => null);
      await page.evaluate(() => document.fonts.ready);
      await new Promise((r) => setTimeout(r, 150)); // let layout settle post font swap
      const styles = await page.evaluate((selector, properties) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const cs = getComputedStyle(el);
        return Object.fromEntries(properties.map((p) => [p, cs.getPropertyValue(p)]));
      }, check.selector, check.properties);
      captured[`${check.story} :: ${check.selector} :: ${width}`] = styles;
    }
  }
  await page.close();
  return captured;
}

// Preflight: an unreachable target otherwise surfaces as a puppeteer navigation stack trace.
try {
  const res = await fetch(`${URL}/index.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
} catch (err) {
  console.error(`Storybook not reachable at ${URL} (${err.message}).`);
  console.error('Start it with `yarn storybook`, or pass --url <storybook-url>.');
  process.exit(2);
}

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--font-render-hinting=none'] });
let failures = 0;
try {
  for (const component of components) {
    const baselinePath = join(root, 'regression/baselines', `${component.name}.json`);
    const captured = await captureComponent(browser, component);

    // A null capture means the selector never appeared — always fatal.
    for (const [key, styles] of Object.entries(captured)) {
      if (styles === null) {
        console.error(`FAIL  ${component.name}  ${key}  — selector not found on target`);
        failures++;
      }
    }

    if (UPDATE) {
      mkdirSync(join(root, 'regression/baselines'), { recursive: true });
      writeFileSync(baselinePath, JSON.stringify({ capturedFrom: URL, styles: captured }, null, 2) + '\n');
      console.log(`updated  regression/baselines/${component.name}.json (${Object.keys(captured).length} capture points)`);
      continue;
    }

    let baseline;
    try {
      baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
    } catch {
      console.error(`FAIL  ${component.name}  — no baseline; run with --update first`);
      failures++;
      continue;
    }
    let diffs = 0;
    for (const [key, expected] of Object.entries(baseline.styles)) {
      const actual = captured[key];
      if (expected === null) continue; // baseline itself had a missing selector; already visible in the file
      for (const [prop, expectedValue] of Object.entries(expected)) {
        const actualValue = actual?.[prop];
        if (!valuesMatch(expectedValue, actualValue)) {
          console.error(`DIFF  ${component.name}  ${key}  ${prop}: baseline "${expectedValue}" → actual "${actualValue}"`);
          diffs++;
        }
      }
    }
    if (diffs) failures += diffs;
    else console.log(`ok    ${component.name} (${Object.keys(baseline.styles).length} capture points match)`);
  }
} finally {
  await browser.close();
}

if (failures) {
  console.error(`\n${failures} computed-style regression(s). If intentional, update baselines: node scripts/check-styles.mjs --update`);
  process.exit(1);
}
