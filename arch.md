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
  scripts/
    lint.mjs
    check-performance-budget.mjs
  features/
    auth/
      model/
        auth-session.js
      ui/
        AuthBrandDock.jsx
        AuthBrandDock.css
        AuthBrandMark.jsx
        AuthBrandMark.css
        AuthRoutePanel.jsx
        AuthRoutePanel.css
        AuthStageCard.jsx
        AuthStageCard.css
        AuthStageShell.jsx
        AuthStageShell.css
        LoadingExperience.jsx
        LoadingExperience.css
        LoginExperience.jsx
        LoginExperience.css
  pages/
    age-gate/AgeGatePage.jsx
    chat/ChatPage.jsx
    community-guidelines/CommunityGuidelinesPage.jsx
    consent/ConsentPage.jsx
    error/RouteErrorPage.jsx
    forgot-password/ForgotPasswordPage.jsx
    home/HomePage.jsx
    loading/LoadingPage.jsx
    login/LoginPage.jsx
    onboarding/OnboardingPage.jsx
    privacy/PrivacyPage.jsx
    reset-password/ResetPasswordPage.jsx
    signup/SignupPage.jsx
    terms/TermsPage.jsx
  shared/
    config/
      performance-budget.js
    ui/
      button/
        Button.jsx
        Button.css
      dialog/
        Dialog.jsx
        Dialog.css
      foundation-panel/
        FoundationPanel.jsx
        FoundationPanel.css
      input-field/
        InputField.jsx
        InputField.css
      navigation-menu/
        NavigationMenu.jsx
        NavigationMenu.css
      sheet/
        Sheet.jsx
        Sheet.css
      toast/
        Toast.jsx
        Toast.css
  widgets/
    auth-route-boundary/
      AuthRouteBoundary.jsx
      AuthRouteBoundary.css
    app-shell/
      AppShell.jsx
      AppShell.css
    protected-app-route/
      ProtectedAppRoute.jsx
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
- `/terms`: public policy route
- `/privacy`: public policy route
- `/community-guidelines`: public policy route
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
- Track baseline bundle budgets in shared config and validate them against production build output.

## Accessibility Architecture

- Design-system primitives own focus, semantics, keyboard support, and reduced-motion handling.
- Accessibility must be solved at the component layer so features inherit it by default.

## Foundation Status

- Global providers are centralized in `app/providers`.
- Routing is centralized in `app/router`.
- Shared visual tokens and base styles are centralized in `app/styles`.
- Shared policy surfaces now exist for Terms, Privacy, and community guidelines.
- Shared accessibility primitives now exist for buttons, inputs, dialogs, sheets, toasts, and navigation.
- Feature pages currently exist as route placeholders so future work can land without structural rewrites.
- Auth route planning is now codified in the router with a dedicated auth boundary separated from the shared app shell.
- The app now opens on a feature-level loading splash before handing off to the login route.
- The login route now uses a feature-level auth UI component instead of a generic placeholder panel.
- Auth routes now share a reusable stage shell, brand dock, and glass-card container so the auth layout structure can evolve without reworking each route individually.
- Protected app routes now pass through a dedicated wrapper that redirects unauthenticated users back to `/login` instead of exposing app-shell pages by direct URL.
- Route-level error handling now has a stable fallback page, and the repo now includes lint, test, and performance-budget scripts as the baseline quality gate.

## Inference

The exact folder structure above is a project decision, not a standard copied from one source. It is an engineering synthesis based on current React ecosystem practice plus the operational requirements implied by OWASP, WCAG, Twelve-Factor, Core Web Vitals, and OpenTelemetry guidance.

## References

- Twelve-Factor Config: [https://12factor.net/config](https://12factor.net/config)
- Twelve-Factor Backing Services: [https://12factor.net/backing-services](https://12factor.net/backing-services)
- Twelve-Factor Logs: [https://12factor.net/logs](https://12factor.net/logs)
- OpenTelemetry Semantic Conventions: [https://opentelemetry.io/docs/concepts/semantic-conventions/](https://opentelemetry.io/docs/concepts/semantic-conventions/)
- MDN CSP Guide: [https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP)
