import { FoundationPanel } from '../../shared/ui/foundation-panel/FoundationPanel.jsx'

export function ChatPage() {
  return (
    <FoundationPanel
      eyebrow="Phase 4 Preview"
      title="Chat foundation comes after auth, profile completion, and matching."
      description="This route exists now so we can shape layout, navigation, and empty-state standards early. Messaging will stay match-gated when we implement it."
      highlights={[
        'Reserved for match-gated messaging',
        'Will include report and block entry points',
        'Will inherit the shared shell and safety-first patterns',
      ]}
    />
  )
}

