import { FoundationPanel } from '../../shared/ui/foundation-panel/FoundationPanel.jsx'

export function SignupPage() {
  return (
    <FoundationPanel
      eyebrow="Phase 1 Route Plan"
      title="Signup now has a dedicated route in the auth boundary."
      description="This route is reserved for account creation, consent checkpoints, and early trust-building copy before users reach deeper onboarding."
      highlights={[
        'TODO: add name, identifier, and password fields',
        'TODO: add consent checkboxes for legal and community rules',
        'TODO: connect success flow into age gate and consent routes',
      ]}
    />
  )
}
