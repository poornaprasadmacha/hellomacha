# HelloMacha SEO Writing Checklist

**Internal use only.** Not a public page. Review this before publishing or refreshing any article.

---

## Article Dates (Critical — Read First)

### Show both dates to users
- [ ] Display **original published date** (date first published)
- [ ] Display **last updated date** (date of most recent meaningful refresh)
- [ ] Format: `October 20, 2026` or `2026-10-20`
- [ ] Place dates near the byline / author info, above the content
- [ ] Label clearly: "Published on …" and "Last updated on …"

### Never fake freshness
- [ ] Do NOT change the date just to make old content look new
- [ ] Only update the date when you make **significant, helpful content additions**
- [ ] Minor typo/grammar fixes do NOT warrant a date change
- [ ] Do not write "Updated on…" for every tiny adjustment (per John Mueller)

### Keep the same URL
- [ ] Refresh the existing page — do NOT create a new page with similar content
- [ ] Keep the original slug/URL when updating
- [ ] If merging multiple outdated pages into one "ultimate" page, 301-redirect the old URLs to the new one

### Sitemap lastmod
- [ ] `lastmod` in `sitemap.xml` must be **accurate** (Google stops reading sitemaps with inaccurate lastmod)
- [ ] Update `lastmod` only when primary content actually changed

---

## E-E-A-T / YMYL (Finance content = Your Money Your Life — higher bar)

### Author signals
- [ ] Visible byline with author name linking to `/authors/[author]`
- [ ] Author credentials box on article page (role, focus areas, experience)
- [ ] Author bio describes real-world experience (not generic "team" language)
- [ ] Author name matches across frontmatter, byline, schema, and author page

### Trust signals
- [ ] Article links to `/editorial-policy` near the byline
- [ ] Sources named and linked wherever a fact/rate/rule is stated
- [ ] Primary/official sources preferred (EPFO, RBI, PIB, Income Tax Dept, fund fact sheets)
- [ ] Estimates and assumptions explicitly labelled
- [ ] Calculations shown in rupees
- [ ] No sponsored product pitches; recommendations based on editorial assessment

### Hands-on testing (product / service reviews)
- [ ] Reviewer used the product/service personally before writing
- [ ] Screenshots/statements referenced are from the reviewer's own accounts
- [ ] Real-world results observed before publishing

---

## Content quality

### Freshness & value
- [ ] Content is timeless, relevant, and valuable (evergreen where possible)
- [ ] Meaningful additions made when refreshing old content
- [ ] Facts verified against current rules/rates/prices
- [ ] Outdated claims removed or corrected

### Structure
- [ ] H1 = article title (only one H1 per page)
- [ ] H2s for major sections, H3s for subsections
- [ ] Headings contain relevant keywords naturally
- [ ] Meta description: 150–160 characters
- [ ] Title tag: under 60 characters, includes primary keyword
- [ ] Primary keyword appears in title, meta description, and at least one heading

### Images
- [ ] Every `img` has descriptive `alt` text
- [ ] Images sized for display dimensions (not 1600px when shown at 620px)
- [ ] Prefer WebP/AVIF over PNG/JPEG where possible
- [ ] Featured image uses `loading="eager"` + `fetchPriority="high"` (LCP image)
- [ ] Other images use `loading="lazy"`

### Technical
- [ ] Canonical URL set correctly (`https://hellomacha.com/slug`)
- [ ] Open Graph tags: title, description, image (1200×630), site_name, type
- [ ] Twitter Card tags: card, title, description, image
- [ ] Article schema: headline, description, datePublished, dateModified, author, publisher, image
- [ ] Breadcrumb schema present
- [ ] `lang="en"` on `<html>`
- [ ] Charset UTF-8 declared

---

## Before publishing

- [ ] Build passes: `npx next build` (TypeScript clean, 85+ static pages)
- [ ] Article frontmatter includes: title, description, date, author, thumbnail, type
- [ ] Author exists in `app/authors/[author]/page.tsx` data
- [ ] Article added to `relatedArticleGroups` in `app/[slug]/page.tsx` if relevant
- [ ] "Last updated" date shown if this is a refresh of existing content
- [ ] Sitemap regenerates correctly on build

---

## After publishing

- [ ] Submit URL to Google Search Console for indexing
- [ ] Share on social channels to encourage engagement
- [ ] Monitor CTR and rankings; refresh again when rules/rates/prices change

---

### Golden rule (from Google guidance)
> "I would never recommend just changing dates for the heck of it — you need to make some significant changes."

If you're not adding meaningful value, don't touch the date.
