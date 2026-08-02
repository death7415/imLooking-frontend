import { AuthRoutePanel } from '../../features/auth/ui/AuthRoutePanel.jsx'

export function ResetPasswordPage() {
  return (
    <AuthRoutePanel
      eyebrow="Phase 1 Route Plan"
      title="Reset password has a dedicated route for token-based recovery."
      description="This route is reserved for new-password entry and invalid or expired recovery-token states."
      highlights={[
        'TODO: add new password and confirm password fields',
        'TODO: handle invalid or expired token UI states',
        'TODO: wire password reset submission to backend API',
      ]}
    />
  )
}
