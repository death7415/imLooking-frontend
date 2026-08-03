import { motion, useReducedMotion } from 'motion/react'
import './AuthBrandMark.css'

function BrandDrop({ children, delay = 0, className = '' }) {
  return (
    <motion.span
      className={className}
      initial={{ y: -170, opacity: 0, rotate: -4, scale: 0.94 }}
      animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 180,
        damping: 16,
      }}
    >
      {children}
    </motion.span>
  )
}

function AnimatedEye({ delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <BrandDrop className="auth-brand-mark__eye" delay={delay}>
      <span className="auth-brand-mark__eye-shape">
        <motion.span
          className="auth-brand-mark__iris"
          animate={
            shouldReduceMotion
              ? { x: 0, y: 0 }
              : { x: [0, -4, 5, 1, -3, 0], y: [0, 1, -1, 0, 1, 0] }
          }
          transition={{
            duration: 5.2,
            ease: 'easeInOut',
            repeat: shouldReduceMotion ? 0 : Infinity,
          }}
        >
          <span className="auth-brand-mark__pupil" />
          <span className="auth-brand-mark__shine" />
        </motion.span>
        <span className="auth-brand-mark__lashes" aria-hidden="true">
          <span className="auth-brand-mark__lash auth-brand-mark__lash--1" />
          <span className="auth-brand-mark__lash auth-brand-mark__lash--2" />
          <span className="auth-brand-mark__lash auth-brand-mark__lash--3" />
          <span className="auth-brand-mark__lash auth-brand-mark__lash--4" />
          <span className="auth-brand-mark__lash auth-brand-mark__lash--5" />
        </span>
        <motion.span
          className="auth-brand-mark__lid auth-brand-mark__lid--top"
          animate={
            shouldReduceMotion
              ? { scaleY: 0.24, y: 0 }
              : {
                  scaleY: [0.24, 0.24, 0.98, 0.3, 0.24, 0.24, 0.82, 0.28, 0.24],
                  y: [0, 0, -1, 0, 0, 0, -1, 0, 0],
                }
          }
          transition={{
            duration: 5.8,
            ease: 'easeInOut',
            times: [0, 0.22, 0.26, 0.3, 0.34, 0.62, 0.66, 0.7, 1],
            repeat: shouldReduceMotion ? 0 : Infinity,
            delay: 0.6,
          }}
        />
        <motion.span
          className="auth-brand-mark__lid auth-brand-mark__lid--bottom"
          animate={
            shouldReduceMotion
              ? { scaleY: 0.18 }
              : { scaleY: [0.18, 0.18, 0.9, 0.24, 0.18, 0.18, 0.72, 0.22, 0.18] }
          }
          transition={{
            duration: 5.8,
            ease: 'easeInOut',
            times: [0, 0.22, 0.26, 0.3, 0.34, 0.62, 0.66, 0.7, 1],
            repeat: shouldReduceMotion ? 0 : Infinity,
            delay: 0.6,
          }}
        />
      </span>
    </BrandDrop>
  )
}

export function AuthBrandMark({
  className = '',
  size = 'dock',
  ariaLabel = 'imLooking',
}) {
  const classes = ['auth-brand-mark', `auth-brand-mark--${size}`]

  if (className) {
    classes.push(className)
  }

  return (
    <div className={classes.join(' ')}>
      <div className="auth-brand-mark__word" role="img" aria-label={ariaLabel}>
        <BrandDrop className="auth-brand-mark__word-part" delay={0.04}>
          imL
        </BrandDrop>
        <span className="auth-brand-mark__eyes" aria-hidden="true">
          <AnimatedEye delay={0.56} />
          <AnimatedEye delay={0.68} />
        </span>
        <BrandDrop className="auth-brand-mark__word-part" delay={0.14}>
          king
        </BrandDrop>
      </div>
    </div>
  )
}
