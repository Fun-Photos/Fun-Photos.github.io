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

- Foreground separation now uses local MODNet portrait matting via ONNX Runtime Web
  (Apache-2.0 quantized model running in-browser with WebGPU and single-threaded WASM fallback),
  producing continuous 8-bit alpha mattes without network transmission. Edge brush correction
  (Milestone 4) remains pending for challenging edge conditions.
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

The roadmap is ordered. Later milestones must not be used to avoid the quality, privacy, and
reliability work in earlier milestones.

### 1. Make the current prototype truthful and mechanically sound

Fix GitHub Pages routing, eliminate fake-success behavior, correct aspirational product/privacy
copy, self-host assets needed offline, and establish good test fixtures. Keep customer photos
ephemeral by default.

For the current repositories, mechanical soundness also includes making the portal repository the
only production Pages deployer, making cross-repository artifact synchronization exact, and making
each deployed artifact traceable to its application source commit.

### 2. Implement production-quality local background removal (Completed)

Kept the existing `ForegroundExtractor` boundary, evaluated in-browser matting models, and
implemented local portrait matting with quantized MODNet via ONNX Runtime Web. Configured WebGPU
with single-threaded WASM fallback (ensuring compatibility on environments without Cross-Origin
Isolation like GitHub Pages). Added PWA caching for the model and WASM binaries, non-destructive
error handling, and task-oriented processing status messages.

### 3. Build the real full-resolution image pipeline

The 1280px canvas becomes strictly a working preview. Original photos remain authoritative. Export
recomposes from the original source at real resolution with correctly transformed masks and
backgrounds. PNG transparency, JPEG output, sharing, downloading, and sensible print-oriented
dimensions should all be real rather than enlarged previews.

### 4. Make background removal operator-correctable

Add erase and restore mask brushes, brush size and softness controls, undo/redo, reset-to-auto, and
perhaps edge feathering. This is important because a fair operator needs to be able to turn a
95%-good automatic cutout into a finished image quickly instead of abandoning the shot.

### 5. Finish the actual photo editor

Complete the background library, uploaded backgrounds, persistent custom backgrounds, crop/aspect
presets, foreground move/scale/rotation, background positioning, transparent-background mode,
useful before/after comparison, and appropriate image adjustments. Modest brightness, contrast,
and saturation controls are reasonable; the goal is not to become Photoshop.

### 6. Add the controlled-event workflows that fit the original Fun Photos business

This is where chroma key becomes particularly valuable. A good green-screen keyer may actually
outperform generic AI segmentation in the environment the business was designed around. After
that, evaluate calibrated empty-backdrop subtraction and potentially hybrid masks. These should
remain alternative `ForegroundExtractor` implementations rather than becoming special-case editor
code.

### 7. Make it genuinely offline and event-ready

Once installed and initialized, camera/import through processing, editing, and export should work
without internet. Explicitly cache the segmentation model and bundled backgrounds. Test repeated
sessions, dozens or hundreds of photos, memory cleanup, app suspension/resume, device rotation,
camera switching, low-memory behavior, failed imports, interrupted operations, and recovery. Custom
backgrounds and settings should persist. Customer photos should persist only when the user
intentionally saves a draft.

### 8. Polish the installed-PWA and mobile experience

Provide good touch targets, a responsive editor layout, correct orientation behavior, install and
update handling, accessibility, share-sheet support, clipboard support where available, camera
permission handling, graceful capability detection, and useful messaging when Safari, Firefox, or
older devices lack an optimization such as WebGPU.

### 9. Add serious automated and device testing

Add unit tests for coordinate, mask, and render math; image-dimension guarantees; persistence; and
extractors. Use Playwright for the complete user journey, fixture-based image comparisons where
worthwhile, and a small explicit device/browser compatibility matrix. Most importantly, add a
regression test that fails if a nominal 4032x3024 export secretly contains a 1280px source enlarged
to that size.

### 10. Only after the product works: secondary systems

Analytics, support integration, optional accounts, merchandise and fulfillment, and other network
services can come afterward based on whether they serve a real need. Merchandise in particular
should be treated as a separate backend and product workstream rather than something required to
declare the editor finished.

## Distribution milestone: Android / Google Play

Begin Android distribution only after the ten product milestones above are complete and the
installed PWA is proven on the supported device matrix.

- Choose Trusted Web Activity or Capacitor based on demonstrated hardware and platform needs.
- Publish Digital Asset Links, finalize the application ID and signing ownership, and establish a
  durable signing and update process.
- Generate the Android App Bundle and store assets, complete privacy and capability declarations,
  and prepare the Play listing.
- Validate camera and file access, sharing, installation, offline operation, suspension/resume, and
  web-to-wrapper updates in the packaged application.

Exit criteria: the Android package uses the same tested web release, preserves its local-first
privacy behavior, has an owned signing/update process, and passes store review.

## Decision guide

When roadmap work competes, prefer the item that most improves successful completion of the
capture-to-export loop while preserving local-first privacy. Treat segmentation quality, release
reliability, and repeated-session stability as foundational; accounts, payments, and store
packaging build on them.
