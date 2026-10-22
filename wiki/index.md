---
okf_version: "0.2"
---

<!-- `okf_version` is the ONLY frontmatter key permitted here (§8/§12) — this
     file scaffolds the bundle-root index (`wiki/index.md`, the OKF
     bundle root per ADR-0022). A `wiki/<subdir>/index.md` carries NO
     frontmatter at all. -->

# Wiki Index

This is the wiki's table of contents — every page under `wiki/`,
grouped under section headings, one line each. `/gvt-dev:maintain-wiki`
keeps this list current: a new page is added here when it's created, and
`lint` flags any page listed in **no** index — here, or in a
subdirectory's own `index.md`. Each entry's description is the linked
page's frontmatter `description`, so the index and the page can't drift.
See `wiki/schema.md` for the page format and maintenance rules.

## Decision Records

* [Decision Records](decisions/index.md) - Architecture and trade-off decisions for this addon repo, one record per decision.

## Schema

* [Wiki Maintenance Schema](schema.md) - The maintenance rules for this wiki — page format, create-vs-update lifecycle, raw/ immutability, staleness policy and the verb contract.
