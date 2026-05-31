---
name: mail2paperlist
description: "Use when the user wants to turn academic email alerts, Google Scholar alerts, or webmail paper leads into a source-checked paper list or filterable reading board with relevance, topics, summaries, checkpointing, and privacy-safe read-only mailbox handling."
---

# Mail2PaperList

## Overview

Mail2PaperList turns academic alert email into a paper-screening board.

Use it for long mailbox or alert-triage tasks where the desired output is a
structured paper corpus, not an email reply.

Default outputs:

1. checkpointed extraction records
2. normalized paper records
3. source verification status
4. relevance and topic labels
5. concise paper summaries
6. filterable HTML or Markdown board
7. final audit notes

## Trigger Conditions

Use this skill when the user asks to:

- triage academic webmail into papers
- process Google Scholar alerts
- turn paper alert emails into a reading list
- build a filterable HTML board from email paper leads
- enrich email paper leads with source links, topics, summaries, or relevance
- confirm paper sources across arXiv, DOI, OpenAlex, Semantic Scholar, DBLP, or similar public metadata sources
- deduplicate alert papers by DOI, arXiv ID, or normalized title
- supplement a mail-derived board with recent-window paper discovery when the user explicitly asks
- deepen only selected papers with OA PDF lookup, Zotero export, or evidence chunks
- resume a previous mailbox-to-paper-board checkpoint

Do not use this skill for:

- drafting email replies
- ordinary inbox cleanup
- unsubscribe, delete, archive, or report-spam tasks
- single-paper explanation only
- Zotero library maintenance only
- broad autonomous literature review reports without an email or alert-derived paper corpus
- PDF downloading or full-text ingestion as the default task

## Privacy And Side-Effect Boundary

Default to read-only mailbox handling.

- Do not read cookies, local storage, passwords, or browser profile files.
- Use the logged-in browser page or an explicit user-provided export.
- Do not delete, archive, report, unsubscribe, reply, forward, send, download
  attachments, or reorganize mail unless the user explicitly asks.
- Opening unread messages may mark them read only when the user clearly permits
  it for the triage run.
- Stop on login expiry, CAPTCHA, dangerous buttons, unexpected dialogs, or
  two-factor confirmation.
- Keep generated outputs outside the public skill package.

## Workflow

### 1. Lock The Input And Side Effects

Confirm or infer:

- mailbox or export source
- target folder or query
- date/window boundary
- whether opening unread messages is allowed
- output formats
- whether source links should be opened for verification

Create a timestamped output prefix before collecting data.

### 2. Run A Small Dry Run

Process 3-5 messages first.

Verify:

- list row extraction
- unread/read marker
- sender, date, subject
- message body extraction
- return-to-list behavior
- pagination or lazy-scroll behavior

Only then continue in batches.

### 3. Extract Paper Leads

For each message, record:

- message index and date
- read/unread status when visible
- alert source or sender
- subject or alert owner
- visible title candidates
- authors and venue metadata when visible
- abstract or snippet
- source URL candidates
- attachment names without downloading by default
- action notes and unresolved issues

Use checkpoint files after every batch.

### 4. Normalize And Verify Sources

Prefer formal or trusted paper sources:

- arXiv abs page over arXiv PDF
- OpenReview forum page over PDF when stable
- publisher DOI or landing page when available
- project page only when it is the best visible source
- email alert link only as a fallback, not as final source

Mark each source:

- `confirmed`
- `source fallback`
- `unresolved`

Do not invent source details behind paywalls or blocked pages.

### 5. Optionally Corroborate Across Sources

Use this stage only when the user asks for stronger source confidence, dedupe,
recent coverage, or selected-paper deepening.

Recommended source roles:

- arXiv: preprint identity and abstract
- DOI/Crossref: publisher identity and DOI metadata
- OpenAlex: work-level metadata, concepts, venue, and citation signals
- Semantic Scholar: abstracts, citation data, and related work signals
- DBLP: CS venue and author disambiguation when available
- Unpaywall: open-access landing page or PDF availability

Add these optional fields when corroboration is performed:

- `dedupe_key`: DOI first, then arXiv ID, then normalized title
- `source_candidates`: source, ID, title, authors, year, URL, and confidence note
- `source_corroboration`: `single_source`, `multi_source`, `conflict`, or `unresolved`
- `corroboration_count`: count of independent trusted matches
- `source_confidence`: `high`, `medium`, or `low`

Keep `source_confidence` separate from paper `relevance`. A paper can have a
reliable source and still be low relevance for the user.

If multiple sources disagree on title, authors, year, DOI, or arXiv ID, keep the
paper but mark `source_corroboration: conflict` and surface the mismatch.

### 6. Summarize Without Filler

For each paper, write concise Chinese or user-requested-language summaries.

Rules:

- preserve the original English paper title
- do not force a fixed number of sentences
- high-relevance items may have more detail, but only when source evidence
  supports it
- every sentence must carry concrete paper information
- avoid process filler such as "based on the email snippet", "candidate to
  save", or "open the original paper to confirm"
- keep standard abbreviations such as RL, VLA, SLAM, MPC, CBF, LLM, DOI, and
  arXiv unchanged when they are the clearest terms

Run an AI-smell or redundancy gate on the visible final text when available.

### 7. Classify For Screening

Use stable, user-visible taxonomy labels.

Recommended robotics-oriented default labels:

- force/contact
- manipulation
- navigation/SLAM
- multi-agent
- locomotion
- control/safety
- RL/policy
- VLA/LLM
- planning/optimization
- perception/sensing
- simulation/benchmark
- soft robotics
- science/medical
- other

Assign one primary topic and up to two secondary topics. Relevance should be
explicit and user-adjustable.

### 8. Build The Board

The board should support:

- search over title, author, summary, and source
- filters for relevance, source status, source host, alert, and arXiv
- optional filters for source confidence and corroboration count
- sorting by date and relevance
- compact/folded rows for low-interest papers
- source links and source status
- full authors when available
- checkpoint/resume provenance

Do not add a marketing landing page. Open directly into the usable board.

### 9. Optional Recent-Window Supplement

Use recent-window discovery only when the user asks to catch papers that did
not arrive by email.

- Search recent papers by selected topics, alert owner names, keywords, or seed
  titles from the board.
- Default to a bounded window such as the last 30 days unless the user gives a
  different range.
- Dedupe against the mail-derived corpus before adding candidates.
- Mark added papers as external supplement records so they do not appear to
  have come from the mailbox.

### 10. Optional Selected-Paper Deepening

Only after the user has selected or prioritized papers:

- resolve open-access PDF or landing page when useful
- export selected paper metadata to Zotero-compatible formats if requested
- extract short evidence chunks from accessible abstracts or PDFs

Do not download PDFs, sync Zotero, or ingest full text by default.

## Artifact Guidance

Recommended private run artifacts:

- `*.checkpoint.jsonl` for batch progress
- `*.enriched.json` for normalized paper records
- `*.md` for summary notes
- `*.html` for the board
- optional `visible-text.md` for final text audit

Public packages must not include user-specific run artifacts.

## Validation Checklist

Before reporting completion:

- paper count matches the intended corpus
- no non-academic mail is mixed in
- source status statistics are visible
- all records have title, source status, topic, relevance, and summary
- source confidence is present when multi-source corroboration was requested
- unread/read side effects match the user's permission
- HTML opens locally without network dependencies when possible
- search, filters, sorting, and folding still work
- final visible text passes the requested AI-smell gate
- public or shared outputs contain no private mailbox data

## Recovery

If a long run is interrupted:

1. Find the latest checkpoint.
2. Count completed and pending records.
3. Resume from the first unprocessed message or paper key.
4. Re-run final validation after rebuilding the board.

If source verification is blocked, keep the paper with `source fallback` or
`unresolved` rather than dropping it silently.
