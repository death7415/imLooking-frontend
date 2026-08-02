import { AuthRoutePanel } from '../../features/auth/ui/AuthRoutePanel.jsx'

export function ForgotPasswordPage() {
  return (
    <AuthRoutePanel
      eyebrow="Phase 1 Route Plan"
      title="Forgot password is now a dedicated recovery route."
      description="This route is reserved for generic account recovery messaging and identifier submission without exposing account-enumeration signals."
      highlights={[
        'TODO: add identifier recovery form',
        'TODO: keep success and failure responses generic',
        'TODO: wire request flow to backend recovery API',
      ]}
    />
  )
}
