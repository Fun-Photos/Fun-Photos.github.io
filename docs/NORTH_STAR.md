# Fun Photos north star and roadmap

Last reviewed: September 2026

## North star

Fun Photos should let an event operator turn a camera capture into a polished, shareable or
print-ready keepsake in minutes, without sending the customer's photo off the device by default.

The product succeeds when a first-time operator can reliably complete this loop:

1. Capture or import a photo.
2. Separate the subject cleanly enough for the intended output.
3. choose or upload a background and adjust the composition.
4. Export, share, print, or deliberately continue into a merchandise order.
5. Repeat the workflow at event pace, including during unreliable connectivity.

## Product principles

- **Local-first privacy.** Photo processing stays in the browser unless the operator explicitly
  chooses a feature that requires a network service. Network boundaries must be visible and
  documented.
- **Operator speed over editor complexity.** Favor a short, recoverable workflow and useful
  defaults over a large collection of controls.
- **Honest capability labels.** Demo extraction, simulated sign-in, locally recorded orders, and
  other scaffolds must not be presented as production integrations.
- **One web experience.** The installable PWA is the primary product. Native packaging should
  reuse it rather than create a second interface.
- **Export quality is the promise.** Interactive previews may be downscaled, but final output
  should preserve the source and meet the selected dimensions.
- **Deployments are reproducible.** Application source lives in `photo-background`; the checked-in
  `Fun-Photos.github.io/photo-background/` tree is a generated release artifact.

## Current product snapshot

The repositories currently provide:

- A static product portal at the site root and an Angular 20 PWA at `/photo-background/`.
- Camera capture and local file import.
- A dual-resolution document model, canvas composition, transforms, bundled and custom
  backgrounds, export presets, Web Share integration, and merchandise previews.
- PWA metadata, a service worker, SPA fallback files, privacy, support, and about routes.
- Unit coverage across core utilities and several services/components.

Important limitations in the current implementation:

- Foreground separation uses a configurable demonstration extractor, not production-quality
  person/subject segmentation.
- Google sign-in is simulated; configuration is scaffolded but the identity flow is not wired.
- Merchandise submission falls back to in-memory state and is not a durable order or payment
  system.
- Analytics configuration exists, but consent, script loading, and production validation still
  need an explicit product decision.
- Two GitHub Actions workflows can deploy Pages content. The intended ownership model is for the
  portal repository to serve the combined site, but the source repository still contains a
  direct Pages deployment workflow.
- Cross-repository synchronization is currently a local, copy-only operation and can retain stale
  hashed files in the portal artifact.
- Direct navigation to an Angular route such as `/photo-background/about` currently returns the
  site-level GitHub Pages 404. The nested generated `photo-background/404.html` is not acting as the
  combined site's SPA fallback.

## Roadmap

The roadmap is ordered by dependency and risk, not by promised calendar dates.

### Now: make releases boring

Outcome: one observable, reversible path publishes the combined site.

- Choose the portal repository as the only production Pages deployer and retire or convert the
  source repository's direct deploy workflow.
- Make artifact synchronization exact: remove files no longer produced, preserve `.nojekyll`, and
  fail when the expected sibling repository or build output is missing.
- Add an automated check that the source `docs/` output and portal `photo-background/` artifact
  match.
- Record source commit/version metadata in releases so an artifact can be traced and rolled back.
- Add smoke checks for the portal, app shell, a deep SPA route, manifest, hashed assets, and service
  worker update behavior under `/photo-background/`.
- Implement a combined-site SPA fallback strategy (for example, a site-root 404 dispatcher or
  generated route entry points) without breaking unknown portal URLs.
- Fix documentation encoding and replace machine-local links in the source README.

Exit criteria: a contributor can follow the deployment runbook from clean checkouts, CI has one
production deploy owner, all smoke checks pass, and rollback is documented and tested.

### Next: deliver trustworthy background removal

Outcome: ordinary portraits produce a visibly useful cutout fully in-browser.

- Select and integrate an on-device segmentation implementation behind `ForegroundExtractor`.
- Keep the current extractor as an explicitly labeled demo/fallback mode.
- Add representative fixtures and quality/performance benchmarks for hair, glasses, multiple skin
  tones, mobility devices, varied lighting, and common event backgrounds.
- Define supported device/browser memory limits and degrade gracefully on low-end devices.
- Add mask refinement controls only where they materially improve real outputs.

Exit criteria: agreed fixture-quality thresholds pass on the supported device matrix without
uploading source photos.

### Next: harden the event workflow

Outcome: an operator can run repeated sessions quickly and recover from mistakes or interruptions.

- Test repeated capture-edit-export cycles for leaks, stale state, orientation errors, and camera
  permission changes.
- Add end-to-end coverage for capture/import, background selection, transform, transparent and
  composited export, sharing fallbacks, offline launch, and PWA update prompts.
- Establish measurable targets for time-to-editor, preview interaction, export duration, and crash
  rate.
- Improve accessibility, keyboard operation, screen-reader labels, focus handling, and touch target
  sizing.
- Define session reset and customer-data retention behavior suitable for shared event devices.

Exit criteria: the core loop passes automated and device smoke tests online and offline, with a
clear way to reset between customers.

### Later: add accounts, telemetry, and commerce deliberately

Outcome: optional connected features are secure, supportable, and do not compromise the local-first
core.

- Decide whether accounts are necessary; if so, implement real Google Identity Services with
  server-verifiable sessions and explicit sign-out/session-expiry behavior.
- Define consent, data minimization, retention, and opt-out requirements before enabling production
  analytics.
- Design a real order lifecycle, pricing authority, image-upload consent, payment handoff,
  idempotency, status tracking, failure recovery, and customer support process.
- Separate client-visible configuration from server secrets; no credential may be shipped in a web
  bundle.

Exit criteria: threat modeling, privacy review, operational ownership, and failure handling are in
place before connected features are described as production-ready.

### Later: package for stores and dedicated venues

Outcome: distribution expands without forking the product experience.

- Decide between Trusted Web Activity and Capacitor based on required hardware integration.
- Publish Digital Asset Links, finalize the application ID and signing ownership, generate store
  assets, and complete policy declarations.
- Validate camera, file access, sharing, installation, updates, and offline behavior in the chosen
  wrapper.
- Consider calibrated backdrop/chroma-key workflows only after the browser product's core loop is
  reliable.

Exit criteria: the packaged app uses the same tested web release, has an owned signing/update
process, and passes store review.

## Decision guide

When roadmap work competes, prefer the item that most improves successful completion of the
capture-to-export loop while preserving local-first privacy. Treat segmentation quality, release
reliability, and repeated-session stability as foundational; accounts, payments, and store
packaging build on them.
