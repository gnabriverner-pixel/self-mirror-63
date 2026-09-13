<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# AGENTS.md — Web Surface Contract

This repository is the Web surface of the larger «Зеркало себя / Digital Code» product. Do not treat it as an independent product with its own strategy.

## Cross-project orientation

Before substantive product, architecture, provider, Telegram, PDF or monetization work, read the canonical control plane in:

`gnabriverner-pixel/digital-code-system`

Required files there:

1. `AGENTS.md` — cross-model operating contract.
2. `STATUS.md` — current mutable release/project state.
3. `docs/PRODUCT_STRATEGY_AND_COMMERCIAL_ARCHITECTURE_2026-09-13.md` — durable product/commercial architecture.
4. `docs/DECISION_LOG.md` — major decisions that must not be rediscovered from chat history.

If those files are unavailable, do not infer current project state from this repo's old README/history. Report that cross-project context is missing.

## Web role

The Web App is the primary first product experience:

`Digital Code ∥ Personal Myth → Meeting of Mirrors → Albert → My Mirror / Telegram continuation`

Telegram is continuity/retention/delivery, not a competing second product.
Telegram Mini App is deferred until real usage proves it necessary.
PDF is not the current free product; it is planned as the first premium paid personalized artifact after public release.

## Product invariants

Preserve:

- deterministic calculation != interpretation;
- interpretation != user-confirmed fact;
- explicit corrections/rejections supersede relevant earlier model hypotheses;
- `Myth metaphor != biography`;
- no forced Meeting resonance padding;
- Meeting may honestly return no strong parallel;
- Albert must change direction after a meaningful correction;
- method/tradition provenance must not be presented as proof of truth;
- semantic boldness + epistemic humility.

## Execution discipline

- One writable executor per bounded gate.
- Verify exact base SHA before changing files.
- Do not repeat work already proven in another executor/runtime without first reconciling state.
- Use browser/runtime evidence for UI/deploy claims.
- Do not silently change provider/model/routing contracts.
- Do not expose secrets or PII.
- Do not reintroduce warm-user cohorts or another broad pre-release polish cycle unless explicitly authorized.

## Lovable safety

The Lovable block above is binding:

- no force-push;
- no rewriting pushed history;
- keep connected branches in a working state;
- prefer additive commits and normal merges.

## Control-plane updates

This repository should not maintain a second full mutable project status.

If Web work changes release state or product behavior materially, the executor must update the canonical `digital-code-system/STATUS.md` in the corresponding control-plane change or explicitly report that the canonical status is pending/stale.

Model-specific files (`CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`) are adapters only and must not create an independent Web-only strategy.