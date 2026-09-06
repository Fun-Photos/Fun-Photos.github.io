# Deployment and serving runbook

This is the canonical cross-repository deployment documentation for Fun Photos.

## Public layout

GitHub Pages serves the combined site at `https://fun-photos.github.io/`:

```text
photo-background source repository
  src/ + public/
        |
        | npm run build:prod
        v
  docs/                                  generated Angular production build
        |
        | npm run sync:portal
        v
Fun-Photos.github.io repository
  index.html, styles.css, script.js       portal at /
  assets/                                portal assets
  photo-background/                      generated PWA at /photo-background/
        |
        | push/merge to main
        v
  .github/workflows/deploy.yml           uploads the entire repository root
        |
        v
https://fun-photos.github.io/
https://fun-photos.github.io/photo-background/
```

The app must remain subpath-aware. Its production build uses
`<base href="/photo-background/">`; its manifest, router, service-worker manifest, and asset URLs
must work from that prefix.

## Ownership and generated files

| Concern | Authoritative location |
| --- | --- |
| Portal markup, behavior, styling, and assets | `Fun-Photos.github.io` root |
| Application TypeScript, Angular templates/styles, and tests | `photo-background/src/` |
| Application static source assets | `photo-background/public/` |
| Build and sync behavior | `photo-background/package.json` and `photo-background/scripts/` |
| Intermediate production output | `photo-background/docs/` |
| Public combined-site artifact | `Fun-Photos.github.io/photo-background/` |
| GitHub Pages deployment of the combined site | `Fun-Photos.github.io/.github/workflows/deploy.yml` |
| Cross-repository deployment policy and runbook | This document |

Both `photo-background/docs/` and `Fun-Photos.github.io/photo-background/` are generated. Do not
fix application behavior by editing bundled JavaScript, hashed CSS, `ngsw.json`, or generated HTML.
Change the source or build scripts and regenerate the artifact.

## Current automation and known ambiguity

The portal workflow deploys the entire checkout whenever `main` changes. This is the workflow that
publishes the combined portal and application.

The source repository also currently has `.github/workflows/deploy.yml`, which builds and deploys
its own `docs/` artifact to GitHub Pages. That duplicates production ownership. Until that workflow
is retired or converted to validation-only, treat it as legacy/ambiguous automation and confirm
which workflow produced a live release. Resolving this is the first roadmap priority.

### Deep-link resolution

Previously, a direct request to `/photo-background/about` returned HTTP 404 because GitHub Pages used
the organization site's root-level not-found behavior. The issue has been resolved with a dual approach:

1. **Static route entry points**: During build (`scripts/move-build-files.js`), static HTML entry points
   are automatically generated for all known Angular routes (`editor/index.html`, `merchandise/index.html`,
   `about/index.html`, `privacy-policy/index.html`, `support/index.html`). Direct requests, bookmarks, and
   browser reloads for any known route return genuine HTTP 200 responses with the correct
   `<base href="/photo-background/">` context.
2. **Root `404.html` dispatcher**: A root-level `404.html` script in `Fun-Photos.github.io` captures any
   unmatched `/photo-background/*` subpaths and seamlessly redirects the client to the PWA shell while
   preserving the requested path, query parameters, and hash fragment. For non-application paths, it
   renders a branded portal 404 navigation screen.

The `sync:portal` script assumes the repositories are sibling directories with these exact names:

```text
parent/
  Fun-Photos.github.io/
  photo-background/
```

It copies files with overwrite enabled, but it does not delete files that disappeared from the new
build. Inspect the destination for stale hashed assets after every synchronization.

## Configuration

The build generates ignored files under `photo-background/src/environments/` from these optional
environment variables:

| Variable | Browser use | Default |
| --- | --- | --- |
| `GOOGLE_CLIENT_ID` | Google identity client identifier scaffold | Empty |
| `GA_MEASUREMENT_ID` | Analytics measurement identifier | `G-FUNPHOTOS00` placeholder |
| `API_URL` | Merchandise/order API base URL scaffold | Empty |

All three values are compiled into browser-delivered JavaScript and are public. Never put client
secrets, private API keys, service-account credentials, signing keys, or payment credentials in
these variables. A backend must hold any actual secret.

## Release procedure

Start with clean, up-to-date checkouts of both repositories. Application releases should be
reviewed as source changes plus their generated artifact; avoid mixing unrelated portal changes
into the same release.

From `photo-background`:

```bash
npm ci
npm test
npm run sync:portal
```

`sync:portal` runs the production build, flattens Angular's `docs/browser/` output into `docs/`,
creates `docs/404.html` from `index.html`, creates `.nojekyll`, and copies `docs/` into the portal's
`photo-background/` directory.

Then review both repositories:

```bash
git status --short
git diff --stat
git -C ../Fun-Photos.github.io status --short
git -C ../Fun-Photos.github.io diff --stat
```

Before merging or pushing the portal artifact:

1. Confirm source tests and the production build passed.
2. Confirm the generated `index.html` and `404.html` contain
   `<base href="/photo-background/">`.
3. Compare the file lists in source `docs/` and portal `photo-background/`; remove only confirmed
   stale generated files from the portal copy.
4. Confirm `.nojekyll`, `manifest.webmanifest`, `ngsw.json`, and `ngsw-worker.js` are present.
5. Review the bundle diff for unexpected endpoints or configuration. Remember that all bundled
   configuration is public.
6. Commit the application source/build changes in `photo-background` and record that commit hash in
   the portal artifact commit or pull request.
7. Merge the portal change to `main`. Its Pages workflow uploads the complete repository root and
   reports the deployed URL in the `github-pages` environment.

Do not run two releases against the same portal checkout concurrently; the sync is not atomic and
has no cross-repository locking.

## Post-deployment validation

Use a private window or clear the installed PWA/service-worker state when checking a new release;
an existing service worker may intentionally continue serving the previous cached version until
the update activates.

Validate at least:

- The portal loads at `https://fun-photos.github.io/` and its launch links target
  `/photo-background/`.
- The application shell, icons, background images, and hashed JavaScript/CSS load without 404s.
- A direct request to `/photo-background/about`, `/photo-background/support`, and
  `/photo-background/privacy-policy` returns HTTP 200 and renders the expected route. This is a
  known failing check until the combined-site fallback is fixed.
- `manifest.webmanifest` uses a scope/start URL under `/photo-background/`, and installation works
  on a supported browser.
- The service worker registers under the application path, caches the expected release, and can
  update from the previous release.
- Import, camera permission on a secure origin, background selection, editing, and at least one
  export complete successfully on a desktop and a mobile-sized device.
- The portal root remains unchanged unless the release intentionally included portal work.

## Rollback

The fastest production rollback is to revert the portal repository commit that introduced the bad
`photo-background/` artifact and let the portal Pages workflow redeploy `main`. Do not hand-edit a
hashed bundle during an incident.

After restoring service, revert or fix the corresponding source change in `photo-background`, run
the normal release procedure, and synchronize a newly generated artifact. Check PWA update behavior
because previously installed clients may hold either the failed or restored service-worker cache.

## Troubleshooting

- **Root portal works, app assets 404:** verify the Angular base href and generated URLs use
  `/photo-background/`, not `/` or a relative development path.
- **Deep links show the portal 404:** this is a known limitation of the current assembled-site
  deployment. A nested app `404.html` alone does not provide the site-level fallback. Implement and
  verify a root dispatcher, generated route entry points, or hash routing; do not replace the
  portal's root behavior without testing unrelated missing URLs.
- **A device still shows the old app:** inspect its service-worker registration/cache, wait for the
  new worker to activate, or remove the installed PWA before retesting.
- **Old chunks remain after sync:** the current copy operation is additive. Compare source and
  destination file lists and remove only destination files absent from the fresh source build.
- **Local sync writes nowhere useful:** verify the two repositories are siblings and retain the
  exact directory names expected by `scripts/sync-portal.js`.
- **Pages deploys an unexpected artifact:** inspect Actions in both repositories; the duplicate
  source-repository Pages workflow remains a known ambiguity until the roadmap item is completed.
