import { ROUTE_PATHS } from '../../app/router/route-paths.js'
import { LoadingExperience } from '../../features/auth/ui/LoadingExperience.jsx'

export function LoadingPage() {
  return <LoadingExperience nextPath={ROUTE_PATHS.LOGIN} />
}
