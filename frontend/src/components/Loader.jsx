import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className={`fixed inset-0 z-[11000] flex items-center justify-center bg-[var(--bg)] ${done ? 'pointer-events-none' : ''}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="relative flex h-32 w-32 items-center justify-center rounded-3xl border border-[var(--glass-border)] bg-[var(--glass)] shadow-[0_0_60px_rgba(0,255,157,0.15)] backdrop-blur-xl"
            initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          >
            <motion.span
              className="font-display text-5xl font-bold tracking-tight text-[var(--neon)]"
              animate={{
                textShadow: [
                  '0 0 12px rgba(0,255,157,0.4)',
                  '0 0 28px rgba(0,180,255,0.35)',
                  '0 0 12px rgba(0,255,157,0.4)',
                ],
              }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              RP
            </motion.span>
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-3xl border border-[var(--neon)]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
