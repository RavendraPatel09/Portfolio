import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[11000] flex flex-col items-center justify-center bg-[var(--bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.div
            className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-[var(--glass-border)] bg-[var(--glass)] shadow-[0_0_60px_rgba(0,255,157,0.15)] backdrop-blur-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-display text-4xl font-bold tracking-tight text-[var(--neon)]">
              RP
            </span>
            <motion.div
              className="pointer-events-none absolute -inset-1 rounded-3xl border border-[var(--neon)]/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
          <motion.div
            className="mt-6 flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] animate-ping" />
            <span>INITIALIZING ENVIRONMENT…</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
