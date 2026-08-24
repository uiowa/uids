/**
 * Figma readback query — produces figma/snapshot.json.
 *
 * WHY THIS FILE EXISTS
 * The other four views are checked by plain Node scripts that read files off disk.
 * Figma can't be: its state lives behind an authenticated API that only an agent
 * session can reach (the MCP runs as a tool call, not in CI). So we split the job:
 *
 *   1. THIS query runs once per Figma change, inside a session, via the Figma MCP's
 *      `use_figma` tool. It reads the live file and returns a plain JSON summary.
 *   2. That JSON is committed as figma/snapshot.json.
 *   3. scripts/check-figma.mjs — no network, no auth — diffs the snapshot against
 *      tokens/ + contracts/ on every PR, like the other checkers.
 *
 * The query is version-controlled so every session runs the SAME query rather than
 * improvising one, which is what makes the snapshot comparable over time.
 *
 * HOW TO RUN IT
 *   Paste this file's contents as the `code` argument of the Figma MCP `use_figma`
 *   tool (fileKey hNShklBztaeaQneScM0KoM). The full result exceeds the 20KB tool-result
 *   limit, so run it in SLICES, editing the SECTION constant below:
 *
 *     SECTION = 'vars-a'  -> collections + Primitives and Semantic variables
 *     SECTION = 'vars-b'  -> Components variables
 *     SECTION = 'sets'    -> component sets (axes + bound variables), in TWO halves
 *
 *   'sets' NO LONGER FITS IN ONE CALL EITHER — since 2026-08-22 it is run as two
 *   name-filtered halves (see the 2026-08-22 entry below). There is NO filter constant
 *   in the code: add the guard inline at the top of the `for (const set of sets)` loop,
 *   and have each half report totalSeen / captured / excluded / excludedNames. The split
 *   that ran clean on 2026-08-22, 11 sets + 10:
 *
 *     const A_LIST = ['Backgrounds', 'Logo', 'Brand Bar', 'Brand Footer',
 *       'Button', 'Form Item', 'Form Fieldset', 'Headline', 'Tab', 'Pager Item',
 *       'Callout'];
 *     slice A:  A_LIST.includes(set.name)
 *     slice B: !A_LIST.includes(set.name)   -> Table, Accordion Item, Badge, Menu Item,
 *                                              Alert, Stat, Blockquote, CTA, Banner, Card
 *
 *   RENAMED 2026-08-24: 'SiteNow - Backgrounds' -> 'Backgrounds' when that set became
 *   the single governed backgrounds surface. A_LIST is updated above, but note the
 *   complement rule is what made the rename safe: had A_LIST gone unedited, the set
 *   would have landed in slice B rather than being dropped by both halves. Its
 *   description also went from EMPTY to ~1.05KB in the same change, so slice A grew by
 *   roughly 1.4KB (description plus 11 boundVariables) — see the description-length
 *   warning below, which this change is a live example of.
 *
 *   Keep B as the COMPLEMENT rather than a second literal list: a set added or renamed
 *   in Figma then lands in B instead of being silently dropped by both halves. It also
 *   means growth lands on B, so watch B's size — and watch totalSeen, which is what
 *   actually reveals the new set.
 *
 *   THIS HEADER IS THE ONLY SOURCE OF TRUTH FOR THE SLICE COUNT: CLAUDE.md and
 *   contracts/README.md point here and deliberately name no number, so re-derive it
 *   from the log below before you plan a capture — do not trust a count remembered
 *   from a previous session.
 *
 *   Merge the payloads into figma/snapshot.json (variables and componentSets
 *   objects concatenated), then run `node scripts/check-figma.mjs --stamp`.
 *
 *   KEY ORDER IN THE SNAPSHOT IS NOT AUTHORITATIVE — do not "fix" it to match Figma.
 *   check-figma.mjs looks each set up BY NAME (check-figma.mjs:330) and never iterates
 *   in order, so the order carries no information and re-ordering is a pure-noise diff.
 *   The two already disagree: on 2026-08-22 the live page order returned CTA before
 *   Blockquote where the committed snapshot has Blockquote before CTA, and that
 *   refresh deliberately preserved the committed order.
 *
 *   SLICES OUTGROW THE LIMIT AS THE LIBRARY GROWS — split by collection and then by
 *   NAME PREFIX when they do, and verify the tail of every payload ends cleanly
 *   (a complete JSON object, not a cut-off record). "Silent" here means nothing THROWS
 *   and no checker goes red — there IS a tell, but only if you read the tail: on
 *   2026-08-22 the cut-off payload ended in the literal marker `// truncated to 20kb`.
 *   Grep every result for it before merging; it is cheaper than the reasoning it saves:
 *   - Two slices until the Buttons phase (2026-08-14): Components hit 82 variables
 *     and 'vars-b' truncated mid-payload — silently, with the component sets lost
 *     off the end. Sets were split out.
 *   - Three slices until the Forms phase (2026-08-14, same day): Primitives+Semantic
 *     hit 126 variables and 'vars-a' truncated. The Forms session split further:
 *     Primitives-only, then Components filtered to name.startsWith('form/'), with the
 *     untouched remainder carried over from the previously-stamped snapshot after
 *     verifying the live per-collection counts matched. When splitting by name
 *     filter, ALWAYS return the count of the excluded remainder so the merge can be
 *     verified against the live file, not assumed.
 *   - Four slices as of 2026-08-22: 'sets' ITSELF hit the limit. The 21 sets serialise
 *     to ~21.9KB compact and the payload came back silently truncated mid-'Card' — the
 *     last set in traversal order, whose key sits 19,914 bytes in, so a ~20KB cut lands
 *     inside it. THE DRIVER IS DESCRIPTION LENGTH, NOT SET COUNT: descriptions became
 *     the contract pointer PLUS prose (2026-08-21, see the block above the sets loop),
 *     and they now account for 9,441 of the payload's 21,740 characters — 43% — with
 *     Card at 1,207 and Brand Bar at 956 on their own. So the next overflow will be
 *     caused by someone WRITING, not by someone adding a set — and no gate will warn
 *     you in advance; you find out from the tail marker, after the fact, if you look.
 *     Losing the tail of ONE section is the same failure as merging too few
 *     sections, one level down: check-figma reads the merge as a component set DELETED
 *     from Figma. The fix, now the protocol: two name-filtered slices (11 sets + 10),
 *     each returning totalSeen (sets found before filtering), captured, excluded and a
 *     sorted excludedNames. Both reported totalSeen 21, and each slice's excludedNames
 *     was exactly the other slice's captured names. That mutual complement POSITIVELY
 *     EXCLUDES an added or renamed set — assuming coverage instead is exactly what
 *     truncation breaks.
 *   - Still four slices as of 2026-08-24, and this is the predicted growth arriving on
 *     schedule: Headline's description went 529 -> 904 chars and its variantCount 30 ->
 *     60 when the Alignment axis landed, which is the "next overflow will be caused by
 *     someone WRITING" case above, not a new set. Slice A now serialises to 13,572
 *     chars over 11 sets and slice B to 9,983 over 10, so both still clear ~20KB with
 *     room; descriptions are 10,852 chars of the pair. Card (1,207) still leads,
 *     Headline is now fourth (904) behind Backgrounds (1,036) and Brand Bar (956).
 *     Recomputed from the committed snapshot, not measured off a live payload — the
 *     capture that produced this entry was a FINGERPRINT refresh (see below), so no
 *     20KB slice was ever transported.
 *
 *   A FINGERPRINT REFRESH IS A VALID FOURTH OPTION when you know which sets you
 *   touched, and it is what the 2026-08-24 Alignment change used. Rather than
 *   re-capturing slice A, run this file's own sets serialisation over ALL pages and
 *   return, per set, a canonical hash (recursively key-sorted stringify) plus its
 *   length — ~21 short strings, one call, no truncation risk at all — then compute the
 *   same hash locally over the committed snapshot. 20 of 21 sets hashed identical and
 *   only Headline differed, which POSITIVELY EXCLUDES drift in the other twenty
 *   instead of assuming it, and is strictly stronger than a slice re-capture that can
 *   only prove what it managed to transport. Rebuild the changed entry locally and
 *   verify ITS hash against the in-sandbox one before writing. That last step is not
 *   optional: it is what caught the description escaping below.
 *
 *   DESCRIPTIONS COME BACK ESCAPED AND THE SNAPSHOT MUST HOLD FIGMA'S TRUTH, NOT THE
 *   READABLE FORM. Headline's description really does contain the eight characters
 *   `&amp;lt;` where a reader expects `<`. Until 2026-08-24 the snapshot recorded
 *   `&lt;` — one decode level short — because a previous capture decoded on the way in;
 *   nothing went red, since check-figma only asserts the description CONTAINS its
 *   contract path and never compares it to Figma. Settle which level is real by hashing
 *   the string INSIDE the sandbox (immune to tool-transport escaping) and matching that
 *   hash locally against candidates; do not eyeball the tool response, which adds its
 *   own layer. Note the consequence for designers, still unfixed: the Figma UI shows
 *   that description with the literal entities in it.
 *
 *   Never hand-trim a truncated result: a partial payload merged into the snapshot
 *   looks like deleted variables to check-figma. (Real fix, backlogged: emit a
 *   compact format — the verbose per-variable keys are ~60% of the payload — which
 *   requires a matching check-figma.mjs reader change.)
 *
 *   THE "CHEAP PATH" — carrying `variables` over from the stamped snapshot and
 *   re-capturing only `componentSets` — IS ONLY SAFE WHEN NEITHER VALUES NOR SCOPES
 *   CHANGED. Scopes are the trap: check-figma asserts them only for documentation-only
 *   breakpoint variables (check-figma.mjs:265) and ignores them on every other
 *   variable, so a scope edited in the Figma UI drifts silently and no gate ever goes
 *   red. Five had drifted exactly that way — accordion/icon/size and alert/heading/h2
 *   to FONT_SIZE, blockquote/accent/color, blockquote/accent/color-on-gold and
 *   menu/separator-color to STROKE_COLOR — between the 2026-08-17 refresh, which
 *   carried `variables` over on the premise that nothing had changed (true of the
 *   values, false of the scopes), and the 2026-08-17 page-title capture that happened
 *   to need a full Components re-capture for an unrelated reason. It was caught by
 *   luck, not by a check. Re-capture in full any collection you touched, and diff the
 *   merged result against the committed snapshot before writing.
 *
 * Plugin API notes (see the figma-use skill): top-level await is allowed, the return
 * value is JSON-serialised automatically, and page content loads lazily — hence the
 * setCurrentPageAsync loop below.
 */

// Which slice to return — see "HOW TO RUN IT" above.
const SECTION = 'vars-a';

// Figma stores numbers as float32, so 1.2rem*16 comes back as 19.200000762939453.
// Round to 4dp so the snapshot is readable, diffs are stable, and comparison against
// the token JSON doesn't turn into float-equality trivia.
const round = (n) => (typeof n === 'number' ? Number(n.toFixed(4)) : n);

// ---- Variables -------------------------------------------------------------
// Figma stores an alias as {type:'VARIABLE_ALIAS', id:'VariableID:123'}. IDs are
// meaningless across files and churn on re-creation, so we resolve every alias to
// the TARGET VARIABLE'S NAME. That makes the snapshot stable, diffable in review,
// and comparable to the token JSON (which also refers to targets by name).
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const allVars = await figma.variables.getLocalVariablesAsync();

const nameById = {};
for (const v of allVars) nameById[v.id] = v.name;

// modeId -> human mode name ("value", "small (600)", "md (980)", …), per collection.
const modeNameById = {};
for (const c of collections) {
  for (const m of c.modes) modeNameById[m.modeId] = m.name;
}

// 'vars-a' carries the two token tiers, 'vars-b' the component tier, 'sets' no variables.
const WANTED_COLLECTIONS = SECTION === 'vars-a' ? ['Primitives', 'Semantic']
  : SECTION === 'vars-b' ? ['Components']
  : [];

const variables = {};
for (const v of allVars) {
  const collection = collections.find((c) => c.id === v.variableCollectionId);
  if (!collection || !WANTED_COLLECTIONS.includes(collection.name)) continue;
  const modes = {};
  for (const [modeId, raw] of Object.entries(v.valuesByMode)) {
    const modeName = modeNameById[modeId] ?? modeId;
    if (raw && typeof raw === 'object' && raw.type === 'VARIABLE_ALIAS') {
      modes[modeName] = { alias: nameById[raw.id] ?? `UNRESOLVED:${raw.id}` };
    } else if (raw && typeof raw === 'object' && 'r' in raw) {
      // COLOR values are {r,g,b,a} floats 0-1. Convert to hex so the snapshot can be
      // compared to the token JSON (#FFCD00) without float-equality games. Alpha
      // colors emit 8-digit hex (#RRGGBBAA); check-figma rounds the token's rgba()
      // alpha with the same Math.round(a * 255), so float32 noise cancels out.
      const hex = (n) => Math.round(n * 255).toString(16).padStart(2, '0').toUpperCase();
      const alpha = raw.a !== undefined && raw.a < 1 ? hex(raw.a) : '';
      modes[modeName] = `#${hex(raw.r)}${hex(raw.g)}${hex(raw.b)}${alpha}`;
    } else {
      modes[modeName] = round(raw);
    }
  }
  variables[v.name] = {
    collection: collection ? collection.name : null,
    type: v.resolvedType,
    scopes: v.scopes,
    // The WEB code syntax is the design<->code join: it should name the exact CSS
    // custom property that build-tokens.mjs generates for the same token.
    web: (v.codeSyntax && v.codeSyntax.WEB) || null,
    modes,
  };
}

// ---- Component sets --------------------------------------------------------
// For each variant set we capture three things the contracts make claims about:
//   * its variant AXES and their values  -> must equal the contract's option values
//   * every variable BOUND anywhere inside -> must be a subset of contract.tokensUsed
//   * its DESCRIPTION -> must name its own contract (added 2026-08-21)
//
// The description was an UNGUARDED surface until 2026-08-21: check-figma never read
// identity.figma.note and this query captured no description, so a description that
// had drifted -- or, as it turned out, one that was simply never written -- was
// permanently uncatchable. A spot-check found 13 of 23 sets carried NO description
// at all. contracts/README.md step 5 says the description should be "the contract
// pointer", so that is what check-figma.mjs now enforces: the text must contain its
// own contract's path. A pointer cannot go stale the way a prose COPY can, which is
// the whole reason the convention exists -- so the check is for the pointer, never
// for the prose around it.
const componentSets = {};
for (const page of SECTION === 'sets' ? figma.root.children : []) {
  await figma.setCurrentPageAsync(page); // pages load lazily; this populates children
  const sets = page.findAllWithCriteria
    ? page.findAllWithCriteria({ types: ['COMPONENT_SET'] })
    : page.findAll((n) => n.type === 'COMPONENT_SET');

  for (const set of sets) {
    // componentPropertyDefinitions describes VARIANT axes plus boolean/text props.
    const axes = {};
    const booleans = [];
    for (const [prop, def] of Object.entries(set.componentPropertyDefinitions || {})) {
      if (def.type === 'VARIANT') axes[prop] = def.variantOptions;
      else if (def.type === 'BOOLEAN') booleans.push(prop.split('#')[0]); // strip the #id suffix
    }

    // Collect bound variable names from every descendant. Bindings live in two
    // places: node.boundVariables (width, height, itemSpacing, …) and per-paint
    // bindings inside fills/strokes.
    const bound = new Set();
    const addBindings = (bv) => {
      if (!bv) return;
      for (const entry of Object.values(bv)) {
        const list = Array.isArray(entry) ? entry : [entry];
        for (const b of list) {
          if (b && b.id && nameById[b.id]) bound.add(nameById[b.id]);
        }
      }
    };
    for (const node of [set, ...set.findAll(() => true)]) {
      addBindings(node.boundVariables);
      for (const key of ['fills', 'strokes']) {
        const paints = node[key];
        if (Array.isArray(paints)) for (const p of paints) addBindings(p.boundVariables);
      }
    }

    componentSets[set.name] = {
      id: set.id,
      page: page.name,
      variantCount: set.children.length,
      axes,
      booleanProps: booleans.sort(),
      boundVariables: [...bound].sort(),
      // Normalise whitespace so a reflow in the Figma UI is not a snapshot diff.
      description: (set.description || '').replace(/\s+/g, ' ').trim(),
    };
  }
}

return {
  section: SECTION,
  fileKey: figma.fileKey || null,
  // Only the first slice needs to report the collection/mode structure.
  collections: SECTION === 'vars-a'
    ? collections.map((c) => ({ name: c.name, modes: c.modes.map((m) => m.name) }))
    : undefined,
  variables,
  componentSets,
};
