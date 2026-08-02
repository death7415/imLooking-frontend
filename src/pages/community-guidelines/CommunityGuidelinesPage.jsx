import { FoundationPanel } from '../../shared/ui/foundation-panel/FoundationPanel.jsx'

export function CommunityGuidelinesPage() {
  return (
    <FoundationPanel
      eyebrow="Phase 0 Policy Surface"
      title="Community rules now have a dedicated public route."
      description="This route establishes the baseline surface for safety expectations, reporting expectations, moderation language, and behavior guardrails before trust-and-safety features are fully wired."
      highlights={[
        'Public route available before sign-in and profile creation',
        'Reserved for safety expectations and moderation policy copy',
        'Supports future consent and trust-and-safety flows without route churn',
      ]}
    />
  )
}
