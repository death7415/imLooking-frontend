import { motion } from 'motion/react'
import { AuthBrandMark } from './AuthBrandMark.jsx'
import './LoginExperience.css'

export function LoginExperience() {
  return (
    <>
      <div className="login-experience__ambient" aria-hidden="true" />

      <div className="login-experience__wrap">
        <div className="login-experience__brand-dock">
          <AuthBrandMark size="dock" />
        </div>

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
          <div className="login-experience__card-clouds" aria-hidden="true" />

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
    </>
  )
}
