# Al Marsa Content Migration, SEO & GEO — Implementation Notes

**Scope:** Complete content migration from the official brand platform [almarsa.app](https://almarsa.app/) into this lookbook repository, technical SEO, GEO (Generative Engine Optimization), EN/AR localization alignment, and section enhancements.  
**Content & SEO Lead:** cw-hakam — <cw.mahmoudhakam@gmail.com>

---

## 1. Repository Audit & Historical Baseline

- **Current Stack:** Angular 22.2, standalone components, zoneless change detection (`provideZonelessChangeDetection`), OnPush change detection, Vitest (jsdom), Tailwind with `marsa` design tokens, deployed on Vercel (`https://marsa-yacht.vercel.app/`).
- **Legacy Story Purge:** The legacy repository contained references to a "Red Sea B2B marine provisioning" business with fictional testimonials and unverified phone/email contacts. All fabricated content has been systematically removed.
- **Current Role:** Official web lookbook showcasing the Al Marsa charter ecosystem, driving users to the mobile app for reservations, coastguard clearance, and booking.

---

## 2. Source-of-Truth Inventory (almarsa.app)

Public pages inspected read-only, both English and Arabic:

| Source URL | Section Title | Verification Notes |
| :--- | :--- | :--- |
| `/en`, `/ar` | "Al Marsa — المرسى" | Single-page lookbook: hero, why, how, about, app download |
| `/en/vessels`, `/ar/vessels` | "The fleet" / "القوارب واليخوت" | 19-category taxonomy; single demo listing (Kayak, "1 SAR / hr") |
| `/en/vessels/7`, `/ar/vessels/7` | "Kayak from Almarsa" | Test artifact; no real inventory published on web |

### Verified Core Facts
- **Brand Identity**: Al Marsa (المرسى)
- **Positioning**: "Premium vessel-charter marketplace built for the Gulf — Saudi-first"
- **App-Centric Model**: Web serves as lookbook; app handles KYC, coastguard clearance, deposits, and digital boarding passes.
- **Dialect**: Authentic Saudi Arabic dialect preserved verbatim (e.g. "ليش المرسى", "كيف يشتغل", "ادفع وخلّص").

---

## 3. Migration Mapping

| Source Section | Lookbook Component | Anchor | Implementation Status |
| :--- | :--- | :--- | :--- |
| **Hero** | `HeroComponent` | `/` | Implemented verbatim EN + AR, cinematic background |
| **Why Al Marsa** | `WhyComponent` | `#why` | **Enhanced:** Rebuilt as a Hill Robinson-inspired editorial image-led horizontal slider with 4 portrait cards |
| **How It Works** | `ProductsComponent` | `#how` | 4-step workflow implemented verbatim |
| **Fleet Taxonomy** | `ProductsComponent` | `#how` | Interactive 19-category filter chips (real taxonomy, honest demo state) |
| **About Al Marsa** | `AboutComponent` | `#about` | Company background and maritime vision verbatim |
| **App Download** | `CtaComponent` | `#download` | App download showcase with neutral "Visit Al Marsa" CTA |
| **Legacy Routes** | `/services`, `/destinations`, etc. | `#how`, `#about` | Deep-link compatibility redirects without breaking old bookmarks |

---

## 4. Why Al Marsa — Hill Robinson Rebuild Notes

The "Why Al Marsa" section (`#why`) was redesigned inspired by the editorial aesthetics of Hill Robinson (*"Beyond management → What we do"*):

1. **Editorial Presentation**:
   - 4 full-bleed portrait cards (3:4 aspect ratio) showcasing Gulf yacht cruising, marina anchorage, sun decks, and serene horizon views.
   - Elegant typography with localized numerical eyebrows (`01 — Fleet`, `02 — Trust`, `03 — Seamless`, `04 — Experience`).
2. **Technical Implementation**:
   - Pure CSS `scroll-snap-type: x mandatory` for fluid 60fps scrolling.
   - Bidirectional mouse drag and touch swipe with physics dampening.
   - Automatic RTL coordinate inversion for native Arabic interaction.
   - Accessible keyboard controls (Left / Right arrow navigation).
   - Zero external library bloat (native Angular + CSS).

---

## 5. Technical SEO & GEO

- **Meta Information**: Single title format `"Al Marsa — المرسى"` matching brand standard; verbatim localized meta descriptions.
- **Canonicalization**: Absolute canonical link `https://marsa-yacht.vercel.app/` synchronized with OpenGraph and Twitter cards.
- **Robots & Sitemap**: `robots.txt` points directly to `sitemap.xml`, which indexes the canonical root URL.
- **Structured Data (JSON-LD)**:
  - `Organization`: Declares official brand identity, Arabic alternate name (`المرسى`), brand logo, and official site reference.
  - `WebSite`: Validated schema without fabricated ratings, artificial price ranges, or simulated reviews.

---

## 6. App Store Links — Documented Limitation

The official brand website links its store badges to placeholder destinations (`https://google.com/`). To maintain integrity and prevent misleading UX:
- Store buttons use a neutral label: **"Visit Al Marsa"** / **"زيارة المرسى"**.
- Links point safely to `https://almarsa.app/` with `rel="noopener noreferrer"`.
- When official App Store / Google Play package URLs are published by the brand owner, dedicated badges will be reinstated.

---

## 7. Verification Checklist

- [x] TypeScript strict typechecking passes (`npm run typecheck`)
- [x] Vitest component specs pass (`npm run test`)
- [x] Production build passes budgets (`npm run build`)
- [x] Visual smoke tests verified in English (LTR) and Arabic (RTL)
- [x] Keyboard navigation verified across header, slider, and buttons
