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

This repository is the Web surface of the larger «Зеркало себя / Digital Code» product. It does not own a separate product strategy.

Use the smallest context set that can change the task.

## Context routing

- Small local UI/code/test fix → inspect the affected files and local tests first.
- Current release/deploy/routing/gate → consult canonical `gnabriverner-pixel/digital-code-system/STATUS.md`.
- Product direction, monetization, PDF, Telegram or cross-surface experience → consult canonical DCS `AGENTS.md` plus the product strategy / relevant decision record.
- Calculation, truth/provenance or generation behavior → consult the directly relevant DCS contract, not the whole repository.

If canonical DCS context is unavailable for a task that truly depends on it, report that gap. Do not infer current strategy from old Web history.

## Web role

The Web App is the primary first experience:

`Digital Code ∥ Personal Myth → Meeting of Mirrors → Albert → My Mirror / Telegram continuation`

Telegram = continuity/retention/delivery, not a competing second product.
Telegram Mini App remains deferred until real usage proves it necessary.
The first paid direction is a premium personalized experience/artifact, not a longer generic numerology report.

## Product invariants

Preserve:

- deterministic calculation != interpretation;
- interpretation != user-confirmed fact;
- explicit corrections/rejections supersede relevant earlier hypotheses;
- `Myth metaphor != biography`;
- no forced Meeting resonance padding;
- Albert changes direction after a meaningful correction;
- method/tradition provenance is not proof of truth;
- semantic boldness + epistemic humility.

## Execution discipline

- one writable executor per bounded gate;
- smallest coherent change;
- verify enough to prove the acceptance criteria; do not run every test by habit;
- browser/runtime evidence for UI/deployment claims;
- no silent provider/model/routing changes;
- never expose secrets or PII;
- no broad audit when one executable task exists.

## Lovable safety

The Lovable block above is binding:

- no force-push;
- no rewriting pushed history;
- keep connected branches working;
- prefer additive commits and normal merges.

## Control plane

Do not maintain a second mutable Web-only project status.
If Web work materially changes current release state, product architecture, routing, privacy behavior or the active gate, update canonical DCS `STATUS.md` in the corresponding control-plane change or explicitly report that it is pending.

Model-specific adapters must remain thin and must not duplicate mutable project state.
