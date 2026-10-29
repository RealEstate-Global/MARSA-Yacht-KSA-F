# Al Marsa Content Migration, SEO & GEO — Implementation Notes

**Scope:** complete content migration from the official brand site
[almarsa.app](https://almarsa.app/) into this repository, plus technical SEO,
GEO (Generative Engine Optimization), and EN/AR localization alignment.
**Content/SEO ownership:** cw-hakam — <cw.mahmoudhakam@gmail.com>.

---

## 1. Repository audit (pre-change)

- **Stack:** Angular 22.2.3, standalone components, zoneless change detection
  (`provideZonelessChangeDetection`), OnPush everywhere, Vitest (jsdom),
  Tailwind with `marsa` design tokens, deployed on Vercel (production:
  `https://marsa-yacht.vercel.app/`, root directory `marsa`).
- **Old story (removed):** "MARSA — Saudi Marine Hospitality", a Red Sea
  B2B *provisioning* brand. It contained content that violated accuracy rules:
  - fabricated testimonial ("Captain Sami · Jeddah") — **removed**;
  - provisional contact details (`concierge@marsa.sa`, `+966 12 000 0000`,
    "Jeddah, Saudi Arabia") with no verified source — **removed**;
  - invented claim "the most trusted provisioning company in the Red Sea" —
    **removed**;
  - provisions-directory forms that implied website-based ordering while the
    real product (Al Marsa) books in its app — **removed**.

## 2. Source inventory (verified 2026-10-29)

Public pages inspected read-only, both languages:

| Source URL | Title | Notes |
|---|---|---|
| `/en`, `/ar` | "Al Marsa — المرسى" | single-page lookbook: hero, why, how, live listing, about, download |
| `/en/vessels`, `/ar/vessels` | "The fleet"/"القوارب واليخوت" | 19-category filter; one demo listing (Kayak, "1 SAR / hour") — demo/test data |
| `/en/vessels/7`, `/ar/vessels/7` | "Kayak from Almarsa" | demo vessel; no other inventory exists |

Key verified facts: brand **Al Marsa (المرسى)**; positioning "premium
vessel-charter marketplace built for the Gulf — Saudi-first"; the website is
the **lookbook**, the app handles booking, payment, KYC, coastguard clearance,
check-in; no social profiles anywhere on the source; no sitemap.xml (404);
**the source's own App Store / Google Play badges point at placeholder URLs**
(`https://google.com/`); no JSON-LD on the source site. Arabic is Saudi-dialect
and captured verbatim; EN/AR meta descriptions differ only by language.

## 3. Migration map

| Source section | Destination | Status |
|---|---|---|
| Hero (H1 + desc + badges) | `hero` (`/`, anchors intact) | implemented verbatim EN+AR |
| Why Al Marsa (4 cards) | `app-intro` → `#why` | implemented verbatim |
| How it works (4 steps) | `app-products` → `#how` | implemented verbatim |
| Fleet filter (19 categories) | chips inside `#how` | labels mirrored (real taxonomy, no inventory) |
| "On the water now" listing | — | **not migrated**: only demo/test data exists (1 SAR demo kayak). No inventory may be fabricated |
| About Al Marsa | `app-about` → `#about` | implemented verbatim |
| Take Al Marsa with you | `app-cta` → `#download` | implemented verbatim |
| Deleted sections (services cards/destinations/testimonials) | — | provisioning-era content, plus a fabricated review — removed |
| Legacy routes `/services`, `/provisioning`, `/destinations`, `/about`, `/contact` | kept, deep-link to nearest section (`/#how` for all except about → `/#about`, contact → `/#download`) | compatibility preserved |

## 4. Technical SEO

- `<title>` "Al Marsa — المرسى" (matches the official site's pattern) and the
  source's meta description, verbatim.
- `rel=canonical` and `og:url` set to the confirmed production domain
  `https://marsa-yacht.vercel.app/`; OG/Twitter images are absolute URLs.
- `robots.txt` allows all crawlers and points to `sitemap.xml`.
- `sitemap.xml` lists exactly one canonical URL (`/`). Legacy path URLs are
  excluded on purpose: they render the same page and canonicalize to `/`.
- Single heading hierarchy per page (one H1; real H2/H3 per section); lazy
  below-fold imagery retained from the performance pass.
- **No redirects were broken**: removals only affect in-app section anchors,
  and every legacy route still resolves to a real section.

## 5. GEO

- Explicit entity definition (Organization + WebSite JSON-LD): name,
  alternateName (المرسى), URL, logo, one-paragraph description mirroring the
  visible about copy. `sameAs` links the official brand site.
- **Nothing fabricated:** no ratings, reviews, aggregate scores, prices,
  addresses, phone numbers, or social profiles in the structured data.
- Answer-oriented content: the "How it works" section answers what/where/how
  booking works (browse on web → book in app → pay/clear → sail), matching the
  official workflow claim-for-claim.
- No FAQPage/Product/Offer schema: there is no real inventory or FAQ on the
  source, so the eligibility requirements cannot be met.
- llms.txt was considered and **skipped**: the content set is one page; a
  dedicated LLM guidance file adds metadata duplication without improving
  extractability. This is a follow-up option, not a requirement.

## 6. Localization

- All EN/AR strings are captured verbatim from the official pages (Saudi
  dialect preserved, e.g. "ليش المرسى"، "كيف يشتغل"، "ادفع وخلّص").
  Two source typos were corrected without changing meaning:
  AR "قارب بمحكرك" → "قارب بمحرك", EN "Paddelboard" → "Paddleboard" (and "Dhaw"
  → "Dhow" for the same reason).
- RTL layout, fonts (Cairo), and the locale toggle were already implemented and
  remain untouched.
- **hreflang is N/A by design:** EN/AR share one URL with a client-side
  language switch (the same pattern the production deployment can realistically
  serve today). If/when the app ships real localized routes (`/en`, `/ar`),
  hreflang alternates should be added then.
- **One documented deviation from verbatim (PR #49 review):** the source's
  step-1 wording "photos, marina, capacity, hourly rate" describes listing
  data this lookbook never displays (the page only ships the category
  taxonomy). Per review, the copy was aligned to what the page actually
  shows: "Look through the fleet categories on the web, then book in the
  app" / "تتصفح فئات القوارب واليخوت على الموقع، وتحجز من التطبيق".

## 7. App store links — KNOWN LIMITATION

The official site's own store badges are placeholders (`https://google.com/`).
Inventing real App Store / Google Play URLs is not allowed, and the PR review
(correctly) flagged that store-labelled buttons pointing at the general
website are misleading. The badges were therefore **removed** in favour of a
single neutral CTA — "Visit Al Marsa" / "زيارة المرسى" — in both the
`#download` section and the footer, linking `https://almarsa.app/` with
`rel="noopener"`. The download heading/body (verbatim from the source) still
state that the app is available on iOS and Android. **Follow-up:** when the
owner publishes the real listings, re-introduce proper store badges with real
URLs.

## 8. Validation

Run after each change (see the PR / check-comment for the final numbers):
`npm run typecheck`, `npm test` (Vitest), `npm run build` (production),
plus browser smoke tests in EN and AR at desktop and mobile widths.

## 9. Out of scope / not done

- Real vessel inventory display: the source publishes none (only a demo
  kayak). This repo intentionally shows the category taxonomy only.
- Multi-page routes (`/en/vessels`, vessel detail pages): postponed until the
  official inventory API/data sync exists. Hardcoding a snapshot would violate
  the "keep dynamic data with the backend" rule.
- Search Console verification/sitemap submission/analytics: owner-side task;
  see §Post-deployment in the PR description.

## 10. Follow-up hardening (same PR, second batch)

- **Mobile menu z-index:** the open menu overlay moved from `z-40` to
  `z-[45]` — above the hero's `z-40` slider dots + curved divider (which
  previously painted *over* the open menu per DOM order at equal z-index),
  below the header pill's `z-50` so the close toggle stays clickable.
- **Hamburger on the physical left:** the mobile menu toggle is a direct
  child of the nav pill, pinned `absolute left-3` (non-logical, so RTL keeps
  it physically left too). The brand mark and the theme/locale cluster are
  pinned to the physical right (`right-16 sm:right-40` and `right-3`);
  collision-checked at 320 px, 375 px, and 640 px — ≥20 px clear gap
  everywhere, and the toggle stays left in AR (verified `dir="rtl"`).
- **Favicon:** the official site's `favicon.ico` is **0 bytes** and its
  `<head>` declares no icon at all, so there is nothing "identical" to copy.
  `public/assets/favicon.svg` was instead recreated from the site's own
  header brand mark: three baseline-aligned, fully-rounded sand bars
  (`#e8d39c`) on the deep teal square (`#0d2a2d`), matching the pill's
  3-px mark in shape and colors. Referenced as the only icon +
  JSON-LD `logo`.
- **Social profiles / store listings:** multiple fresh web searches surfaced
  only *unrelated* businesses (Al Marsa Oman, a Kuwaiti seafood restaurant,
  Dubai fisheries, the KAUST yacht club) and different apps (Waves,
  Book-a-Boat). No verifiable social profile or App Store / Google Play
  listing exists for this Al Marsa, so none were added — CTAs remain
  pointed at the official site.
- **Dead-code sweep:** orphaned provisioning-era CSS removed from
  `styles.css` (`.btn`/`.btn-primary`/`.btn-light`/`.btn-outline`, `.field`,
  `.card`/`.card-image`/`.card-content`, `.link-accent`,
  `.section-wrap`/`.section`/`.section-panel`, `.grid-2/3/4`,
  `.gradient-dark*`, `.hover-lift`, `.hover-brighten`, `.glass(-dark)`,
  `.dark-only`/`.light-only`) plus the unreferenced `nav.slides` copy entry,
  and the unused `menu-open` → `menuToggled` event chain across
  `home.component` and the header. Styles bundle: 33.9 kB → 25.3 kB.
  `.eyebrow` and `.marsa-nav` remain (still used).

## 11. Review round (PR #49 — response to owner's change requests)

Consolidated findings from the owner review and their resolutions:

1. **Browse-step overpromise** — copy aligned to the actual lookbook
   (category taxonomy only), see the deviation note in §6.
2. **Store-labelled CTAs pointing at the general website** — both the
   `#download` section and the footer now use a single neutral
   "Visit Al Marsa" CTA; no store branding until listings are verified (§7).
3. **Footer repeat of the same issue** — resolved with the same relabel.
4. **Legacy `/destinations` loading at the top** — now deep-links to `/#how`
   like the other legacy service paths; covered by `app.routes.spec.ts`
   (which previously asserted `undefined` for it).
5. **Root `lang`/`dir` regression test** — added to
   `site-preferences.service.spec.ts`: toggling EN ↔ AR must move
   `document.documentElement.lang` and `dir` in sync.
