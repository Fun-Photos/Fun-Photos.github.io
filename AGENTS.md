# AGENTS.md

These instructions apply to the entire `Fun-Photos.github.io` repository.

## Repository role

This repository is the deployable GitHub Pages root for the combined Fun Photos site:

- Root files (`index.html`, `styles.css`, `script.js`, and `assets/`) author the static portal.
- `photo-background/` is a generated production build from the sibling `photo-background`
  repository.
- `.github/workflows/deploy.yml` publishes the complete repository root from `main`.
- `docs/DEPLOYMENT.md` is the canonical cross-repository deployment runbook.
- `docs/NORTH_STAR.md` records product direction and ordered roadmap outcomes.

## Editing rules

- Never hand-edit files under `photo-background/`, including hashed bundles, generated HTML,
  service-worker files, manifests, icons, or background assets. Change the application source in
  the sibling repository and regenerate/synchronize the directory.
- Portal changes belong in the root-authored files and `assets/`. Keep links to the application
  rooted at `/photo-background/`.
- The root portal is NOT a PWA. The `/photo-background/` application is the sole PWA. Do not add a
  manifest or service worker to the repository root. A root unregistration routine in `script.js`
  safely cleans up any legacy service worker registered at `/` scope.
- Preserve `.nojekyll` at the repository root and in the generated application artifact.
- Treat all client-side code and build configuration as public. Never add credentials or secrets.
- Preserve unrelated working-tree changes. Do not replace a generated directory until its exact
  source and destination have been confirmed.
- When behavior, ownership, or release steps change, update `docs/DEPLOYMENT.md`. When product
  priorities or material capability status change, update `docs/NORTH_STAR.md`.

## Application release workflow

Expect the repositories to be adjacent:

```text
parent/
  Fun-Photos.github.io/
  photo-background/
```

For an application change, work in `photo-background`, run `npm test`, then run
`npm run sync:portal`. The latter performs a production build and copies `photo-background/docs/`
into this repository's `photo-background/` directory.

The current sync is copy-only. Compare source and destination file lists and identify stale hashed
files before committing. Delete only files confirmed to be generated, absent from the fresh source
build, and inside this repository's `photo-background/` directory.

Review and report changes in both repositories separately. The application source commit should be
traceable from the portal artifact commit or pull request.

## Validation

For portal-only changes:

- Serve the repository over local HTTP; do not rely on a `file://` preview.
- Check navigation, responsive layout, browser console errors, and all launch/download links.
- Confirm the application subtree was not changed accidentally.

For application releases:

- Require a passing `npm test` and `npm run build:prod` (directly or through `sync:portal`) in the
  source repository.
- Confirm `photo-background/index.html` and `photo-background/404.html` keep the
  `/photo-background/` base href.
- Confirm the manifest, service worker, icons, hashed assets, and direct SPA routes work under the
  subpath.
- Static entry points (`editor/index.html`, `merchandise/index.html`, `about/index.html`,
  `privacy-policy/index.html`, `support/index.html`) generated during build provide direct HTTP 200
  responses for all known routes on GitHub Pages, backed by the root `404.html` dispatcher.
- Review for stale generated assets and unintended client-visible configuration.
- Follow the pre-release, post-deployment, and rollback checks in `docs/DEPLOYMENT.md`.

Do not claim a production deployment was verified unless the relevant GitHub Pages workflow and
the public URLs were actually checked.

## Scope boundaries

- The portal repository owns static hosting and the assembled release, not Angular application
  implementation.
- The portal repository is the single authoritative production deployer to GitHub Pages. The
  source repository runs CI-only validation on its pull requests and `main` branch.
- The application repository owns runtime code, tests, build configuration, and source assets, not
  the portal landing page.
- Authentication, analytics, order processing, payments, and store packaging are incomplete or
  scaffolded. Describe them accurately and do not treat browser-side placeholders as production
  integrations.

