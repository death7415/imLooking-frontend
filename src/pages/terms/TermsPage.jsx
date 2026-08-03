import { PublicPolicyPage } from '../../features/legal/ui/PublicPolicyPage.jsx'

export function TermsPage() {
  return (
    <PublicPolicyPage
      eyebrow="Phase 0 Policy Surface"
      title="Terms of use now have a dedicated public route."
      description="This surface establishes a stable foundation route for legal terms, account rules, eligibility language, and future enforcement copy before deeper auth and onboarding wiring lands."
      highlights={[
        'Public route available before sign-in and account creation',
        'Reserved for eligibility, acceptable-use, and account-ownership terms',
        'Ready for later legal content replacement without route churn',
      ]}
    />
  )
}
