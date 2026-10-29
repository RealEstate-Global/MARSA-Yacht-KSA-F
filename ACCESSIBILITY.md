# Accessibility

MARSA is a bilingual (English/Arabic) booking and provisioning experience for
yacht owners, captains, crew, and VIP travelers. People using keyboards only,
screen readers, magnification, or reduced-motion settings should be able to
complete the site's core tasks: reading content, navigating sections, and
submitting a service or provisioning request.

## Priorities

- Keyboard operability for every interactive control, including the request
  dialog and the mobile menu
- Programmatic association of labels, errors, and result announcements with
  the fields they describe
- Honouring the `prefers-reduced-motion` setting (the hero autoplay stops)
- Both languages receive the same information; Arabic layouts run RTL

## How to report a barrier

Open a GitHub issue using the `bug` label and include the word
"accessibility" in the title or body. Describe the page, the control, what
happened, and what you expected. Screenshots, screen-reader output, or short
recordings help but are optional — you never need to disclose a disability.

Reporters can expect a maintainer response, and fixes are prioritised
alongside functional bugs: barriers that block completing a task are treated
as high severity (P1), significant-but-workable barriers as P2, and
convenience issues as P3.

## Ownership and maintenance

Accessibility review is part of every PR that touches templates or styles.
The maintainers listed in [.github/CODEOWNERS](.github/CODEOWNERS) review
layout and interaction changes; accessibility issues are triaged with normal
bug flow.

## Supported environments

Development testing covers Chromium-based browsers, Firefox, and WebKit via
manual passes on desktop and mobile viewports (360 px, 768 px, 1280 px, and
wider) in both LTR and RTL. Assistance is verified with keyboard-only
navigation and VoiceOver/NVDA spot checks rather than a formal audit
combination. No WCAG conformance claim is made until a full evaluation is
done.

## Known limitations

- No formal third-party audit or WCAG 2.x AA certification has been
  performed; the statements above reflect verified fixes and manual checks
- Automated tests cover behaviour (focus, messaging, motion gating), not
  visual contrast — colour changes should be contrast-checked manually
- Share/social images (`og:image`) use relative URLs until the production
  domain is confirmed; that affects previews, not accessibility on-site
