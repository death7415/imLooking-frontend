import { motion, useReducedMotion } from 'motion/react'
import './LoginExperience.css'

function AnimatedEye({ delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.span
      className="login-experience__eye"
      initial={{ y: -130, opacity: 0, rotate: -10, scale: 0.82 }}
      animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 250,
        damping: 17,
      }}
    >
      <span className="login-experience__eye-shape">
        <motion.span
          className="login-experience__iris"
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
          <span className="login-experience__pupil" />
          <span className="login-experience__shine" />
        </motion.span>
        <motion.span
          className="login-experience__lid login-experience__lid--top"
          animate={
            shouldReduceMotion
              ? { scaleY: 0.08, y: 0 }
              : {
                  scaleY: [0.08, 0.08, 0.9, 0.12, 0.08, 0.08, 0.74, 0.1, 0.08],
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
          className="login-experience__lid login-experience__lid--bottom"
          animate={
            shouldReduceMotion
              ? { scaleY: 0.14 }
              : { scaleY: [0.14, 0.14, 0.9, 0.2, 0.14, 0.14, 0.7, 0.18, 0.14] }
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
    </motion.span>
  )
}

function BrandLockup() {
  return (
    <motion.div
      className="login-experience__brand-shell"
      initial={{ y: -210, opacity: 0, rotate: -2, scale: 0.97 }}
      animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
      transition={{
        delay: 0.05,
        type: 'spring',
        stiffness: 150,
        damping: 17,
      }}
    >
      <p className="login-experience__eyebrow">Enter With Intention</p>

      <div
        className="login-experience__brand-word"
        role="img"
        aria-label="imlooking"
      >
        <span className="login-experience__brand-word-part">iml</span>
        <span className="login-experience__eyes" aria-hidden="true">
          <AnimatedEye delay={0.58} />
          <AnimatedEye delay={0.68} />
        </span>
        <span className="login-experience__brand-word-part">king</span>
      </div>
    </motion.div>
  )
}

export function LoginExperience() {
  return (
    <section className="login-experience">
      <div className="login-experience__ambient" aria-hidden="true" />

      <div className="login-experience__wrap">
        <motion.div
          className="login-experience__card"
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="login-experience__brand-dock">
            <BrandLockup />
          </div>

          <header className="login-experience__card-header">
            <h1 className="login-experience__card-title">Login</h1>
            <p className="login-experience__card-copy">
              Welcome back. Sign in to enter the private part of the product.
            </p>
          </header>

          <form className="login-experience__form">
            <div className="login-experience__field">
              <label htmlFor="login-identifier">Email or phone</label>
              <input
                id="login-identifier"
                type="text"
                name="identifier"
                placeholder="you@example.com"
              />
            </div>

            <div className="login-experience__field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>

            <div className="login-experience__form-meta">
              <span>Private entry only after sign-in.</span>
              <a className="login-experience__link" href="/forgot-password">
                Forgot password?
              </a>
            </div>

            {/* TODO: Wire validation, generic auth errors, and submit handling when auth APIs are ready. */}
            <button className="login-experience__button" type="button">
              Continue
            </button>
          </form>

          <p className="login-experience__subcopy">
            New here? <a href="/signup">Create your account</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
