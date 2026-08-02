# Memory

## Durable Project Decisions

- Product type: enterprise-grade dating app frontend.
- Product posture: relationship-oriented, trust-first, privacy-first, accessible, and app-store-safe.
- Frontend stack: React + Vite.
- Global motion stack: `Animate UI` patterns powered by `motion`.
- Global scroll stack: `Lenis` for smooth scrolling and scroll-linked interactions.
- Current visual direction: darker romantic liquid-glass with blob-shaped surfaces, watery refraction, brighter edge sheen, and milky lower-edge clouding, with blush/sea accents carried mainly by the surfaces rather than a fully pale background.
- Architecture posture: modular by domain with shared primitives and centralized providers.
- Project history rule: `change.log` is the permanent reverse-chronological, append-only work log for every repo change.
- Change scope rule: `change.log` covers code, docs, markdown, JSON, config, comments, formatting, punctuation, spacing, and any other repo edit with no exceptions.
- Timestamp rule: every `change.log` entry uses a full local timestamp in the format `YYYY-MM-DD HH:mm:ss +/-HH:MM`.
- Workflow rule: before any repo task, read `change.log` first.
- Workflow rule: after reading `change.log`, inspect repo diffs/status for unlogged manual or external changes.
- Workflow rule: record any unlogged changes in `change.log` before doing new requested work.
- Workflow rule: after completing new work, prepend the new task entry to `change.log`.
- Phase 0 foundation now includes centralized providers, a router layer, an app shell widget, shared token/global styles, and dedicated placeholder pages.
- Current route map: `/home`, `/onboarding`, and `/chat` live in the shared app shell, while `/`, `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/age-gate`, and `/consent` live in the auth boundary; `/` is the animated loading entry that transitions into `/login`.
- Phase 1 milestone 1 decision: auth routing is separated from the main product shell before form implementation begins.
- Current login entry state: `/` is the default first-load splash route and `/login` remains the dedicated sign-in route with its own auth-stage experience.
- Brand motion decision: the `imLooking` lockup drops in as separate brand parts on the splash, then reappears docked above the login modal and uses animated eyes as the `oo` with delayed eye landing, continuous look/blink motion, finer upper lash detail, and subtle eyelid/eyeball depth.

## Standards We Are Anchoring To

- OWASP ASVS `5.0.0` as the security verification baseline.
- NIST SP `800-63` Revision 4 for identity and authentication direction.
- WCAG `2.2` AA for accessibility.
- Core Web Vitals targets at the 75th percentile:
  - `LCP <= 2.5s`
  - `INP <= 200ms`
  - `CLS <= 0.1`
- Twelve-Factor principles for config, logs, and service boundaries.
- OpenTelemetry semantic conventions for telemetry naming consistency.

## App Store and Policy Constraints

- Apple requires UGC apps to support filtering, reporting, blocking, and contactability.
- Apple treats hookup-style, pornographic, anonymous-abuse, and objectification-led experiences as high-risk or unacceptable.
- Google Play requires Terms acceptance, moderation, in-app reporting, and user blocking for UGC and direct interactions.
- Incidental sexual content must be filtered by default and kept away from minors on Google Play.

## Product Guardrails

- Do not design toward anonymous random chat.
- Do not ship public ranking/objectification mechanics like hot-or-not voting.
- Do not rely on heavy glass effects that reduce contrast or task clarity.
- Do not treat trust and safety as post-MVP work.

## Working Assumptions

- Backend authorization is authoritative.
- The frontend should never hold secrets that belong on the server.
- Moderation, analytics, and messaging will be treated as attached services.
- Every implementation step and every file edit should update both the relevant docs and `change.log`.
- Structural work should land in the app/page/widget/shared layout unless there is a documented reason to break that boundary.

## Source Anchors

- Apple App Review Guidelines: [https://developer.apple.com/app-store/review/guidelines/](https://developer.apple.com/app-store/review/guidelines/)
- Google Play UGC Policy: [https://support.google.com/googleplay/android-developer/answer/9876937](https://support.google.com/googleplay/android-developer/answer/9876937)
- OWASP ASVS 5.0.0: [https://owasp.org/www-project-application-security-verification-standard/](https://owasp.org/www-project-application-security-verification-standard/)
- OWASP Authentication Cheat Sheet: [https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- OWASP Session Management Cheat Sheet: [https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- OWASP User Privacy Protection Cheat Sheet: [https://cheatsheetseries.owasp.org/cheatsheets/User_Privacy_Protection_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/User_Privacy_Protection_Cheat_Sheet.html)
- NIST SP 800-63 Revision 4: [https://www.nist.gov/identity-access-management/projects/nist-special-publication-800-63-digital-identity-guidelines](https://www.nist.gov/identity-access-management/projects/nist-special-publication-800-63-digital-identity-guidelines)
- WCAG 2.2: [https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/)
- Web Vitals: [https://web.dev/articles/vitals](https://web.dev/articles/vitals)
- Twelve-Factor App: [https://12factor.net/](https://12factor.net/)
- OpenTelemetry Semantic Conventions: [https://opentelemetry.io/docs/concepts/semantic-conventions/](https://opentelemetry.io/docs/concepts/semantic-conventions/)
