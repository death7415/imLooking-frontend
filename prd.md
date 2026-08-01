# Product Requirements Document

## Product

Enterprise-grade dating application frontend focused on trust, privacy, accessibility, and long-term maintainability.

## Product Intent

We are building a relationship-oriented dating experience, not a low-trust anonymous chat or hookup product. The app must feel premium, safe, inclusive, and fast.

This direction is informed by:

- Apple App Review Guidelines section `1.1.4`, which flags hookup-style and pornographic experiences as unacceptable.
- Apple App Review Guidelines section `1.2`, which requires filtering, reporting, blocking, and reachable contact information for user-generated content.
- Google Play UGC policy, which requires Terms of Use, moderation, in-app reporting, and user blocking for 1:1 interactions and public UGC.

## Primary Users

- Adults looking for meaningful romantic connections.
- Users who expect strong privacy controls before sharing identity, photos, and chat access.
- Mobile-first users who will judge the product quickly on trust, polish, and responsiveness.

## Product Principles

- Safety first: report, block, moderation, and abuse-prevention are core product features, not backlog items.
- Privacy by default: reveal the minimum necessary personal information at each stage.
- Accessibility by default: the app must work for keyboard, screen-reader, reduced-motion, and low-vision users.
- Fast feels trustworthy: the UI must be responsive, stable, and smooth on mid-range devices.
- Honest UX: no dark patterns, fake scarcity, deceptive notifications, or misleading profile states.

## Core Functional Scope

### 1. Account and Access

- Sign up, sign in, sign out, password reset, and session management.
- Email or phone verification before high-risk actions.
- Age gate before profile creation.
- Consent capture for Terms, Privacy Policy, and community rules.

### 2. Profile and Identity

- Structured profile creation with photos, prompts, interests, preferences, and intent.
- Progressive disclosure of sensitive information.
- Clear profile completeness state.
- Verification-ready architecture, even if identity verification ships later.

### 3. Discovery and Matching

- Personalized browsing or card-based discovery.
- Like, pass, undo rules if business allows.
- Match state only when both sides signal interest.
- Clear empty, loading, and retry states.

### 4. Messaging and Interaction

- Match-gated messaging only.
- Block and report available from chat, profile, and content surfaces.
- Abuse-resistant flows for image sharing, links, and spam prevention.
- Safety notices for new conversations and suspicious behavior.

### 5. Trust and Safety

- In-app reporting for users and content.
- User blocking for direct interactions.
- Moderation workflow hooks for backend review tooling.
- Content filtering and escalation-ready event capture.

## Non-Functional Requirements

### Security

- Baseline target: align frontend and platform requirements to OWASP ASVS `v5.0.0`, at least Level 2 for authenticated user journeys.
- Authentication and session decisions must align with current NIST Digital Identity Guidelines Revision 4.
- No secrets in client code or git history.
- No sensitive tokens stored in places that increase theft risk unless there is a documented exception.

### Accessibility

- Conform to WCAG `2.2` AA for all production experiences.
- Full keyboard navigation support.
- Visible focus indicators on every interactive element.
- Reduced-motion mode must preserve task completion.

### Performance

- Core Web Vitals targets at the 75th percentile:
  - `LCP <= 2.5s`
  - `INP <= 200ms`
  - `CLS <= 0.1`
- Avoid layout shift in profile cards, images, and chat loading states.

### Reliability

- No critical user flow may depend on a single unmonitored third-party script.
- Degraded-mode behavior must exist for network loss, timeout, and partial API failure.
- Error messages must help the user recover without leaking sensitive system detail.

## MVP Success Criteria

- A new adult user can sign up, create a profile, browse candidates, like/pass, match, and send a first message.
- A user can report or block another user in under 3 taps from profile and chat.
- Accessibility and performance budgets are met on mobile and desktop.
- App-store policy blockers for dating + UGC are addressed before submission.

## Non-Goals for MVP

- Anonymous chat.
- Public profile ranking or appearance-based voting.
- Sexual-content-forward positioning.
- Complex creator economy, livestreaming, or payments beyond clearly approved business needs.

## References

- Apple App Review Guidelines: [https://developer.apple.com/app-store/review/guidelines/](https://developer.apple.com/app-store/review/guidelines/)
- Google Play UGC Policy: [https://support.google.com/googleplay/android-developer/answer/9876937](https://support.google.com/googleplay/android-developer/answer/9876937)
- OWASP ASVS 5.0.0: [https://owasp.org/www-project-application-security-verification-standard/](https://owasp.org/www-project-application-security-verification-standard/)
- NIST SP 800-63 Revision 4: [https://www.nist.gov/identity-access-management/projects/nist-special-publication-800-63-digital-identity-guidelines](https://www.nist.gov/identity-access-management/projects/nist-special-publication-800-63-digital-identity-guidelines)
- WCAG 2.2: [https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/)
- Web Vitals: [https://web.dev/articles/vitals](https://web.dev/articles/vitals)
