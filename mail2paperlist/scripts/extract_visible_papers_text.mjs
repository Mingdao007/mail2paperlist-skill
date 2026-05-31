#!/usr/bin/env node
import fs from 'node:fs/promises';

function usage() {
  console.error('Usage: node extract_visible_papers_text.mjs <board.html|papers.json> [output.md]');
  process.exit(2);
}

const input = process.argv[2];
const output = process.argv[3] || '';
if (!input) usage();

function parsePapers(raw, sourcePath) {
  const trimmed = raw.trim();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) return parsed;
    if (Array.isArray(parsed.papers)) return parsed.papers;
  }
  const match = raw.match(/const\s+PAPERS\s*=\s*(.*?);\s*\n/s);
  if (!match) throw new Error(`Could not find a PAPERS array in ${sourcePath}`);
  return JSON.parse(match[1]);
}

function text(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function paperTitle(paper) {
  return text(paper.title_zh || paper.title_en || paper.title || 'Untitled paper');
}

function paperTopics(paper) {
  return [paper.topic_primary, ...(Array.isArray(paper.topic_secondary) ? paper.topic_secondary : [])]
    .filter(Boolean)
    .map(text)
    .join(', ');
}

function summaryItems(paper) {
  const raw = paper.summary_zh_3_sentences ?? paper.summary_zh ?? paper.summary ?? [];
  if (Array.isArray(raw)) return raw;
  const summary = text(raw);
  if (!summary) return [];
  return summary.match(/[^。！？!?]+[。！？!?]?/gu) || [summary];
}

function visibleLines(papers) {
  const lines = ['# Mail2PaperList Visible Board Text'];
  for (const paper of papers) {
    lines.push('');
    lines.push(`## ${paperTitle(paper)}`);
    if (paper.title_en || paper.title) lines.push(text(paper.title_en || paper.title));
    if (paper.relevance) lines.push(`Relevance: ${text(paper.relevance)}`);
    const topics = paperTopics(paper);
    if (topics) lines.push(`Topic: ${topics}`);
    if (paper.alert_display || paper.alert) lines.push(`Alert: ${text(paper.alert_display || paper.alert)}`);
    if (paper.source_status || paper.source_host) {
      lines.push(`Source: ${text([paper.source_status, paper.source_host].filter(Boolean).join(' '))}`);
    }
    if (paper.source_authors || paper.authors || paper.meta) {
      lines.push(`Authors: ${text(paper.source_authors || paper.authors || paper.meta)}`);
    }
    for (const summaryLine of summaryItems(paper)) {
      const line = text(summaryLine);
      if (line) lines.push(`- ${line}`);
    }
  }
  return lines.join('\n');
}

const raw = await fs.readFile(input, 'utf8');
const papers = parsePapers(raw, input);
const result = visibleLines(papers);

if (output) {
  await fs.writeFile(output, result, 'utf8');
} else {
  process.stdout.write(result);
  process.stdout.write('\n');
}
