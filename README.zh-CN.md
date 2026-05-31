# Mail2PaperList Skill

把 academic email alerts、Google Scholar alerts、webmail 里的论文线索整理成可筛选 paper board 的通用 workflow skill。

## 适用场景

| 适合用它 | 不适合用它 |
| --- | --- |
| 把学术邮件提醒整理成 reading board | 只需要写邮件回复 |
| 需要论文源链接、relevance、topic 和摘要 | 只解释单篇论文 |
| 需要可恢复的 webmail triage 流程 | 要删除、退订或清理邮箱 |

## 为什么需要

- 学术提醒邮件噪声很大，但里面有有价值的 paper leads。
- 长时间邮箱遍历需要 checkpoint，避免中断后丢进度。
- source verification 和 AI-smell gate 可以避免摘要变成空话。

## 包含内容

| 组件 | 作用 |
| --- | --- |
| [`mail2paperlist`](./mail2paperlist) | 可安装的 Codex App skill package |
| [`mail2paperlist/references/sop.md`](./mail2paperlist/references/sop.md) | 从邮箱 triage 到 paper board 的通用 SOP |
| [`mail2paperlist/scripts/extract_visible_papers_text.mjs`](./mail2paperlist/scripts/extract_visible_papers_text.mjs) | 从 HTML board 抽取可见文本，便于 review 或 AI-smell 检查 |
| [`mail2paperlist/test-prompts.json`](./mail2paperlist/test-prompts.json) | trigger / non-trigger examples |

## 安装

Codex App 安装目标：

- repo: `Mingdao007/mail2paperlist-skill`
- path: `mail2paperlist`

安装后重启 Codex App，让新 skill 被发现。

## 隐私边界

这个 public repo 只保留通用 workflow。

- 不包含私人邮箱数据、cookies、浏览器 profile、生成的 paper board、JSON/HTML 输出或用户本地路径。
- 默认只读 webmail；不删除、不归档、不回复、不转发、不下载附件、不退订。
- 任何会改变邮箱状态的操作都需要用户明确授权。
- 多源搜索、PDF lookup、Zotero export、最近 N 天补搜都是可选扩展，不是默认副作用。
- 私人运行产物建议放在本地 Obsidian 专用 run 目录，并让 `runs/` 保持 git ignored。

## 参考项目

这些项目只作为 workflow inspiration；本 repo 不复制它们的代码，也不绑定它们的依赖。

| 项目 | 值得吸收的点 |
| --- | --- |
| [`scholar-megasearch`](https://github.com/TaewoooPark/scholar-megasearch) | 多源 fan-out、dedupe、corroboration ranking |
| [`paper-search-mcp`](https://github.com/openags/paper-search-mcp) | Crossref、OpenAlex、Semantic Scholar、Unpaywall 等 source roles |
| [`paper-pilot`](https://github.com/aytzey/paper-pilot) | selected papers 的 OA lookup、evidence chunks、Zotero-adjacent workflow |
| [`research30`](https://github.com/shandley/research30) | 最近窗口补搜 |
| [`Academix`](https://github.com/xingyulu23/Academix) 和 [`PyAlex`](https://github.com/J535D165/pyalex) | OpenAlex metadata / citation workflow |
| [`ai-research-radar`](https://github.com/mlnjsh/ai-research-radar) | 定时 radar-style 更新 |
| [`arxiv-zotero-connector`](https://github.com/StepanKropachev/arxiv-zotero-connector) | 窄范围 arXiv-to-Zotero transfer 边界 |

## 验证目标

- `mail2paperlist/SKILL.md` 存在且可通过 skill validator。
- `test-prompts.json` 覆盖触发和非触发边界。
- repo 中不含私人数据或具体用户输出文件。
- registry 中登记为 L2 local-index skill，不进入 L1 default prompt。
