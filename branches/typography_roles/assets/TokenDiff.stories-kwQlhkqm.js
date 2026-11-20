import{i as e}from"./preload-helper-4HKJDzVh.js";import{i as t,n,r,t as i}from"./typography-391GsTUe.js";import{a,i as o,r as ee,s as te,t as s}from"./codeView-W0VDP8XM.js";var c,ne=e((()=>{c=`base 3b114fde2ba35accf24afa52ec17136b0f9c8ab2
head 9526d6bf9e4a8197573ab1f0cee4c6e4b9effdbf
diff --git a/src/scss/abstracts/_variables.scss b/src/scss/abstracts/_variables.scss
index b479e563e8..2614234086 100755
--- a/src/scss/abstracts/_variables.scss
+++ b/src/scss/abstracts/_variables.scss
@@ -64,7 +64,7 @@ $h3-font-size: var(--uiowa-typography-font-size-191);
 $h4-font-size: var(--uiowa-typography-font-size-160);
 $h5-font-size: var(--uiowa-typography-font-size-140);
 $h6-font-size: var(--uiowa-typography-font-size-120);
-$content-font-size: var(--uiowa-typography-body-font-size);
+$content-font-size: var(--uiowa-typography-paragraph-font-size);
 $label-font-size: 0.9rem;
 $base-font-size: var(--uiowa-typography-font-size-100);
 $small-font-size: var(--uiowa-typography-size-small);
diff --git a/src/scss/base/_paragraph.scss b/src/scss/base/_paragraph.scss
index d402457478..541876edb3 100755
--- a/src/scss/base/_paragraph.scss
+++ b/src/scss/base/_paragraph.scss
@@ -26,10 +26,10 @@ table {
 }
 
 p {
-  font-family: var(--uiowa-typography-body-font-family);
-  font-weight: var(--uiowa-typography-body-font-weight);
-  font-size: var(--uiowa-typography-body-font-size);
-  line-height: var(--uiowa-typography-body-line-height);
+  font-family: var(--uiowa-typography-paragraph-font-family);
+  font-weight: var(--uiowa-typography-paragraph-font-weight);
+  font-size: var(--uiowa-typography-paragraph-font-size);
+  line-height: var(--uiowa-typography-paragraph-line-height);
   @include utilities.margin($bottom: variables.$md, $top: 0);
 }
 
@@ -181,19 +181,16 @@ hr {
   }
 }
 
-.element--bold-intro {
-  font-family: var(--uiowa-typography-intro-bold-font-family);
-  font-weight: var(--uiowa-typography-intro-bold-font-weight);
-  font-size: var(--uiowa-typography-intro-bold-font-size);
-  line-height: var(--uiowa-typography-intro-bold-line-height);
-  margin-top: 0;
-}
-
+// The intro under a page's title: Subhead 2 at its regular weight, at the Subhead's size. .element--bold-intro and
+// .element--light-intro are deprecated names for .element--intro.
+.element--intro,
+.element--bold-intro,
 .element--light-intro {
-  font-family: var(--uiowa-typography-intro-light-font-family);
-  font-weight: var(--uiowa-typography-intro-light-font-weight);
-  font-size: var(--uiowa-typography-intro-light-font-size);
-  line-height: var(--uiowa-typography-intro-light-line-height);
+  font-family: var(--uiowa-typography-subhead-2-font-family);
+  font-weight: var(--uiowa-typography-subhead-2-font-weight);
+  font-size: calc(var(--uiowa-type-base) * var(--uiowa-typography-subhead-multiple));
+  line-height: var(--uiowa-type-subhead-2-line-height);
+  letter-spacing: var(--uiowa-typography-subhead-2-letter-spacing);
   margin-top: 0;
 }
 
diff --git a/src/scss/base/_type-roles.scss b/src/scss/base/_type-roles.scss
new file mode 100644
index 0000000000..793ba89299
--- /dev/null
+++ b/src/scss/base/_type-roles.scss
@@ -0,0 +1,200 @@
+// The type roles as classes; src/tokens/README.md says how to use them.
+
+// Each hierarchy sets the body size the roles multiply, its two gaps, and the line heights that differ by hierarchy.
+.type-scale--x-small {
+  --uiowa-type-base: var(--uiowa-typography-body-x-small-font-size);
+  --uiowa-type-space-related: calc(var(--uiowa-typography-body-x-small-font-size) * var(--uiowa-typography-scale-related));
+  --uiowa-type-space-break: calc(var(--uiowa-typography-body-x-small-font-size) * var(--uiowa-typography-scale-break));
+  --uiowa-type-subhead-line-height: var(--uiowa-typography-subhead-x-small-line-height);
+  --uiowa-type-subhead-2-line-height: var(--uiowa-typography-subhead-2-line-height);
+}
+
+.type-scale--small {
+  --uiowa-type-base: var(--uiowa-typography-body-small-font-size);
+  --uiowa-type-space-related: calc(var(--uiowa-typography-body-small-font-size) * var(--uiowa-typography-scale-related));
+  --uiowa-type-space-break: calc(var(--uiowa-typography-body-small-font-size) * var(--uiowa-typography-scale-break));
+  --uiowa-type-subhead-line-height: var(--uiowa-typography-subhead-small-line-height);
+  --uiowa-type-subhead-2-line-height: var(--uiowa-typography-subhead-2-line-height);
+}
+
+// :where() gives the default no specificity, so a hierarchy class on html still overrides it.
+:where(:root),
+.type-scale--medium {
+  --uiowa-type-base: var(--uiowa-typography-body-medium-font-size);
+  --uiowa-type-space-related: calc(var(--uiowa-typography-body-medium-font-size) * var(--uiowa-typography-scale-related));
+  --uiowa-type-space-break: calc(var(--uiowa-typography-body-medium-font-size) * var(--uiowa-typography-scale-break));
+  --uiowa-type-subhead-line-height: var(--uiowa-typography-subhead-line-height);
+  --uiowa-type-subhead-2-line-height: var(--uiowa-typography-subhead-2-line-height);
+}
+
+.type-scale--large {
+  --uiowa-type-base: var(--uiowa-typography-body-large-font-size);
+  --uiowa-type-space-related: calc(var(--uiowa-typography-body-large-font-size) * var(--uiowa-typography-scale-related));
+  --uiowa-type-space-break: calc(var(--uiowa-typography-body-large-font-size) * var(--uiowa-typography-scale-break));
+  --uiowa-type-subhead-line-height: var(--uiowa-typography-subhead-line-height);
+  --uiowa-type-subhead-2-line-height: var(--uiowa-typography-subhead-2-large-line-height);
+}
+
+.type-scale--x-large {
+  --uiowa-type-base: var(--uiowa-typography-body-x-large-font-size);
+  --uiowa-type-space-related: calc(var(--uiowa-typography-body-x-large-font-size) * var(--uiowa-typography-scale-related));
+  --uiowa-type-space-break: calc(var(--uiowa-typography-body-x-large-font-size) * var(--uiowa-typography-scale-break));
+  --uiowa-type-subhead-line-height: var(--uiowa-typography-subhead-line-height);
+  --uiowa-type-subhead-2-line-height: var(--uiowa-typography-subhead-2-x-large-line-height);
+}
+
+// Rich text, where an author picks only a heading level: its headings take the document outline in
+// src/tokens/README.md, and its paragraphs and lists take Body, with no classes, all in the hierarchy it sits in. It
+// styles only its own children, and these rules come before the role classes, so a role class on a heading still wins.
+.type-rich-text {
+  > :where(p, ul, ol) {
+    font-family: var(--uiowa-typography-body-font-family);
+    font-weight: var(--uiowa-typography-body-font-weight);
+    font-size: var(--uiowa-type-base);
+    line-height: var(--uiowa-typography-body-line-height);
+    letter-spacing: var(--uiowa-typography-body-letter-spacing);
+  }
+
+  // The base list rule gives list items their own line height.
+  > :where(ul, ol) li {
+    line-height: inherit;
+  }
+
+  > :where(h1) {
+    font-family: var(--uiowa-typography-headline-font-family);
+    font-weight: var(--uiowa-typography-headline-font-weight);
+    font-size: calc(var(--uiowa-type-base) * var(--uiowa-typography-headline-multiple));
+    line-height: var(--uiowa-typography-headline-line-height);
+    letter-spacing: var(--uiowa-typography-headline-letter-spacing);
+  }
+
+  > :where(h2) {
+    font-family: var(--uiowa-typography-subhead-font-family);
+    font-weight: var(--uiowa-typography-subhead-font-weight);
+    font-size: calc(var(--uiowa-type-base) * var(--uiowa-typography-subhead-multiple));
+    line-height: var(--uiowa-type-subhead-line-height);
+    letter-spacing: var(--uiowa-typography-subhead-letter-spacing);
+  }
+
+  > :where(h3, h4, h5, h6) {
+    font-family: var(--uiowa-typography-subhead-2-font-family);
+    font-weight: var(--uiowa-typography-subhead-2-font-weight-emphasis);
+    font-size: calc(var(--uiowa-type-base) * var(--uiowa-typography-subhead-2-multiple));
+    line-height: var(--uiowa-type-subhead-2-line-height);
+    letter-spacing: var(--uiowa-typography-subhead-2-letter-spacing);
+  }
+
+  // The gaps: Related between blocks, Break below the h1 and above a heading that starts a section. The heading
+  // selectors outweigh the base h2:not(:first-child) margins.
+  > * {
+    margin-block: 0;
+  }
+
+  > * + *,
+  > * + :is(h2, h3, h4, h5, h6) {
+    margin-block-start: var(--uiowa-type-space-related);
+  }
+
+  > h1 + *,
+  > :not(h1, h2, h3, h4, h5, h6) + :is(h2, h3, h4, h5, h6) {
+    margin-block-start: var(--uiowa-type-space-break);
+  }
+}
+
+.type-body {
+  font-family: var(--uiowa-typography-body-font-family);
+  font-weight: var(--uiowa-typography-body-font-weight);
+  font-size: var(--uiowa-type-base);
+  line-height: var(--uiowa-typography-body-line-height);
+  letter-spacing: var(--uiowa-typography-body-letter-spacing);
+}
+
+.type-small-print {
+  font-family: var(--uiowa-typography-small-print-font-family);
+  font-weight: var(--uiowa-typography-small-print-font-weight);
+  font-size: calc(var(--uiowa-type-base) * var(--uiowa-typography-small-print-multiple));
+  line-height: var(--uiowa-typography-small-print-line-height);
+  letter-spacing: var(--uiowa-typography-small-print-letter-spacing);
+}
+
+.type-headline {
+  font-family: var(--uiowa-typography-headline-font-family);
+  font-weight: var(--uiowa-typography-headline-font-weight);
+  font-size: calc(var(--uiowa-type-base) * var(--uiowa-typography-headline-multiple));
+  line-height: var(--uiowa-typography-headline-line-height);
+  letter-spacing: var(--uiowa-typography-headline-letter-spacing);
+}
+
+.type-headline-6x {
+  font-family: var(--uiowa-typography-headline-6x-font-family);
+  font-weight: var(--uiowa-typography-headline-6x-font-weight);
+  font-size: calc(var(--uiowa-type-base) * var(--uiowa-typography-headline-6x-multiple));
+  line-height: var(--uiowa-typography-headline-6x-line-height);
+  letter-spacing: var(--uiowa-typography-headline-6x-letter-spacing);
+}
+
+.type-headline-8x {
+  font-family: var(--uiowa-typography-headline-8x-font-family);
+  font-weight: var(--uiowa-typography-headline-8x-font-weight);
+  font-size: calc(var(--uiowa-type-base) * var(--uiowa-typography-headline-8x-multiple));
+  line-height: var(--uiowa-typography-headline-8x-line-height);
+  letter-spacing: var(--uiowa-typography-headline-8x-letter-spacing);
+}
+
+.type-eyebrow {
+  font-family: var(--uiowa-typography-eyebrow-font-family);
+  font-weight: var(--uiowa-typography-eyebrow-font-weight);
+  font-size: calc(var(--uiowa-type-base) * var(--uiowa-typography-eyebrow-multiple));
+  line-height: var(--uiowa-typography-eyebrow-line-height);
+  letter-spacing: var(--uiowa-typography-eyebrow-letter-spacing);
+  text-transform: uppercase;
+}
+
+.type-subhead {
+  font-family: var(--uiowa-typography-subhead-font-family);
+  font-weight: var(--uiowa-typography-subhead-font-weight);
+  font-size: calc(var(--uiowa-type-base) * var(--uiowa-typography-subhead-multiple));
+  line-height: var(--uiowa-type-subhead-line-height);
+  letter-spacing: var(--uiowa-typography-subhead-letter-spacing);
+}
+
+.type-subhead-2 {
+  font-family: var(--uiowa-typography-subhead-2-font-family);
+  font-weight: var(--uiowa-typography-subhead-2-font-weight);
+  font-size: calc(var(--uiowa-type-base) * var(--uiowa-typography-subhead-2-multiple));
+  line-height: var(--uiowa-type-subhead-2-line-height);
+  letter-spacing: var(--uiowa-typography-subhead-2-letter-spacing);
+}
+
+.type-subhead-2 :is(strong, b) {
+  font-weight: var(--uiowa-typography-subhead-2-font-weight-emphasis);
+}
+
+.type-subhead-2--emphasis {
+  font-weight: var(--uiowa-typography-subhead-2-font-weight-emphasis);
+}
+
+// The Labels are one set for every hierarchy.
+.type-label--large {
+  font-family: var(--uiowa-typography-label-large-font-family);
+  font-weight: var(--uiowa-typography-label-large-font-weight);
+  font-size: var(--uiowa-typography-label-large-font-size);
+  line-height: var(--uiowa-typography-label-large-line-height);
+  letter-spacing: var(--uiowa-typography-label-large-letter-spacing);
+}
+
+.type-label--medium {
+  font-family: var(--uiowa-typography-label-medium-font-family);
+  font-weight: var(--uiowa-typography-label-medium-font-weight);
+  font-size: var(--uiowa-typography-label-medium-font-size);
+  line-height: var(--uiowa-typography-label-medium-line-height);
+  letter-spacing: var(--uiowa-typography-label-medium-letter-spacing);
+}
+
+.type-label--small {
+  font-family: var(--uiowa-typography-label-small-font-family);
+  font-weight: var(--uiowa-typography-label-small-font-weight);
+  font-size: var(--uiowa-typography-label-small-font-size);
+  line-height: var(--uiowa-typography-label-small-line-height);
+  letter-spacing: var(--uiowa-typography-label-small-letter-spacing);
+}
diff --git a/src/scss/uids-core.scss b/src/scss/uids-core.scss
index 968c4a942e..9948d0b94b 100644
--- a/src/scss/uids-core.scss
+++ b/src/scss/uids-core.scss
@@ -6,6 +6,7 @@
 @forward 'abstracts/utility-classes';
 @use 'abstracts/local-fonts';
 @forward 'base/headings';
+@forward 'base/type-roles';
 @forward 'base/lists';
 @forward 'base/paragraph';
 @forward 'layout/grid';
diff --git a/src/tokens/README.md b/src/tokens/README.md
index f6ec823964..c41e784eae 100644
--- a/src/tokens/README.md
+++ b/src/tokens/README.md
@@ -40,3 +40,76 @@ Adds responsive scaling to a typography token. The generator resolves the token'
 \`fontSize\` reference to a CSS \`clamp()\` value. The extension declares
 \`minViewport\` and \`maxViewport\` as px dimensions, then either a \`max\` size or
 \`strategy: "exponential"\` with a numeric \`exponent\`.
+
+## Typography roles
+
+The roles are base + multiples. Body X-Small, Small, Medium, Large and X-Large
+(\`typography.body.x-small\`, \`.small\`, \`.medium\`, \`.large\`, \`.x-large\`) are the five body sizes, and each names a
+hierarchy. The other roles, the Labels aside, are each held once: their own family, weight, line height and letter
+spacing, and a \`multiple\`, so a role's size in a hierarchy is that hierarchy's body size times the multiple. A
+hierarchy group inside a role holds only what differs in that hierarchy. The gaps are the body size times
+\`typography.scale.related\` and \`.break\`. Use one hierarchy's styles together. Each body size's description lists
+its formats. \`typography.headline-6x\` and \`headline-8x\` are bigger steps of the Headline. The Labels are one set
+for every hierarchy, \`large\`, \`medium\` and \`small\`, measured from Body Medium and written as plain sizes, so they
+don't follow it if it changes.
+
+The classes that apply the roles are in \`src/scss/base/_type-roles.scss\`. A hierarchy class on a piece, a section or a
+component sets the body size every role inside it multiplies. Medium is the default, so a web page needs none:
+
+\`\`\`html
+<section class="type-scale--large">
+  <h2 class="type-headline">…</h2>
+  <p class="type-body">…</p>
+</section>
+\`\`\`
+
+The nearest hierarchy class wins, so a section or a component can take its own. The hierarchy classes also
+set the gaps as \`--uiowa-type-space-related\` and \`--uiowa-type-space-break\`. The Labels are
+\`.type-label--large\`, \`--medium\` and \`--small\`. Subhead 2's emphasis weight is \`.type-subhead-2--emphasis\`, on the
+element or on a span for part of a line; a \`strong\` or \`b\` inside \`.type-subhead-2\` takes it too. The intro under a
+page's title is \`.element--intro\`: Subhead 2 at its regular weight, at the Subhead's size, so the intro is the h2's
+size in every hierarchy. \`.element--light-intro\` and \`.element--bold-intro\` are deprecated names for it. A banner's or
+poster's lead-in is the Subhead. Rich text, where an author picks only a heading level, goes inside \`.type-rich-text\`: see Document outline.
+
+\`typography.paragraph\` is the style UIDS's base styles set on paragraphs.
+
+The highlight tokens are multiples of the role's own font size, em in CSS. A highlight on chosen
+headline words is a box from cap height to baseline plus \`typography.highlight.headline.padding\` on all four
+sides, and the headline takes \`.leading\` more leading per line; the subhead's band runs from
+\`typography.highlight.subhead.above\` above the baseline to \`.below\` below it, and \`.bleed\` past the text at each
+end.
+
+\`llms/llms.txt\` and \`llms/typography.md\` give the typography as plain text, for readers that can't run the docs
+site. They're kept by hand: when a typography token changes, change \`llms/typography.md\` with it.
+
+## Document outline
+
+Where an author picks only a heading level, as in rich text, each level takes a role by default, all in one
+hierarchy. On Medium, the web's:
+
+| Level | Role | Face, weight, size / leading |
+| --- | --- | --- |
+| h1 | Headline Medium | Special Gothic Condensed 600, 76px / 1 |
+| h2 | Subhead Medium | Zilla Slab 600, 38px / 1.1 |
+| h3 to h6 | Subhead 2 Medium, emphasis weight | Roboto 500, 28.5px / 1.3 |
+
+h3 to h6 share Subhead 2 at its emphasis weight, so they read as headings. The text under them is Body Medium, 19px.
+A design picks a role first and a level second, so the outline is only the default, and components keep their own
+heading styles.
+
+Put rich text inside \`.type-rich-text\`. Its headings then take the outline, and its paragraphs and lists Body, with no
+classes:
+
+\`\`\`html
+<div class="type-rich-text">
+  <h2>…</h2>
+  <p>…</p>
+</div>
+\`\`\`
+
+\`.type-rich-text\` styles only its own children, so components inside it keep their own styles, and a role class on a
+heading still wins. Between blocks the gap is Related; below the h1 and above a heading that starts a section, it is
+Break. Rich text takes the hierarchy it sits in: Medium, unless a hierarchy class on it or around it sets another.
+
+Outside rich text, put each level's role class on it: \`type-headline\` on the h1, \`type-subhead\` on the h2, and
+\`type-subhead-2 type-subhead-2--emphasis\` on h3 to h6.
diff --git a/src/tokens/primitives/typography.json b/src/tokens/primitives/typography.json
index 0d9b9bdc57..a8f7725f17 100644
--- a/src/tokens/primitives/typography.json
+++ b/src/tokens/primitives/typography.json
@@ -5,7 +5,11 @@
       "roboto": { "$value": ["Roboto", "sans-serif"] },
       "zilla-slab": { "$value": ["Zilla Slab", "Zilla-fallback", "serif"] },
       "lora": { "$value": ["Lora", "serif"] },
-      "antonio": { "$value": ["Antonio", "Antonio-fallback", "sans-serif"] }
+      "antonio": { "$value": ["Antonio", "Antonio-fallback", "sans-serif"] },
+      "special-gothic-condensed": {
+        "$value": ["Special Gothic Condensed", "Special Gothic", "sans-serif"],
+        "$description": "Foundations' display face."
+      }
     },
     "font-weight": {
       "$type": "fontWeight",
@@ -18,29 +22,41 @@
     },
     "font-size": {
       "$type": "dimension",
+      "74": { "$value": { "value": 0.7421875, "unit": "rem" } },
+      "79": { "$value": { "value": 0.791667, "unit": "rem" } },
       "80": { "$value": { "value": 0.8, "unit": "rem" } },
+      "89": { "$value": { "value": 0.890625, "unit": "rem" } },
       "90": { "$value": { "value": 0.9, "unit": "rem" } },
       "100": { "$value": { "value": 1, "unit": "rem" } },
+      "104": { "$value": { "value": 1.0390625, "unit": "rem" } },
+      "119": { "$value": { "value": 1.1875, "unit": "rem" } },
       "120": { "$value": { "value": 1.2, "unit": "rem" } },
       "130": { "$value": { "value": 1.3, "unit": "rem" } },
       "140": { "$value": { "value": 1.4, "unit": "rem" } },
       "145": { "$value": { "value": 1.45, "unit": "rem" } },
+      "150": { "$value": { "value": 1.5, "unit": "rem" } },
       "160": { "$value": { "value": 1.6, "unit": "rem" } },
       "165": { "$value": { "value": 1.65, "unit": "rem" } },
       "191": { "$value": { "value": 1.9125, "unit": "rem" } },
       "195": { "$value": { "value": 1.95, "unit": "rem" } },
       "210": { "$value": { "value": 2.1, "unit": "rem" } },
       "220": { "$value": { "value": 2.2, "unit": "rem" } },
+      "225": { "$value": { "value": 2.25, "unit": "rem" } },
       "230": { "$value": { "value": 2.3, "unit": "rem" } },
       "335": { "$value": { "value": 3.35, "unit": "rem" } }
     },
     "line-height": {
       "$type": "number",
       "$description": "Step names are the value x 100.",
+      "090": { "$value": 0.9 },
+      "100": { "$value": 1 },
+      "110": { "$value": 1.1 },
       "115": { "$value": 1.15 },
+      "120": { "$value": 1.2 },
       "125": { "$value": 1.25 },
       "130": { "$value": 1.3 },
       "140": { "$value": 1.4 },
+      "150": { "$value": 1.5 },
       "170": { "$value": 1.7 }
     },
     "letter-spacing": {
diff --git a/src/tokens/semantic/typography.json b/src/tokens/semantic/typography.json
index 92506c4b49..b464c774dc 100644
--- a/src/tokens/semantic/typography.json
+++ b/src/tokens/semantic/typography.json
@@ -145,21 +145,167 @@
         }
       }
     },
+    "paragraph": {
+      "$description": "The style UIDS's base styles set on paragraphs.",
+      "fontFamily": { "$type": "fontFamily", "$value": "{typography.font-family.roboto}" },
+      "fontWeight": { "$type": "fontWeight", "$value": "{typography.font-weight.normal}" },
+      "fontSize": { "$type": "dimension", "$value": "{typography.font-size.120}" },
+      "letterSpacing": { "$type": "dimension", "$value": "{typography.letter-spacing.normal}" },
+      "lineHeight": { "$type": "number", "$value": "{typography.line-height.170}" }
+    },
     "body": {
-      "$type": "typography",
-      "$value": {
-        "fontFamily": "{typography.font-family.roboto}",
-        "fontWeight": "{typography.font-weight.normal}",
-        "fontSize": "{typography.font-size.120}",
-        "letterSpacing": "{typography.letter-spacing.normal}",
-        "lineHeight": "{typography.line-height.170}"
+      "$description": "Body text, and the five body sizes. Each body size names a hierarchy: in it, each role with a multiple is the body size times that multiple, and a hierarchy group inside a role holds the values that differ in that hierarchy.",
+      "fontFamily": { "$type": "fontFamily", "$value": "{typography.typeface.sans}" },
+      "fontWeight": { "$type": "fontWeight", "$value": "{typography.font-weight.normal}" },
+      "lineHeight": { "$type": "number", "$value": "{typography.line-height.150}" },
+      "letterSpacing": { "$type": "dimension", "$value": "{typography.letter-spacing.normal}" },
+      "x-small": {
+        "$description": "The X-Small hierarchy's body size: programs, program flyers, mini flyers, brochures and Word documents.",
+        "fontSize": { "$type": "dimension", "$value": "{typography.font-size.79}" }
+      },
+      "small": {
+        "$description": "The Small hierarchy's body size: letters, forms and covers.",
+        "fontSize": { "$type": "dimension", "$value": "{typography.font-size.100}" }
+      },
+      "medium": {
+        "$description": "The Medium hierarchy's body size: web pages and applications, video, the letter-size flyer and poster.",
+        "fontSize": { "$type": "dimension", "$value": "{typography.font-size.119}" }
+      },
+      "large": {
+        "$description": "The Large hierarchy's body size: the digital ad, web banner and 11 × 17 poster.",
+        "fontSize": { "$type": "dimension", "$value": "{typography.font-size.150}" }
+      },
+      "x-large": {
+        "$description": "The X-Large hierarchy's body size: displays and slides read at a distance.",
+        "fontSize": { "$type": "dimension", "$value": "{typography.font-size.225}" }
       }
     },
+    "small-print": {
+      "$description": "Small print: credits, dates and fine print under body text.",
+      "multiple": { "$type": "number", "$value": 0.75 },
+      "fontFamily": { "$type": "fontFamily", "$value": "{typography.typeface.sans}" },
+      "fontWeight": { "$type": "fontWeight", "$value": "{typography.font-weight.normal}" },
+      "lineHeight": { "$type": "number", "$value": "{typography.line-height.150}" },
+      "letterSpacing": { "$type": "dimension", "$value": "{typography.letter-spacing.normal}" }
+    },
     "size": {
       "$type": "dimension",
       "$description": "Size modifiers on body text.",
       "small": { "$value": "{typography.font-size.80}" },
       "large": { "$value": "{typography.font-size.160}" }
+    },
+    "typeface": {
+      "$type": "fontFamily",
+      "$description": "The faces the type roles point at.",
+      "display": { "$value": "{typography.font-family.special-gothic-condensed}", "$description": "Foundations' display face." },
+      "slab": { "$value": "{typography.font-family.zilla-slab}", "$description": "Foundations' slab face." },
+      "sans": { "$value": "{typography.font-family.roboto}", "$description": "Foundations' sans face." }
+    },
+    "scale": {
+      "$type": "number",
+      "$description": "Multipliers of the body size for the space between text: in each hierarchy, a gap is the body size times one of these.",
+      "related": { "$value": 1.5, "$description": "Between closely related elements, such as a heading and its text." },
+      "break": { "$value": 2, "$description": "Below display type, and between distinct sections or content groups." }
+    },
+    "highlight": {
+      "$type": "number",
+      "$description": "The highlight behind chosen headline words, and the band under a subhead. Each value is a multiple of the role's own font size: em in CSS.",
+      "headline": {
+        "$description": "A gold box with black text, or a black box with white text, behind the chosen words of a headline, Special Gothic Condensed only. The box runs from cap height to baseline; descenders hang below it.",
+        "padding": { "$value": 0.1, "$description": "Added on all four sides of the box, and at the top and bottom of a highlighted headline, so the gaps above and below measure from the box." },
+        "leading": { "$value": 0.05, "$description": "Added to the line height of every line of a highlighted headline." }
+      },
+      "subhead": {
+        "$description": "A band across the lower part of every line of a subhead, Zilla Slab only: gold on white, white on gold, not used on black. It adds no space.",
+        "above": { "$value": 0.32, "$description": "The band's top edge, above the baseline." },
+        "below": { "$value": 0.16, "$description": "The band's bottom edge, below the baseline." },
+        "bleed": { "$value": 0.08, "$description": "How far the band runs past the text at each end." }
+      }
+    },
+    "headline": {
+      "$description": "The title: page titles (h1), banners and posters, once per piece.",
+      "multiple": { "$type": "number", "$value": 4 },
+      "fontFamily": { "$type": "fontFamily", "$value": "{typography.typeface.display}" },
+      "fontWeight": { "$type": "fontWeight", "$value": "{typography.font-weight.medium-bold}" },
+      "lineHeight": { "$type": "number", "$value": "{typography.line-height.100}" },
+      "letterSpacing": { "$type": "dimension", "$value": "{typography.letter-spacing.normal}" }
+    },
+    "headline-6x": {
+      "$description": "The headline for a bigger statement: 6× its hierarchy's body size.",
+      "multiple": { "$type": "number", "$value": 6 },
+      "fontFamily": { "$type": "fontFamily", "$value": "{typography.typeface.display}" },
+      "fontWeight": { "$type": "fontWeight", "$value": "{typography.font-weight.medium-bold}" },
+      "lineHeight": { "$type": "number", "$value": "{typography.line-height.090}" },
+      "letterSpacing": { "$type": "dimension", "$value": "{typography.letter-spacing.normal}" }
+    },
+    "headline-8x": {
+      "$description": "The headline for a bigger statement: 8× its hierarchy's body size.",
+      "multiple": { "$type": "number", "$value": 8 },
+      "fontFamily": { "$type": "fontFamily", "$value": "{typography.typeface.display}" },
+      "fontWeight": { "$type": "fontWeight", "$value": "{typography.font-weight.medium-bold}" },
+      "lineHeight": { "$type": "number", "$value": "{typography.line-height.090}" },
+      "letterSpacing": { "$type": "dimension", "$value": "{typography.letter-spacing.normal}" }
+    },
+    "eyebrow": {
+      "$description": "The label above a title: it names the composition (a series, a unit, an event type); the component sets it in uppercase. The Banner pre-title is an eyebrow; the Card pre-title, a contextual tag, is a Label.",
+      "multiple": { "$type": "number", "$value": 1.5 },
+      "fontFamily": { "$type": "fontFamily", "$value": "{typography.typeface.display}" },
+      "fontWeight": { "$type": "fontWeight", "$value": "{typography.font-weight.medium-bold}" },
+      "lineHeight": { "$type": "number", "$value": "{typography.line-height.120}" },
+      "letterSpacing": { "$type": "dimension", "$value": "{typography.letter-spacing.normal}" }
+    },
+    "subhead": {
+      "$description": "The lead-in under a title, and section heads (h2).",
+      "multiple": { "$type": "number", "$value": 2 },
+      "fontFamily": { "$type": "fontFamily", "$value": "{typography.typeface.slab}" },
+      "fontWeight": { "$type": "fontWeight", "$value": "{typography.font-weight.medium-bold}" },
+      "lineHeight": { "$type": "number", "$value": "{typography.line-height.110}" },
+      "letterSpacing": { "$type": "dimension", "$value": "{typography.letter-spacing.normal}" },
+      "x-small": {
+        "lineHeight": { "$type": "number", "$value": "{typography.line-height.125}" }
+      },
+      "small": {
+        "lineHeight": { "$type": "number", "$value": "{typography.line-height.125}" }
+      }
+    },
+    "subhead-2": {
+      "$description": "Details and short headings (h3 to h6): a date and place, a card's title.",
+      "multiple": { "$type": "number", "$value": 1.5 },
+      "fontFamily": { "$type": "fontFamily", "$value": "{typography.typeface.sans}" },
+      "fontWeight": { "$type": "fontWeight", "$value": "{typography.font-weight.normal}" },
+      "fontWeightEmphasis": { "$type": "fontWeight", "$value": "{typography.font-weight.medium}", "$description": "Subhead 2's one emphasis: a heading set in Subhead 2, and the line that leads a details group, such as the date. Everything else in Subhead 2 stays at fontWeight." },
+      "lineHeight": { "$type": "number", "$value": "{typography.line-height.130}" },
+      "letterSpacing": { "$type": "dimension", "$value": "{typography.letter-spacing.normal}" },
+      "large": {
+        "lineHeight": { "$type": "number", "$value": "{typography.line-height.120}" }
+      },
+      "x-large": {
+        "lineHeight": { "$type": "number", "$value": "{typography.line-height.120}" }
+      }
+    },
+    "label": {
+      "$description": "Controls and captions: buttons, form labels, badges, bylines. One set for every hierarchy, measured from Body Medium.",
+      "large": {
+        "fontFamily": { "$type": "fontFamily", "$value": "{typography.typeface.sans}" },
+        "fontWeight": { "$type": "fontWeight", "$value": "{typography.font-weight.medium}" },
+        "fontSize": { "$type": "dimension", "$value": "{typography.font-size.104}" },
+        "lineHeight": { "$type": "number", "$value": "{typography.line-height.140}" },
+        "letterSpacing": { "$type": "dimension", "$value": "{typography.letter-spacing.normal}" }
+      },
+      "medium": {
+        "fontFamily": { "$type": "fontFamily", "$value": "{typography.typeface.sans}" },
+        "fontWeight": { "$type": "fontWeight", "$value": "{typography.font-weight.medium}" },
+        "fontSize": { "$type": "dimension", "$value": "{typography.font-size.89}" },
+        "lineHeight": { "$type": "number", "$value": "{typography.line-height.140}" },
+        "letterSpacing": { "$type": "dimension", "$value": "{typography.letter-spacing.normal}" }
+      },
+      "small": {
+        "fontFamily": { "$type": "fontFamily", "$value": "{typography.typeface.sans}" },
+        "fontWeight": { "$type": "fontWeight", "$value": "{typography.font-weight.medium}" },
+        "fontSize": { "$type": "dimension", "$value": "{typography.font-size.74}" },
+        "lineHeight": { "$type": "number", "$value": "{typography.line-height.140}" },
+        "letterSpacing": { "$type": "dimension", "$value": "{typography.letter-spacing.normal}" }
+      }
     }
   }
 }
`})),l,u,re=e((()=>{l=JSON.parse(`{"heading":{"$description":"Fluid heading styles. Each declares its own viewport range.","h1":{"$type":"typography","$value":{"fontFamily":"{typography.font-family.zilla-slab}","fontWeight":"{typography.font-weight.medium-bold}","fontSize":"{typography.font-size.230}","letterSpacing":"{typography.letter-spacing.normal}","lineHeight":"{typography.line-height.115}"},"$extensions":{"edu.uiowa.fluid":{"strategy":"exponential","exponent":1.34,"minViewport":{"value":600,"unit":"px"},"maxViewport":{"value":1310,"unit":"px"}}}},"h2":{"$type":"typography","$value":{"fontFamily":"{typography.font-family.roboto}","fontWeight":"{typography.font-weight.medium}","fontSize":"{typography.font-size.195}","letterSpacing":"{typography.letter-spacing.normal}","lineHeight":"{typography.line-height.125}"},"$extensions":{"edu.uiowa.fluid":{"strategy":"exponential","exponent":1.34,"minViewport":{"value":600,"unit":"px"},"maxViewport":{"value":1310,"unit":"px"}}}},"h3":{"$type":"typography","$value":{"fontFamily":"{typography.font-family.roboto}","fontWeight":"{typography.font-weight.medium}","fontSize":"{typography.font-size.165}","letterSpacing":"{typography.letter-spacing.normal}","lineHeight":"{typography.line-height.125}"},"$extensions":{"edu.uiowa.fluid":{"strategy":"exponential","exponent":1.34,"minViewport":{"value":600,"unit":"px"},"maxViewport":{"value":1310,"unit":"px"}}}},"h4":{"$type":"typography","$value":{"fontFamily":"{typography.font-family.roboto}","fontWeight":"{typography.font-weight.medium}","fontSize":"{typography.font-size.145}","letterSpacing":"{typography.letter-spacing.normal}","lineHeight":"{typography.line-height.125}"},"$extensions":{"edu.uiowa.fluid":{"strategy":"exponential","exponent":1.34,"minViewport":{"value":600,"unit":"px"},"maxViewport":{"value":1310,"unit":"px"}}}},"h5":{"$type":"typography","$value":{"fontFamily":"{typography.font-family.roboto}","fontWeight":"{typography.font-weight.medium}","fontSize":"{typography.font-size.130}","letterSpacing":"{typography.letter-spacing.normal}","lineHeight":"{typography.line-height.125}"},"$extensions":{"edu.uiowa.fluid":{"strategy":"exponential","exponent":1.34,"minViewport":{"value":600,"unit":"px"},"maxViewport":{"value":1310,"unit":"px"}}}},"h6":{"$type":"typography","$value":{"fontFamily":"{typography.font-family.roboto}","fontWeight":"{typography.font-weight.medium}","fontSize":"{typography.font-size.120}","letterSpacing":"{typography.letter-spacing.normal}","lineHeight":"{typography.line-height.125}"},"$extensions":{"edu.uiowa.fluid":{"strategy":"exponential","exponent":1.34,"minViewport":{"value":600,"unit":"px"},"maxViewport":{"value":1310,"unit":"px"}}}}},"intro-bold":{"$type":"typography","$value":{"fontFamily":"{typography.font-family.zilla-slab}","fontWeight":"{typography.font-weight.medium-bold}","fontSize":"{typography.font-size.160}","letterSpacing":"{typography.letter-spacing.normal}","lineHeight":"{typography.line-height.130}"},"$extensions":{"edu.uiowa.fluid":{"minViewport":{"value":600,"unit":"px"},"maxViewport":{"value":1310,"unit":"px"},"max":"{typography.font-size.220}"}}},"intro-light":{"$type":"typography","$value":{"fontFamily":"{typography.font-family.roboto}","fontWeight":"{typography.font-weight.light}","fontSize":"{typography.font-size.160}","letterSpacing":"{typography.letter-spacing.normal}","lineHeight":"{typography.line-height.140}"},"$extensions":{"edu.uiowa.fluid":{"minViewport":{"value":600,"unit":"px"},"maxViewport":{"value":1310,"unit":"px"},"max":"{typography.font-size.210}"}}},"body":{"$description":"Body text: the body style, and the five body sizes. Each body size names a hierarchy: the X-Small, Small, Medium, Large or X-Large of every other role is a multiple of it.","fontFamily":{"$type":"fontFamily","$value":"{typography.font-family.roboto}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontSize":{"$type":"dimension","$value":"{typography.font-size.120}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"},"lineHeight":{"$type":"number","$value":"{typography.line-height.170}"},"x-small":{"$description":"The X-Small hierarchy's body size: programs, program flyers, mini flyers, brochures and Word documents.","fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontSize":{"$type":"dimension","$value":"{typography.font-size.79}"},"lineHeight":{"$type":"number","$value":"{typography.line-height.150}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"small":{"$description":"The Small hierarchy's body size: letters, forms and covers.","fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontSize":{"$type":"dimension","$value":"{typography.font-size.100}"},"lineHeight":{"$type":"number","$value":"{typography.line-height.150}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"medium":{"$description":"The Medium hierarchy's body size: web pages and applications, video, the letter-size flyer and poster.","fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontSize":{"$type":"dimension","$value":"{typography.font-size.119}"},"lineHeight":{"$type":"number","$value":"{typography.line-height.150}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"large":{"$description":"The Large hierarchy's body size: the digital ad, web banner and 11 × 17 poster.","fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontSize":{"$type":"dimension","$value":"{typography.font-size.150}"},"lineHeight":{"$type":"number","$value":"{typography.line-height.150}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"x-large":{"$description":"The X-Large hierarchy's body size: displays and slides read at a distance.","fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontSize":{"$type":"dimension","$value":"{typography.font-size.225}"},"lineHeight":{"$type":"number","$value":"{typography.line-height.150}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}}},"small-print":{"$description":"Small print: credits, dates and fine print under body text.","x-large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontSize":{"$type":"dimension","$value":"{typography.body.x-large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":0.75}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.150}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontSize":{"$type":"dimension","$value":"{typography.body.large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":0.75}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.150}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"medium":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontSize":{"$type":"dimension","$value":"{typography.body.medium.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":0.75}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.150}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontSize":{"$type":"dimension","$value":"{typography.body.small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":0.75}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.150}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"x-small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontSize":{"$type":"dimension","$value":"{typography.body.x-small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":0.75}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.150}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}}},"size":{"$type":"dimension","$description":"Size modifiers on body text.","small":{"$value":"{typography.font-size.80}"},"large":{"$value":"{typography.font-size.160}"}},"typeface":{"$type":"fontFamily","$description":"Typeface roles, named after Foundations' font families.","display":{"$value":"{typography.font-family.special-gothic-condensed}","$description":"Foundations' display face: the headline and eyebrow styles."},"slab":{"$value":"{typography.font-family.zilla-slab}","$description":"The lead-in and section heads: the subhead styles."},"sans":{"$value":"{typography.font-family.roboto}","$description":"Details, reading text and component text: the subhead 2, body and label styles."}},"scale":{"$type":"number","$description":"Multipliers of the body size for the space between text.","related":{"$value":1.5},"break":{"$value":2}},"space":{"$type":"dimension","$description":"Space between text elements: a hierarchy's body size times a multiplier.","related":{"$description":"Between closely related elements, such as a heading and its text.","x-large":{"$value":"{typography.body.x-large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":"{typography.scale.related}"}}},"large":{"$value":"{typography.body.large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":"{typography.scale.related}"}}},"medium":{"$value":"{typography.body.medium.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":"{typography.scale.related}"}}},"small":{"$value":"{typography.body.small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":"{typography.scale.related}"}}},"x-small":{"$value":"{typography.body.x-small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":"{typography.scale.related}"}}}},"break":{"$description":"Below display type, and between distinct sections or content groups.","x-large":{"$value":"{typography.body.x-large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":"{typography.scale.break}"}}},"large":{"$value":"{typography.body.large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":"{typography.scale.break}"}}},"medium":{"$value":"{typography.body.medium.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":"{typography.scale.break}"}}},"small":{"$value":"{typography.body.small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":"{typography.scale.break}"}}},"x-small":{"$value":"{typography.body.x-small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":"{typography.scale.break}"}}}}},"highlight":{"$type":"number","$description":"The highlight behind chosen headline words, and the band under a subhead. Each value is a multiple of the role's own font size: em in CSS.","headline":{"$description":"A gold box with black text, or a black box with white text, behind the chosen words of a headline, Special Gothic Condensed only. The box runs from cap height to baseline; descenders hang below it.","padding":{"$value":0.1,"$description":"Added on all four sides of the box, and at the top and bottom of a highlighted headline, so the gaps above and below measure from the box."},"leading":{"$value":0.05,"$description":"Added to the line height of every line of a highlighted headline."}},"subhead":{"$description":"A band across the lower part of every line of a subhead, Zilla Slab only: gold on white, white on gold, not used on black. It adds no space.","above":{"$value":0.32,"$description":"The band's top edge, above the baseline."},"below":{"$value":0.16,"$description":"The band's bottom edge, below the baseline."},"bleed":{"$value":0.08,"$description":"How far the band runs past the text at each end."}}},"headline":{"$description":"The title: page titles (h1), banners and posters, once per piece.","x-large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.x-large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":4}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.100}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":4}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.100}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"medium":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.medium.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":4}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.100}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":4}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.100}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"x-small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.x-small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":4}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.100}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}}},"headline-6x":{"$description":"The headline for a bigger statement: 6× its hierarchy's body size.","x-large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.x-large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":6}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.090}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":6}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.090}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"medium":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.medium.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":6}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.090}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":6}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.090}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"x-small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.x-small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":6}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.090}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}}},"headline-8x":{"$description":"The headline for a bigger statement: 8× its hierarchy's body size.","x-large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.x-large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":8}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.090}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":8}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.090}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"medium":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.medium.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":8}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.090}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":8}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.090}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"x-small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.x-small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":8}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.090}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}}},"eyebrow":{"$description":"The label above a title: it names the composition (a series, a unit, an event type); the component sets it in uppercase. The Banner pre-title is an eyebrow; the Card pre-title, a contextual tag, is a Label.","x-large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.x-large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":1.5}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.120}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":1.5}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.120}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"medium":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.medium.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":1.5}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.120}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":1.5}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.120}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"x-small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.display}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.x-small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":1.5}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.120}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}}},"subhead":{"$description":"The lead-in under a title, and section heads (h2).","x-large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.slab}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.x-large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":2}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.110}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.slab}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":2}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.110}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"medium":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.slab}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.medium.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":2}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.110}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.slab}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":2}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.125}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"x-small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.slab}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium-bold}"},"fontSize":{"$type":"dimension","$value":"{typography.body.x-small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":2}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.125}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}}},"subhead-2":{"$description":"Details and short headings (h3, h4): a date and place, a card's title.","x-large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontWeightEmphasis":{"$type":"fontWeight","$value":"{typography.font-weight.medium}","$description":"Subhead 2's one emphasis: a heading set in Subhead 2, and the line that leads a details group, such as the date. Everything else in Subhead 2 stays at fontWeight."},"fontSize":{"$type":"dimension","$value":"{typography.body.x-large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":1.5}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.120}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontWeightEmphasis":{"$type":"fontWeight","$value":"{typography.font-weight.medium}","$description":"Subhead 2's one emphasis: a heading set in Subhead 2, and the line that leads a details group, such as the date. Everything else in Subhead 2 stays at fontWeight."},"fontSize":{"$type":"dimension","$value":"{typography.body.large.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":1.5}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.120}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"medium":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontWeightEmphasis":{"$type":"fontWeight","$value":"{typography.font-weight.medium}","$description":"Subhead 2's one emphasis: a heading set in Subhead 2, and the line that leads a details group, such as the date. Everything else in Subhead 2 stays at fontWeight."},"fontSize":{"$type":"dimension","$value":"{typography.body.medium.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":1.5}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.130}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontWeightEmphasis":{"$type":"fontWeight","$value":"{typography.font-weight.medium}","$description":"Subhead 2's one emphasis: a heading set in Subhead 2, and the line that leads a details group, such as the date. Everything else in Subhead 2 stays at fontWeight."},"fontSize":{"$type":"dimension","$value":"{typography.body.small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":1.5}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.130}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"x-small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.normal}"},"fontWeightEmphasis":{"$type":"fontWeight","$value":"{typography.font-weight.medium}","$description":"Subhead 2's one emphasis: a heading set in Subhead 2, and the line that leads a details group, such as the date. Everything else in Subhead 2 stays at fontWeight."},"fontSize":{"$type":"dimension","$value":"{typography.body.x-small.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":1.5}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.130}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}}},"label":{"$description":"Controls and captions: buttons, form labels, badges, bylines. One set for every hierarchy, measured from Body Medium.","large":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium}"},"fontSize":{"$type":"dimension","$value":"{typography.body.medium.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":0.875}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.140}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"medium":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium}"},"fontSize":{"$type":"dimension","$value":"{typography.body.medium.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":0.75}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.140}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}},"small":{"fontFamily":{"$type":"fontFamily","$value":"{typography.typeface.sans}"},"fontWeight":{"$type":"fontWeight","$value":"{typography.font-weight.medium}"},"fontSize":{"$type":"dimension","$value":"{typography.body.medium.fontSize}","$extensions":{"edu.uiowa.multiply":{"by":0.625}}},"lineHeight":{"$type":"number","$value":"{typography.line-height.140}"},"letterSpacing":{"$type":"dimension","$value":"{typography.letter-spacing.normal}"}}}}`),u={typography:l}})),d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,ie=e((()=>{re(),d=[`x-small`,`small`,`medium`,`large`,`x-large`],f=[`eyebrow`,`headline`,`headline-6x`,`headline-8x`,`subhead`,`subhead-2`,`body`,`small-print`],p=u.typography,m=e=>Object.entries(e).filter(([e])=>!e.startsWith(`$`)).reduce((e,[,t])=>e+(`$value`in t?1:m(t)),0),h=m(p.label),g=f.reduce((e,t)=>e+d.reduce((e,n)=>e+m(p[t][n]),0),0),_={total:g+h,roles:g,labels:h},v=[`fontFamily`,`fontWeight`,`fontWeightEmphasis`,`lineHeight`,`letterSpacing`],y=e=>e.fontSize.$extensions?.[`edu.uiowa.multiply`]?.by,b=({$type:e,$value:t,$description:n})=>({$type:e,$value:t,...n?{$description:n}:{}}),x=Object.fromEntries(f.map(e=>{let t=p[e],n=t.medium,r=y(n),i=t.$description?{$description:t.$description}:{};r!==void 0&&(i.multiple={$type:`number`,$value:r});for(let e of v)n[e]&&(i[e]=b(n[e]));for(let e of d){let a=t[e],o=a.$description?{$description:a.$description}:{};r===void 0?o.fontSize=b(a.fontSize):y(a)!==r&&(o.multiple={$type:`number`,$value:y(a)});for(let e of v)n[e]&&a[e].$value!==n[e].$value&&(o[e]=b(a[e]));Object.keys(o).some(e=>!e.startsWith(`$`))&&(i[e]=o)}return[e,i]})),S=e=>d.reduce((t,n)=>t+(x[e][n]?m(x[e][n]):0),0),C=S(`body`),w=f.filter(e=>e!==`body`).reduce((e,t)=>e+S(t),0),T=m(x),T+h,T-C-w,E=(e,t)=>Object.keys(x[e][t]??{}).filter(t=>!t.startsWith(`$`)&&!(e===`body`&&t===`fontSize`)),f.flatMap(e=>[...new Set(d.flatMap(t=>E(e,t)))].map(t=>[e,t]))})),D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{ne(),i(),r(),ie(),a(),D=n.typography,O=t.typography[`font-size`],k=e=>Object.entries(e).filter(([e])=>!e.startsWith(`$`)).reduce((e,[,t])=>e+(`$value`in t?1:k(t)),0),A=Object.keys(D.body).filter(e=>D.body[e]?.fontSize),j=[`body`,...Object.keys(D).filter(e=>D[e]?.multiple)],M=Object.keys(D.scale).filter(e=>!e.startsWith(`$`)),N={tokens:j.reduce((e,t)=>e+k(D[t]),0)+k(D.label),named:_.total,roles:j.length,hierarchies:A.length,styles:j.length*A.length,gaps:M.length*A.length},P=e=>O[e.slice(1,-1).split(`.`).at(-1)].$value.value*16,F=e=>P(D.body[e].fontSize.$value),I=(e,t)=>F(t)*(D[e].multiple?.$value??1),L=e=>P(D.label[e].fontSize.$value),R=e=>Math.abs(e*1e3-Math.round(e*1e3))<1e-6?e:Number(e.toFixed(2)),z=e=>`${R(e)}px`,B=e=>`${Number((e*.75).toFixed(2))}pt`,V=`{ echo "base $(git merge-base origin/next origin/typography_roles)"; echo "head $(git rev-parse origin/typography_roles)"; git diff --no-color origin/next...origin/typography_roles -- src/tokens src/scss/base/_paragraph.scss src/scss/abstracts/_variables.scss src/scss/base/_type-roles.scss src/scss/uids-core.scss; } > src/components/tokens/pr-1099-tokens.diff`,H={"src/tokens/primitives/typography.json":[{at:`@@ -5,7`,note:`<p><strong>New font family: Special Gothic Condensed</strong>, Foundations' display face.
        <code>typography.typeface.display</code> points at it, so the Headline, Headline 6×, Headline 8× and Eyebrow are
        set in it.</p>
        <p>Its second name, Special Gothic, is the Google Fonts family the docs load at width 75 and weight 600
        (<code>.storybook/preview-head.html</code>). UIDS's own CSS loads no font file for it.
        The Antonio line changes only by the comma JSON needs before a new entry.</p>`},{at:`@@ -18,29`,note:`<p><strong>Seven new font sizes.</strong> Four are the body sizes next doesn't have: <code>79</code> X-Small
        (${z(F(`x-small`))}, ${B(F(`x-small`))}), <code>119</code> Medium (${z(F(`medium`))}),
        <code>150</code> Large (${z(F(`large`))}) and <code>225</code> X-Large (${z(F(`x-large`))}). Small's
        ${z(F(`small`))} is the existing <code>100</code>.</p>
        <p>Three are the Labels' sizes: <code>104</code>, <code>89</code> and <code>74</code> (${z(L(`large`))},
        ${z(L(`medium`))} and ${z(L(`small`))}), 0.875, 0.75 and 0.625 of Body Medium, written out so a
        Label needs no math. The names follow the others: the rem value × 100, rounded.</p>`},{at:`"line-height": {`,note:`<p><strong>Five new line heights, the ones the roles use:</strong> 0.9 for Headline 6× and 8×, 1 for the
        Headline, 1.1 for the Subhead, 1.2 for the Eyebrow and for Subhead 2 in Large and X-Large, and 1.5 for Body and
        Small print. The others they use, 1.25, 1.3 and 1.4, were already here.</p>`}],"src/tokens/semantic/typography.json":[{at:`+    "paragraph": {`,note:`<p><strong><code>typography.paragraph</code> is next's <code>typography.body</code>, renamed.</strong> The
        same five references, so the same 1.2rem with a line height of 1.7, written as five single tokens instead of
        one composite.</p>
        <p>It moved because the Body role, next, needed the name. UIDS's <code>p</code> rule and
        <code>$content-font-size</code> read it now, so paragraphs render as before: see the files that read the
        renamed tokens, below.</p>`},{at:`    "body": {`,note:`<p><strong><code>typography.body</code> is now the Body role.</strong> The composite is gone; it's
        <code>typography.paragraph</code> above. In its place: Body's own family, weight, line height and letter
        spacing, then one group per hierarchy holding that hierarchy's body size.</p>
        <p>Body isn't the paragraph style. Its line height is 1.5, not 1.7; its face comes through
        <code>typography.typeface.sans</code>; and its size depends on the hierarchy, ${z(F(`medium`))} in Medium
        against the paragraph's 19.2px. Each group's description lists the formats that hierarchy is for.</p>`},{at:`+    "small-print": {`,note:`<p><strong>New role: Small print</strong>, 0.75 × the body size (${z(I(`small-print`,`medium`))} in
        Medium), for credits, dates and fine print. Like every role, it's written once: four properties and a
        <code>multiple</code>.</p>`},{at:`     "size": {`,note:`<p><strong>Unchanged.</strong> The <code>},</code> added after <code>size</code> is only punctuation: groups
        follow it now.</p>`},{at:`+    "typeface": {`,note:`<p><strong>New: three typeface roles</strong>, named after Foundations' families: display, slab and sans.
        Every role's family points at one of these, not at a font family primitive, so changing the face for every
        role on it is one edit here.</p>`},{at:`+    "scale": {`,note:`<p><strong>New: the two gaps</strong>, as multipliers of the body size: <code>related</code>, 1.5, between
        closely related elements, and <code>break</code>, 2, between sections. In each hierarchy a gap is its body size
        times one of these, so no gap needs a token per hierarchy. The hierarchy classes set them as
        <code>--uiowa-type-space-related</code> and <code>--uiowa-type-space-break</code>.</p>`},{at:`+    "highlight": {`,note:`<p><strong>New: the highlight measurements</strong>, multiples of the role's own font size (em in CSS): the
        box behind chosen headline words, and the band under a subhead. The Highlight story draws them, and UIDS ships
        no highlight class.</p>`},{at:`+    "headline": {`,note:`<p><strong>New role: Headline</strong>, the title: 4 × the body size, ${z(I(`headline`,`medium`))} in
        Medium. Every role from here down has the same shape: a <code>multiple</code>, then family, weight, line height
        and letter spacing, each pointing at a shared token.</p>`},{at:`+    "headline-6x": {`,note:`<p><strong>Headline 6× and 8×</strong>, the bigger steps for a statement: 6 and 8 × the body size,
        ${z(I(`headline-6x`,`medium`))} and ${z(I(`headline-8x`,`medium`))} in Medium, with a tighter line
        height, 0.9.</p>`},{at:`+    "eyebrow": {`,note:`<p><strong>New role: Eyebrow</strong>, the label above a title: 1.5 × the body size,
        ${z(I(`eyebrow`,`medium`))} in Medium, in the display face. The uppercase isn't a token: the
        <code>.type-eyebrow</code> class adds it.</p>`},{at:`+    "subhead": {`,note:`<p><strong>New role: Subhead</strong>, the lead-in and section heads: 2 × the body size,
        ${z(I(`subhead`,`medium`))} in Medium, Zilla Slab, line height 1.1.</p>
        <p>Its <code>x-small</code> and <code>small</code> groups hold the one value that differs there, a line height
        of 1.25. A hierarchy group holds only what differs.</p>`},{at:`+    "subhead-2": {`,note:`<p><strong>New role: Subhead 2</strong>, details and short headings: 1.5 × the body size,
        ${z(I(`subhead-2`,`medium`))} in Medium, Roboto, line height 1.3, and 1.2 in Large and X-Large.</p>
        <p><code>fontWeightEmphasis</code>, Medium 500, is a sixth property, for the line that leads a details group.
        The five-value composite type has no place for it.</p>`},{at:`+    "label": {`,note:`<p><strong>New: the Labels</strong>, one set for every hierarchy: Large, Medium and Small, Roboto Medium,
        line height 1.4.</p>
        <p>Their sizes don't change with the hierarchy, so each points at a plain size: ${z(L(`large`))},
        ${z(L(`medium`))} and ${z(L(`small`))}, which are 0.875, 0.75 and 0.625 of Body Medium. If Body
        Medium changes, these three change by hand.</p>`}],"src/tokens/README.md":[{at:`+## Typography roles`,note:`<p><strong>A new section on the roles:</strong> the five body sizes that name the hierarchies, each role
        written once with its multiple, hierarchy groups only for what differs, the gaps as multipliers, and the Labels
        as plain sizes.</p>`},{at:`+The classes that apply the roles`,note:`<p>How a page uses them: a hierarchy class on a container, a role class on the text, and <code>.type-subhead-2--emphasis</code> for Subhead 2's emphasis weight. Medium is the default.</p>`},{at:`takes it too. The intro under a`,note:`<p><strong>The intro under a page's title</strong> is <code>.element--intro</code>: Roboto Regular at the
        Subhead's size, so it is the h2's size in every hierarchy. <code>.element--light-intro</code> and
        <code>.element--bold-intro</code> are deprecated names for it.</p>`},{at:"+`typography.paragraph` is the style",note:`<p>What <code>typography.paragraph</code> is. The rename from <code>typography.body</code> is in the CHANGELOG.</p>`},{at:`+The highlight tokens`,note:`<p>What each highlight value measures.</p>`},{at:"+`llms/llms.txt` and",note:`<p>Added when the PR dropped the script that wrote <code>llms/</code>. Nothing rebuilds those files now, so
        the README tells whoever changes a typography token to change <code>llms/typography.md</code> too.</p>`},{at:`+## Document outline`,note:`<p><strong>New: the document outline.</strong> Where an author picks only a heading level, each level
        takes a role, and <code>.type-rich-text</code> applies them with no classes.</p>`}],"src/scss/base/_paragraph.scss":[{at:`@@ -26,10`,note:`<p><strong>Why the <code>p</code> rule changed.</strong> In 1099, <code>--uiowa-typography-body-*</code> is
        the Body role. Left as it was, this rule would give every paragraph Body's line height, 1.5 instead of 1.7, and
        no size of its own: <code>--uiowa-typography-body-font-size</code> no longer exists, so a paragraph would take
        its parent's size.</p>
        <p>Reading <code>--uiowa-typography-paragraph-*</code>, the old style under its new name, paragraphs render
        exactly as before: 19.2px, line height 1.7.</p>`},{at:`@@ -181,19`,note:`<p><strong>The intro classes.</strong> On next, <code>.element--light-intro</code> was Roboto Light and
        <code>.element--bold-intro</code> Zilla Slab 600, each growing with the screen from 25.6px to 33.6px or 35.2px.
        Now one rule sets both and <code>.element--intro</code> from the roles: Subhead 2's face, weight and leading at
        the Subhead's size, the h2's, so 38px on Medium. The old names are deprecated; the
        <code>typography.intro-*</code> tokens stay, and no UIDS stylesheet reads them now.</p>`}],"src/scss/abstracts/_variables.scss":[{at:`@@ -64,7`,note:`<p><strong>The same rename for <code>$content-font-size</code></strong>, which lists, tables, alerts,
        accordions, blockquotes and tabs use for their text. It reads the paragraph's size, 1.2rem, as it did on
        next.</p>`}],"src/scss/base/_type-roles.scss":[{at:`+// The type roles as classes`,note:`<p><strong>New: the classes that apply the roles</strong>, written out in Sass, one rule each. Nothing here
        is generated, so a search for a class finds its rule.</p>`},{at:`+.type-scale--x-small {`,note:`<p><strong>One class per hierarchy</strong>, <code>.type-scale--x-small</code> to
        <code>.type-scale--x-large</code>. Each sets <code>--uiowa-type-base</code> to its body size, the two gaps from
        it, and the two line heights that switch: the hierarchy's own where the token file has one, else the
        role's.</p>
        <p>Medium's selector also gets <code>:where(:root)</code>, so a page with no hierarchy class gets Medium.
        <code>:where()</code> gives that default no specificity, so a hierarchy class on <code>&lt;html&gt;</code> still
        overrides it.</p>`},{at:`+// Rich text, where an author picks only a heading level`,note:`<p><strong>New: <code>.type-rich-text</code></strong>, for rich text, where an author picks only a heading
        level. Its own children take the document outline with no classes: the h1 the Headline, the h2 the Subhead, h3
        to h6 Subhead 2 at its emphasis weight, and paragraphs and lists Body, all in the hierarchy it sits in.</p>
        <p>The element rules sit in <code>:where()</code>, so they carry only the container's specificity and come before
        the role classes: a role class on a heading still wins. The gaps are Related between blocks and Break under the
        h1 and above a heading that starts a section; the heading selectors outweigh the base
        <code>h2:not(:first-child)</code> margins.</p>`},{at:`+.type-body {`,note:`<p>Body's class: its size is the base itself.</p>`},{at:`+.type-small-print {`,note:`<p><strong>Every other role's class.</strong> Its size is
        <code>calc(var(--uiowa-type-base) * var(--uiowa-typography-&lt;role&gt;-multiple))</code>, so the browser works
        out each role's size in whatever hierarchy it sits in. Subhead and Subhead 2 read the line height the hierarchy
        class sets.</p>`},{at:`+.type-eyebrow {`,note:`<p>The Eyebrow's class also sets uppercase.</p>`},{at:`+.type-subhead-2 :is(strong, b) {`,note:`<p>Subhead 2's emphasis weight, on <code>strong</code> and <code>b</code> inside it and on
        <code>.type-subhead-2--emphasis</code>.</p>`},{at:`+// The Labels are one set for every hierarchy.`,note:`<p><strong>The three Label classes, written out.</strong> The Labels don't change with the hierarchy, so
        each class reads its own five tokens, with no base and no multiple.</p>`}],"src/scss/uids-core.scss":[{at:`@@ -6,6`,note:`<p>Pulls the type-role classes into the stylesheet, so <code>uids.css</code> and <code>uids-core.css</code> have them.</p>`}]},U=[{key:`tokens`,files:[`src/tokens/primitives/typography.json`,`src/tokens/semantic/typography.json`,`src/tokens/README.md`]},{key:`readers`,files:[`src/scss/base/_paragraph.scss`,`src/scss/abstracts/_variables.scss`]},{key:`classes`,files:[`src/scss/base/_type-roles.scss`,`src/scss/uids-core.scss`]}],W=te(c),G=e=>({path:e.path,adds:e.adds,dels:e.dels,...ee(e.rows,H[e.path]??[])}),K=new Set(U.flatMap(e=>e.files)),q=Object.fromEntries(U.map(e=>[e.key,e.files.map(e=>W.files.find(t=>t.path===e)).filter(Boolean).map(G)])),q.tokens.push(...W.files.filter(e=>!K.has(e.path)).map(G)),J=Object.values(q).flat().flatMap(e=>e.unplaced.map(t=>`${e.path}: ${t.at}`)),Y=`
  .td { padding: var(--uiowa-space-300); max-width: 120rem; color: var(--uiowa-color-brand-black); }
  .td > :is(p, ul) { max-width: 52rem; }
  .td.td :where(h1, h2, h3, p, ul, figure, table) { margin: 0; }
  .td.td > * + * { margin-top: var(--uiowa-type-space-related); }
  .td.td > h2 { margin-top: var(--uiowa-type-space-break); }
  .td code { font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.85em; }
  .td__refresh { display: block; margin-top: var(--uiowa-space-50); padding: var(--uiowa-space-100); background: var(--uiowa-color-neutral-100); white-space: pre-wrap; overflow-wrap: anywhere; }
  .td__warn { padding: var(--uiowa-space-100); border-left: 4px solid var(--uiowa-color-danger); background: color-mix(in srgb, var(--uiowa-color-danger) 8%, transparent); }
  .td__file { border: 1px solid var(--uiowa-color-border-default); }
  .td__file-head {
    display: flex; flex-wrap: wrap; gap: 0 var(--uiowa-space-100); align-items: baseline;
    padding: var(--uiowa-space-50) var(--uiowa-space-100); background: var(--uiowa-color-neutral-200);
    border-bottom: 1px solid var(--uiowa-color-border-default);
  }
  .td__file-head code { font-weight: 600; font-size: 0.9rem; }
  .td__add { color: var(--uiowa-color-success); font-weight: 600; }
  .td__del { color: var(--uiowa-color-danger); font-weight: 600; }
  ${o}
`,X=`
  <section v-for="f in files" :key="f.path" class="td__file">
    <header class="td__file-head"><code>{{ f.path }}</code><span class="td__add">+{{ f.adds }}</span><span class="td__del">−{{ f.dels }}</span></header>
    <Annotated :sections="f.sections" diff />
  </section>`,Z={title:`Tokens (typography)`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}}},Q={name:`Token diff`,render:()=>({components:{Annotated:s,FileList:{components:{Annotated:s},props:{files:{type:Array,required:!0}},template:`<div style="display: contents">${X}</div>`}},setup(){return{css:Y,count:N,base:W.meta.base?.slice(0,10),head:W.meta.head?.slice(0,10),refresh:V,groups:q,unplaced:J}},template:`
      <div class="td">
        <component is="style">{{ css }}</component>
        <h1 class="type-subhead">Token diff</h1>
        <p class="type-body">
          The diff GitHub shows for PR 1099, from its base, next at <code>{{ base }}</code>, to the pushed head,
          <code>{{ head }}</code>, with a note beside each change saying why it changed: the token files, the
          stylesheets that read the renamed and new tokens, and the classes that apply the roles. The PR's other five files
          aren't shown: <code>llms/llms.txt</code> and <code>llms/typography.md</code>, the typography as plain text,
          kept by hand; the CHANGELOG; the line in <code>.storybook/main.mjs</code> that serves <code>llms/</code>; and
          the Special Gothic link in <code>.storybook/preview-head.html</code>.
        </p>
        <p v-if="unplaced.length" class="td__warn type-small-print">
          {{ unplaced.length }} notes didn't find their line, so the code has changed since they were written:
          <template v-for="(u, i) in unplaced" :key="u">{{ i ? '; ' : '' }}<code>{{ u }}</code></template>.
        </p>
        <p class="type-small-print">To refresh the diff after a push, run this in the repo:<code class="td__refresh">{{ refresh }}</code></p>

        <h2 class="type-subhead-2">The token files</h2>
        <FileList :files="groups.tokens" />

        <h2 class="type-subhead-2">The files that read the renamed tokens</h2>
        <p class="type-body">
          Not token files, but they changed because of one: <code>typography.body</code> became the Body role, so
          everything in UIDS that meant the paragraph style moved to <code>typography.paragraph</code>.
          <code>_paragraph.scss</code> also sets the intro classes from the roles.
        </p>
        <FileList :files="groups.readers" />

        <h2 class="type-subhead-2">The classes that apply the roles</h2>
        <FileList :files="groups.classes" />

        <h2 class="type-subhead-2">How every size is worked out from {{ count.tokens }} tokens</h2>
        <p class="type-body">
          The token file holds {{ count.tokens }} typography role tokens. Written as named sizes, before the switch to
          base + multiples, it held {{ count.named }}; most of that was repetition, each role's family, weight, line
          height and letter spacing written again in every hierarchy. What really changes by hierarchy is size:
          {{ count.styles }} role styles, {{ count.roles }} roles in {{ count.hierarchies }} hierarchies, and
          {{ count.gaps }} gaps.
        </p>
        <p class="type-body">
          No build code works those out. The token build is next's, unchanged: Style Dictionary writes each token as a
          custom property, the multiples included. The browser does the rest, in the classes above: a hierarchy class
          sets the base, and a role's size is the base times its multiple. A tool that needs the numbers, such as a
          Figma script, does the same sum: the hierarchy's body size times the role's multiple.
          <code>llms/typography.md</code> lists every style with the sum already done.
        </p>
      </div>
    `})},$=[`TokenDiff`],Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Token diff',
  render: () => ({
    components: {
      Annotated,
      FileList: {
        components: {
          Annotated
        },
        props: {
          files: {
            type: Array,
            required: true
          }
        },
        template: \`<div style="display: contents">\${FILE_LIST}</div>\`
      }
    },
    setup() {
      return {
        css,
        count: COUNT,
        base: DIFF.meta.base?.slice(0, 10),
        head: DIFF.meta.head?.slice(0, 10),
        refresh: REFRESH,
        groups: DIFF_FILES,
        unplaced: UNPLACED
      };
    },
    template: \`
      <div class="td">
        <component is="style">{{ css }}</component>
        <h1 class="type-subhead">Token diff</h1>
        <p class="type-body">
          The diff GitHub shows for PR 1099, from its base, next at <code>{{ base }}</code>, to the pushed head,
          <code>{{ head }}</code>, with a note beside each change saying why it changed: the token files, the
          stylesheets that read the renamed and new tokens, and the classes that apply the roles. The PR's other five files
          aren't shown: <code>llms/llms.txt</code> and <code>llms/typography.md</code>, the typography as plain text,
          kept by hand; the CHANGELOG; the line in <code>.storybook/main.mjs</code> that serves <code>llms/</code>; and
          the Special Gothic link in <code>.storybook/preview-head.html</code>.
        </p>
        <p v-if="unplaced.length" class="td__warn type-small-print">
          {{ unplaced.length }} notes didn't find their line, so the code has changed since they were written:
          <template v-for="(u, i) in unplaced" :key="u">{{ i ? '; ' : '' }}<code>{{ u }}</code></template>.
        </p>
        <p class="type-small-print">To refresh the diff after a push, run this in the repo:<code class="td__refresh">{{ refresh }}</code></p>

        <h2 class="type-subhead-2">The token files</h2>
        <FileList :files="groups.tokens" />

        <h2 class="type-subhead-2">The files that read the renamed tokens</h2>
        <p class="type-body">
          Not token files, but they changed because of one: <code>typography.body</code> became the Body role, so
          everything in UIDS that meant the paragraph style moved to <code>typography.paragraph</code>.
          <code>_paragraph.scss</code> also sets the intro classes from the roles.
        </p>
        <FileList :files="groups.readers" />

        <h2 class="type-subhead-2">The classes that apply the roles</h2>
        <FileList :files="groups.classes" />

        <h2 class="type-subhead-2">How every size is worked out from {{ count.tokens }} tokens</h2>
        <p class="type-body">
          The token file holds {{ count.tokens }} typography role tokens. Written as named sizes, before the switch to
          base + multiples, it held {{ count.named }}; most of that was repetition, each role's family, weight, line
          height and letter spacing written again in every hierarchy. What really changes by hierarchy is size:
          {{ count.styles }} role styles, {{ count.roles }} roles in {{ count.hierarchies }} hierarchies, and
          {{ count.gaps }} gaps.
        </p>
        <p class="type-body">
          No build code works those out. The token build is next's, unchanged: Style Dictionary writes each token as a
          custom property, the multiples included. The browser does the rest, in the classes above: a hierarchy class
          sets the base, and a role's size is the base times its multiple. A tool that needs the numbers, such as a
          Figma script, does the same sum: the hierarchy's body size times the role's multiple.
          <code>llms/typography.md</code> lists every style with the sum already done.
        </p>
      </div>
    \`
  })
}`,...Q.parameters?.docs?.source}}}}))();export{Q as TokenDiff,$ as __namedExportsOrder,Z as default};