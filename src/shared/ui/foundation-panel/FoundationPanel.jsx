import { motion } from 'motion/react'
import './FoundationPanel.css'

export function FoundationPanel({
  eyebrow,
  title,
  description,
  highlights = [],
}) {
  return (
    <motion.section
      className="foundation-panel"
      initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    >
      <div className="foundation-panel__copy">
        <p className="foundation-panel__eyebrow">{eyebrow}</p>
        <h1 className="foundation-panel__title">{title}</h1>
        <p className="foundation-panel__description">{description}</p>
      </div>

      <ul className="foundation-panel__highlights">
        {highlights.map((highlight) => (
          <li key={highlight} className="foundation-panel__highlight">
            {highlight}
          </li>
        ))}
      </ul>
    </motion.section>
  )
}
