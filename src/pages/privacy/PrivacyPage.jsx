import { FoundationPanel } from '../../shared/ui/foundation-panel/FoundationPanel.jsx'

export function PrivacyPage() {
  return (
    <FoundationPanel
      eyebrow="Phase 0 Policy Surface"
      title="Privacy now has a dedicated public route."
      description="This foundation page reserves a stable location for data collection disclosures, retention policy, visibility rules, and privacy rights before backend-connected settings arrive."
      highlights={[
        'Public route available before sign-in and consent capture',
        'Reserved for profile visibility, retention, and deletion disclosures',
        'Ready for later privacy copy replacement without route churn',
      ]}
    />
  )
}
