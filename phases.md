# Phases

## Phase 0: Foundation

Status: Closed

- Establish app shell, routing, environment config, telemetry, error handling, and design tokens.
- Wire global motion and scroll systems responsibly.
- Define Terms, Privacy, and community-policy surfaces.

### Current Progress

- Closed Phase 0 after completing the first router-based shell and page foundation.
- Added root providers for motion and Lenis in a dedicated provider layer.
- Added public Terms, Privacy, and community-guidelines routes plus route-level error fallback handling.
- Added shared design tokens, global styles, and accessibility primitives for buttons, inputs, dialogs, sheets, toasts, and navigation.
- Added baseline `lint`, `test`, `build`, and `perf:check` verification so quality and bundle limits are measurable.

### Exit Criteria

- Met: build, lint, and test baselines pass.
- Met: performance budget is measurable.
- Met: accessibility primitives exist for buttons, inputs, dialogs, sheets, toasts, and navigation.

## Phase 1: Authentication and Safety Gate

- Milestone 1: Auth route planning
  - Finalize auth routes such as `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/age-gate`, and `/consent`.
  - Decide which routes stay in the shared shell and which use a dedicated auth layout.
- Milestone 2: Auth layout shell
  - Build a dedicated auth layout and reusable auth card container.
  - Establish responsive auth page structure before form work begins.
- Milestone 3: Shared auth primitives
  - Create shared inputs, password input, checkbox, submit button, helper text, and inline error components.
- Milestone 4: Login screen
  - Build identifier field, password field, login CTA, forgot-password link, and disabled/loading/error states.
- Milestone 5: Signup screen
  - Build name, identifier, password, consent checkboxes, create-account CTA, and disabled/loading/error states.
- Milestone 6: Forgot password screen
  - Build identifier input, submit CTA, and generic success/failure messaging.
- Milestone 7: Reset password screen
  - Build new password, confirm password, submit CTA, and invalid or expired token state UI.
- Milestone 8: Age gate screen
  - Build age confirmation UI, underage rejection state, and eligible continue path.
- Milestone 9: Consent screen
  - Build Terms, Privacy, and community-rules acknowledgment flow with blocked progression until accepted.
- Milestone 10: Validation rules
  - Add required field handling, email or phone validation, password rule messaging, and generic auth failure wording.
  - Avoid account-enumeration leakage in all auth copy.
- Milestone 11: Auth flow wiring
  - Connect login, signup, forgot-password, reset-password, age-gate, and consent flows.
  - Define default post-auth redirect behavior.
- Milestone 12: Protected route placeholder
  - Add guest-only route behavior, protected-route wrapper, and redirect fallback behavior.
- Milestone 13: Accessibility pass
  - Validate labels, focus order, keyboard navigation, screen-reader error feedback, and reduced-motion support.
- Milestone 14: Phase 1 UI polish
  - Clean up responsive behavior, spacing, loading states, error states, and final auth copy.

### Recommended Order

1. Auth route planning
2. Auth layout shell
3. Shared auth primitives
4. Login screen
5. Signup screen
6. Forgot password screen
7. Reset password screen
8. Age gate screen
9. Consent screen
10. Validation rules
11. Auth flow wiring
12. Protected route placeholder
13. Accessibility pass
14. Phase 1 UI polish

### Current Progress

- Milestone 1 complete: auth route planning is now codified in the router.
- Added planned auth routes for `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/age-gate`, and `/consent`.
- Split routing intent between the shared app shell and a dedicated auth boundary for future auth layout work.
- Replaced the generic auth placeholders with a shared auth-route panel so every auth route now sits on the same responsive auth-stage structure.
- Milestone 2 complete: auth routes now share a dedicated auth stage shell, reusable auth glass-card container, and responsive auth page structure before deeper form wiring begins.
- Milestone 4 has started visually: the login flow now includes an animated `imLooking` loading screen plus the temporary login form UI and auth-first entry treatment.
- Milestone 12 has started: `/home`, `/chat`, and `/onboarding` now sit behind a protected-route wrapper so direct guest navigation redirects back to `/login`.

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
