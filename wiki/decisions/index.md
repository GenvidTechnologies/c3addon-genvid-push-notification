# Decision Records

Architecture and trade-off decisions for this addon repo, one record per decision.

## Records

<!-- One entry per decision record:
     `* [<Title>](NNNN-slug.md) - <description>`
     Title WITHOUT the ADR number — renumbering can rewrite file names but
     never rewrites link text. Description matches the record's frontmatter
     `description`, so the index and the record can't drift.
     If this index already carries entries in a different shape, mirror the
     existing shape instead of this one. -->

* [The LLM-wiki replaces docs/ as the only documentation home](0001-wiki-replaces-docs.md) - docs/ is deleted; wiki/index.md is the docs index and wiki/decisions/ holds ADRs, via paths overrides in .gvt-agent.json.
