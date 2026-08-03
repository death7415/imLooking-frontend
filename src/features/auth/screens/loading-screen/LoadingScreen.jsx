import { motion, useReducedMotion } from 'motion/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthBrandMark, AuthStageCard, AuthStageShell } from '../../components/index.js'
import './LoadingScreen.css'

export function LoadingScreen({ nextPath = '/login' }) {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const timeoutMs = shouldReduceMotion ? 700 : 2400
    const timer = window.setTimeout(() => {
      navigate(nextPath, { replace: true })
    }, timeoutMs)

    return () => window.clearTimeout(timer)
  }, [navigate, nextPath, shouldReduceMotion])

  return (
    <AuthStageShell frameWidth="wide" className="loading-experience">
      <div className="loading-experience__content">
        <motion.div
          className="loading-experience__brand-frame"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AuthStageCard variant="hero" className="loading-experience__card">
            <AuthBrandMark size="hero" />
          </AuthStageCard>
        </motion.div>

        <motion.p
          className="loading-experience__caption"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.9,
            duration: shouldReduceMotion ? 0.2 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Loading your entry experience.
        </motion.p>

        <motion.div
          className="loading-experience__progress"
          initial={{ scaleX: 0, opacity: 0.45 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            delay: shouldReduceMotion ? 0.1 : 1.05,
            duration: shouldReduceMotion ? 0.45 : 1.1,
            ease: 'easeInOut',
          }}
        />
      </div>
    </AuthStageShell>
  )
}
