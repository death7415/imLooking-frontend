import { AuthRoutePanel } from '../../features/auth/ui/AuthRoutePanel.jsx'

export function AgeGatePage() {
  return (
    <AuthRoutePanel
      eyebrow="Phase 1 Route Plan"
      title="Age gate is now a dedicated auth-adjacent route."
      description="This route is reserved for age confirmation and underage rejection states before users continue deeper into signup and consent flows."
      highlights={[
        'TODO: define exact age confirmation UI copy',
        'TODO: connect underage block state to policy-safe handling',
        'TODO: wire continue path into consent flow',
      ]}
    />
  )
}
