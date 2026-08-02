import { useRouteError } from 'react-router-dom'
import { FoundationPanel } from '../../shared/ui/foundation-panel/FoundationPanel.jsx'

function getErrorMessage(error) {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'Something went wrong while loading this route.'
}

export function RouteErrorPage() {
  const error = useRouteError()

  return (
    <FoundationPanel
      eyebrow="Phase 0 Error Handling"
      title="A route-level fallback is now protecting the foundation shell."
      description={getErrorMessage(error)}
      highlights={[
        'Unexpected route errors now render a stable recovery surface',
        'This fallback keeps users out of a blank or broken screen state',
        'Future telemetry can attach to this route-level failure boundary',
      ]}
    />
  )
}
