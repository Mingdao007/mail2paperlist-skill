---
name: mail2paperlist
description: "Use when the user wants to turn academic email alerts, Google Scholar alerts, or webmail paper leads into a source-checked paper list or filterable reading board with relevance, topics, summaries, checkpointing, and privacy-safe read-only mailbox handling."
---

# Mail2PaperList

## Purpose

Use when the user wants to turn academic email alerts, Google Scholar alerts, or webmail paper leads into a source-checked paper list or filterable reading board with relevance, topics, summaries, checkpointing, and privacy-safe read-only mailbox handling.

Keep this `SKILL.md` as a concise routing and execution entrypoint. Do not load
long examples, command catalogs, detailed checklists, or edge-case policy until
the current task needs them.

## Workflow

1. Confirm the user request matches this skill's frontmatter description.
2. Bind the concrete target: source file, artifact, repo, device, document,
   dataset, or user-facing deliverable.
3. Use the smallest relevant workflow from this entrypoint first.
4. Before reading mailbox sources, creating run artifacts, opening unread
   messages, downloading attachments, or reporting the board ready, read
   `references/entrypoint-details.md`.
5. Preserve local owner boundaries: route to a narrower skill or repo-specific
   workflow when the detailed reference indicates a more specific owner.

## Mailbox Side-Effect Gate

Default to read-only mailbox handling. Do not delete, archive, report,
unsubscribe, reply, forward, send, download attachments, or open unread messages
unless the user explicitly requests that side effect for a specific item.

## Detailed Reference

Read `references/entrypoint-details.md` for:

- Overview
- Trigger Conditions
- Privacy And Side-Effect Boundary
- Workflow
- Artifact Guidance
- Validation Checklist
- Recovery

## Validation

- Use the skill-specific validation or acceptance checks from the detailed
  reference before declaring completion.
- When editing this skill, run `quick_validate.py` on the skill directory and
  verify all referenced files still exist.
