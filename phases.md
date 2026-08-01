# Phases

## Phase 0: Foundation

- Establish app shell, routing, environment config, telemetry, error handling, and design tokens.
- Wire global motion and scroll systems responsibly.
- Define Terms, Privacy, and community-policy surfaces.

### Exit Criteria

- Build, lint, and test baselines pass.
- Performance budget is measurable.
- Accessibility primitives exist for buttons, inputs, dialogs, sheets, toasts, and navigation.

## Phase 1: Authentication and Safety Gate

- Login, signup, password reset, verification, and session management.
- Age gate and consent capture.
- Generic auth failure responses and abuse protections.

### Exit Criteria

- Secure auth flows are production-shaped.
- Session behavior is documented.
- Auth UX meets keyboard and screen-reader expectations.

## Phase 2: Onboarding and Profile

- Profile creation, media upload, prompts, interests, preferences, and privacy controls.
- Progressive disclosure of identity and intent.

### Exit Criteria

- Users can create and edit a complete profile.
- Sensitive fields have privacy defaults.
- Media and form flows meet performance and accessibility budgets.

## Phase 3: Discovery and Matching

- Home screen, recommendation feed, card stack or browse list, like/pass, and match creation.
- Empty states, loading states, and degraded network states.

### Exit Criteria

- Discovery interactions are responsive on mobile.
- Recommendation surfaces avoid layout shift.
- Telemetry captures browse, like, pass, and match conversion events.

## Phase 4: Messaging and Trust & Safety

- Match-gated chat.
- Report and block from profile, chat, and content-level actions.
- Moderation hooks and abuse-state UX.

### Exit Criteria

- In-app report and block are live and easy to access.
- Moderation events are auditable.
- App-store UGC requirements are satisfied for direct interaction surfaces.

## Phase 5: Quality Hardening

- Accessibility audit.
- Security review against OWASP ASVS control map.
- Performance tuning against Web Vitals targets.
- App store readiness and submission artifacts.

### Exit Criteria

- WCAG `2.2` AA review complete for critical flows.
- Core Web Vitals budgets met at target percentile.
- Policy checklist reviewed for Apple and Google submission.

## Phase 6: Post-Launch Maturity

- Experimentation framework.
- Better matching intelligence.
- Trust scoring, profile verification, and advanced moderation tooling.
- Retention, reactivation, and lifecycle messaging.

### Exit Criteria

- Each new system has clear owner, telemetry, rollback plan, and abuse considerations.

## References

- Apple App Review Guidelines: [https://developer.apple.com/app-store/review/guidelines/](https://developer.apple.com/app-store/review/guidelines/)
- Google Play UGC Policy: [https://support.google.com/googleplay/android-developer/answer/9876937](https://support.google.com/googleplay/android-developer/answer/9876937)
- Web Vitals: [https://web.dev/articles/vitals](https://web.dev/articles/vitals)
- WCAG 2.2: [https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/)
