# Plan: Make `learn-pai` AI-Friendly

**Status:** Ready for implementation
**Author:** Jay + Claude (planning session, 2026-04-14)
**Estimated total:** ~4 days, 7 stages, independently shippable

---

## Why this plan exists

The motivating scenario: a user asks their AI agent *"How do I save git changes without committing?"*. The agent has consumed our site's AI surfaces, routes the query to the Stashing page, synthesises a short answer, and **cites an absolute URL the user can click**. That citation round-trip — AI guide points user back to us — is the acceptance test for every artifact we emit.

### Primary use cases

**UC1 — Cite-and-link (motivating case).**
User asks AI a question. AI has ingested `llms.txt`, routes via topic map, fetches the sidecar `.md`, answers, cites absolute URL.
*Preferred artifacts:* `llms.txt` + per-page `.md`

**UC2 — Bootstrap-my-PAI.**
User's agent helps install/configure PAI. Fetches `llms-agents.txt` (operational, no motivational framing) and follows the sequence.
*Preferred artifact:* `llms-agents.txt`

**UC3 — Knowledge sync.**
Agent proactively ingests the corpus once to serve many future questions.
*Preferred artifact:* `llms-full.txt`

Across all three: the AI must be able to (a) answer accurately AND (b) give the user an absolute, clickable URL.

---

## Decisions locked in

| # | Decision | Choice |
|---|---|---|
| 1 | Sidecar URL shape | **Both** — emit `/foo.md` and `/foo/index.md` |
| 2 | "skills.md" scope | **Markdown-sidecar pattern** only |
| 3 | Interactive chrome (quiz, pickers) | **Strip** — not in sidecars or llms-full |
| 4 | Stream variants | **Build all four now** — developer / vibe-coder / pai-learner / agents |
| 5 | Licence footer | `---\nBy Jay · MIT License · 2026-04 · {canonical URL}` |

---

## AI-consumer requirements

| ID | Requirement | Why it matters |
|---|---|---|
| R1 | Absolute canonical URL visible near the **top** of every sidecar (not only footer) | AI scanning for "which page to recommend" sees the URL immediately |
| R2 | Every internal link in extracted content rewritten from `{base}/x` → absolute `https://.../x` | When AI quotes a chunk to the user, links still work |
| R3 | "Related pages" block at the bottom of every sidecar (prereqs, next, siblings — absolute URLs) | Gives AI a navigation graph |
| R4 | Topic map section in `llms.txt` — keyword → URL lookup | Routes "git stash" → Stashing page without loading full content |
| R5 | `llms-full.txt` uses absolute URLs as section anchors — every page's block begins with its URL | Citation survives chunking |
| R6 | Per-page JSON-LD carries the canonical URL | HTML-consuming crawlers get URL too |
| R7 | `llms-index.json` — structured metadata (title, URL, description, tags, stream) for agents that prefer structured input | Machine-readable routing index |

---

## Maintenance strategy — four-layer defence

Principle: **you can't forget to maintain something if the system refuses to build when it's broken.**

1. **Automatic regeneration** — everything emitted from source on every build; drift is structurally impossible.
2. **Build-time invariant checks** — fail with teaching error messages (I1–I11 below).
3. **CI validation suite** — every PR runs extraction + asserts every invariant.
4. **One canonical doc + minimal breadcrumbs** — `docs/AI_EXTRACTION.md` holds the real knowledge; three 2-line pointer comments in hot spots route people to it.

### Invariants

| ID | Invariant | Enforcement |
|---|---|---|
| I1 | Every module ↔ route | build-time |
| I2 | Every content page has both `.md` twin shapes | post-build |
| I3 | Every component used in content has a mapper | build-time |
| I4 | Every `.md` has H1, URL block, body, and licence footer | CI |
| I5 | `llms.txt` conforms to Answer.ai spec | CI |
| I6 | Extraction is idempotent | CI |
| I7 | Internal links resolve | CI |
| I8 | `robots.txt` references sitemap + llms.txt | unit |
| I9 | Every sidecar prominently shows its canonical URL near the top | CI |
| I10 | No relative URLs in any generated file (`.md` or `.txt`) | CI |
| I11 | Every sidecar has a non-empty "Related pages" block | CI |

---

## Architecture

```
Source of truth                    Generator                      Emitted artifacts
─────────────────                  ──────────                     ─────────────────
src/lib/state.svelte.ts        ─┐                            ┌─ build/llms.txt
  (+ new: tags? field)          │                            ├─ build/llms-full.txt
src/routes/**/+page.svelte     ─┼─→ scripts/ai-extract/  ──→ ├─ build/llms-developer.txt
src/lib/components/*           ─┘                            ├─ build/llms-vibe-coder.txt
                                                             ├─ build/llms-pai-learner.txt
                                                             ├─ build/llms-agents.txt
                                                             ├─ build/llms-index.json
                                                             ├─ build/**/llms.txt       (7 section files)
                                                             ├─ build/**/page.md        (45 sidecars)
                                                             ├─ build/**/page/index.md  (45 sidecars)
                                                             ├─ build/sitemap.xml
                                                             └─ build/robots.txt (updated)

scripts/ai-extract/
  config.ts       — SITE_URL, LICENCE_FOOTER, canonicalUrlFor(module), stream filters, skip lists
  mappers.ts      — component → markdown rules
  extract.ts      — HTML → markdown with link rewriting
  emit-*.ts       — one emitter per artifact
  validate.ts     — invariant checks
  __tests__/      — CI suite
```

---

## Component → markdown mapper registry

| Component | Markdown output | Notes |
|---|---|---|
| `<Terminal command output title />` | ` ```bash\n# {title}\n$ {command}\n{output}\n``` ` | language tag `bash` |
| `<Callout type="info\|tip\|warning">` | `> **Note\|Tip\|Heads up:** {body}` | type → label map |
| `<AskYourAgent prompts={[...]} />` | `### Ask your agent\n- "{p1}"\n- "{p2}"` | preserve ordering |
| `<ClaudePrompt>` | ` ```prompt\n{body}\n``` ` | custom language tag |
| `<CopyableCommand>` / `<CopyableLine>` | inline `` `{cmd}` `` | inline, not block |
| `<DiagramImage src alt caption />` | `![{alt}]({absolute-src})\n\n*{caption}*` | resolve `{base}` → absolute |
| `<ImagePlaceholder description />` | *(omit)* | placeholder for unmade image |
| `<Accordion>` | `#### {title}\n\n{body}` | unfold all panels |
| `<GitRailwayBanner>` | *(omit)* | pure decoration |
| `<PathIndex>` | `- [{title}]({absolute-href}) — {description}` | derived from state |
| `<ModuleLayout>` / `<PathPageLayout>` | *(transparent — extract `<main>` inside)* | chrome wrapper |

Adding a new component without a mapper entry **fails the build** with a teaching error message (I3).

---

## Sidecar `.md` template

```markdown
# What is PAI?

> **Page:** https://jasonjjack.github.io/learn-pai/learn/foundation/what-is-pai
> **Path:** Foundation · **Reading time:** 5 min · **Tags:** pai, introduction, levels-of-ai

The three levels of AI evolution and where PAI fits in.

## AI has been evolving in stages

Most people interact with AI at **Level 1: the chatbot**. You type a question, it answers…

[…body, all internal links rewritten to absolute URLs…]

Learn more about how PAI stores your context in [Meet TELOS](https://jasonjjack.github.io/learn-pai/learn/know-me/telos-intro).

## Related pages

- **Before this:** [Prerequisites](https://jasonjjack.github.io/learn-pai/learn/foundation/prerequisites)
- **After this:** [Terminal Basics](https://jasonjjack.github.io/learn-pai/learn/foundation/terminal-basics)
- **See also:**
  - [PAI vs Plain Claude Code](https://jasonjjack.github.io/learn-pai/learn/foundation/pai-vs-claude)
  - [The 16 Principles](https://jasonjjack.github.io/learn-pai/learn/foundation/principles)

---
By Jay · MIT License · 2026-04 · https://jasonjjack.github.io/learn-pai/learn/foundation/what-is-pai
```

URL block near top satisfies I9, absolute links satisfy I10, Related pages satisfies I11.

---

## `llms.txt` master template

```markdown
# Learn PAI

> A guide to Personal AI Infrastructure — from terminal basics to building with
> AI agents. If you're an AI assistant reading this: each page below has a
> markdown sidecar at the same URL with `.md` appended. Cite the absolute URLs
> when recommending pages to users.

## Foundation
- [Introduction](https://jasonjjack.github.io/learn-pai/learn/foundation/introduction): Welcome and what to expect
- [What is PAI?](https://jasonjjack.github.io/learn-pai/learn/foundation/what-is-pai): The three levels of AI evolution
- …

## Learning paths
- [AI That Knows Me](https://jasonjjack.github.io/learn-pai/learn/know-me): Teach AI who you are — 6 modules
- [Get Things Done](https://jasonjjack.github.io/learn-pai/learn/get-things-done): Skills and workflows — 4 modules
- [Architecture](https://jasonjjack.github.io/learn-pai/learn/architecture): How PAI fits together — 4 modules
- [Git in Detail](https://jasonjjack.github.io/learn-pai/learn/git-in-detail): Everything Git — 15 modules

## Reference
- [Git reference](https://jasonjjack.github.io/learn-pai/git-reference): Command reference by task
- [Terminal reference](https://jasonjjack.github.io/learn-pai/terminal-reference): POSIX/zsh commands

## Topic map
*Keyword → page, for routing user questions. All URLs absolute.*

- `git`, `version control` → [Git Basics](https://…/learn/foundation/git-basics)
- `git stash`, `pause work`, `temporary storage` → [Stashing](https://…/learn/git-in-detail/stashing)
- `git rebase`, `replay commits` → [Rebasing](https://…/learn/git-in-detail/rebasing)
- `telos`, `goals`, `context files` → [Meet TELOS](https://…/learn/know-me/telos-intro)
- `installation`, `setup`, `bootstrap` → [Installing PAI](https://…/learn/foundation/installation)
- `the algorithm`, `observe think plan` → [The Algorithm](https://…/learn/architecture/algorithm)
- `skills`, `workflows` → [Skills Overview](https://…/learn/get-things-done/skills-overview)
- …

## Variants
- [llms-full.txt](https://…/llms-full.txt) — full corpus, single fetch
- [llms-developer.txt](https://…/llms-developer.txt) — developer stream
- [llms-vibe-coder.txt](https://…/llms-vibe-coder.txt) — vibe-coder journey
- [llms-pai-learner.txt](https://…/llms-pai-learner.txt) — PAI deep-dive
- [llms-agents.txt](https://…/llms-agents.txt) — for agents bootstrapping PAI
- [llms-index.json](https://…/llms-index.json) — structured metadata index

## Optional
- [Settings](https://…/settings) — interactive progress (HTML only, no sidecar)
- [Paths picker](https://…/paths) — interactive (HTML only, no sidecar)
```

The explicit AI-reader instruction in the blockquote is the nudge that makes UC1 robust.

---

## `llms-full.txt` section anchor format

Each page section starts with an absolute URL anchor so citation survives chunking:

```markdown
================================================================
URL:   https://jasonjjack.github.io/learn-pai/learn/foundation/what-is-pai
TITLE: What is PAI?
PATH:  Foundation
TAGS:  pai, introduction, levels-of-ai
================================================================

# What is PAI?

[full body from sidecar, minus URL block and licence footer]

================================================================
URL:   https://jasonjjack.github.io/learn-pai/learn/foundation/terminal-basics
TITLE: Terminal Basics
…
```

An AI chunking by `================` always knows the URL of its current chunk.

---

## `llms-index.json` shape

```json
{
  "site": {
    "name": "Learn PAI",
    "url": "https://jasonjjack.github.io/learn-pai",
    "licence": "MIT",
    "updated": "2026-04-14"
  },
  "pages": [
    {
      "id": "what-is-pai",
      "title": "What is PAI?",
      "description": "The three levels of AI evolution and where PAI fits in",
      "url": "https://jasonjjack.github.io/learn-pai/learn/foundation/what-is-pai",
      "markdownUrl": "https://jasonjjack.github.io/learn-pai/learn/foundation/what-is-pai.md",
      "path": "foundation",
      "streams": ["developer", "vibe-coder", "pai-learner"],
      "tags": ["pai", "introduction", "levels-of-ai"],
      "estimatedMinutes": 5,
      "prerequisites": ["prerequisites"],
      "order": 2
    }
  ]
}
```

---

## Stages

### Stage 1 — Foundation: validation + metadata + tags

**Goal:** Source-of-truth guarantees before anything is generated from it. Adds tag support.

**Create:**
- `scripts/ai-extract/config.ts` — `SITE_URL`, `BASE_PATH`, `LICENCE_FOOTER`, `canonicalUrlFor(slug)`, `CHROME_ONLY_COMPONENTS` skip list, stream filter predicates
- `scripts/ai-extract/validate.ts` — invariants I1 and I8
- `scripts/validate-content.ts` — CLI called by `npm run check`

**Modify:**
- `src/lib/state.svelte.ts` — add optional `tags?: string[]` to `Module` interface; auto-derive default tags from slug tokens if not explicitly set; add 2-line pointer comment at top
- `package.json` — extend `check` script
- `static/robots.txt` — add `Sitemap:` + `# LLMs:` lines

**Acceptance:** `npm run check` fails on any module↔route mismatch and passes after clean-up. Reference pages (`git-reference`, `terminal-reference`) are whitelisted as content in config.

**Known discrepancies to resolve:** modules array lists `git-in-detail/worktrees`, `/tags`, `/hooks`, `/pull-requests`, `/complete` which may not yet have routes. Decide per-page: add route or remove module entry.

**Time:** 2–3 hours

---

### Stage 2 — Sitemap + per-page `<head>` metadata

**Goal:** Every HTML page carries canonical URL, JSON-LD, Open Graph, and placeholder `<link rel="alternate" type="text/markdown">`.

**Create:**
- `src/lib/components/AIHead.svelte` — emits canonical, JSON-LD `LearningResource`, OG tags, alternate link; reads module from state by slug prop
- `scripts/ai-extract/emit-sitemap.ts` — `sitemap.xml` with git-derived `lastmod`

**Modify:**
- `src/lib/components/ModuleLayout.svelte`, `PathPageLayout.svelte`, `src/routes/+layout.svelte` — include `<AIHead>`
- `package.json` — add `postbuild` hook running sitemap emitter

**Acceptance:** every prerendered page has canonical + JSON-LD (Schema.org validator passes) + alternate link. `build/sitemap.xml` lists all content pages.

**Time:** 3 hours

---

### Stage 3 — llms.txt root + section indexes

**Goal:** Ship a real `llms.txt` + 7 section variants immediately. Metadata-only (no bodies yet) — already materially AI-discoverable.

**Create:**
- `scripts/ai-extract/emit-llms-index.ts` — emits master and section indexes per template, with AI-reader instruction blockquote, topic map, variants list
- `docs/AI_EXTRACTION.md` — first version documenting Stages 1–3 output and the remaining plan

**Modify:**
- `package.json` — `postbuild` also runs index emitter

**Outputs:**
```
build/llms.txt                                    master
build/learn/foundation/llms.txt                   section
build/learn/know-me/llms.txt                      section
build/learn/get-things-done/llms.txt              section
build/learn/architecture/llms.txt                 section
build/learn/git-in-detail/llms.txt                section
build/git-reference/llms.txt                      section
build/terminal-reference/llms.txt                 section
```

**Acceptance:** master validates against Answer.ai spec; topic map covers ≥80% of modules; all URLs absolute (I10); each section index uses same format scaled to its scope.

**Time:** 4 hours

---

### Stage 4 — Per-page markdown sidecars (the heavy stage)

**Goal:** Every content page gets two `.md` twins with URL header block, absolute-link-rewritten body, Related pages block, licence footer.

**Create:**
- `scripts/ai-extract/mappers.ts` — component → markdown registry (per table above)
- `scripts/ai-extract/extract.ts` — the core extractor:
  1. Walk `build/**/index.html` under content paths
  2. Parse with `linkedom`, locate content (`<main>` inside `ModuleLayout`/`PathPageLayout`)
  3. Apply mapper registry via `turndown` custom rules
  4. **Rewrite every internal link** — `{base}/x` or `/learn-pai/x` → `https://…/x` (R2)
  5. Resolve image URLs to absolute (in `<DiagramImage>` mapper)
  6. Prepend URL header block (R1)
  7. Append Related pages block (R3) — read prereqs/next/siblings from `state.svelte.ts`
  8. Append licence footer (R5)
  9. Emit to both `/foo.md` and `/foo/index.md`
- `scripts/ai-extract/assert-mapper-coverage.ts` — fails build if any component lacks a mapper (I3)

**Modify:**
- `src/lib/components/AIHead.svelte` — alternate link is now real
- `src/lib/components/index.ts` — 2-line pointer comment
- `scripts/ai-extract/mappers.ts` — 2-line pointer comment
- `docs/AI_EXTRACTION.md` — add "How to add a new component" section
- `package.json` — extend `postbuild`

**Acceptance:** every content page has both `.md` shapes; each passes I9 (URL block), I10 (no relative URLs), I11 (Related pages); adding a hypothetical `<Foo>` component without a mapper fails the build with the teaching message.

**Chrome-only pages** (in `CHROME_ONLY_COMPONENTS` skip list): `/`, `/paths`, `/settings` — no sidecars emitted.

**Time:** 1–2 days

---

### Stage 5 — llms-full.txt + four stream variants + llms-index.json

**Goal:** Corpus-level artifacts. Stream variants for UC2 and UC3.

**Create:**
- `scripts/ai-extract/emit-llms-full.ts` — concatenates sidecars using the `URL: / TITLE: / PATH: / TAGS:` separator format (R5)
- `scripts/ai-extract/emit-stream-variants.ts` — four filtered corpora
- `scripts/ai-extract/emit-llms-index-json.ts` — structured `llms-index.json` (R7)
- `scripts/ai-extract/agents-preamble.md` — hand-written operational preamble for `llms-agents.txt`

**Outputs:**
```
build/llms-full.txt
build/llms-developer.txt
build/llms-vibe-coder.txt
build/llms-pai-learner.txt
build/llms-agents.txt
build/llms-index.json
```

**`llms-agents.txt` distinctive structure:** hand-authored preamble (terse, operational, no motivational content), then operational-order index (Prereqs → Claude Code → Bun → PAI install → Principles → Skills), then selected page bodies with full URLs preserved.

**Acceptance:** `llms-full.txt` every section starts with `URL:` line; stream variants only include pages where `streams` includes that stream (or is empty); `llms-index.json` validates against a small JSON schema; sizes reasonable (full ~150–300KB).

**Time:** 4–5 hours

---

### Stage 6 — CI validation suite

**Goal:** All 11 invariants checked on every PR.

**Create:**
- `scripts/ai-extract/__tests__/structure.test.ts` — I4, I9, I11 (H1, URL block, Related pages, footer)
- `scripts/ai-extract/__tests__/urls.test.ts` — I10 (no relative URLs in any generated `.md` or `.txt`)
- `scripts/ai-extract/__tests__/llms-spec.test.ts` — I5 (Answer.ai spec conformance)
- `scripts/ai-extract/__tests__/idempotency.test.ts` — I6 (double-run diff empty)
- `scripts/ai-extract/__tests__/links.test.ts` — I7 (every internal link resolves)
- `.github/workflows/ai-validation.yml` — runs tests + build on PR

**Acceptance:** breaking any invariant blocks merge with a clear diagnostic. Docs explain each test's purpose and remediation.

**Time:** 3–4 hours

---

### Stage 7 — Documentation & onboarding polish

**Goal:** Anyone picking up the codebase can understand and extend the system in 15 minutes.

**Finalise `docs/AI_EXTRACTION.md`:**
- Overview + architecture diagram
- All emitted artifacts and use cases
- How to add a new content page (state.svelte.ts → route → rebuild)
- How to add a new component (mapper registry pattern + teaching error example)
- How to add/edit tags
- **"How an AI agent uses these files"** — UC1/UC2/UC3 walkthroughs with the concrete example below
- Debugging extraction failures
- FAQ

**Example AI interaction (proof of success, include in docs):**

```
User: "How do I save git changes without committing?"

AI (having consumed llms.txt topic map):
  Git's `stash` command is what you want. It saves your working changes to a
  stack you can pop back later, leaving your tree clean. Typical flow:
      git stash              # save changes, clean working tree
      git stash list         # see what you've stashed
      git stash pop          # restore the latest stash

  There's a thorough walkthrough including conflict handling here:
  → https://jasonjjack.github.io/learn-pai/learn/git-in-detail/stashing
```

**Modify:** `README.md` — one paragraph + link to `docs/AI_EXTRACTION.md`.

**Acceptance:** dev unfamiliar with the site can, using only `AI_EXTRACTION.md`, add a new component + mapper + page that correctly appears in `llms.txt`, has a sidecar, shows up in stream variants, and passes all CI checks.

**Time:** 2–3 hours

---

## Total estimate

| Stage | Time |
|---|---|
| 1 — Validation + metadata + tags | 2–3h |
| 2 — Sitemap + `<head>` | 3h |
| 3 — `llms.txt` indexes | 4h |
| 4 — Sidecars + extraction | 1–2 days |
| 5 — Full corpus + variants + JSON index | 4–5h |
| 6 — CI validation | 3–4h |
| 7 — Docs polish | 2–3h |
| **Total** | **~4 days** |

Every stage is independently shippable.

---

## Known risks

| Risk | Mitigation |
|---|---|
| `turndown` misrenders a complex component | Mapper registry + I3 enforcement — no silent failure |
| Internal link rewriting misses edge cases | Extractor works on rendered HTML where all hrefs are final strings; I7 + I10 catch misses |
| Base path differs dev vs prod | `config.ts` single source: `SITE_URL` + `BASE_PATH`; all emitters read from it |
| Future dev adds component without mapper | Build fails with teaching error (I3) |
| Future dev adds page without state.svelte.ts entry | Build fails (I1) |
| Licence footer or URL block accidentally stripped | I4, I9 tests catch it |
| mdsvex (`.svx`) content added later | Extraction reads *prerendered* HTML; source format irrelevant |
| Topic map goes stale vs content | Regenerated every build from `tags`; tag drift caught by eye — accept this |
| Large `llms-full.txt` | ~250KB realistic; within HTTP norms and Claude context |

---

## Hand-off checklist (for the implementing session)

**Read first, in order:**
1. This plan
2. `src/lib/state.svelte.ts` — the `modules` array is the source of truth; note the new `tags?` field added in Stage 1
3. `svelte.config.js` — base path, static adapter setup
4. `src/lib/components/ModuleLayout.svelte` and `PathPageLayout.svelte` — content chrome identification
5. Representative page: `src/routes/learn/git-in-detail/stashing/+page.svelte` (rich with components — good mapper test subject)

**Start with:** Stage 1. Validate module↔route mapping before generating from it.

**Dev loop:** `npm run build` → `npx http-server build -p 5273` → verify `/llms.txt`, a sample `.md` sidecar, and the alternate-link on a page.

**Definition of Done (overall project):**
- `curl https://jasonjjack.github.io/learn-pai/llms.txt` returns the indexed site map with absolute URLs and topic routing
- `curl https://jasonjjack.github.io/learn-pai/learn/git-in-detail/stashing.md` returns clean markdown with URL header, body, Related pages, licence footer
- An AI given the URL of `llms.txt` can answer "How do I pause git work?" and cite the stashing page's absolute URL
- All 11 invariants pass in CI

**Known-unknowns to resolve during implementation:**
- Exact canonical `SITE_URL` (confirm GitHub Pages URL vs any custom domain)
- Which `state.svelte.ts` modules currently lack matching routes — Stage 1 validator surfaces this
- Whether any component in `src/lib/components/` handles content we haven't mapped — run mapper-coverage check early

---

*End of plan.*
