# Architecture

## Architecture Goal

Build a modular React frontend that can scale from MVP to enterprise product without a rewrite.

## Architecture Principles

- Modular by domain, not by file type alone.
- Thin pages, reusable features, isolated shared primitives.
- Strong separation between UI, state orchestration, API access, and platform providers.
- Secure-by-default client behavior.
- Observable by default through structured telemetry.
- Configurable by environment, never by hardcoded deploy-specific values.

## Target Frontend Stack

- `React` for UI composition.
- `Vite` for local development and production bundling.
- `Animate UI` components for product motion patterns.
- `Lenis` for smooth scroll and scroll-linked experiences only.
- `Motion` as the underlying animation runtime.

## Recommended Module Layout

```text
src/
  app/
    providers/
    router/
    styles/
  pages/
  widgets/
  features/
    auth/
    onboarding/
    discovery/
    matching/
    chat/
    moderation/
  entities/
    user/
    profile/
    match/
    message/
  shared/
    api/
    config/
    hooks/
    lib/
    ui/
    telemetry/
    types/
```

## Current Implemented Foundation

The project now implements the first slice of that structure:

```text
src/
  app/
    providers/AppProviders.jsx
    router/AppRouter.jsx
    router/route-paths.js
    styles/
      global.css
      tokens.css
  features/
    auth/
      ui/
        AuthBrandMark.jsx
        AuthBrandMark.css
        LoadingExperience.jsx
        LoadingExperience.css
        LoginExperience.jsx
        LoginExperience.css
  pages/
    age-gate/AgeGatePage.jsx
    chat/ChatPage.jsx
    consent/ConsentPage.jsx
    forgot-password/ForgotPasswordPage.jsx
    home/HomePage.jsx
    loading/LoadingPage.jsx
    login/LoginPage.jsx
    onboarding/OnboardingPage.jsx
    reset-password/ResetPasswordPage.jsx
    signup/SignupPage.jsx
  shared/
    ui/
      foundation-panel/
        FoundationPanel.jsx
        FoundationPanel.css
  widgets/
    auth-route-boundary/
      AuthRouteBoundary.jsx
      AuthRouteBoundary.css
    app-shell/
      AppShell.jsx
      AppShell.css
  App.jsx
  main.jsx
```

## Current Route Map

- `/home`: foundation home placeholder
- `/onboarding`: profile and consent placeholder
- `/chat`: messaging placeholder
- `/`: animated loading splash route
- `/login`: auth boundary route
- `/signup`: auth boundary route
- `/forgot-password`: auth boundary route
- `/reset-password`: auth boundary route
- `/age-gate`: auth boundary route
- `/consent`: auth boundary route
## Layer Responsibilities

- `app`: global providers, routing, app bootstrap, theme, auth/session shell.
- `pages`: route-level composition only.
- `widgets`: composed screen sections reused across pages.
- `features`: user-facing business actions and flows.
- `entities`: domain models and local business rules.
- `shared`: low-level reusable code with no product-specific assumptions.

## API and Configuration

- Treat APIs, auth, analytics, storage, moderation, and media services as attached resources.
- Store deploy-specific configuration in environment variables, following Twelve-Factor config guidance.
- One typed API client per backend boundary.
- All client-side API calls pass through centralized request, retry, timeout, and error-normalization code.

## Security Architecture

- Authentication state must be server-authoritative.
- Prefer secure cookie-based sessions or equivalent backend-controlled session architecture over exposing long-lived tokens to app code.
- Frontend must never authorize by UI hiding alone; backend authorization remains mandatory.
- Apply CSP, HTTPS-only transport, and anti-clickjacking headers at the edge.
- Sensitive actions should support step-up or re-auth flows when risk is elevated.

## Observability

- Use OpenTelemetry semantic conventions for traces, metrics, logs, and resource attributes so naming is standardized across code and platforms.
- Frontend telemetry must include:
  - route transitions
  - API latency
  - user-visible errors
  - moderation/report actions
  - performance budgets
- Logs are event streams, not local files. The app emits structured events; the runtime/platform handles routing and retention.

## Performance Architecture

- Route-level code splitting.
- Lazy-load heavy motion, media, and chat subsystems.
- Pre-size media containers to minimize CLS.
- Use list virtualization where message or discovery surfaces can grow large.
- Ship mobile-first responsive assets and image variants.

## Accessibility Architecture

- Design-system primitives own focus, semantics, keyboard support, and reduced-motion handling.
- Accessibility must be solved at the component layer so features inherit it by default.

## Foundation Status

- Global providers are centralized in `app/providers`.
- Routing is centralized in `app/router`.
- Shared visual tokens and base styles are centralized in `app/styles`.
- Feature pages currently exist as route placeholders so future work can land without structural rewrites.
- Auth route planning is now codified in the router with a dedicated auth boundary separated from the shared app shell.
- The app now opens on a feature-level loading splash before handing off to the login route.
- The login route now uses a feature-level auth UI component instead of a generic placeholder panel.

## Inference

The exact folder structure above is a project decision, not a standard copied from one source. It is an engineering synthesis based on current React ecosystem practice plus the operational requirements implied by OWASP, WCAG, Twelve-Factor, Core Web Vitals, and OpenTelemetry guidance.

## References

- Twelve-Factor Config: [https://12factor.net/config](https://12factor.net/config)
- Twelve-Factor Backing Services: [https://12factor.net/backing-services](https://12factor.net/backing-services)
- Twelve-Factor Logs: [https://12factor.net/logs](https://12factor.net/logs)
- OpenTelemetry Semantic Conventions: [https://opentelemetry.io/docs/concepts/semantic-conventions/](https://opentelemetry.io/docs/concepts/semantic-conventions/)
- MDN CSP Guide: [https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP)
