# Memory

## Durable Project Decisions

- Product type: enterprise-grade dating app frontend.
- Product posture: relationship-oriented, trust-first, privacy-first, accessible, and app-store-safe.
- Frontend stack: React + Vite.
- Global motion stack: `Animate UI` patterns powered by `motion`.
- Global scroll stack: `Lenis` for smooth scrolling and scroll-linked interactions.
- Architecture posture: modular by domain with shared primitives and centralized providers.
- Project history rule: `change.log` is the permanent reverse-chronological, append-only work log for every change, including tiny edits such as punctuation, spacing, wording, formatting, and comment-only updates.
- Timestamp rule: every `change.log` entry uses a full local timestamp in the format `YYYY-MM-DD HH:mm:ss ±HH:MM`.

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
