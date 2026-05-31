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

## 6. Enrichment

Each paper record should include:

- `title_en`
- optional translated title
- authors
- venue or source metadata
- source URL and source host
- source status
- relevance
- primary topic and secondary topics
- summary
- alert owner
- checkpoint provenance

Summaries should be concrete and evidence-based. Prefer fewer sentences over
padding. For high-priority papers, allow more detail only when the source
abstract supports it.

## 7. Board UX

For dense paper screening, the board should prioritize:

- search
- relevance filter
- source-status filter
- source-host filter
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

## 8. Final Audit

Before handoff:

- verify paper count
- verify no private non-paper mail leaked in
- verify HTML opens
- verify filters and fold interactions
- grep for known filler phrases
- run an AI-smell gate on visible text when requested
- sample-check source links and high-relevance summaries

For public packages or shared artifacts, run a privacy check for:

- cookies
- local browser state
- private mailbox content
- raw email exports
- user-specific output paths
- generated private paper boards

## 9. Resume Rules

If interrupted:

- keep checkpoints immutable when possible
- resume from paper key or message index
- never assume completed records are correct without re-running final checks
- regenerate the final board from enriched data rather than editing HTML by
  hand
