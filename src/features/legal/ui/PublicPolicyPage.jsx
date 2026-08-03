import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../app/router/route-paths.js'
import { Button } from '../../../shared/ui/button/Button.jsx'
import { FoundationPanel } from '../../../shared/ui/foundation-panel/FoundationPanel.jsx'

export function PublicPolicyPage({
  eyebrow,
  title,
  description,
  highlights = [],
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const originPath = location.state?.from

  function handleBack() {
    if (typeof originPath === 'string' && originPath !== location.pathname) {
      navigate(originPath)
      return
    }

    if (window.history.state?.idx > 0) {
      navigate(-1)
      return
    }

    navigate(ROUTE_PATHS.LOGIN)
  }

  return (
    <FoundationPanel
      eyebrow={eyebrow}
      title={title}
      description={description}
      highlights={highlights}
      footer={
        <Button variant="secondary" onClick={handleBack}>
          Back
        </Button>
      }
    />
  )
}
