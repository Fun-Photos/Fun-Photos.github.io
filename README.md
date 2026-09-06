# Fun Photos web portal

This repository publishes the Fun Photos landing page and the production build of the
Background Studio to [https://fun-photos.github.io/](https://fun-photos.github.io/).

## Repository responsibilities

| Path | Purpose | Source of truth |
| --- | --- | --- |
| `/` | Static product portal | This repository's `index.html`, `styles.css`, `script.js`, and `assets/` |
| `/photo-background/` | Built Angular PWA | Generated from the sibling [`photo-background`](https://github.com/Fun-Photos/photo-background) repository |
| `.github/workflows/deploy.yml` | Publishes the complete repository root to GitHub Pages | This repository |

Do not hand-edit the hashed files under `photo-background/`. Make application changes in the
`photo-background` source repository, build them there, and synchronize the production output
back into this repository.

## Project documentation

- [North star and roadmap](docs/NORTH_STAR.md)
- [Deployment and serving runbook](docs/DEPLOYMENT.md)
- [Instructions for coding agents](AGENTS.md)

The deployment runbook in this repository is the canonical description of how the two
repositories combine into the public site.

## Local preview

Serve this directory with any static HTTP server and open the reported local URL. For example:

```bash
npx serve .
```

Opening `index.html` directly with a `file://` URL is not a reliable PWA or routing test.
