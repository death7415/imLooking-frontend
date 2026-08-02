# Design

## Design Direction

Trust-first romantic liquid-glass system.

The visual language keeps the darker romantic-adventure atmosphere in the backdrop, while the surfaces themselves carry the liquid-glass behavior through blob geometry, frosted refraction, and watery highlights. Transparency and blur still need discipline, but the product should feel atmospheric and fluid rather than like a flat background repaint.

## Visual Principles

- Calm, premium, emotionally warm.
- Liquid depth with flowing highlights and water-like edges, not flat panes.
- High readability over every background.
- Clear hierarchy before visual flourish.
- Motion should support confidence, not show off.

## Style Rules

### Liquid Glass Usage

- Use liquid-glass panels for overlays, modals, hero cards, shell chrome, and premium emphasis zones.
- Prefer blob or asymmetrical rounded forms over rigid rectangles when a surface is meant to feel fluid.
- Keep primary reading areas on stable high-contrast surfaces.
- Avoid stacking multiple heavy blur layers under body text.
- Never place small low-weight text on translucent surfaces without a solid contrast assist.
- Prefer layered highlights, refraction-like gradients, soft inner glow, bright edge sheen, subtle caustic reflections, and visibly fluid silhouettes over flat frosted boxes.

### Color System

- Dark romantic backdrop with blush, sunset, and cool-aqua liquid accents.
- Semantic colors for success, warning, danger, info.
- Status colors must pass contrast requirements in both filled and subtle variants.
- Backgrounds should remain gradient-led rather than collapsing to solid fills.

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

- The first shell now keeps a darker atmospheric gradient backdrop and pushes the liquid language into the surfaces themselves.
- Navigation uses soft blob-pill states with clear active and hover treatment.
- Shared tokens now define the base liquid-glass surface, romantic accent palette, blob radius language, and shadow system.
- Placeholder pages use one reusable panel pattern so we can evolve screens without visual drift.
- The app now opens on a dedicated animated auth splash before handing off to the login screen.
- The login landing now uses a dedicated animated auth composition instead of the generic placeholder panel.
- The `imLooking` brand mark now drops from above in separate parts on the splash and lands on the login modal edge on the following screen.
- The `imLooking` brand mark now stays on one line, with delayed eye landing, side-to-side pupil motion, sculpted lids, finer human-like upper lashes, subtle eye depth, and no extra dock box under the eyes.
- Shell, panel, splash, and login surfaces now use darker liquid-glass layering with brighter edge sheen, watery blob silhouettes, a darker core, and milky cloud buildup along the lower surface without changing the whole app into a pale theme.
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

The choice to use liquid-glass surfaces with romantic/adventure gradients is a product design direction for this repo, constrained by WCAG accessibility requirements and enterprise UX risk tolerance rather than copied from one external source.

## References

- WCAG 2.2: [https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/)
- Web Vitals: [https://web.dev/articles/vitals](https://web.dev/articles/vitals)
- Apple App Review Guidelines: [https://developer.apple.com/app-store/review/guidelines/](https://developer.apple.com/app-store/review/guidelines/)
