import { motion } from 'framer-motion'

/** Content stays visible; only animates position when scrolled into view */
export default function SectionReveal({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  )
}
