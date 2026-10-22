---
type: decision-record
title: 'The LLM-wiki replaces docs/ as the only documentation home'
description: 'docs/ is deleted; wiki/index.md is the docs index and wiki/decisions/ holds ADRs, via paths overrides in .gvt-agent.json.'
tags: [decisions]
status: stable
---

# 0001. The LLM-wiki replaces docs/ as the only documentation home

- **Status:** accepted
- **Date:** 2026-10-21
- **Issue:** None (adopted in PR #2 of GenvidTechnologies/c3addon-genvid-push-notification)

## Context

This is a small Construct 3 plugin addon repo. It wraps a Cordova push plugin; the code is under `src/`, plus a `sample/` C3 project. It adopted the gvt-dev Claude Code plugin's convention contract, which requires a docs index at `docs/TOC.md`, and some skills default to `docs/decisions/` for ADRs. The repo was also set up with an LLM-wiki (`wiki/` for pages, index, log and schema; `raw/` for immutable source captures; maintained by `/gvt-dev:maintain-wiki`). Having both a `docs/` tree and a wiki splits knowledge across two homes, and the repo is too small to justify both. The maintainer asked to remove `docs/` entirely.

## Decision

`docs/` is deleted. In `.gvt-agent.json`, `paths["docs/TOC.md"]` is `wiki/index.md` and `paths["docs/decisions/"]` is `wiki/decisions/`. The bundle-root wiki index doubles as the project docs index, and ADRs live in the wiki as OKF pages with frontmatter. `CLAUDE.md` states there is no `docs/` directory. Durable knowledge goes in through `/gvt-dev:maintain-wiki ingest`.

## Compromise

Alternatives rejected:

- Keep the scaffolded `docs/TOC.md`, linking out to the wiki.
- Keep `docs/` for decisions only.

Both keep a second home for docs with near-empty content. Links from wiki pages to `docs/` would also leave the OKF bundle: legal, but unresolvable for an external consumer of the bundle.

Accepted trade-off: some gvt-dev skill and agent bodies still name `docs/TOC.md` in prose and ignore the `paths` override. These are tracked upstream as GenvidTechnologies/claude-code-plugin-gvt-dev issues #374, #388 and #420 (run-retro).

## Consequences

- Easier: one place to look. `audit-conventions` stays green (36/36 required). Its orphan and link checks hand `wiki/` over to `/gvt-dev:maintain-wiki lint`, which is reported as info.
- Harder: until the upstream issues are fixed, a skill that reads `docs/TOC.md` literally finds nothing and may fall back to globbing `docs/**` or offer to recreate `docs/`. Decline that, and point it at `wiki/index.md`.
- ADRs written into the wiki by `create-adr`/`plan-task` need the wiki index bookkeeping checked by hand (upstream #473).
- Watch for a stray `docs/` directory reappearing. That is the sign a component ignored the override.
