import { ReactLenis } from 'lenis/react'
import { MotionConfig } from 'motion/react'

export function AppProviders({ children }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        smoothWheel: true,
        syncTouch: true,
      }}
    >
      <MotionConfig
        reducedMotion="user"
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </MotionConfig>
    </ReactLenis>
  )
}
