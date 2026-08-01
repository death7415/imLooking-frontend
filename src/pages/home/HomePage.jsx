import { FoundationPanel } from '../../shared/ui/foundation-panel/FoundationPanel.jsx'

export function HomePage() {
  return (
    <FoundationPanel
      eyebrow="Phase 0 Foundation"
      title="The app shell is now structured for real product screens."
      description="This home route is the first production-shaped placeholder. It proves the router, shell, motion providers, and design tokens are working together."
      highlights={[
        'Global MotionConfig and Lenis are active at the root',
        'Route-ready shell for auth, onboarding, discovery, and chat',
        'Reusable visual foundation for future feature modules',
      ]}
    />
  )
}
