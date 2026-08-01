import { motion } from 'motion/react'

function App() {
  return (
    <main className="app-shell">
      <motion.section
        className="hero-card"
        initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      >
        <p className="eyebrow">Animate UI + Lenis</p>
        <h1>Global motion is now wired into the app root.</h1>
        <p className="body-copy">
          Use <code>motion</code> anywhere for component animation, and rely on
          <code> ReactLenis </code>
          at the app root for smooth scrolling and scroll-driven interactions.
        </p>
      </motion.section>
    </main>
  )
}

export default App
