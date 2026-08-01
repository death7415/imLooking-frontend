# Rules

## Decision Rules

- No guessing.
- Always ask when real ambiguity changes architecture, security, data, or user trust.
- Do not jump to conclusions when evidence is incomplete.

## Product Rules

- The app is relationship-oriented, not anonymous, pornographic, or hookup-first.
- Trust and safety features are first-class requirements.
- Every surface that allows user interaction must have a path to report and, where appropriate, block.
- We do not ship dark patterns, fake activity, fake counts, deceptive urgency, or misleading profile states.

## Security Rules

- Security baseline is OWASP ASVS `5.0.0`; major user journeys should be reviewable against Level 2 requirements.
- Authentication design must follow current NIST identity guidance rather than ad hoc password rules.
- Use generic auth failure messaging to reduce account enumeration risk.
- Session IDs or tokens must never contain PII or business data.
- Never place secrets, API keys, private certificates, or signing material in the frontend repo.
- CSP, HTTPS, and secure cookie/session practices are mandatory in production.

## Privacy Rules

- Collect only data required for the feature and business purpose.
- Sensitive profile fields must be optional unless required by law, safety, or core matching quality.
- Privacy settings must be understandable without legal interpretation.
- Deletion, logout, and session invalidation flows must be straightforward.

## Accessibility Rules

- All shipped UI targets WCAG `2.2` AA.
- Keyboard access is required everywhere.
- Focus states must be visible and consistent.
- Motion must respect reduced-motion preferences.
- Glass or blur effects can never reduce readability below accessible contrast.

## Performance Rules

- Every feature must preserve Core Web Vitals budgets:
  - `LCP <= 2.5s`
  - `INP <= 200ms`
  - `CLS <= 0.1`
- No uncontrolled third-party widgets on critical flows.
- Images, animation, and scroll effects must degrade gracefully on lower-end devices.

## Engineering Rules

- Environment-specific values live in env vars, not source code.
- All app telemetry uses consistent semantic naming.
- Shared UI primitives must solve semantics, focus, and error states once for reuse everywhere.
- New dependencies require a written justification: why it is needed, bundle impact, maintenance risk, and security posture.
- Any feature touching auth, chat, payments, moderation, or personal data requires explicit test coverage.
- Every change must be recorded in `change.log`, including tiny edits such as punctuation, spacing, wording, formatting, or comment-only updates.
- `change.log` is append-only history in reverse chronological order: newest entry on top, older entries preserved below.
- Every `change.log` entry must use a full local timestamp in the format `YYYY-MM-DD HH:mm:ss ±HH:MM`.
- No `change.log` entry is deleted, rewritten, or compacted unless the user explicitly asks for that.

## Delivery Rules

- No release without:
  - auth happy path and failure path tested
  - report/block path tested
  - accessibility spot checks completed
  - performance budget reviewed
  - production config reviewed
- No substantial task is complete until its summary has been added to `change.log`.

## References

- OWASP ASVS: [https://owasp.org/www-project-application-security-verification-standard/](https://owasp.org/www-project-application-security-verification-standard/)
- OWASP Authentication Cheat Sheet: [https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- OWASP Session Management Cheat Sheet: [https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- OWASP User Privacy Protection Cheat Sheet: [https://cheatsheetseries.owasp.org/cheatsheets/User_Privacy_Protection_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/User_Privacy_Protection_Cheat_Sheet.html)
- MDN CSP: [https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP)
- WCAG 2.2: [https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/)
