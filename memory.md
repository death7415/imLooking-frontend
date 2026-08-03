# Memory

## Durable Project Decisions

- Product type: enterprise-grade dating app frontend.
- Product posture: relationship-oriented, trust-first, privacy-first, accessible, and app-store-safe.
- Frontend stack: React + Vite.
- Global motion stack: `Animate UI` patterns powered by `motion`.
- Global scroll stack: `Lenis` for smooth scrolling and scroll-linked interactions.
- Installed project-local UI/UX skill tooling now includes Impeccable, Taste Skill (`design-taste-frontend`), and Emil Kowalski's skill bundle under `.agents/skills`, with `skills-lock.json` created for the project install state.
- Impeccable `init` product context is now captured in the root `PRODUCT.md`, which should act as the product-truth file for future Impeccable commands in this repo.
- Current visual direction: darker romantic liquid-glass with blob-shaped surfaces, watery refraction, brighter edge sheen, and milky lower-edge clouding, with blush/sea accents carried mainly by the surfaces rather than a fully pale background.
- Architecture posture: modular by domain with shared primitives and centralized providers.
- Phase 0 status: closed.
- Project history rule: `change.log` is the permanent reverse-chronological, append-only work log for every repo change.
- Change scope rule: `change.log` covers code, docs, markdown, JSON, config, comments, formatting, punctuation, spacing, and any other repo edit with no exceptions.
- Timestamp rule: every `change.log` entry uses a full local timestamp in the format `YYYY-MM-DD HH:mm:ss +/-HH:MM`.
- Workflow rule: before any repo task, read `change.log` first.
- Workflow rule: after reading `change.log`, inspect repo diffs/status for unlogged manual or external changes.
- Workflow rule: record any unlogged changes in `change.log` before doing new requested work.
- Workflow rule: after completing new work, prepend the new task entry to `change.log`.
- Phase 0 foundation now includes centralized providers, a router layer, an app shell widget, shared token/global styles, and dedicated placeholder pages.
- Phase 0 baseline now also includes public Terms, Privacy, and community-guidelines surfaces, route-level error fallback handling, shared accessibility primitives, and automated lint/test/performance-budget checks.
- Current route map: `/home`, `/onboarding`, and `/chat` live in the shared app shell, while `/`, `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/age-gate`, and `/consent` live in the auth boundary; `/` is the animated loading entry that transitions into `/login`.
- Public policy route map: `/terms`, `/privacy`, and `/community-guidelines` are available without sign-in.
- Phase 1 milestone 1 decision: auth routing is separated from the main product shell before form implementation begins.
- Current login entry state: `/` is the default first-load splash route and `/login` remains the dedicated sign-in route with its own auth-stage experience.
- Auth layout-shell decision: auth routes now share reusable `AuthStageShell`, `AuthStageCard`, `AuthBrandDock`, and `AuthRoutePanel` primitives so splash, login, and placeholder auth pages all sit on the same responsive foundation.
- Protected-route decision: unauthenticated users are redirected to `/login` when they try to open `/home`, `/chat`, or `/onboarding` directly, using a temporary local session check until real auth wiring is built.
- Brand motion decision: the `imLooking` lockup drops in as separate brand parts on the splash, then reappears docked above the login modal and uses animated eyes as the `oo` with delayed eye landing, continuous look/blink motion, finer upper lash detail, and subtle eyelid/eyeball depth.
- Current backend env decision: the frontend uses a single `VITE_API_BASE_URL` value for now, pointing to `https://imlooking.onrender.com`.
- Current API config decision: backend URL normalization lives in `src/shared/config/env.js`, and centralized relative endpoint definitions live in `src/shared/config/api.js`.
- Phase 1 planning decision: legal links for Terms, Privacy, and community guidelines on signup and other required auth/trust-gate surfaces are now tracked as their own milestone instead of being implied only by Phase 0 policy pages.
- Auth legal-links decision: the auth flow now uses a shared `AuthLegalLinks` component so login and auth-route-panel surfaces expose Terms, Privacy Policy, and Community Guidelines from one reusable footer pattern.
- Policy-route back-navigation decision: auth legal links now pass the current route as navigation state, and public policy pages expose a shared back button that returns users to their origin when available.
- Auth primitives decision: shared auth text/password/checkbox/helper/error/submit primitives now live in `src/features/auth/components` and should be reused for the remaining Phase 1 auth forms instead of hand-rolling each screen.
- Auth package-structure decision: auth now follows a stricter feature boundary with `components`, `screens`, and `model`, and the reusable component layer is grouped by intent into `brand`, `feedback`, `fields`, `layout`, and `navigation`, with `src/features/auth/index.js` acting as the public feature API.
- Login screen decision: the current login surface is phone-first, shows the phone number field by default for OTP-based access, and exposes email or username plus password only as the reusable alternate login path.
- Login OTP decision: the phone-number login path currently stops at a frontend OTP-dispatch placeholder and intentionally defers real OTP delivery and code verification to the later auth-flow wiring milestone.
- Auth route-panel decision: the shared auth placeholder panel now supports an optional footer action so route-specific helpers like `Back to login` can be added without forking the layout component.
- Signup screen decision: the signup route now uses a dedicated frontend experience with controlled full-name, email, mobile, username, password, confirm-password, DOB, and auto-derived age state, plus legal/community consent checkboxes and gated continue behavior.
- Signup verification decision: email and mobile verification are both required on the signup form, and the current frontend uses temporary demo OTP auto-verification placeholders until real backend OTP endpoints are ready.
- Signup username decision: username availability is checked through a debounced frontend placeholder flow so the UI waits for typing to settle before validating handle availability.
- Forgot-password decision: the recovery route now uses a dedicated screen with controlled identifier entry and generic success messaging so the flow stays usable without exposing account-existence signals.
- Reset-password decision: the reset route now supports dedicated invalid and expired token UI states through the query string while keeping password-entry and confirm-password behavior on the ready state.
- Age-gate decision: the age-gate route now uses an explicit eligible-versus-underage choice screen, blocks progression for underage selection, and sends eligible users forward to consent.
- Consent decision: the consent route now uses an explicit checkbox checkpoint for Terms, Privacy Policy, and Community Guidelines, blocks progression until all are accepted, and passes users back into signup when it is used as part of the auth path.
- Validation decision: shared email, phone-number, required-field, password, and confirm-password rules now live in the auth model so auth screens reuse one validation contract instead of drifting independently.
- Temporary auth-session decision: successful frontend login writes a local placeholder authenticated session so protected-route redirects, signup handoff, and reset-password handoff can be tested before backend auth APIs are live.

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
- Baseline quality gate decision: `lint`, `test`, `build`, and `perf:check` together define the current Phase 0 repo health baseline.

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
