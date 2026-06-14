# Mail2PaperList SOP

This SOP describes a privacy-safe, checkpointed workflow for turning academic
mail alerts into a paper-screening board.

## 1. Start With Boundaries

Record the user-visible goal:

- mailbox or alert source
- folder, search query, or export file
- date or row boundary
- whether opening unread messages is allowed
- output location
- required final formats

Bind a user-provided local private run root before creating a run. Under that
root, use this relative layout unless the user specifies a different structure:

```text
Mail2PaperList/runs/<run-id>/
```

Inside a run, use `boards/`, `data/`, `scripts/`, `qa/`, and `backups/`.
If the run lives in the Obsidian vault, keep `runs/` ignored by git and track
only a lightweight index note.

Default side effects:

- read pages and visible message content
- write local checkpoints and reports
- do not mutate mailbox state except unavoidable read-state changes explicitly
  accepted by the user

## 2. Dry Run

Process 3-5 messages and confirm extraction quality before scaling up.

Check:

- sender or alert owner
- date
- subject
- title extraction
- author/venue metadata
- abstract/snippet
- source links
- return navigation
- pagination, scrolling, or lazy-loading behavior

If the dry run cannot reliably identify paper leads, stop and inspect the page
structure or source export format.

## 3. Batch Extraction

Process in batches of 25-50 messages when browser automation is stable.

For each message:

- assign a stable message index
- capture read/unread state if visible
- capture alert owner or sender
- capture date without unnecessary time detail unless needed
- extract all visible paper candidates
- keep the raw snippet short
- record attachments by filename only
- do not download PDFs or attachments by default

Write a checkpoint after each batch.

## 4. Academic Filtering

Exclude non-academic mail such as:

- tickets, invoices, orders, account notices
- train or travel notices
- generic subscription messages without paper leads
- calendar reminders unrelated to academic papers

When uncertain, keep the record with `unclear` and a note rather than
misclassifying it as a paper.

## 5. Source Verification

Normalize source URLs:

- arXiv PDF to arXiv abs
- OpenReview PDF to forum when possible
- DOI or publisher landing page as formal source
- project page as secondary source
- alert URL only as fallback

Status values:

- `confirmed`: source page exists and title/content match
- `source fallback`: source exists but metadata or abstract is incomplete,
  blocked, or inferred from email
- `unresolved`: no trustworthy source was confirmed

Do not claim an arXiv source unless a real arXiv ID is confirmed.

## 6. Optional Multi-Source Corroboration

Run this step when the user asks for stronger source verification, better
dedupe, or coverage beyond the original alert emails.

Recommended lookup order:

1. arXiv ID or DOI already visible in the alert.
2. Exact title lookup in arXiv, Crossref, OpenAlex, Semantic Scholar, DBLP, or
   publisher metadata.
3. Author/year/title fuzzy match only when exact identifiers are absent.
4. Unpaywall or publisher links for open-access availability when the user
   asks for selected-paper deepening.

Dedupe key preference:

- DOI
- arXiv ID
- OpenReview forum ID or publisher stable ID
- normalized title with year as a tie-breaker

Record corroboration separately from user relevance:

- `source_confidence`: source metadata confidence, not paper importance
- `source_corroboration`: `single_source`, `multi_source`, `conflict`, or
  `unresolved`
- `corroboration_count`: independent trusted sources that agree
- `source_candidates`: the candidates considered and why the winner was chosen

If sources conflict, keep the paper, show the conflict, and avoid silently
choosing the most convenient link.

## 7. Enrichment

Each paper record should include:

- `title_en`
- optional translated title
- authors
- venue or source metadata
- source URL and source host
- source status
- optional source confidence and corroboration fields
- relevance
- primary topic and secondary topics
- summary
- alert owner
- checkpoint provenance

Summaries should be concrete and evidence-based. Prefer fewer sentences over
padding. For high-priority papers, allow more detail only when the source
abstract supports it.

## 8. Recent-Window Supplements

Use this only when the user asks whether the mailbox missed recent papers.

- Build search queries from selected topics, alert owners, high-relevance
  titles, or user-provided keywords.
- Default to a bounded recent window such as 30 days.
- Search public metadata sources before broad web search.
- Dedupe against the mail-derived corpus before adding anything.
- Mark added papers as `external supplement`, not as mailbox records.

## 9. Selected-Paper Deepening

Use this only after screening has produced selected or high-priority papers.

Allowed selected-paper actions with explicit user intent:

- open-access PDF or landing-page resolution
- Zotero-compatible metadata export
- short evidence chunks from accessible abstracts or PDFs

Still avoid by default:

- downloading PDFs for every paper
- full-text ingestion for low-interest records
- Sci-Hub, LibGen, credentialed publisher scraping, or browser-profile access

## 10. Board UX

For dense paper screening, the board should prioritize:

- search
- relevance filter
- source-status filter
- source-host filter
- source-confidence filter when corroboration was run
- alert-owner filter
- arXiv filter
- date and relevance sorting
- compact mode
- row folding for low-interest papers

Folded rows should preserve enough context to decide whether to reopen:

- row number
- title
- primary topic
- relevance
- alert owner

## 11. Final Audit

Before handoff:

- verify paper count
- verify no private non-paper mail leaked in
- verify HTML opens
- verify filters and fold interactions
- grep for known filler phrases
- run an AI-smell gate on visible text when requested
- sample-check source links and high-relevance summaries
- if corroboration was run, sample-check conflicts and high-confidence claims

For public packages or shared artifacts, run a privacy check for:

- cookies
- local browser state
- private mailbox content
- raw email exports
- user-specific output paths
- generated private paper boards

## 12. Resume Rules

If interrupted:

- keep checkpoints immutable when possible
- resume from paper key or message index
- never assume completed records are correct without re-running final checks
- regenerate the final board from enriched data rather than editing HTML by
  hand
