# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Adults seeking meaningful romantic relationships rather than anonymous or hookup-led interactions.
- Privacy-conscious users who want a trustworthy, polished, and emotionally safe dating experience before sharing identity, photos, or messages.
- Mobile-first users who judge trust, clarity, and product quality quickly during onboarding and login.

## Product Purpose

`imLooking` is a trust-first dating frontend for adults seeking serious romantic connection. The product should make sign-up, profile creation, discovery, matching, and conversation feel private, safe, premium, and easy to understand, while staying app-store-safe and accessible.

Success means a new adult user can confidently enter the product, understand its safety posture, create a profile, discover compatible people, and communicate only inside guarded, consent-aware flows.

## Positioning

The product differentiates through trust, privacy, and premium clarity rather than anonymous chat, hookup framing, or attention-hacking mechanics. A neighboring dating product might copy visual polish, but it should not be able to truthfully copy the same trust-first, privacy-first, serious-relationship posture without changing its core product behavior.

## Operating Context

- Web frontend built in React and Vite.
- Login-first entry flow with a branded splash/loading step before sign-in.
- Adults must pass age/consent-oriented entry surfaces before full product access.
- Protected routes gate private product areas such as home, onboarding, and chat.
- Product quality is evaluated against accessibility, performance, and safety expectations before deeper feature rollout.

## Capabilities and Constraints

- Confirmed capabilities: login, signup, forgot/reset password routes, age gate, consent, policy surfaces, protected private routes, and shared auth-stage foundations.
- Expected MVP capabilities: profile creation, discovery, matching, messaging, report, and block flows.
- Constraint: the product must remain app-store-safe for dating plus user-generated content.
- Constraint: trust and safety features are core product behavior, not optional later polish.
- Constraint: backend auth will be authoritative when implemented; the frontend is currently using placeholder session logic for protected-route behavior.
- Undecided product facts: the final matching model, verification depth, moderation tooling depth, and post-login feature sequencing are not yet locked in this file.

## Brand Commitments

- Product name: `imLooking`.
- Brand posture: romantic, premium, modern, and emotionally safe.
- Product tone must stay trust-first, privacy-first, and serious-relationship-oriented.
- The product must not drift toward anonymous random chat, public ranking, or overtly sexual/hookup-forward positioning.

## Evidence on Hand

- Existing product planning in [prd.md](/C:/Users/700fps%20Garib%20Rath/Documents/frontend/prd.md).
- Existing visual system guidance in [design.md](/C:/Users/700fps%20Garib%20Rath/Documents/frontend/design.md).
- Existing auth splash/login implementation and protected-route shell in the current React codebase.
- Existing public policy surfaces for terms, privacy, and community guidelines.
- No real customer testimonials, production analytics, or verified live-user evidence are present in-repo today and future design work must not fabricate them.

## Product Principles

- Safety is product, not decoration.
- Privacy is earned through progressive disclosure and clear consent.
- Serious intent should feel calm, premium, and trustworthy rather than gamified or chaotic.
- Accessibility and clarity are baseline product quality, not optional hardening.
- The frontend should make private interaction feel understandable and controlled at every step.

## Accessibility & Inclusion

- Target accessibility standard: WCAG 2.2 AA.
- Primary flows must support keyboard navigation, visible focus, readable contrast, and reduced-motion-safe interaction.
- The product should avoid exclusionary assumptions around device, dexterity, or prior dating-app literacy.
