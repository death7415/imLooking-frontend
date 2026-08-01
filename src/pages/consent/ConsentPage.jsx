import { FoundationPanel } from '../../shared/ui/foundation-panel/FoundationPanel.jsx'

export function ConsentPage() {
  return (
    <FoundationPanel
      eyebrow="Phase 1 Route Plan"
      title="Consent has its own route boundary before full product access."
      description="This route is reserved for Terms, Privacy, and community-rules acknowledgment before users proceed into deeper onboarding or account activation."
      highlights={[
        'TODO: add explicit checkbox flow for legal acknowledgments',
        'TODO: block progression until required consent is captured',
        'TODO: connect accepted state to signup completion',
      ]}
    />
  )
}
