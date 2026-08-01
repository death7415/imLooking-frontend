import { FoundationPanel } from '../../shared/ui/foundation-panel/FoundationPanel.jsx'

export function OnboardingPage() {
  return (
    <FoundationPanel
      eyebrow="Phase 2"
      title="Onboarding now has its own route for profile and consent flows."
      description="This placeholder marks the future home for profile creation, preferences, consent capture, and privacy defaults."
      highlights={[
        'Reserved for profile setup and preferences',
        'Supports phased onboarding without route rewrites later',
        'Lets us design disclosure and trust flows intentionally',
      ]}
    />
  )
}
