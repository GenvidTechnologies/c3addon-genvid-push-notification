# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@CONVENTIONS.md

There is no `docs/` directory. Project knowledge (sources, decisions, findings) lives in the
LLM-wiki under `wiki/`, with immutable source captures under `raw/`. `wiki/index.md` doubles as
the docs index (`paths["docs/TOC.md"]` in `.gvt-agent.json`), and ADRs go in `wiki/decisions/`
(`paths["docs/decisions/"]`). Maintain the wiki with `/gvt-dev:maintain-wiki` (ingest / query / lint).

## What this is

A Construct 3 **plugin addon** (SDK v2, TypeScript) that wraps the Cordova plugin
[`@havesource/cordova-plugin-push`](https://github.com/havesource/cordova-plugin-push/).
It only works in a **Cordova export**. In preview or a web export, `PushNotification`
is undefined and `Initialize` just logs `"Need to export as Cordova to be working."`.

## Commands

```bash
npm i                 # also needed after pulling: eslint deps were added after the first install
npm run lint          # eslint over src/ (src/ts-defs/** is ignored)
npm run build         # tsc -p src --outDir dist, then postbuild copies *.json, *.svg, lang/ into dist/
npx tsc -p src --noEmit   # typecheck only
npm run watch         # incremental tsc into dist/
npm run devmode       # http-server dist --cors, serves the addon for Construct's developer mode
npm run all:windows   # lint + build + zip dist/ into Genvidtech_PushNotification.c3addon (needs 7z.exe on PATH)
npm run all:posix     # same, using zip
```

There are no automated tests. Verify changes by loading the addon in Construct 3
developer mode with `http://localhost:8080/addon.json` (use `localhost`, not
`127.0.0.1`, because of Construct's CSP), then exporting `sample/` to Cordova.

## Architecture

The SDK v2 runtime is split across two contexts that talk only through messages.
Keep this split in mind when you add a feature:

- **Editor side.** `src/plugin.ts` registers the plugin. It is a single global and
  declares the Cordova plugin reference. It also adds two Android resource files that
  the *consuming project* must supply: `google-services.json` at the Cordova project
  root, and `www/icons/push_icon.png` (in Construct, an icon file named `push_icon.png`).
- **Runtime (worker) side.** In `src/c3runtime/`, `instance.ts` holds the state
  (`_registration`, `_notification`, `_error`). `actions.ts`, `conditions.ts` and
  `expressions.ts` are the ACE implementations. `main.ts` just imports the modules.
- **DOM side.** `src/c3runtime/domSide.ts` runs in the page, where Cordova's global
  `PushNotification` lives. It handles the `initialize` message: it calls `PN.init(...)`
  and defaults `android.icon` to `"push_icon"`. It forwards the plugin's `registration`,
  `notification` and `error` events back to the runtime as `on-registration`,
  `on-notification` and `on-error`.

The flow is: the `Initialize(options JSON string)` action, then `_postToDOM("initialize")`,
then `PN.init`. Callbacks come back through `PostToRuntime`, and the instance stores the
payload, dispatches a script `C3.Event`, and `_trigger`s the matching condition.
`sample/files/push_init.json` shows a typical options object.

### Adding or changing an ACE touches several files in lockstep

- `src/aces.json`: the ACE definition (id, scriptName, params).
- `src/lang/en-US.json`: display strings under `plugins.genvidtech_pushnotification`.
- `src/c3runtime/{actions,conditions,expressions}.ts`: the implementation, keyed by
  `scriptName` / `expressionName`.
- `src/addon.json` `file-list`: must list every shipped file, so add new runtime modules here.
- `DOM_COMPONENT_ID` must match in both `instance.ts` and `domSide.ts`.

### Do not change

- The plugin ID `Genvidtech_PushNotification`, in `plugin.ts`, `addon.json`, the
  `C3.Plugins.*` keys and `DOM_COMPONENT_ID`. Changing it breaks every existing project
  that uses the addon.
- `verbatimModuleSyntax` and the ES2021 target in `src/tsconfig.json`. Both are
  Construct requirements: Closure Compiler and `importsForEvents.js`.

## Repo layout notes

- `SDK/` is a git submodule (Scirra/Construct-Addon-SDK). The JSON files' `$schema`
  references resolve into it, so run `git submodule update --init` on a fresh clone.
- `src/ts-defs/` holds Construct's vendored type definitions. Don't edit them by hand;
  refresh them from Construct when the SDK is updated.
- `sample/` is a Construct 3 test project (folder format) that uses the addon.
  `.gvt-agent.json` points the gvt-construct3 tooling at it (`paths.c3project`).
  `c3-domain-manager` regenerates `sample/extracted/domain-index/` from
  `sample/domain-config.json` when its MCP server starts, so commit that folder
  after changing the config.
- `dist/`, `build/` and `*.c3addon` are gitignored build outputs.
- Bump `version` in `src/addon.json` when releasing a new `.c3addon`.
- The repo lives at `github.com/GenvidTechnologies/c3addon-genvid-push-notification`.
  That URL is also the `website`/`documentation` in `addon.json` and the lang
  `help-url`, so keep them in sync if it moves again.

## Commit Format

`BUR-<n>: <subject>`, where `BUR-<n>` is the Jira key. Use `BUR-0000` when there is no
ticket. Example: `BUR-5481: Handled string as error on error`.

## Branching

Branch from `main`. Name ticket branches `BUR-<n>-<slug>` (for example
`BUR-5481-fixed-android-error-on-denied`) and non-ticket work `chore-<slug>` (for
example `chore-claude-conventions`).

## Pull Request Format

PRs are opened on GitHub against `main` and squash-merged. The PR title becomes the
squash commit subject, so it follows the commit format (`BUR-<n>: <subject>`), and
GitHub appends ` (#N)`.
