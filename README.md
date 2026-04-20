# Y2K Maximalist Marketing Services Website

Single-page static-export Next.js 14 website designed for GitHub Pages deployment.

## Quick Start

1. Install Node.js 18.18+ or 20+.
2. Run:
   - `npm install`
   - `npm run dev`
3. For production static export:
   - `npm run build`
4. Deploy the generated `out` directory to GitHub Pages.

## GitHub Pages Hosting

1. Create a new GitHub repository and push this project to the `main` branch.
2. In the repo, open `Settings -> Pages`.
3. Under **Build and deployment**, select **Source: GitHub Actions**.
4. Push to `main` (or run the workflow manually in the **Actions** tab).

The workflow at `.github/workflows/deploy.yml` will build and publish the `out` directory.

### Base Path Behavior

- For project pages (for example `username.github.io/repo-name`), `next.config.mjs` auto-sets the correct base path during GitHub Actions builds.
- For user/org pages (for example `username.github.io`), no base path is applied.

## Notes

- Uses App Router + Tailwind + Framer Motion.
- `next.config.mjs` is configured with `output: "export"` and unoptimized images for GitHub Pages compatibility.
- Update external links and replace placeholder Spline URL in `src/app/page.tsx`.
