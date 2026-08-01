# Design

## Design Direction

Trust-first premium glass system.

We can use glassmorphism, but only as an accent language. Enterprise-grade dating UX cannot rely on heavy blur, low-contrast text, or decorative transparency that harms readability. Accessibility and trust beat visual trendiness.

## Visual Principles

- Calm, premium, emotionally warm.
- Soft depth, not noisy decoration.
- High readability over every background.
- Clear hierarchy before visual flourish.
- Motion should support confidence, not show off.

## Style Rules

### Glassmorphism Usage

- Use glass panels for overlays, modals, hero cards, and premium emphasis zones.
- Keep primary reading areas on stable high-contrast surfaces.
- Avoid stacking multiple blur layers under body text.
- Never place small low-weight text on translucent surfaces without a solid contrast assist.

### Color System

- Neutral base with one warm brand color and one cool accent.
- Semantic colors for success, warning, danger, info.
- Status colors must pass contrast requirements in both filled and subtle variants.

### Typography

- One display family, one workhorse UI family at most.
- Large headlines for emotional framing, pragmatic text for task completion.
- Avoid ultra-light weights for key product flows.

### Spacing and Layout

- 8px spacing rhythm.
- Strong mobile-first layout discipline.
- Edge-safe padding for small devices.
- Maximum readable content width for forms and policy text.

### Motion

- `Animate UI` defines component-level transitions, entrance states, dialogs, sheets, hover states, and feedback motion.
- `Lenis` is used for scroll behavior and scroll-linked polish, not for replacing clear interaction design.
- Respect `prefers-reduced-motion`.
- Motion duration should generally stay short and intentional; no autoplay spectacle on core conversion flows.

## Current Foundation Implementation

- The first shell uses a glass-accent chrome around a high-contrast content area.
- Navigation uses pill-based states with clear active and hover treatment.
- Shared tokens now define the base surface, text, accent, radius, and shadow system.
- Placeholder pages use one reusable panel pattern so we can evolve screens without visual drift.
- The login landing now uses a dedicated animated auth composition instead of the generic placeholder panel.
- The `imlooking` brand mark now docks into the login modal edge instead of reading like a second glass card.
- The `imlooking` brand mark now stays on one line, with delayed eye landing, side-to-side pupil motion, and more human eyelid behavior.
- The auth entry experience no longer exposes a visual path back to the main app before login.

## Component Expectations

- Buttons: strong hover, focus, active, disabled, loading states.
- Forms: labels always visible, errors inline, helper text concise.
- Cards: stable skeletons and fixed media boxes to reduce CLS.
- Dialogs and sheets: keyboard trap, clear close affordance, focus return.
- Toasts: non-blocking, not the only channel for important errors.

## Trust and Safety UX

- Reporting and blocking must be available but not buried.
- Profile verification states must be explicit and non-misleading.
- Users must understand who can see their photos, profile, and activity.
- Sensitive flows need reassuring copy, not only icons.

## Accessibility Standard

- All final UI aims for WCAG `2.2` AA.
- Focus indication must be visible on every interactive control.
- Contrast must remain sufficient even when blur, gradients, or image backdrops are present.
- Reduced-motion mode must preserve all actions and meaning.

## Inference

The choice to keep glassmorphism as a controlled accent is a product decision derived from WCAG accessibility requirements and enterprise UX risk tolerance, not a literal rule from one external source.

## References

- WCAG 2.2: [https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/)
- Web Vitals: [https://web.dev/articles/vitals](https://web.dev/articles/vitals)
- Apple App Review Guidelines: [https://developer.apple.com/app-store/review/guidelines/](https://developer.apple.com/app-store/review/guidelines/)
