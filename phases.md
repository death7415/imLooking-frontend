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
  - Build a reusable login-method choice between phone-number OTP and email-or-username plus password.
  - Add the correct field set, CTA, forgot-password support for the password path, and disabled/loading/error states.
- Milestone 5: Signup screen
  - Build full name, email, mobile number, username, password, confirm password, DOB, derived age, consent checkboxes, and create-account CTA.
  - Require frontend email-pattern validation, debounced username availability checks, age restriction handling, and gated email/mobile verification states.
- Milestone 6: Forgot password screen
  - Build identifier input, submit CTA, and generic success/failure messaging.
- Milestone 7: Reset password screen
  - Build new password, confirm password, submit CTA, and invalid or expired token state UI.
- Milestone 8: Age gate screen
  - Build age confirmation UI, underage rejection state, and eligible continue path.
- Milestone 9: Consent screen
  - Build Terms, Privacy, and community-rules acknowledgment flow with blocked progression until accepted.
- Milestone 10: Legal policy links on auth surfaces
  - Add Terms, Privacy, and community-guidelines links to signup and any other required pre-auth or trust-gate surfaces.
  - Keep legal navigation visible anywhere users must review policy before consent or account creation.
- Milestone 11: Validation rules
  - Add required field handling, email or phone validation, password rule messaging, and generic auth failure wording.
  - Avoid account-enumeration leakage in all auth copy.
- Milestone 12: Auth flow wiring
  - Connect login, signup, forgot-password, reset-password, age-gate, and consent flows.
  - Define default post-auth redirect behavior.
- Milestone 13: Protected route placeholder
  - Add guest-only route behavior, protected-route wrapper, and redirect fallback behavior.
- Milestone 14: Accessibility pass
  - Validate labels, focus order, keyboard navigation, screen-reader error feedback, and reduced-motion support.
- Milestone 15: Phase 1 UI polish
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
10. Legal policy links on auth surfaces
11. Validation rules
12. Auth flow wiring
13. Protected route placeholder
14. Accessibility pass
15. Phase 1 UI polish

### Current Progress

- Milestone 1 complete: auth route planning is now codified in the router.
- Added planned auth routes for `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/age-gate`, and `/consent`.
- Split routing intent between the shared app shell and a dedicated auth boundary for future auth layout work.
- Replaced the generic auth placeholders with a shared auth-route panel so every auth route now sits on the same responsive auth-stage structure.
- Milestone 2 complete: auth routes now share a dedicated auth stage shell, reusable auth glass-card container, and responsive auth page structure before deeper form wiring begins.
- Milestone 3 complete: shared auth text field, password field, checkbox field, submit button, helper text, and inline error primitives now exist in the auth UI layer, and the login surface has already moved onto those shared building blocks.
- Milestone 3 structure refinement: the auth feature now follows a stricter package boundary with `components`, `screens`, and `model`, and the reusable component layer is grouped into `brand`, `feedback`, `fields`, `layout`, and `navigation`.
- Milestone 4 complete: the login screen now defaults to phone-number OTP entry and exposes email-or-username plus password as the reusable alternate login path.
- Milestone 4 currently uses the phone path as an OTP-dispatch placeholder and keeps the email-or-username path on password entry with forgot-password navigation, disabled CTA behavior, loading feedback, and generic frontend-only status messaging until backend auth wiring lands.
- Milestone 5 complete: the signup screen now has controlled full-name, email, mobile-number, username, password, confirm-password, DOB, and auto-derived age fields, plus legal/community consent checkboxes and a create-account CTA.
- Milestone 5 frontend validation now covers email format, debounced username availability, password confirmation, and 18+ age gating, while real backend verification and signup requests remain deferred to the auth-flow wiring milestone.
- Milestone 5 contact-verification placeholder now requires both email and mobile OTP actions on the form, with temporary demo auto-verification until backend OTP endpoints are ready.
- Milestone 6 complete: forgot-password now has a dedicated recovery screen with controlled identifier entry, a submit CTA, loading feedback, and generic non-enumerating recovery messaging.
- Milestone 7 complete: reset-password now has a dedicated screen with new-password and confirm-password fields, a submit CTA, and invalid-or-expired token UI states driven from the route query string.
- Milestone 8 complete: age-gate now has a dedicated confirmation screen with explicit eligible versus underage choices, a blocked underage state, and a continue path into consent.
- Milestone 9 complete: consent now has a dedicated acknowledgment screen with blocked progression until Terms, Privacy Policy, and Community Guidelines are all accepted, and it can hand users back into signup.
- Milestone 10 complete: legal links for Terms, Privacy Policy, and community guidelines now render on the shared auth route panel and the current login surface, covering signup and the required pre-auth or trust-gate pages.
- Milestone 11 complete: shared auth validation rules now cover reusable email, phone, password, confirm-password, and required-field handling so login, signup, forgot-password, and reset-password use one generic validation layer.
- Milestone 12 complete: auth flow wiring now advances age-gate into consent, consent back into signup, signup into login, reset-password into login, and login into either the requested protected route or `/home` with a local placeholder auth session.
- Milestone 13 has started: `/home`, `/chat`, and `/onboarding` now sit behind a protected-route wrapper so direct guest navigation redirects back to `/login`.

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
