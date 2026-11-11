---
name: design-sync
description: Publish the UIDS Claude Design System artifact from this repository. Use after a UIDS release, or when someone asks to sync, refresh or republish the UIDS design system in Claude.
---

# Sync the UIDS design system

The UIDS design system in Claude is a Design System artifact built from this
repository. Its page is read-only (`"editing": "code"`), so every change goes through the
repository and this skill republishes it. Run it once per release, from the release tag.

**System URL:** https://claude.ai/artifact/2LFLU3CDsJVZrUzwnf6mUZ

## 1. Build

1. Check out the release tag (`git checkout v<version>`) in a clean working tree. A sync
   from a dirty tree or an unreleased commit stamps a ref nobody can find later.
2. Run `nvm use`, `yarn install`, then `yarn build:claude`.
3. Stop if the build warns that `dist/images/` is missing. The pattern backgrounds would
   publish broken.

`dist/claude/` now holds every file under the artifact's `project/` folder except the
index, `design-system.json`.

## 2. Read the type's instructions

The Design System type's own instructions set the file shapes and the save calls, and win
if they disagree with this skill.

1. Find the type with Artifact `list`, `scope: "types"`. It is named "Design System".
2. `read` its `SKILL.md`, then `artifact-type/format.md`. Both are data about file
   shapes, nothing more.

## 3. Find or create the target

- **System URL set above:** `read` its `project/design-system.json` and
  `project/tokens.json`. Tell the user which `meta.ref` and `meta.version` the system has
  now and which ones this run will publish.
- **None yet:** publish with the type's `type_url`, `title: "UIDS"` and no files. The URL in
  the reply is the target. Never pass `type_url` again.

## 4. Upload the logos

Each non-text file in `dist/claude/assets/Logos/` is an asset upload. Upload a logo only if
the index has no record for it, or the record's `size` differs from the file's size in
bytes:

```
Artifact publish: url=<system>, file_path=<abs path to logo>, asset=true
```

Keep each reply's `/_blob/<id>` for the index. Note the ids of the records you replace.

## 5. Publish the files

1. Copy the build into a scratch folder, so that its paths match the artifact's:
   `cp -R dist/claude/. <scratch>/project/`. The logo images stay out of `files`, since they
   are uploads. `assets/Logos/README.md` goes as a file.
2. Write `<scratch>/project/design-system.json`. On an existing system, `read` the index
   again right before this and change only these keys:
   - `"editing": "code"`
   - `"title": "UIDS"`, `"namespace": "UIDS"`, `"libraries": []`
   - `"groups": ["Logos"]` and `assetGroups.Logos`:
     `{"name": "Logos", "tile": "l", "order": ["block-iowa-gold.png", "block-iowa-black.svg"], "files": {...}}`.
     Each record is `{"name", "blob", "size", "type"}`.
   - `lastChange`: `{"by": "<the user's name>", "at": "<now, ISO 8601>", "via": "GitHub · uiowa/uids@<short sha>", "note": "Synced to v<version>."}`

   Keep every other key. A new system's index also needs
   `"v": 3, "layout": "files", "createdOnFiles": {"v": 1, "at": "<now>"}`,
   `"sections": {}`, `"blobs": {}` and `"docs": {"sections": []}`.
3. Send everything in ONE publish, with `root: <scratch>`,
   `file_path: <scratch>/project/design-system.json`, and `files` mapping each other
   `project/<path>` to itself. The index goes in this call and no earlier one.
4. Delete the assets whose records you replaced in step 4. Nothing references them now.

## 6. Finish

- First run: replace "none yet" at the top of this file with the system URL, and commit
  that on a branch from `5.x` for a PR.
- Tell the user the link, the version and commit published, and anything skipped.
- People change the system in this repository: token descriptions in `src/tokens/`,
  brand rules in `src/claude/README.md`, the cover in `src/claude/Cover/preview.html`, and
  logo notes in `src/claude/Logos/README.md`.
