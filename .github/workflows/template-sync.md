---
on:
  schedule: weekly on monday
  workflow_dispatch:
  skip-if-match: "repo:TechWatching/techwatching.dev is:pr is:open label:template-sync"

permissions:
  contents: read
  pull-requests: read

network: defaults

tools:
  bash: true
  github:
    toolsets:
      - repos
      - pull_requests

safe-outputs:
  create-pull-request:
---

You are helping sync the personal blog at TechWatching/techwatching.dev with its upstream
template nuxt-ui-templates/saas. This blog was originally created from that template and has
been heavily customized: some pages were removed, new pages were added, components were
renamed, and new features (RSS feeds, tags, goodies page, speaking page, Giscus comments)
were added. Your job is to apply useful upstream improvements without breaking anything.

## Step 1: Check for new template changes

Read the file `.github/template-sync-state.json`. It contains `lastSyncedCommit` — the last
template commit SHA that was already processed.

Use the GitHub repos tool to get the latest commit SHA on the `main` branch of
`nuxt-ui-templates/saas`.

If the latest SHA equals `lastSyncedCommit`, there are no new changes — stop immediately,
there is nothing to do.

## Step 2: Identify changed files

Use the GitHub repos tool to compare `lastSyncedCommit` with the latest commit in
`nuxt-ui-templates/saas` and get the full list of changed files. For each file you decide to
apply or adapt (see rules below), fetch its current content from `nuxt-ui-templates/saas`.

## Step 3: Apply changes using these rules

### ✅ Apply directly — same path, apply template changes as-is

- `app/components/AppHeader.vue`
- `app/components/AppFooter.vue`
- `app/components/AppLogo.vue`
- `app/components/HeroBackground.vue`
- `app/components/ImagePlaceholder.vue`
- `app/components/StarsBg.vue`
- `app/components/OgImage/` (all files in this directory)
- `app/components/content/` (all files except custom ones listed below)
- `app/layouts/default.vue`
- `app/app.vue`
- `app/error.vue`
- `app/types/` (all files)
- `nuxt.config.ts`
- `eslint.config.mjs`
- `tsconfig.json`
- `pnpm-workspace.yaml`
- `package.json` — apply only updates to **shared** dependencies (nuxt, @nuxt/ui, @nuxt/content,
  @nuxt/image, @nuxt/fonts, @nuxt/icon, typescript, vue, etc.). Do NOT remove packages that
  exist in this repo but not the template (e.g. @nuxtjs/seo, gsap, @vueuse/nuxt, and others).
  Do NOT downgrade any package version that is already newer in this repo.

### 🔄 Adapt with rename — apply the equivalent change to the renamed file

The template has a `blog` section that this site renamed to `posts`:

- Template `app/pages/blog.vue` → apply the same changes to `app/pages/posts.vue`
- Template `app/pages/blog/[slug].vue` → apply changes to `app/pages/posts/[slug].vue`
- Any other file under `app/pages/blog/` maps to the equivalent path under `app/pages/posts/`

When adapting, preserve all post-specific customizations in the existing file (Giscus comments,
social share, tags display, etc.) while incorporating the upstream improvements.

### 🔧 Review and improve — site-specific files not in the template

These files exist only in this repo (not in the template). When the template changes introduce
improvements to patterns they use — new Nuxt UI component APIs, updated composable usage,
improved TypeScript patterns, better accessibility, performance improvements — apply those same
improvements to these files too. Do NOT restructure or remove functionality:

- `app/pages/about.vue`
- `app/pages/contact.vue`
- `app/pages/goodies/index.vue` and `app/pages/goodies/[slug].vue`
- `app/pages/speaking.vue`
- `app/pages/tags/index.vue` and `app/pages/tags/[tag].vue`
- `app/components/ContactForm.vue`
- `app/components/GiscusComments.vue`
- `app/components/PostsTags.vue`
- `app/components/SocialLinks.vue`
- `app/components/SocialsShare.vue`
- Custom components: `McpServerGrid.vue`, `PictureAndText.vue`, `Pictures.vue`, `ProseImg.vue`,
  `Tweet.vue`, `YearsSince.vue`
- `server/` (RSS feeds and API routes)
- `app/plugins/`
- `app/utils/`

### ❌ Skip entirely — do not create, modify, or delete these

These pages were intentionally removed from this site:

- `app/pages/changelog/`, `app/pages/docs/`, `app/pages/login.vue`
- `app/pages/pricing.vue`, `app/pages/signup.vue`
- `app/components/PromotionalVideo.vue`, `app/components/TemplateMenu.vue`
- `app/layouts/auth.vue`

Also skip these site-specific files (they are fully custom and must not be changed):

- `app/app.config.ts`
- `content/` (all blog posts and site content)
- `.github/` (all files except `template-sync-state.json`)
- `public/` (site-specific static assets)

## Step 4: Update state file

Update `.github/template-sync-state.json`:
- Set `lastSyncedCommit` to the new template HEAD SHA
- Set `lastSyncDate` to today's date in ISO 8601 format

## Step 5: Validate changes

Run the following commands. If lint or typecheck fail, attempt to fix the issues. Note any
unresolved problems in the PR description.

First, ensure pnpm is available and dependencies are installed:

```bash
corepack enable 2>/dev/null || npm install -g pnpm
pnpm install
```

Run type checking and linting:

```bash
pnpm run typecheck
pnpm run lint
```

## Step 6: Run the dev server and take screenshots

Install Playwright's Chromium browser, then start the dev server and take screenshots of the
key pages. Save them to `.playwright-screenshots/` (this folder is not committed to git — it
will be uploaded as a workflow artifact separately).

```bash
pnpm exec playwright install chromium --with-deps

# Start dev server in background
pnpm dev &
DEV_PID=$!

# Wait up to 90 seconds for the dev server to be ready
for i in $(seq 1 30); do
  curl -sf http://localhost:3000 > /dev/null && echo "Dev server ready" && break
  echo "Waiting for dev server... ($i/30)"
  sleep 3
done
```

Write a Node.js script to `.playwright-screenshots/take-screenshots.mjs` with this content:

```javascript
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('.playwright-screenshots', { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const pages = [
  ['home', 'http://localhost:3000'],
  ['posts', 'http://localhost:3000/posts'],
  ['goodies', 'http://localhost:3000/goodies'],
  ['speaking', 'http://localhost:3000/speaking'],
  ['tags', 'http://localhost:3000/tags'],
  ['about', 'http://localhost:3000/about'],
];

for (const [name, url] of pages) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.screenshot({
      path: `.playwright-screenshots/${name}.png`,
      fullPage: false,
    });
    console.log(`✅ Screenshot saved: ${name}`);
  } catch (e) {
    console.error(`❌ Failed to screenshot ${name}: ${e.message}`);
  }
}

await browser.close();
console.log('Done.');
```

Then run the screenshot script and stop the dev server:

```bash
node .playwright-screenshots/take-screenshots.mjs
kill $DEV_PID 2>/dev/null || true
```

## Step 7: Create pull request

Create a pull request with:

- **Branch name**: `template-sync/YYYY-MM-DD` (using today's date)
- **Title**: `[template-sync] Sync with nuxt-ui-templates/saas — YYYY-MM-DD`
- **Labels**: `template-sync`
- **Body** must include:
  - A one-line summary of what changed
  - Link to compare the commits in the upstream template:
    `https://github.com/nuxt-ui-templates/saas/compare/{oldSHA}...{newSHA}`
  - A table listing each changed file and the action taken (Applied / Adapted / Improved /
    Skipped) with a brief reason for skipped files
  - Any errors encountered during typecheck or lint, and whether they were fixed
  - A note that screenshots of key pages are available as a **workflow artifact** on the
    Actions run (link to the run URL) — they expire after 30 days
  - A reminder to review `package.json` dependency changes carefully before merging
